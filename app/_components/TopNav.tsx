"use client";
import Link from 'next/link';
import React, { useState } from 'react'
import logo from "@/assets/logo.png"

const navItems = [
    {
        text: "Dashboard",
        href: "/dashboard"
    },
    {
        text: "Charts",
        href: "/charts"
    },
    {
        text: "Home",
        href: "/"
    },

]

const TopNav = () => {
    const [selectedId, setSelectedId] = useState<number>(0);
  return (
    <nav className="h-20 bg-main lg:block hidden p-2">
        <Link href="/" className="float-start" onClick={() => {setSelectedId(navItems.length - 1)}}>
        <img src={logo.src} alt="" className="h-16" />
        </Link>
        {navItems.map((item, i)=> (
            <Link key={i} href={item.href} className={`float-end h-16 flex items-center mx-2 ${(i === selectedId)? "text-accent":"text-white"}`} onClick={() => setSelectedId(i)}>
            <div className="text-3xl float-end">{item.text}</div>
            </Link>
        ))}
        {/* <button onClick={() => setCount(c => c+1)}>asdhasldhlasd</button>
        {count} */}

      </nav>
  )
}

export default TopNav
