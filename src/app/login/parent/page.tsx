"use client";

import React from 'react';
import { Users } from 'lucide-react';
import Navbar from "@/components/shared/navbar/Navbar";
import Footer from "@/components/shared/footer/Footer";
import AuthCard from "@/components/shared/auth/AuthCard";

const ParentLoginPage = () => {
    return (
        <>
            <Navbar />
            <AuthCard
                role="parent"
                roleTitle="Parent"
                icon={<Users size={24} />}
                color="amber"
            />
            <Footer />
        </>
    );
};

export default ParentLoginPage;
