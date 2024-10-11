import React from 'react'
import SignUpForm from './_components/SignUpForm'

function SignUpPage() {
    return (
        <main className='p-4'>
            <h2 className='text-center font-bold text-2xl mb-9'>회원가입</h2>
            <SignUpForm />
        </main>
    )
}

export default SignUpPage