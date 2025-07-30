"use client";
import {useState, useEffect} from 'react';
import {Sheet, SheetContent, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import Link from 'next/link';
import {CiMenuFries} from "react-icons/ci";
import {usePathname} from "next/navigation";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const links = [
    {name: 'nav.home', path: '/'},
    {name: 'nav.resume', path: '/resume'},
    {name: 'nav.projects', path: '/projects'},
    // {name: 'apps', path: '/apps'},
    {name: 'nav.contact', path: '/contact'}
];

const MobileNav = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="flex items-center justify-center">
                <CiMenuFries className="text-[32px] text-accent"/>
            </SheetTrigger>
            <VisuallyHidden.Root>
                <SheetTitle>Menu</SheetTitle>
            </VisuallyHidden.Root>
            <SheetContent className="flex flex-col z-[1000] h-full">
                {/* Logo */}
                <div className="mt-[12vh] mb-[9vh] text-center text-2xl">
                    <Link href="/">
                        <h1 className="text-4xl font-semibold">
                            Jesse<span className="text-accent">.</span>
                        </h1>
                    </Link>
                </div>
                {/* Navigation */}
                <nav className="flex flex-col justify-center items-center gap-[3vh]">
                    {links.map((link, index) => (
                        <Link key={index} href={link.path}
                              className={`text-xl capitalize hover:text-accent transition-all ${pathname === link.path && 'text-accent border-b-2 border-accent'}`}>
                            {t(link.name)}
                        </Link>
                    ))}
                </nav>
                {/* Language Switcher */}
                <div className="mt-auto pb-8 flex justify-center">
                    <LanguageSwitcher/>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default MobileNav;