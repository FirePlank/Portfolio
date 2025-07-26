"use client";

import {motion} from "framer-motion";
import React, {useState, useEffect} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import {BsArrowUpRight, BsGithub} from "react-icons/bs";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import Link from "next/link";
import Image from "next/image";
import WorkSliderBtns from "@/components/WorkSliderBtns";
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';

interface ProjectItem {
    title: string;
    description: string;
    stack: string[];
}

interface Project extends Omit<ProjectItem, 'stack'> {
    num: string;
    image: string;
    live?: string;
    github: string;
    stack: { name: string }[];
}

// Project data is now loaded from translations
const getProjects = (t: TFunction): Project[] => {
    const items = t('projects.items', { returnObjects: true }) as ProjectItem[];
    
    // Static data that doesn't need translation
    const staticData = [
        {
            num: '01',
            image: '/assets/projects/fitsmrt.webp',
            live: 'https://fitsmrt.com',
            github: 'https://github.com/fitsmrt'
        },
        {
            num: '02',
            image: '/assets/projects/cresliant-demo.mp4',
            live: 'https://cresliant.github.io',
            github: 'https://github.com/Cresliant/Cresliant'
        },
        {
            num: '03',
            image: '/assets/projects/shortlang.webp',
            github: 'https://github.com/ShortLang/ShortLang'
        },
        {
            num: '04',
            image: '/assets/projects/chess.webp',
            github: 'https://github.com/FirePlank/HydroChess'
        }
    ];

    // Merge translated content with static data
    return items.map((item, index) => ({
        ...staticData[index],
        title: item.title,
        description: item.description,
        stack: item.stack.map(tech => ({ name: tech }))
    }));
};

const Projects = () => {
    const { t } = useTranslation();
    const [projectIndex, setProjectIndex] = useState(0);
    
    // Get projects data from translations
    const projects = getProjects(t);
    const [imageDimensions, setImageDimensions] = useState(projects.map(() => ({width: 0, height: 0})));

    useEffect(() => {
        const loadImageDimensions = async () => {
            const dimensions = await Promise.all(projects.map(project => {
                return new Promise<{ width: number; height: number }>((resolve) => {
                    if (project.image.endsWith('.mp4')) {
                        resolve({width: 100, height: 100});
                    } else {
                        const img = new window.Image();
                        img.src = project.image;
                        img.onload = () => {
                            resolve({width: img.width, height: img.height});
                        };
                        img.onerror = () => {
                            resolve({width: 100, height: 100});
                        };
                    }
                });
            }));
            setImageDimensions(dimensions);
        };

        loadImageDimensions();
    }, [projects]);

    return (
        <motion.section
            initial={{opacity: 0}}
            animate={{opacity: 1, transition: {duration: 0.25, delay: 0.4, ease: "easeIn"}}}
            className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0"
        >
            <div className="container mx-auto">
                <div className="flex flex-col xl:flex-row xl:gap-[30px]">
                    <div
                        className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none">
                        <div className="flex flex-col gap-[30px] h-[50%]">
                            <div className="text-8xl leading-none font-extrabold text-transparent"
                                 style={{WebkitTextStroke: '1px white'}}>
                                {projects[projectIndex].num}
                            </div>
                            <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize">
                                {projects[projectIndex].title}
                            </h2>
                            <p className="text-white/60">
                                {projects[projectIndex].description}
                            </p>
                            <ul className="flex gap-4">
                                {projects[projectIndex].stack.map((tech, index) => (
                                    <li key={index} className="text-xl text-accent">
                                        {tech.name}
                                        {index !== projects[projectIndex].stack.length - 1 &&
                                            <span className="text-white/60">,</span>}
                                    </li>
                                ))}
                            </ul>
                            <div className="border border-white/20"/>
                            <div className="flex items-center gap-4">
                                {projects[projectIndex].live && (
                                    <Link href={projects[projectIndex].live} target="_blank">
                                        <TooltipProvider delayDuration={100}>
                                            <Tooltip>
                                                <TooltipTrigger
                                                    className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                                                    <BsArrowUpRight
                                                        className="text-white text-3xl group-hover:text-accent"/>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>{t('projects.visitWebsite')}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </Link>
                                )}
                                <Link href={projects[projectIndex].github} target="_blank">
                                    <TooltipProvider delayDuration={100}>
                                        <Tooltip>
                                            <TooltipTrigger
                                                className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                                                <BsGithub className="text-white text-3xl group-hover:text-accent"/>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{t('projects.viewSource')}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="w-full xl:w-[50%] flex justify-center items-center relative">
                        <Swiper
                            spaceBetween={30}
                            slidesPerView={1}
                            className="xl:h-[520px] mb-12 flex justify-center items-center"
                            onSlideChange={(swiper) => setProjectIndex(swiper.activeIndex)}
                        >
                            {projects.map((project, index) => (
                                <SwiperSlide key={index} className="w-full flex justify-center items-center">
                                    <div className="relative w-full h-full flex justify-center items-center">
                                        {project.image.endsWith('.mp4') ? (
                                            <video
                                                src={project.image}
                                                autoPlay
                                                loop
                                                muted
                                                className="object-center object-contain w-full h-full"
                                            />
                                        ) : (
                                            <div className="flex justify-center items-center w-full h-full">
                                                <div style={{
                                                    width: imageDimensions[index].width,
                                                    height: imageDimensions[index].height,
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                                    <Image
                                                        src={project.image}
                                                        alt={project.title}
                                                        layout="intrinsic"
                                                        width={imageDimensions[index].width}
                                                        height={imageDimensions[index].height}
                                                        objectFit="contain"
                                                        className="object-center object-contain"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </SwiperSlide>
                            ))}
                            <WorkSliderBtns
                                containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
                                btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all"
                            />
                        </Swiper>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default Projects;