"use client";

import React, { useState } from "react";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { AiOutlineMenu } from "react-icons/ai";

const Header = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const { status, data } = useSession();
  console.log(status, "status");

  const handleLoginClick = () => signIn();
  const handleLogoutClick = () => {
    setMenuIsOpen(false);
    signOut();
  };

  const handleMenuClick = () => setMenuIsOpen(!menuIsOpen);

  return (
    <div className='container mx-auto p-5 py-0 h-[93px] flex justify-between items-center'>
      <div className='relative h-[32px] w-[182px]'>
        <Image src='/Logo.png' alt='Full Stack Week Logo' height={32} width={182} />
      </div>

      {status === "unauthenticated" && (
        <button className='text-primary text-sm font-semibold' onClick={handleLoginClick}>
          Login
        </button>
      )}

      {status === "authenticated" && data.user?.image && data.user?.name && (
        <div className='flex items-center gap-3 border-grayLighter p-2 px-3 border rounded-full border-solid relative'>
          <AiOutlineMenu size={16} onClick={handleMenuClick} className='cursor-pointer' />
          <Image
            className='rounded-full shadow-md'
            height={34}
            width={34}
            src={data.user.image!}
            alt={data.user.name!}
          />
          {menuIsOpen && (
            <div className='absolute top-14 left-0 w-full h-full bg-white rounded-lg shadow-md flex flex-col justify-center - items-center'>
              <button className='text-primary text-sm font-semibold' onClick={handleLogoutClick}>
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
