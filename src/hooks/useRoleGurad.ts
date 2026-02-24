import { useRouter } from "next/router";
import { useAuth } from "./useAuth";
import { useEffect } from "react";



type UserRole = | "super_admin" | "school_admin" | "teacher" | "student" | "parent" | "accountant";

export const useRoleGuard = (allowedRole: UserRole) =>{
const {user, role, loading} = useAuth();

const router = useRouter()

useEffect(()=>{

    if (loading) return;

    //user not logged in
    if (!user) {
        router.push('/login')
    return;
    }

    //wrong role
    if (role !== allowedRole) {
        router.push("unauthorized")
    }
}, [user, role, loading, router, allowedRole]);

return {user, role, loading};
}