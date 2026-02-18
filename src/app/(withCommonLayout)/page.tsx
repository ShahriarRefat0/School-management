import HeroSection from "@/components/heroSection/HeroSection";
import Contact from "@/components/home/Contact/Contact";
import NoticeBoard from "@/components/home/NoticeBoard/NoticeBoard";
import Statistics from "@/components/home/statistics/Statistics";
import TestimonialsSection from "@/components/home/TestimonialsSection/TestimonialsSection";
import Features from "@/components/home/Features/Features";
import PrincipalMessage from "@/components/home/PricipalMessage/PricipalMessage";
import Support from "@/app/(withCommonLayout)/Support/page";

const HomePage = () => {
  return (
    <div className="space-y-10">
      <HeroSection></HeroSection>
      <PrincipalMessage />
      <Features />
      <Statistics></Statistics>
      <Contact></Contact>
      <NoticeBoard></NoticeBoard>
      <TestimonialsSection></TestimonialsSection>
    </div>
  );
};

export default HomePage;
