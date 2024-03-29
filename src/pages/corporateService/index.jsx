import Business from "@/components/corporateService/business";
import Contact from "@/components/corporateService/contact";
import CTALearning from "@/components/corporateService/ctaLearning";
import CTALearningRight from "@/components/corporateService/ctaLearningRight";
import Hero from "@/components/corporateService/hero";
import Mitra from "@/components/corporateService/mitra";
import Layout from "@/components/layout";

const CorporateService = () => {
  return (
    <Layout>
      <Hero />
      <Mitra />
      <CTALearning />
      <CTALearningRight />
      <Business />
      <Contact />
    </Layout>
  );
};

export default CorporateService;
