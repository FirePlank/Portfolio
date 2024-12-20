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

const projects = [
    {
        num: '01',
        title: 'Fitsmrt',
        description: 'An AI fitness trainer and planner mobile app that creates personalized workout routines, helps track progress and gives nutrition advice.',
        stack: [{name: 'React Native'}, {name: 'Supabase'}, {name: 'Node.js'}],
        image: '/assets/projects/fitsmrt.webp',
        live: 'https://fitsmrt.com',
        github: 'https://github.com/fitsmrt'
    },
    {
        num: '02',
        title: 'Cresliant',
        description: 'A powerful node-based image editor made in Python, offering intuitive image manipulation and enhancement through a user-friendly interface.',
        stack: [{name: 'Python'}, {name: 'Dear PyGui'}, {name: 'Pillow'}],
        image: '/assets/projects/cresliant-demo.mp4',
        live: 'https://cresliant.github.io',
        github: 'https://github.com/Cresliant/Cresliant'
    },
    {
        num: '03',
        title: 'Shortlang',
        description: 'A programming language designed for code golfing and competitive programming.',
        stack: [{name: 'Rust'}, {name: 'Interpreter'}, {name: 'Compiler'}],
        image: '/assets/projects/shortlang.webp',
        github: 'https://github.com/ShortLang/ShortLang'
    },
    {
        num: '04',
        title: 'Hydrochess',
        description: 'A chess engine written in Rust, with a focus on speed and efficiency. It has a rating of 2000+ on Lichess.',
        stack: [{name: 'Rust'}, {name: 'Data Structures'}, {name: 'Algorithms'}],
        image: '/assets/projects/chess.webp',
        github: 'https://github.com/FirePlank/HydroChess'
    }
];

const Projects = () => {
    const [projectIndex, setProjectIndex] = useState(0);
    const [imageDimensions, setImageDimensions] = useState(projects.map(() => ({width: 0, height: 0})));

    useEffect(() => {
        const loadImageDimensions = async () => {
            const dimensions = await Promise.all(projects.map(project => {
                return new Promise<{ width: number; height: number }>(resolve => {
                    if (project.image.endsWith('.mp4')) {
                        resolve({width: 100, height: 100});
                    } else {
                        const img = new window.Image();
                        img.src = project.image;
                        img.onload = () => {
                            resolve({width: img.width, height: img.height});
                        };
                    }
                });
            }));
            setImageDimensions(dimensions);
        };

        loadImageDimensions();
    }, []);

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
                                                    <p>Visit website</p>
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
                                                <p>View source</p>
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