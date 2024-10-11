"use client";

import supabase from '@/app/supabase/client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

function LoginForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmitLoginForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { email, password } = formData;

        if (!email) {
            alert("이메일을 입력하세요");
            return;
        }

        if (!password) {
            alert("비밀번호를 입력하세요");
            return;
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (data?.session) {
            alert("로그인 성공");
            router.push("/"); 
        } else {
            alert(`로그인 실패: ${error?.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmitLoginForm}>
            <input
                name='email'
                type="text"
                placeholder="이메일"
                value={formData.email}
                onChange={handleChange}
            />
            <input
                name='password'
                type="password"
                placeholder='비밀번호'
                value={formData.password}
                onChange={handleChange}
            />
            <button type='submit'>로그인</button>
        </form>
    );
}

export default LoginForm