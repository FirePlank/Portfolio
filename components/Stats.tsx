"use client";
import CountUp from "react-countup";
import {useEffect, useState} from "react";
import {getStats} from "@/app/actions";
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

const Stats = () => {
    const [stats, setStats] = useState<{ num: number, text: string, approx: boolean }[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        getStats().then((stats) => {
            if (stats) {
                setStats([
                    {
                        num: getExactYears(new Date('2020-03-01'), new Date()),
                        text: t('stats.yearsExperience'),
                        approx: false
                    },
                    {
                        num: stats.projectsCreated,
                        text: t('stats.projectsCompleted'),
                        approx: false
                    },
                    {
                        num: stats.totalCommits,
                        text: t('stats.codeCommits'),
                        approx: true
                    },
                    {
                        num: stats.starsReceived,
                        text: t('stats.starsReceived'),
                        approx: false
                    }
                ]);
            }
        });
    }, [t]);

    return <section className="pt-4 pb-12 xl:pt-0 xl:pb-0">
        <div className="container mx-auto">
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 max-w-[90vw] mx-auto xl:max-w-none md:grid-cols-4 md:gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="flex gap-2 xs:gap-3 md:gap-4 items-center justify-center xl:justify-start">
                        <CountUp end={stat.num} duration={3.5} delay={0.2} suffix={stat.approx ? '+' : ''}
                                 className="text-3xl sm:text-4xl xl:text-6xl font-extrabold shrink-0"/>
                        <p className="text-sm xs:text-base leading-tight md:leading-snug text-white/80 break-words max-w-[calc(100%-60px)] sm:max-w-[calc(100%-80px)] xl:max-w-[150px]">
                            {stat.text}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    </section>
};

export default Stats;