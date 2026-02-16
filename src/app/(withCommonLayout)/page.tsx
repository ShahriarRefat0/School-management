import HeroSection from '@/components/heroSection/HeroSection';
import Features from '@/components/home/Features/Features';
import NoticeBoard from '@/components/home/NoticeBoard/NoticeBoard';
import PrincipalMessage from '@/components/home/PrincipalMessage/PrincipalMessage';

import Statistics from '@/components/home/statistics/Statistics';

const HomePage = () => {
  return (
    <div className="space-y-10">
      <HeroSection></HeroSection>
      <PrincipalMessage />
      <Features />

      <Statistics></Statistics>

      <NoticeBoard></NoticeBoard>
    </div>
  );
};

export default HomePage;
