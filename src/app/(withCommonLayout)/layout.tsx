import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <div className="min-h-[90vh]">
        <Navbar/>
        {children}
        <Footer/>
      </div>
    </div>
  );
};

export default Layout;