import HeroSection from "@/components/heroSection/HeroSection";
import Contact from "@/components/home/Contact/Contact";
import NoticeBoard from "@/components/home/NoticeBoard/NoticeBoard";
import Statistics from "@/components/home/statistics/Statistics";
import TestimonialsSection from "@/components/home/TestimonialsSection/TestimonialsSection";
import Features from "@/components/home/Features/Features";
import PrincipalMessage from "@/components/home/PricipalMessage/PricipalMessage";
import HowItWorks from "@/components/home/howitWorks/howitWorks";
import FAQ from "@/components/home/FAQ/FAQ";
import BlogSection from "@/components/home/blogSection/blog";





const HomePage = () => {
  return (
    <div className="space-y-10">
      <HeroSection></HeroSection>
      {/* <PrincipalMessage /> */}
      <Features />
      <HowItWorks></HowItWorks>
      {/* <Statistics></Statistics> */}
      {/* <NoticeBoard></NoticeBoard> */}
      <TestimonialsSection></TestimonialsSection>
      <FAQ></FAQ>
      <BlogSection></BlogSection>
      {/* <Contact></Contact> */}
      {/* <LoginPage></LoginPage>
      <RegisterPage></RegisterPage>       */}
    </div>
  );
};

export default HomePage;
