import HeroSection from "@/components/heroSection/HeroSection";
import Contact from "@/components/home/Contact/Contact";
import NoticeBoard from "@/components/home/NoticeBoard/NoticeBoard";
import Statistics from "@/components/home/statistics/Statistics";
import TestimonialsSection from "@/components/home/TestimonialsSection/TestimonialsSection";
import Features from "@/components/home/Features/Features";
import PrincipalMessage from "@/components/home/PricipalMessage/PricipalMessage";
import SchoolMarquee from "@/components/home/SchoolMarquee/SchoolMarquee";
import { FloatingClock } from "@/components/shared/FloatingClock";




import WhyChooseUs from "@/components/home/WhyChooseUs/WhyChooseUs";
import ExploreOurDashboardFeatures from "@/components/home/ExploreOurDashboardFeatures/ExploreOurDashboardFeatures";

const HomePage = () => {
  return (
    <div className="space-y-10">
      <HeroSection></HeroSection>
      <WhyChooseUs />
      <ExploreOurDashboardFeatures />
      <PrincipalMessage />
      <Features />
      <SchoolMarquee></SchoolMarquee>
      <Statistics></Statistics>
      <NoticeBoard></NoticeBoard>
      <TestimonialsSection></TestimonialsSection>
      <Contact></Contact>
      <FloatingClock />
      {/* <LoginPage></LoginPage>
      <RegisterPage></RegisterPage>       */}
    </div>
  );
};

export default HomePage;
