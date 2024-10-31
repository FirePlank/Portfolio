import React from 'react';
import {motion} from 'framer-motion';

const stairAnimation = {
    initial: {
        top: "0%"
    },
    animate: {
        top: "100%",
        // transition: {
        //     duration: 0.5,
        //     ease: "easeInOut"
        // }
    },
    exit: {
        top: ["100%", "0%"],
    }
}

const totalSteps = 6;
const reverseIndex = (index: number) => {
    return totalSteps - index;
}

const Stairs = () => {
    return <>
        { /* Render 6 motion divs, each representing a stair */}
        {[...Array(totalSteps)].map((_, index) => {
            return <motion.div
                key={index}
                custom={reverseIndex(index)}
                variants={stairAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                    delay: 0.05 * reverseIndex(index)
                }}
                className="h-full w-full bg-white relative"
            />
        })}
    </>
};

export default Stairs;