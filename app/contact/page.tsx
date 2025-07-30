"use client";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {FaPhoneAlt, FaEnvelope, FaDiscord} from "react-icons/fa";
import HCaptcha from '@hcaptcha/react-hcaptcha';
import {motion} from "framer-motion";
import React, {useEffect} from "react";
import {submitForm} from "@/app/contact/actions";
import { useTranslation } from 'react-i18next';

const data = [
    {
        icon: <FaPhoneAlt/>,
        label: 'contact.phone',
        value: '(+358) 45 804 1445'
    },
    {
        icon: <FaEnvelope/>,
        label: 'contact.email',
        value: 'jesse.sissala@gmail.com'
    },
    {
        icon: <FaDiscord/>,
        label: 'contact.discord',
        value: '@fireplank'
    }
]

const Contact = () => {
    const { t } = useTranslation();
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
            setInfo(t('contact.fillFieldsCorrectly'));
            return;
        } else {
            setError(false);
            setInfo('');
        }
    }, [name, email, message, isFormValid, t]);

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
                setInfo(t('contact.successMessage'));
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
        setInfo(t('contact.captchaExpired'));
    }

    if (!process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY) {
        throw new Error('NEXT_PUBLIC_HCAPTCHA_SITEKEY is not defined');
    }

    return <motion.section
        initial={{opacity: 0}}
        animate={{opacity: 1, transition: {duration: 0.25, delay: 0.4, ease: "easeIn"}}}
        className="min-h-screen flex flex-col justify-between py-12 xl:px-0"
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
                            {t('contact.title')}
                        </h3>
                        <p className="text-white/60">
                            {t('contact.description')}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input type="text" placeholder={t('contact.namePlaceholder')} value={name}
                                   onChange={(e) => setName(e.target.value)}/>
                            <Input type="email" placeholder={t('contact.emailPlaceholder')} value={email}
                                   onChange={(e) => setEmail(e.target.value)} required/>
                        </div>
                        <Textarea placeholder={t('contact.messagePlaceholder')} className="md:h-[220px] h-[150px]" value={message}
                                  onChange={(e) => setMessage(e.target.value)} required/>
                        {error && <p className='text-red-500 text-sm'>
                            {info}
                        </p>
                        }
                        <Button size="md" className={`max-w-40 ${!isFormValid() ? 'cursor-not-allowed' : ''}`}
                                disabled={isLoading || !isFormValid()}>
                            {isLoading && <div className="loader mr-3"/>}{isLoading ? t('contact.sending') : t('contact.sendMessage')}
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
                                <div className="flex-1 min-w-0">
                                    <p className="text-white/60">
                                        {t(item.label)}
                                    </p>
                                    <p className="text-base md:text-lg xl:text-xl break-words overflow-hidden">
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
            {t('contact.hcaptchaText')}
            <a href="https://www.hcaptcha.com/privacy" className="text-accent" target="_blank">{t('contact.privacyPolicy')}</a> {t('contact.and')}
            <a href="https://www.hcaptcha.com/terms" className="text-accent" target="_blank">{t('contact.termsOfService')}</a>{t('contact.apply')}
        </footer>
    </motion.section>
};

export default Contact;