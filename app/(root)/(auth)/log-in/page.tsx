"use client"

import React from 'react'
import LoginForm from './_components/LoginForm'

function LoginPage() {
    return (
        <main className='p-4'>
            <h2 className='text-center font-bold text-2xl mb-9'>로그인</h2>
            <LoginForm />
        </main>
    )
}

export default LoginPage