import Link from 'next/link';
import {Button} from "@/components/ui/button";
import Nav from "./Nav";
import MobileNav from "./MobileNav";

const Header = () => {
    return (
        <header className="py-8 xl:py-12 text-white">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link href="/">
                    <h1>
                        FirePlank<span className="text-accent">.</span>
                    </h1>
                </Link>

                { /* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <Nav/>
                    <Link href="/contact">
                        <Button>Hire me</Button>
                    </Link>
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