"use client";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import {Button} from "@/components/ui/button";
import {FiDownload} from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

const DownloadCVButton = () => {
    const { t } = useTranslation();
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="lg" className="uppercase flex items-center gap-2">
                    <span>{t('cv.downloadCV')}</span>
                    <FiDownload className="text-xl"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem asChild>
                    <a href="/assets/Ansioluettelo.pdf" className="block px-4 py-2 text-sm hover:cursor-pointer"
                       target="_blank">
                        {t('cv.finnishVersion')}
                    </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem asChild>
                    <a href="/assets/CV.pdf" className="block px-4 py-2 text-sm hover:cursor-pointer" target="_blank">
                        {t('cv.englishVersion')}
                    </a>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default DownloadCVButton;