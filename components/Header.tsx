"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileNav from "./MobileNav";
import Nav from "./Nav";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="py-8 xl:py-12 text-white relative z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-3xl font-semibold">
          Jesse<span className="text-accent">.</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Nav />
          <Button asChild>
            <Link href="/contact">{t("nav.contact")}</Link>
          </Button>
          <LanguageSwitcher />
        </div>

        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
