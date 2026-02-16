import NoticeBoard from "@/components/home/NoticeBoard/NoticeBoard";
import PrincipalMessage from "@/components/home/PricipalMessage/PricipalMessage";

import React from "react";
import Teampage from "../allpages/team/page";

const HomePage = () => {
  return (
    <div className="space-y-10">
      <Teampage></Teampage>
      {/* <PrincipalMessage /> */}
      <NoticeBoard />
    </div>
  );
};

export default HomePage;