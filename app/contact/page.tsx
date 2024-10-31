"use client";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {FaPhoneAlt, FaEnvelope, FaDiscord} from "react-icons/fa";
import {motion} from "framer-motion";


const info = [
    {
        icon: <FaPhoneAlt/>,
        label: 'Phone',
        value: '(+358) 45 804 1445'
    },
    {
        icon: <FaEnvelope/>,
        label: 'Email',
        value: 'contact@fireplank.xyz'
    },
    {
        icon: <FaDiscord/>,
        label: 'Discord',
        value: '@fireplank'
    }
]

const Contact = () => {
    return <motion.section
        initial={{opacity: 0}}
        animate={{opacity: 1, transition: {duration: 0.25, delay: 0.4, ease: "easeIn"}}}
        className="min-h-[80vh] flex flex-col justify-center py-12 xl:px-0"
    >
        <div className="container mx-auto">
            <div className="flex flex-col xl:flex-row gap-[30px]">
                {/* Contact form */}
                <div className="xl:w-[54%] order-2 xl:order-none">
                    <form className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl">
                        <h3 className="text-4xl text-accent">
                            Contact me
                        </h3>
                        <p className="text-white/60">
                            I&#39;m always open to new opportunities, collaborations, and projects. Feel free to reach
                            out to me.
                        </p>
                        {/* Contact form fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input type="firstname" placeholder="Name"/>
                            <Input type="email" placeholder="Email"/>
                        </div>
                        {/* Textarea */}
                        <Textarea placeholder="Message" className="h-[200px]"/>
                        {/* Submit button */}
                        <Button size="md" className="max-w-40">
                            Send message
                        </Button>
                    </form>
                </div>
                {/* Contact info */}
                <div className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0">
                    <ul className="flex flex-col gap-10">
                        {info.map((item, index) => (
                            <li key={index} className="flex items-center gap-6">
                                <div
                                    className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c] text-accent rounded-md flex items-center justify-center">
                                    <div className="text-[28px]">
                                        {item.icon}
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-white/60">
                                        {item.label}
                                    </p>
                                    <p className="text-xl">
                                        {item.value}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </motion.section>
};

export default Contact;