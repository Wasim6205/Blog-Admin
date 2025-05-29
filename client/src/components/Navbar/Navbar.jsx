import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from 'react-icons/rx';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const links = [
        {
            name: "Home",
            to: "/"
        },
        {
            name: "All Blogs",
            to: "/all-blogs"
        },
        {
            name: "Profile",
            to: "/profile"
        },
        {
            name: "Login",
            to: "/login"
        },
    ]

    const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn)

    if(!isLoggedIn){
        links.splice(2,1)
    }else{
        links.splice(3,1)
    }

    const [mobileNav, setMobileNav] = useState(false)
    
  return (
    <nav className='relative flex items-center justify-between py-4 border-b border-y-zinc-200'>
        <div className='w-3/6 lg:w-2/6 brandName'>
            <Link to="/" className='text-xl font-bold '>WSM Blogger</Link>
        </div>
        <div className='w-4/6 hidden lg:flex items-center justify-end'>
            {links.map((items,i)=><Link className='ms-4 hover:text-blue-600 transition-all duration-300' key={i} to={items.to}>{items.name}</Link>)}
            {!isLoggedIn && <Link className='ms-4 bg-black rounded px-4 py-1 text-zinc-100 hover:bg-blue-600 transition-all duration-300' to='/signup'>SignUp</Link>}
        </div>
        <div className='w-3/6 flex lg:hidden items-center justify-end'>
            <button onClick={()=>setMobileNav(!mobileNav)} className='text-3xl'><RxHamburgerMenu /></button>
        </div>
        <div className={`fixed top-0 left-0 nav-bg h-screen w-full backdrop-blur-md p-8 ${mobileNav ? "translate-y-[0%] flex flex-col" : "translate-y-[-100%]"} transition-all duration-300`}>
            <div className='w-full flex justify-end'>
                <button className='text-3xl' onClick={()=>setMobileNav(!mobileNav)}><RxCross2 /></button>
            </div>
            <div className='h-[100%] flex flex-col items-center justify-center'>
                {links.map((items,i)=><Link className='mb-8 text-4xl hover:text-blue-600 transition-all duration-300' key={i} to={items.to}>{items.name}</Link>)}
                {!isLoggedIn && <Link className='text-4xl bg-black rounded px-8 py-4 text-zinc-100 hover:bg-blue-600 transition-all duration-300' to='/signup'>SignUp</Link>}
            </div>
        </div>
    </nav>
  )
}

export default Navbar