"use client";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {FaPhoneAlt, FaEnvelope, FaDiscord} from "react-icons/fa";
import HCaptcha from '@hcaptcha/react-hcaptcha';
import {motion} from "framer-motion";
import React, {useEffect} from "react";
import {submitForm} from "@/app/contact/actions";


const data = [
    {
        icon: <FaPhoneAlt/>,
        label: 'Phone',
        value: '(+358) 45 804 1445'
    },
    {
        icon: <FaEnvelope/>,
        label: 'Email',
        value: 'contact@jessesissala.com'
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

    const isFormValid = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return name.trim() !== '' && emailRegex.test(email) && message.trim() !== '';
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        if (hcaptchaRef.current) {
            hcaptchaRef.current.execute();
        }
    }

    useEffect(() => {
        if (!isFormValid() && name !== '' && email !== '' && message !== '') {
            setError(true);
            setInfo('Please fill in all fields correctly.');
            return;
        } else {
            setError(false);
            setInfo('');
        }
    }, [name, email, message, isFormValid]);

    const onCAPTCHAChange = (token: string | null) => {
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

        submitForm(data).then((res) => {
            if (res === 'OK') {
                setError(false);
                setName('');
                setEmail('');
                setMessage('');
                setInfo('Message has been successfully sent!');
            } else {
                console.log('Response failed!');
                setError(true);
                setInfo(res);
            }
            setIsLoading(false);
        })

        if (hcaptchaRef.current) {
            hcaptchaRef.current.resetCaptcha();
        }
    }

    const onCAPTCHAExpire = () => {
        setIsLoading(false);
        setInfo('CAPTCHA expired. Please try again.');
    }

    if (!process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY) {
        throw new Error('NEXT_PUBLIC_HCAPTCHA_SITEKEY is not defined');
    }

    return <motion.section
        initial={{opacity: 0}}
        animate={{opacity: 1, transition: {duration: 0.25, delay: 0.4, ease: "easeIn"}}}
        className="min-h-[84vh] flex flex-col justify-between py-12 xl:px-0"
    >
        <HCaptcha
            size="invisible"
            ref={hcaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY}
            onVerify={onCAPTCHAChange}
            onExpire={onCAPTCHAExpire}
        />
        <div className="container mx-auto flex-grow">
            <div className="flex flex-col xl:flex-row gap-[30px]">
                <div className="xl:w-[54%] order-2 xl:order-none">
                    <form className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl" onSubmit={onSubmit}>
                        <h3 className="text-4xl text-accent">
                            Contact me
                        </h3>
                        <p className="text-white/60">
                            I&#39;m always open to new opportunities, collaborations, and projects. Feel free to reach
                            out to me.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input type="text" placeholder="Name" value={name}
                                   onChange={(e) => setName(e.target.value)}/>
                            <Input type="email" placeholder="Email" value={email}
                                   onChange={(e) => setEmail(e.target.value)} required/>
                        </div>
                        <Textarea placeholder="Message" className="md:h-[220px] h-[150px]" value={message}
                                  onChange={(e) => setMessage(e.target.value)} required/>
                        {error && <p className='text-red-500 text-sm'>
                            {info}
                        </p>
                        }
                        <Button size="md" className={`max-w-40 ${!isFormValid() ? 'cursor-not-allowed' : ''}`}
                                disabled={isLoading || !isFormValid()}>
                            {isLoading && <div className="loader mr-3"/>}{isLoading ? 'Sending...' : 'Send message'}
                        </Button>
                        {info && !error && <p className='text-accent text-sm'>
                            {info}
                        </p>
                        }
                    </form>
                </div>
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
            This site is protected by hCaptcha. Its
            <a href="https://www.hcaptcha.com/privacy" className="text-accent" target="_blank"> Privacy Policy</a> and
            <a href="https://www.hcaptcha.com/terms" className="text-accent" target="_blank"> Terms of
                Service</a> apply.
        </footer>
    </motion.section>
};

export default Contact;