import Image from "next/image";
import { Syne } from "next/font/google";

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
});

type Reason = {
  title: string;
  description: string;
  icon: string;
};

const reasons: Reason[] = [
  {
    title: "Earn While Learning",
    description:
      "Complete courses and earn LEARN tokens that have real value on the Stellar blockchain.",
    icon: "/assets/why-learnault/earn.svg",
  },
  {
    title: "On-chain Credentials",
    description:
      "Receive verifiable certificates that employers can instantly validate.",
    icon: "/assets/why-learnault/protection.svg",
  },
  {
    title: "Global Community",
    description:
      "Connect with learners and employers from Africa, Latin America, and Southeast Asia.",
    icon: "/assets/why-learnault/community.svg",
  },
  {
    title: "Secure Wallets",
    description:
      "Your earnings are safely stored in Stellar wallets that you control.",
    icon: "/assets/why-learnault/digital-wallet.svg",
  },
  {
    title: "Quick Payouts",
    description:
      "Withdraw your earnings anytime with fast, low-fee blockchain transactions.",
    icon: "/assets/why-learnault/payouts.svg",
  },
  {
    title: "No Borders",
    description:
      "Access opportunities regardless of your location or financial background.",
    icon: "/assets/why-learnault/global.svg",
  },
];

const WhyLearnault = () => {
  return (
    <section id="why-learnault" className="bg-[#F8F9FB] px-4 py-20 sm:px-6 lg:px-8 lg:py-35.5">
    <section className="bg-secondary-background px-4 py-20 sm:px-6 lg:px-8 lg:py-35.5">
      <div className="mx-auto max-w-260">
        <div className="mx-auto max-w-170 text-center">
          <h2
            className={`${syne.className} text-[25px] font-bold tracking-normal text-text-primary sm:text-5xl lg:text-[54px] leading-[1.12]`}
          >
            The Future of Learning
          </h2>
          <p className="mx-auto mt-5 max-w-160 text-base leading-tight text-text-secondary sm:text-lg sm:leading-[1.35]">
            Unlock your potential with cutting-edge courses, earn valuable
            rewards, and gain access to exclusive opportunities that will shape
            your future.
          </p>
        </div>

        <div className="mt-22 divide-y divide-border lg:mt-22 lg:grid lg:grid-cols-3 lg:divide-y-0">
          {reasons.map((reason, index) => (
            <article
              key={reason.title}
              className={`flex flex-col py-8 last:pb-0 sm:px-6 lg:min-h-65 lg:px-7 lg:py-7 ${
                index % 3 === 1 ? "lg:border-x lg:border-secondary-border" : ""
              }`}
            >
              <div className="flex h-9 w-12 items-start lg:h-11">
                <Image
                  src={reason.icon}
                  alt=""
                  width={40}
                  height={40}
                  aria-hidden="true"
                  className="h-9 w-9 object-contain"
                />
              </div>

              <h3 className="mt-11 min-h-6 text-xl leading-[1.2] font-bold text-text-primary lg:mt-[66px] lg:min-h-8 lg:text-[26px]">
                {reason.title}
              </h3>
              <p className="mt-5 max-w-82.5 font-normal text-base leading-tight text-text-muted sm:text-base lg:mt-7 lg:text-[18px] lg:leading-tight">
                {reason.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyLearnault;

