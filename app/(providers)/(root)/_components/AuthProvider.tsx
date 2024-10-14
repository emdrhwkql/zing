"use client"

import supabase from "@/supabase/client"
import { useAuthStore } from "@/zustand/auth.store";
import { PropsWithChildren, useEffect } from "react"

function AuthProvider({ children }: PropsWithChildren) {
    const logIn = useAuthStore(state => state.logIn);
    const logOut = useAuthStore(state => state.logOut);

    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
            if (session?.user) {
                logIn()
            } else {
                logOut();
            }
        })
    }, []);

    return children
}

export default AuthProvider;