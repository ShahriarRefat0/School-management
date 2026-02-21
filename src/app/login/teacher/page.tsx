"use client";

import React from 'react';
import { BookOpen } from 'lucide-react';
import Navbar from "@/components/shared/navbar/Navbar";
import Footer from "@/components/shared/footer/Footer";
import AuthCard from "@/components/shared/auth/AuthCard";

const TeacherLoginPage = () => {
    return (
        <>
            <Navbar />
            <AuthCard
                role="teacher"
                roleTitle="Teacher"
                icon={<BookOpen size={24} />}
                color="indigo"
            />
            <Footer />
        </>
    );
};

export default TeacherLoginPage;
