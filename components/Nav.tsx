"use client";
import Link from 'next/link';
import {usePathname} from "next/navigation";

const links = [
    {
        name: 'home',
        path: '/'
    },
    {
        name: 'resume',
        path: '/resume'
    },
    {
        name: 'projects',
        path: '/projects'
    },
];

const Nav = () => {
    const pathname = usePathname();

    return (
        <nav className="flex gap-8">
            {links.map((link, index) => (
                <Link key={index} href={link.path}>
                    <div
                        className={`capitalize font-medium hover:text-accent transition-all ${pathname === link.path && 'text-accent border-b-2 border-accent'}`}>{link.name}</div>
                </Link>
            ))}
        </nav>
    );
};

export default Nav;