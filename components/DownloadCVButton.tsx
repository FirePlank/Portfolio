import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import {Button} from "@/components/ui/button";
import {FiDownload} from 'react-icons/fi';

const DownloadCVButton = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="lg" className="uppercase flex items-center gap-2">
                    <span>Download CV</span>
                    <FiDownload className="text-xl"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem asChild>
                    <a href="/assets/Ansioluettelo.pdf" className="block px-4 py-2 text-sm hover:cursor-pointer"
                       target="_blank">
                        Finnish Version
                    </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem asChild>
                    <a href="/assets/CV.pdf" className="block px-4 py-2 text-sm hover:cursor-pointer" target="_blank">
                        English Version
                    </a>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default DownloadCVButton;