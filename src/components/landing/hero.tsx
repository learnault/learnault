import { heroBg, heroPeople, people } from "../../../public/assets";

import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { Syne } from "next/font/google";

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
});

const Hero = () => {
  const titleClassName = `${syne.className} max-w-[450px] text-2xl leading-[1.02] font-bold text-text-primary sm:text-6xl`;

  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden bg-secondary-background"
      style={{
        backgroundImage: `url(${heroBg.src}), url("/assets/hero-bg.svg")`,
        backgroundRepeat: "no-repeat, repeat",
        backgroundSize: "cover, 980px auto",
        backgroundPosition: "center, bottom center",
      }}
    >
      <div className="relative mx-auto grid w-full max-w-[1180px] items-center gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-[minmax(0,520px)_minmax(0,524px)] lg:justify-center lg:gap-12 lg:px-10 lg:py-12">
        <div className="order-2 max-w-xl space-y-5 lg:order-1 lg:justify-self-center lg:space-y-7">
          <h1 className={titleClassName}>Build Your Skills & Earn.</h1>

          <p className="max-w-md text-sm text-text-secondary sm:text-lg sm:leading-7">
            Join the first decentralized learning protocol in the Stellar
            Ecosystem. Enhance your skills while earning XLM and obtaining
            verifiable credentials that will position you favorably with hiring
            managers.
          </p>

          <div className="grid grid-cols-2 items-center gap-3 sm:mt-14 sm:flex sm:flex-wrap sm:gap-4">
            <Button
              type="button"
              className="rounded-full bg-primary px-4 py-3 text-sm font-bold text-text-primary transition hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:px-8"
            >
              Start Learning
            </Button>
            <Button
              type="button"
              className="rounded-full border border-border bg-secondary-background px-4 py-3 text-sm font-bold text-text-primary transition hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:px-8"
            >
              Explore Quests
            </Button>
          </div>

          <div className="flex items-center justify-center gap-3 sm:justify-start">
            <Image
              src={people}
              alt="Learners joined"
              width={45}
              height={24}
              className="h-6 w-auto"
            />
            <p className="text-sm font-medium text-text-primary">
              1k+ Learners already joined
            </p>
          </div>
        </div>

        <div className="order-1 mx-auto w-full max-w-[360px] lg:order-2 lg:max-w-[524px] lg:justify-self-center">
          <Image
            src={heroPeople}
            alt="Learners on Learnault"
            width={524}
            height={619}
            priority
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
