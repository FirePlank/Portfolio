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
import { useTranslation } from 'react-i18next';

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

const getAboutData = (t: any) => ({
    title: t('resume.aboutMe'),
    description: t('resume.aboutDescription'),
    info: [
        {
            fieldName: t('resume.name'),
            fieldValue: 'Jesse Sissala'
        },
        {
            fieldName: t('resume.phone'),
            fieldValue: '(+358) 45 804 1445'
        },
        {
            fieldName: t('resume.email'),
            fieldValue: 'jesse.sissala@gmail.com'
        },
        {
            fieldName: t('resume.experienceField'),
            fieldValue: `${getExactYears(new Date('2020-03-01'), new Date())} ${t('resume.years')}`
        },
        {
            fieldName: t('resume.location'),
            fieldValue: t('resume.locationValue')
        },
        {
            fieldName: t('resume.languages'),
            fieldValue: t('resume.languagesValue')
        }
    ]
});

const getExperienceData = (t: any) => ({
    icon: <FaBriefcase/>,
    title: t('resume.experience'),
    description: t('resume.experienceDescription'),
    items: [
        {
            company: 'Fiverr',
            role: t('resume.freelancer'),
            duration: '2020 - 2021',
        },
        {
            company: t('resume.mobileAppDevelopment'),
            role: t('resume.entrepreneur'),
            duration: '2024 - Present',
        },
        {
            company: t('resume.openSource'),
            role: t('resume.contributor'),
            duration: '2020 - Present',
        },
    ]
});

const getEducationData = (t: any) => ({
    icon: <FaGraduationCap/>,
    title: t('resume.education'),
    description: t('resume.educationDescription'),
    items: [
        {
            institution: t('resume.tampereUniversity'),
            degree: t('resume.informationTechnology'),
            duration: '2024 - 2028',
        },
        {
            institution: t('resume.nokiaHighSchool'),
            degree: t('resume.highSchoolDiploma'),
            duration: '2021 - 2024',
        },
        {
            institution: t('resume.udemy'),
            degree: t('resume.programmingCourses'),
            duration: '2020',
        }
    ]
});

const getSkillsData = (t: any) => ({
    icon: <FaTools/>,
    title: t('resume.skills'),
    description: t('resume.skillsDescription'),
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
});

const Resume = () => {
    const { t } = useTranslation();
    const about = getAboutData(t);
    const experience = getExperienceData(t);
    const education = getEducationData(t);
    const skills = getSkillsData(t);
    
    return <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1, transition: {duration: 0.25, delay: 0.4, ease: "easeIn"}}}
        className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
    >
        <div className="container mx-auto">
            <Tabs defaultValue="about" className="flex flex-col xl:flex-row gap-[60px]">
                <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-4">
                    <TabsTrigger value="about">{t('resume.aboutMe')}</TabsTrigger>
                    <TabsTrigger value="experience">{t('resume.experience')}</TabsTrigger>
                    <TabsTrigger value="education">{t('resume.education')}</TabsTrigger>
                    <TabsTrigger value="skills">{t('resume.skills')}</TabsTrigger>
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