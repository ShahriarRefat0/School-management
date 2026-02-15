import HeroSection from "@/components/heroSection/HeroSection";
import NoticeBoard from "@/components/home/NoticeBoard/NoticeBoard";
import PrincipalMessage from "@/components/home/PricipalMessage/PricipalMessage";



const HomePage = () => {
   
  return (
    <div className="space-y-10">
          <HeroSection></HeroSection>
      <PrincipalMessage />
      <NoticeBoard />
    </div>
  );
};

export default HomePage;
