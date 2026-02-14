import React, { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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