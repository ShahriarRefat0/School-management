import HeroSection from "@/components/heroSection/HeroSection";
import NoticeBoard from "@/components/home/noticeBoard/NoticeBoard";
import PrincipalMessage from "@/components/home/PrincipalMessage/PrincipalMessage";

import Statistics from "@/components/home/statistics/Statistics";




const HomePage = () => {
   
  return (
    <div className="space-y-10">
          <HeroSection></HeroSection>
      <PrincipalMessage />
        <Statistics></Statistics>
      <NoticeBoard></NoticeBoard>
    </div>
  );
};

export default HomePage;