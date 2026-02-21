"use client";

import React from 'react';
import { Wallet } from 'lucide-react';
import Navbar from "@/components/shared/navbar/Navbar";
import Footer from "@/components/shared/footer/Footer";
import AuthCard from "@/components/shared/auth/AuthCard";

const AccountsLoginPage = () => {
    return (
        <>
            <Navbar />
            <AuthCard
                role="accounts"
                roleTitle="Accounts"
                icon={<Wallet size={24} />}
                color="cyan"
            />
            <Footer />
        </>
    );
};

export default AccountsLoginPage;
