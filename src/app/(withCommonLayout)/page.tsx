import HeroSection from "@/components/heroSection/HeroSection";
import GalleryGrid from "@/components/home/gallery/Gallery";
import NoticeBoard from "@/components/home/NoticeBoard/NoticeBoard";
import PrincipalMessage from "@/components/home/PrincipalMessage/PrincipalMessage";

import Statistics from "@/components/home/statistics/Statistics";

const HomePage = () => {
  return (
    <div className="space-y-10">
      <HeroSection></HeroSection>
      <PrincipalMessage />
      <Statistics></Statistics>
      <NoticeBoard></NoticeBoard>
      <GalleryGrid />
    </div>
  );
};

export default HomePage;
