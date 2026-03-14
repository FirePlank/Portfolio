"use client";
import CountUp from "react-countup";
import { useEffect, useMemo, useState } from "react";

import { getStats } from "@/app/actions";
import { useTranslation } from "react-i18next";

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

type RawStats = {
  projectsCreated: number;
  totalCommits: number;
  starsReceived: number;
};

const Stats = () => {
  const [rawStats, setRawStats] = useState<RawStats | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    getStats().then((stats) => {
      if (stats) {
        setRawStats(stats);
      }
    });
  }, []);

  const stats = useMemo(
    () =>
      rawStats
        ? [
            {
              num: getExactYears(new Date("2020-03-01"), new Date()),
              text: t("stats.yearsExperience"),
              approx: false,
            },
            {
              num: rawStats.projectsCreated,
              text: t("stats.projectsCompleted"),
              approx: false,
            },
            {
              num: rawStats.totalCommits,
              text: t("stats.codeCommits"),
              approx: true,
            },
            {
              num: rawStats.starsReceived,
              text: t("stats.starsReceived"),
              approx: false,
            },
          ]
        : [],
    [rawStats, t]
  );

  return (
    <section className="pt-4 pb-12 xl:pt-0 xl:pb-0">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 xl:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 md:grid-cols-4 md:gap-x-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="min-w-0 w-full rounded-xl px-2 py-3 flex flex-col items-center justify-center text-center gap-2 xl:flex-row xl:items-center xl:justify-center xl:text-left xl:gap-4"
            >
              <CountUp
                end={stat.num}
                duration={3.5}
                delay={0.2}
                suffix={stat.approx ? "+" : ""}
                className="text-3xl sm:text-4xl xl:text-6xl font-extrabold shrink-0 leading-none"
              />
              <p className="text-xs sm:text-sm xl:text-base leading-snug text-white/80 max-w-[12ch] xl:max-w-[150px] text-balance xl:text-left">
                {stat.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
