import Link from 'next/link';
import {Button} from "@/components/ui/button";
import {FaGithub, FaLinkedin, FaTwitter} from "react-icons/fa";

const socials = [
    {
        icon: <FaGithub/>,
        link: 'https://github.com/fireplank'
    },
    {
        icon: <FaLinkedin/>,
        link: 'https://www.linkedin.com/in/jesse-sissala'
    },
    {
        icon: <FaTwitter/>,
        link: 'https://x.com/fireplank'
    }
];

interface SocialProps {
    containerStyles: string;
    iconStyles: string;
}

const Social = ({containerStyles, iconStyles}: SocialProps) => {
    return <div className={containerStyles}>
        {socials.map((social, index) => (
            <Link key={index} href={social.link} className={iconStyles} target="_blank">
                {social.icon}
            </Link>
        ))}
    </div>
};

export default Social;