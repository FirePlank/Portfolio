"use client";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {FaPhoneAlt, FaEnvelope, FaDiscord} from "react-icons/fa";
import HCaptcha from '@hcaptcha/react-hcaptcha';
import {motion} from "framer-motion";
import React from "react";


const data = [
    {
        icon: <FaPhoneAlt/>,
        label: 'Phone',
        value: '(+358) 45 804 1445'
    },
    {
        icon: <FaEnvelope/>,
        label: 'Email',
        value: 'contact@fireplank.xyz'
    },
    {
        icon: <FaDiscord/>,
        label: 'Discord',
        value: '@fireplank'
    }
]

const Contact = () => {
    const hcaptchaRef: React.RefObject<HCaptcha> = React.createRef();
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [info, setInfo] = React.useState('');

    const onClick = () => {
        setIsLoading(true);
        if (hcaptchaRef.current) {
            hcaptchaRef.current.execute();
        }
    }

    const onCAPTCHAChange = (token: string) => {
        // If the reCAPTCHA code is null or undefined indicating that
        // the reCAPTCHA was expired then return early
        if (!token) {
            setIsLoading(false);
            return;
        }

        const data = {
            name,
            email,
            message,
            token
        }

        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((res) => {
            if (res.status === 200) {
                setError(false);
                setName('');
                setEmail('');
                setMessage('');
                setInfo('Message has been successfully sent!');
            } else {
                console.log('Response failed!');
                setError(true);
                setInfo('An error occurred while sending the message. Please try again later.');
            }
            setIsLoading(false);
        })

        // Reset the CAPTCHA so that it can be executed again if user
        // submits another email.
        if (hcaptchaRef.current) {
            hcaptchaRef.current.resetCaptcha();
        }
    }

    return <motion.section
        initial={{opacity: 0}}
        animate={{opacity: 1, transition: {duration: 0.25, delay: 0.4, ease: "easeIn"}}}
        className="min-h-[80vh] flex flex-col justify-center py-12 xl:px-0"
    >
        <div className="container mx-auto">
            <div className="flex flex-col xl:flex-row gap-[30px]">
                {/* Contact form */}
                <div className="xl:w-[54%] order-2 xl:order-none">
                    <form className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl">
                        <h3 className="text-4xl text-accent">
                            Contact me
                        </h3>
                        <p className="text-white/60">
                            I&#39;m always open to new opportunities, collaborations, and projects. Feel free to reach
                            out to me.
                        </p>
                        {/* Contact form fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input type="firstname" placeholder="Name" value={name}
                                   onChange={(e) => setName(e.target.value)}/>
                            <Input type="email" placeholder="Email" value={email}
                                   onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        {/* Textarea */}
                        <Textarea placeholder="Message" className="h-[200px]" value={message}
                                  onChange={(e) => setMessage(e.target.value)}/>
                        {/* Submit button */}
                        <HCaptcha
                            size="invisible"
                            ref={hcaptchaRef}
                            sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY}
                            onVerify={onCAPTCHAChange}
                        />
                        <Button size="md" className="max-w-40" onClick={onClick}>
                            Send message
                        </Button>
                        {/* Error message */}
                        {error && <p className="text-red-500">
                            {info}
                        </p>}
                    </form>
                </div>
                {/* Contact info */}
                <div className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0">
                    <ul className="flex flex-col gap-10">
                        {data.map((item, index) => (
                            <li key={index} className="flex items-center gap-6">
                                <div
                                    className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c] text-accent rounded-md flex items-center justify-center">
                                    <div className="text-[28px]">
                                        {item.icon}
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-white/60">
                                        {item.label}
                                    </p>
                                    <p className="text-xl">
                                        {item.value}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
        <footer className="text-center text-white/60 mt-[3.5rem] max-w-[95%] text-sm">
            This site is protected by hCaptcha and its
            <a href="https://www.hcaptcha.com/privacy" className="text-accent" target="_blank"> Privacy Policy</a> and
            <a href="https://www.hcaptcha.com/terms" className="text-accent" target="_blank"> Terms of
                Service</a> apply.
        </footer>
    </motion.section>
};

export default Contact;