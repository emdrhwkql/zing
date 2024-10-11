import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <div className='border-b items-center'>

      <Link href="/log-in" className=' border-black text-black '>로그인</Link>


      <Link href="/sign-up" className=' border-black text-black '>회원가입</Link>

      <Link href="/ms-auth" className=' '> 메세지 </Link>


    </div>
  )
}

export default Header