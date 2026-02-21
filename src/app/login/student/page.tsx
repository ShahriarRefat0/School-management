"use client";

import React from 'react';
import { GraduationCap } from 'lucide-react';
import Navbar from "@/components/shared/navbar/Navbar";
import Footer from "@/components/shared/footer/Footer";
import AuthCard from "@/components/shared/auth/AuthCard";

const StudentLoginPage = () => {
    return (
        <>
            <Navbar />
            <AuthCard
                role="student"
                roleTitle="Student"
                icon={<GraduationCap size={24} />}
                color="blue"
            />
            <Footer />
        </>
    );
};

export default StudentLoginPage;
