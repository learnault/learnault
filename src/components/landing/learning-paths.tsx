"use client";

import type { StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  articleIcon,
  chevronRightIcon,
  clockIcon,
  playIcon,
  sproutIcon,
} from "../../../public/assets";

const learningPathIcons: Record<
  "clock" | "sprout" | "play" | "article" | "chevronRight",
  StaticImageData
> = {
  clock: clockIcon,
  sprout: sproutIcon,
  play: playIcon,
  article: articleIcon,
  chevronRight: chevronRightIcon,
};

type PathIconName = keyof typeof learningPathIcons;

const pathIconSizes: Record<PathIconName, { width: number; height: number }> = {
  clock: { width: 20, height: 20 },
  sprout: { width: 16, height: 16 },
  play: { width: 16, height: 16 },
  article: { width: 16, height: 16 },
  chevronRight: { width: 20, height: 20 },
};

const PathIcon = ({
  name,
  className,
}: {
  name: PathIconName;
  className?: string;
}) => {
  const size = pathIconSizes[name];

  return (
    <Image
      src={learningPathIcons[name]}
      alt=""
      width={size.width}
      height={size.height}
      className={className}
      aria-hidden="true"
    />
  );
};

type TierStatus = "available" | "locked";

type LearningTier = {
  tier: string;
  title: string;
  reward: string;
  duration: string;
  level: string;
  description: string;
  videos: number;
  articles: number;
  unlockHint?: string;
  ctaLabel: string;
  status: TierStatus;
};

const tiers: LearningTier[] = [
  {
    tier: "Tier 1",
    title: "Stellar Basics",
    reward: "80 XLM",
    duration: "4 hours",
    level: "Beginner",
    description:
      "Master wallets, transactions, and the Stellar Consensus Protocol — the foundation for everything on the network.",
    videos: 12,
    articles: 5,
    unlockHint: "Unlocks 5 Quests and Access to Tier 2",
    ctaLabel: "Start Tier 1",
    status: "available",
  },
  {
    tier: "Tier 2",
    title: "Stellar Integration",
    reward: "120 XLM",
    duration: "3 hours",
    level: "Intermediate",
    description:
      "Connect to Horizon, use the Stellar SDK, and build your first Soroban smart contract integrations.",
    videos: 10,
    articles: 4,
    ctaLabel: "Complete Tier 1",
    status: "locked",
  },
  {
    tier: "Tier 3",
    title: "Scale node to L2",
    reward: "540 XLM",
    duration: "7 hours",
    level: "Advanced",
    description:
      "Deploy production-grade infrastructure and bridge Stellar assets to L2 networks at scale.",
    videos: 18,
    articles: 8,
    ctaLabel: "Complete Tier 2",
    status: "locked",
  },
];

const TierBadge = ({ label }: { label: string }) => (
  <span className="inline-flex rounded-full border border-primary/70 bg-primary/10 px-3 py-1 text-xs font-semibold text-text-secondary">
    {label}
  </span>
);

const LearningPaths = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollNext = () => {
    scrollRef.current?.scrollBy({ left: 340, behavior: "smooth" });
  };

  return (
    <section className="bg-surface px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1180px]">
        <header className="max-w-2xl">
          <TierBadge label="Stellar Learning Path" />
          <h2 className="mt-5 text-[28px] font-bold leading-[1.12] text-text-primary sm:text-[42px] lg:text-[48px]">
            Master Stellar. Earn as you progress.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
            A structured, tier-based course that takes you from beginner to
            building real applications on the Stellar blockchain — with rewards
            and quests unlocked at every stage.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/catalog"
              className="inline-flex items-center justify-center rounded-full bg-[#F4B42A] px-5 py-3 text-sm font-bold text-[#1A1A1A] transition hover:bg-[#e6a81f]"
            >
              Browse the catalog
            </Link>
          </div>
        </header>

        <div className="relative mt-12 lg:mt-14">
          <div
            ref={scrollRef}
            className="flex snap-x snap-mandatory gap-0 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] lg:overflow-visible [&::-webkit-scrollbar]:hidden"
          >
            {tiers.map((tier, index) => {
              const cardClasses =
                index > 0
                  ? "border-border max-lg:mt-8 max-lg:border-t max-lg:pt-8 lg:mt-0 lg:border-l lg:border-t-0 lg:pt-2"
                  : "";
              const buttonClasses =
                tier.status === "available"
                  ? "bg-primary text-text-primary hover:bg-primary/90"
                  : "cursor-not-allowed bg-border text-text-secondary";

              return (
                <article
                  key={tier.tier}
                  className={`flex min-w-[min(100%,300px)] shrink-0 snap-start flex-col px-5 py-2 sm:min-w-[320px] sm:px-6 lg:min-w-0 lg:flex-1 lg:px-8 ${cardClasses}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <TierBadge label={tier.tier} />
                    <p className="text-right text-sm font-bold text-text-primary sm:text-base">
                      {tier.reward}
                    </p>
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-text-primary sm:text-2xl">
                    {tier.title}
                  </h3>

                  <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-text-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <PathIcon name="clock" className="h-5 w-5 shrink-0" />
                      {tier.duration}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <PathIcon name="sprout" className="h-4 w-4 shrink-0" />
                      {tier.level}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-text-muted sm:text-base">
                    {tier.description}
                  </p>

                  <div className="mt-5 rounded-xl bg-secondary-background px-4 py-3.5">
                    <ul className="space-y-2.5 text-sm text-text-secondary">
                      <li className="flex items-center gap-2">
                        <PathIcon name="play" className="h-4 w-4 shrink-0" />
                        {tier.videos} Video lessons
                      </li>
                      <li className="flex items-center gap-2">
                        <PathIcon name="article" className="h-4 w-4 shrink-0" />
                        {tier.articles} Articles
                      </li>
                    </ul>
                  </div>

                  <div className="mt-auto pt-6">
                    {tier.unlockHint ? (
                      <p className="mb-3 text-xs text-text-muted sm:text-sm">
                        {tier.unlockHint}
                      </p>
                    ) : null}

                    <button
                      type="button"
                      disabled={tier.status === "locked"}
                      aria-disabled={tier.status === "locked"}
                      className={`w-full rounded-full px-4 py-3 text-sm font-bold transition sm:py-3.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${buttonClasses}`}
                    >
                      {tier.ctaLabel}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          <button
            type="button"
            onClick={scrollNext}
            aria-label="View next learning tier"
            className="absolute right-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-border bg-surface text-text-primary shadow-[0_4px_14px_rgba(15,23,42,0.08)] transition hover:bg-secondary-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:flex"
          >
            <PathIcon name="chevronRight" className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default LearningPaths;

