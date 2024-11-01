"use server";

interface Body {
    email: string;
    token: string;
    message: string;
    name: string;
}

export async function submitForm(body: Body) {
    // If email or captcha are missing return an error
    if (!body.email || !body.token || !body.message || !body.name) {
        return "Unprocessable request, please provide the required fields.";
    }

    // Max length of the message is 500 characters, name is 50 characters and email is 254 characters
    if (body.message.length > 500 || body.name.length > 50 || body.email.length > 254) {
        return "Unprocessable request, please shorten the message or name."
    }

    try {
        // Ping the hCaptcha verify API to verify the captcha code received
        const response = await fetch(
            `https://hcaptcha.com/siteverify`,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
                },
                body: `response=${body.token}&secret=${process.env.HCAPTCHA_SECRET}`,
                method: "POST",
            }
        );
        const captchaValidation = await response.json();

        /**
         * The structure of response from the verify API is
         * {
         *  "success": true|false,
         *  "challenge_ts": timestamp,  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
         *  "hostname": string,         // the hostname of the site where the reCAPTCHA was solved
         *  "error-codes": [...]        // optional
         }
         */

        if (captchaValidation.success) {
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            const nodemailer = require('nodemailer');
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: 'fireplankwebsite@gmail.com',
                    pass: process.env.EMAIL_PASS,
                }
            });

            await new Promise((resolve, reject) => {
                // Verify connection configuration
                transporter.verify(function (error: never, success: unknown) {
                    if (error) {
                        console.log(error);
                        reject(error);
                    } else {
                        resolve(success);
                    }
                });
            });

            const mailData = {
                from: 'Contact Form <fireplankwebsite@gmail.com>',
                to: 'fireplankwebsite@gmail.com',
                subject: `Message from '${body.name}'`,
                text: body.message + " | Sender email: " + body.email,
                html: `<p>Sender email: ${body.email}</p><br/><div>${body.message}</div>`
            }

            await new Promise((resolve, reject) => {
                // Send the email
                transporter.sendMail(mailData, (err: never, info: unknown) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                        return "An error occurred while sending the message. Please try again later.";
                    } else {
                        console.log(info);
                        resolve(info);
                    }
                });
            });

            // If everything went well, return OK
            return "OK";
        }

        return "Invalid captcha code given, please try again.";
    } catch (error) {
        console.log(error);
        return "Something went wrong";
    }
}