import NoticeBoard from "@/components/home/NoticeBoard/NoticeBoard";
import PrincipalMessage from "@/components/home/PricipalMessage/PricipalMessage";

import React from "react";

const HomePage = () => {
  return (
    <div className="space-y-10">
      <PrincipalMessage />
      <NoticeBoard />
    </div>
  );
};

export default HomePage;