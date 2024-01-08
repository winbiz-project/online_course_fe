import CardLearning from "@/components/card/learningPath";
import CardNews from "@/components/card/news";
import Layout from "@/components/layout";

import Hero from "@/components/eLearning/hero";
import BenefitLearning from "@/components/eLearning/benefitLearning";
import LearningSkill from "@/components/eLearning/learningSkill";
import LearningPath from "@/components/eLearning/learningPath";
import Mentor from "@/components/eLearning/mentorSection";
import CTALearning from "@/components/eLearning/ctaLearning";
import Portfolio from "@/components/eLearning/portfolio";

const ELearning = () => {
  return (
    <Layout>
      <Hero />
      <BenefitLearning />
      <LearningSkill />
      <LearningPath />
      <Mentor />
      <Portfolio />
      <CTALearning />
    </Layout>
  );
};

export default ELearning;
