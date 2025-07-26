"use client";
import Link from 'next/link';
import {Button} from "@/components/ui/button";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from 'react-i18next';

const Header = () => {
    const { t } = useTranslation();
    
    return (
        <header className="py-8 xl:py-12 text-white">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link href="/">
                    <h1 className="text-3xl font-semibold">
                        Jesse<span className="text-accent">.</span>
                    </h1>
                </Link>

                { /* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <Nav/>
                    <Link href="/contact">
                        <Button>{t('nav.contact')}</Button>
                    </Link>
                    <LanguageSwitcher/>
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden">
                    <MobileNav/>
                </div>
            </div>
        </header>
    );
};

export default Header;