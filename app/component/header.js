import React from "react";
import Link from 'next/link';

export default function Header(){
    return(
      <div className="bg-cyan-500 flex items-center justify-center h-10 text-white">
        <div>
        <Link href = "/dogGame"className="mr-8 cursor-pointer hover:bg-white hover:text-black hover:rounded-sm transform hover:scale-200 transition-transform">Dog Game</Link>
        <Link href = "/shape"className="mr-8 cursor-pointer hover:bg-white hover:text-black hover:rounded-sm transform hover:scale-200 transition-transform"> Rhombus</Link>
        <Link href ="/dustbin"className="mr-8 cursor-pointer hover:bg-white hover:text-black hover:rounded-sm transform hover:scale-200 transition-transform">Dustbin</Link>
        </div>
      </div>
    )
  }