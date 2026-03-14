"use client";
import React, { useRef } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { motion } from "framer-motion";
import { FaDiscord, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

import { submitForm } from "@/app/contact/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "react-i18next";

const data = [
  {
    icon: <FaPhoneAlt />,
    label: "contact.phone",
    value: "(+358) 45 804 1445",
  },
  {
    icon: <FaEnvelope />,
    label: "contact.email",
    value: "jesse.sissala@gmail.com",
  },
  {
    icon: <FaDiscord />,
    label: "contact.discord",
    value: "@fireplank",
  },
];

const Contact = () => {
  const { t } = useTranslation();
  const hcaptchaRef = useRef<HCaptcha | null>(null);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [statusError, setStatusError] = React.useState(false);
  const [statusInfo, setStatusInfo] = React.useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isFormValid =
    name.trim() !== "" && emailRegex.test(email) && message.trim() !== "";
  const validationInfo =
    !isFormValid && name !== "" && email !== "" && message !== ""
      ? t("contact.fillFieldsCorrectly")
      : "";
  const isError = Boolean(validationInfo) || statusError;
  const info = validationInfo || statusInfo;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) {
      return;
    }

    setIsLoading(true);
    setStatusError(false);
    setStatusInfo("");
    hcaptchaRef.current?.execute();
  };

  const onCAPTCHAChange = (token: string | null) => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    submitForm({
      name,
      email,
      message,
      token,
    }).then((res) => {
      if (res === "OK") {
        setStatusError(false);
        setName("");
        setEmail("");
        setMessage("");
        setStatusInfo(t("contact.successMessage"));
      } else {
        console.log("Response failed!");
        setStatusError(true);
        setStatusInfo(res);
      }
      setIsLoading(false);
    });

    hcaptchaRef.current?.resetCaptcha();
  };

  const onCAPTCHAExpire = () => {
    setIsLoading(false);
    setStatusError(true);
    setStatusInfo(t("contact.captchaExpired"));
  };

  if (!process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY) {
    throw new Error("NEXT_PUBLIC_HCAPTCHA_SITEKEY is not defined");
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.25, delay: 0.4, ease: "easeIn" } }}
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
              <h3 className="text-4xl text-accent">{t("contact.title")}</h3>
              <p className="text-white/60">{t("contact.description")}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  type="text"
                  placeholder={t("contact.namePlaceholder")}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  type="email"
                  placeholder={t("contact.emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Textarea
                placeholder={t("contact.messagePlaceholder")}
                className="md:h-[220px] h-[150px]"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              {info && (
                <p className={isError ? "text-red-500 text-sm" : "text-accent text-sm"}>{info}</p>
              )}
              <Button
                size="md"
                className={`max-w-40 ${!isFormValid ? "cursor-not-allowed" : ""}`}
                disabled={isLoading || !isFormValid}
              >
                {isLoading && <div className="loader mr-3" />}
                {isLoading ? t("contact.sending") : t("contact.sendMessage")}
              </Button>
            </form>
          </div>
          <div className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0">
            <ul className="flex flex-col gap-10">
              {data.map((item, index) => (
                <li key={index} className="flex items-center gap-6">
                  <div className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c] text-accent rounded-md flex items-center justify-center">
                    <div className="text-[28px]">{item.icon}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white/60">{t(item.label)}</p>
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
        {t("contact.hcaptchaText")}
        <a href="https://www.hcaptcha.com/privacy" className="text-accent" target="_blank">
          {t("contact.privacyPolicy")}
        </a>{" "}
        {t("contact.and")}
        <a href="https://www.hcaptcha.com/terms" className="text-accent" target="_blank">
          {t("contact.termsOfService")}
        </a>
        {t("contact.apply")}
      </footer>
    </motion.section>
  );
};

export default Contact;
