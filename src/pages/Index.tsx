import Header from "@/components/Header";
import StoriesSection from "@/components/StoriesSection";
import CategoriesSection from "@/components/CategoriesSection";
import PromotionsCarousel from "@/components/PromotionsCarousel";
import CouponsSection from "@/components/CouponsSection";
import ForYouSection from "@/components/ForYouSection";
import SocialFeed from "@/components/SocialFeed";
import BottomNav from "@/components/BottomNav";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      <StoriesSection />
      <CategoriesSection />
      <PromotionsCarousel />
      <CouponsSection />
      <ForYouSection />
      <SocialFeed />
      <BottomNav />
    </div>
  );
};

export default Index;