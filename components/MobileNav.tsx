"use client";
import {useState, useEffect} from 'react';
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import Link from 'next/link';
import {CiMenuFries} from "react-icons/ci";
import {usePathname} from "next/navigation";

const links = [
    {name: 'home', path: '/'},
    {name: 'resume', path: '/resume'},
    {name: 'projects', path: '/projects'},
    {name: 'contact', path: '/contact'}
];

const MobileNav = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="flex items-center justify-center">
                <CiMenuFries className="text-[32px] text-accent"/>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
                {/* Logo */}
                <div className="mt-32 mb-40 text-center text-2xl">
                    <Link href="/">
                        <h1 className="text-4xl font-semibold">
                            Jesse<span className="text-accent">.</span>
                        </h1>
                    </Link>
                </div>
                {/* Navigation */}
                <nav className="flex flex-col justify-center items-center gap-8">
                    {links.map((link, index) => (
                        <Link key={index} href={link.path}
                              className={`text-xl capitalize hover:text-accent transition-all ${pathname === link.path && 'text-accent border-b-2 border-accent'}`}>
                            {link.name}
                        </Link>
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    );
};

export default MobileNav;