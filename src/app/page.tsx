import Nav from "@/components/landing/nav";
import Hero from "@/components/landing/hero";
import HowItWorks from "@/components/landing/how-it-works";
import WhyLearnault from "@/components/landing/why-learnault";
import LearningPaths from "@/components/landing/learning-paths";
import Testimonial from "@/components/landing/testimonial";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/footer";
import ValueProposition from "@/components/landing/value-preposition";
import QuestPaths from "@/components/landing/quest-paths";

const Home = () => {
  return (
    <main>
      <Nav />
      <Hero />
      <HowItWorks />
      <QuestPaths />
      <WhyLearnault />
      <LearningPaths />
      <Testimonial />
      <FAQ />
      <ValueProposition/>
      <Footer/>
    </main>
  );
};

export default Home;