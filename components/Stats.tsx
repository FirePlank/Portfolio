"use client";
import CountUp from "react-countup";
import {useEffect, useState} from "react";
import {getStats} from "@/app/actions";

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

const Stats = () => {
    const [stats, setStats] = useState<{ num: number, text: string, approx: boolean }[]>([]);

    useEffect(() => {
        getStats().then((stats) => {
            if (stats) {
                setStats([
                    {
                        num: getExactYears(new Date('2020-03-01'), new Date()),
                        text: 'Years of experience',
                        approx: false
                    },
                    {
                        num: stats.projectsCreated,
                        text: 'Projects created',
                        approx: false
                    },
                    {
                        num: stats.totalCommits,
                        text: 'Commits made',
                        approx: true
                    },
                    {
                        num: stats.starsReceived,
                        text: 'Stars received',
                        approx: false
                    }
                ]);
            }
        });
    }, []);

    return <section className="pt-4 pb-12 xl:pt-0 xl:pb-0">
        <div className="container mx-auto">
            <div className="flex flex-wrap gap-6 max-w-[80vw] mx-auto xl:maw-w-none">
                {stats.map((stat, index) => (
                    <div key={index} className="flex-1 flex gap-4 items-center justify-center xl:justify-start">
                        <CountUp end={stat.num} duration={3.5} delay={0.2} suffix={stat.approx ? '+' : ''}
                                 className="text-4xl xl:text-6xl font-extrabold"/>
                        <p className={`${stat.text.length < 15 ? "max-w-[100px]" : "max-w-[150px]"} leading-snug text-white/80`}>
                            {stat.text}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    </section>
};

export default Stats;