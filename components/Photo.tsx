"use client";
import {motion} from "framer-motion";
import Image from "next/image";

const Photo = () => {
    return <div className="w-full h-full flex items-center justify-center relative">
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{
                duration: 0.4, delay: 2, ease: "easeIn"
            }}
            className="relative"
        >
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{
                    duration: 0.4, delay: 2.4, ease: "easeInOut"
                }}
                className="w-[290px] h-[290px] xl:w-[490px] xl:h-[490px] rounded-full overflow-hidden flex items-center justify-center"
            >
                <Image src="/assets/profile.png" alt="profile picture" priority quality={100} width={500} height={500}
                       className="object-cover object-center"/>
            </motion.div>

            <motion.svg
                className="w-[300px] xl:w-[506px] h-[300px] xl:h-[506px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                fill="transparent"
                viewBox="0 0 506 506"
                xmlns="http://www.w3.org/2000/svg"
            >
                <motion.circle
                    cx="253"
                    cy="253"
                    r="250"
                    stroke="#00ff99"
                    strokeWidth="4"
                    strokeLinejoin="round"
                    initial={{strokeDasharray: "24 10 0 0"}}
                    animate={{
                        strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"],
                        rotate: [120, 360]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                />
            </motion.svg>
        </motion.div>
    </div>
};

export default Photo;