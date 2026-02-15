import NoticeBoard from "@/components/home/NoticeBoard/NoticeBoard";
import PrincipalMessage from "@/components/home/PricipalMessage/PricipalMessage";
import Statistics from "@/components/home/statistics/Statistics";

import React from "react";

const HomePage = () => {
  return (
    <div className="space-y-10">
        <Statistics></Statistics>
      <PrincipalMessage />
      <NoticeBoard />
    </div>
  );
};

export default HomePage;
