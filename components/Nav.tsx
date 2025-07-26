"use client";
import Link from 'next/link';
import {usePathname} from "next/navigation";
import { useTranslation } from 'react-i18next';

const links = [
    {
        name: 'nav.home',
        path: '/'
    },
    {
        name: 'nav.resume',
        path: '/resume'
    },
    {
        name: 'nav.projects',
        path: '/projects'
    },
];

const Nav = () => {
    const pathname = usePathname();
    const { t } = useTranslation();

    return (
        <nav className="flex gap-8">
            {links.map((link, index) => (
                <Link key={index} href={link.path}>
                    <div
                        className={`capitalize font-medium hover:text-accent transition-all ${pathname === link.path && 'text-accent border-b-2 border-accent'}`}>{t(link.name)}</div>
                </Link>
            ))}
        </nav>
    );
};

export default Nav;