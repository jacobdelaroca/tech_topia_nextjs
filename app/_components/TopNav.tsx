"use client";
import Link from 'next/link';
import React, { useState } from 'react'
import logo from "@/assets/logo.png"
import topBG from "@/assets/desktopTopBG.png"

const navItems = [
    {
        text: "Home",
        href: "/"
    },
    {
        text: "Charts",
        href: "/charts"
    },
    {
        text: "Dashboard",
        href: "/dashboard"
    },

]

const TopNav = () => {
    const [selectedId, setSelectedId] = useState<number>(0);
    const BGStyle: React.CSSProperties = {
        backgroundImage: `url(${topBG.src})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: 'bottom',
      };
  return (
    <nav className="h-[96px]  lg:block  p-2  w-screen z-50" style={BGStyle}>
        <Link href="/" className="float-end" onClick={() => {setSelectedId(navItems.length - 1)}}>
        <img src={logo.src} alt="" className="h-16" />
        </Link>
        {navItems.map((item, i)=> (
            <Link key={i} href={item.href} className={`float-start h-full px-2 flex items-center mx-2 ${(i === selectedId)? "text-black rounded-t-xl bg-accent2":"text-white"}`} onClick={() => setSelectedId(i)}>
            <div className="lg:text-3xl text-lg float-start">{item.text}</div>
            </Link>
        ))}
        {/* <button onClick={() => setCount(c => c+1)}>asdhasldhlasd</button>
        {count} */}

      </nav>
  )
}

export default TopNav
