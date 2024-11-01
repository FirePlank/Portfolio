"use client";
import {
    FaHtml5,
    FaCss3,
    FaBriefcase,
    FaGraduationCap,
    FaTools,
    FaReact,
    FaJs,
    FaRust,
    FaPython
} from "react-icons/fa";
import {SiTailwindcss, SiNextdotjs} from "react-icons/si";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {ScrollArea} from "@/components/ui/scroll-area";
import {motion} from "framer-motion";

const getExactYears = (startDate: Date, endDate: Date) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
        months -= 1;
        days += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
    }

    if (months < 0) {
        years -= 1;
        months += 12;
    }

    return Math.round(years + months / 12 + days / 365);
};

const about = {
    title: 'About Me',
    description: 'I am a software developer with a passion for learning and building new things. My expertise spans multiple technologies and frameworks, allowing me to adapt and excel in various projects.',
    info: [
        {
            fieldName: 'Name',
            fieldValue: 'Jesse Sissala'
        },
        {
            fieldName: 'Phone',
            fieldValue: '(+358) 45 804 1445'
        },
        {
            fieldName: 'Email',
            fieldValue: 'contact@jessesissala.com'
        },
        {
            fieldName: 'Experience',
            fieldValue: `${getExactYears(new Date('2020-03-01'), new Date())} years`
        },
        {
            fieldName: 'Location',
            fieldValue: 'Finland'
        },
        {
            fieldName: 'Languages',
            fieldValue: 'English, Finnish, Swedish'
        }
    ]
}

const experience = {
    icon: <FaBriefcase/>,
    title: 'Experience',
    description: 'I have experience working in diverse environments and collaborating effectively within teams.',
    items: [
        {
            company: 'Fiverr',
            role: 'Freelancer',
            duration: '2020 - 2021',
        },
        {
            company: 'Mobile App Development',
            role: 'Entrepreneur',
            duration: '2024 - Present',
        },
        {
            company: 'Open Source',
            role: 'Contributor',
            duration: '2020 - Present',
        },
    ]
}

const education = {
    icon: <FaGraduationCap/>,
    title: 'Education',
    description: 'I have studied at several institutions and have taken courses on various topics.',
    items: [
        {
            institution: 'Tampere University of Applied Sciences',
            degree: 'Information Technology',
            duration: '2024 - 2028',
        },
        {
            institution: 'Nokia High School',
            degree: 'High School Diploma',
            duration: '2021 - 2024',
        },
        {
            institution: 'Udemy',
            degree: 'Programming Courses',
            duration: '2020',
        }
    ]
}

const skills = {
    icon: <FaTools/>,
    title: 'Skills',
    description: 'I have experience with various technologies and frameworks, which have enabled me to tackle a wide range of projects efficiently. My adaptability and continuous learning mindset ensure that I stay updated with the latest industry trends.',
    items: [
        {
            icon: <FaHtml5/>,
            name: 'HTML',
        },
        {
            icon: <FaCss3/>,
            name: 'CSS',
        },
        {
            icon: <SiTailwindcss/>,
            name: 'Tailwind CSS',
        },
        {
            icon: <FaReact/>,
            name: 'React',
        },
        {
            icon: <SiNextdotjs/>,
            name: 'Next.js',
        },
        {
            icon: <FaJs/>,
            name: 'JavaScript',
        },
        {
            icon: <FaPython/>,
            name: 'Python',
        },
        {
            icon: <FaRust/>,
            name: 'Rust',
        },
    ]
}

const Resume = () => {
    return <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1, transition: {duration: 0.25, delay: 0.4, ease: "easeIn"}}}
        className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
    >
        <div className="container mx-auto">
            <Tabs defaultValue="about" className="flex flex-col xl:flex-row gap-[60px]">
                <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-4">
                    <TabsTrigger value="about">About Me</TabsTrigger>
                    <TabsTrigger value="experience">Experience</TabsTrigger>
                    <TabsTrigger value="education">Education</TabsTrigger>
                    <TabsTrigger value="skills">Skills</TabsTrigger>
                </TabsList>

                {/* Content */}
                <div className="min-h-[70vh] w-full xl:w-auto">
                    { /* About Me */}
                    <TabsContent value="about" className="w-full">
                        <h2 className="h2">{about.title}</h2>
                        <p className="text-white/80 mb-8 mt-4">{about.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {about.info.map((info, index) => (
                                <div key={index} className="flex gap-4">
                                    <span className="text-accent">{info.fieldName}:</span>
                                    <span>{info.fieldValue}</span>
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                    { /* Experience */}
                    <TabsContent value="experience" className="w-full">
                        <div className="flex flex-col">
                            <h2 className="h2">{experience.title}</h2>
                            <p className="text-white/80 mb-8 mt-4">{experience.description}</p>
                            <ScrollArea className="h-[400px] text-center">
                                <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                                    {experience.items.map((item, index) => (
                                        <li key={index}
                                            className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col items-center justify-center lg:items-start gap-1">
                                            <span className="text-accent">
                                                {item.duration}
                                            </span>
                                            <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">
                                                {item.role}
                                            </h3>
                                            <div className="flex items-center gap-3">
                                                <span className="w-[6px] h-[6px] bg-accent rounded-full"/>
                                                <p className="text-white/80">
                                                    {item.company}
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </ScrollArea>
                        </div>
                    </TabsContent>

                    { /* Education */}
                    <TabsContent value="education" className="w-full">
                        <div className="flex flex-col">
                            <h2 className="h2">{education.title}</h2>
                            <p className="text-white/80 mb-8 mt-4">{education.description}</p>
                            <ScrollArea className="h-[400px] text-center">
                                <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                                    {education.items.map((item, index) => (
                                        <li key={index}
                                            className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col items-center justify-center lg:items-start gap-1">
                                            <span className="text-accent">
                                                {item.duration}
                                            </span>
                                            <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">
                                                {item.degree}
                                            </h3>
                                            <div className="flex items-center gap-3">
                                                <span className="w-[6px] h-[6px] bg-accent rounded-full"/>
                                                <p className="text-white/80">
                                                    {item.institution}
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </ScrollArea>
                        </div>
                    </TabsContent>

                    { /* Skills */}
                    <TabsContent value="skills" className="w-full h-full">
                        <div className="flex flex-col">
                            <div>
                                <h2 className="h2">{skills.title}</h2>
                                <p className="text-white/80 mb-8 mt-4">{skills.description}</p>
                            </div>
                            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 xl:gap-[30px]">
                                {skills.items.map((skill, index) => (
                                    <li key={index}>
                                        <TooltipProvider delayDuration={100}>
                                            <Tooltip>
                                                <TooltipTrigger
                                                    className="w-full h-[150px] bg-[#232329] rounded-xl flex justify-center items-center group">
                                                    <div
                                                        className="text-6xl group-hover:text-accent transition-all duration-300">
                                                        {skill.icon}
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p className="capitalize">
                                                        {skill.name}
                                                    </p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    </motion.div>
};

export default Resume;