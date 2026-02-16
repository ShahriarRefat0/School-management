import HeroSection from "@/components/heroSection/HeroSection";
import NoticeBoard from "@/components/home/NoticeBoard/NoticeBoard";
import PrincipalMessage from "@/components/home/PricipalMessage/PricipalMessage";
import Statistics from "@/components/home/statistics/Statistics";




const HomePage = () => {
   
  return (
    <div className="space-y-10">
        <Statistics></Statistics>
          <HeroSection></HeroSection>
      <PrincipalMessage />
      <NoticeBoard />
    </div>
  );
};

export default HomePage;