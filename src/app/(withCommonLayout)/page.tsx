import HeroSection from "@/components/heroSection/HeroSection";
import NoticeBoard from "@/components/home/NoticeBoard/NoticeBoard";
import PrincipalMessage from "@/components/home/PrincipalMessage/PrincipalMessage";

import Statistics from "@/components/home/statistics/Statistics";
import TestimonialsSection from "@/components/home/TestimonialsSection/TestimonialsSection";




const HomePage = () => {
   
  return (
    <div className="space-y-10">
          <HeroSection></HeroSection>
      <PrincipalMessage />
        <Statistics></Statistics>
      <NoticeBoard></NoticeBoard>
      <TestimonialsSection></TestimonialsSection>
    </div>
  );
};

export default HomePage;