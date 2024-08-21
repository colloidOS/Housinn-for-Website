import React from "react";
import Image from "next/image";
import Logo from "../../public/icons/Logo.svg";
import Like from "../../public/icons/heart.svg";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className=" w-full flex justify-between px-[104px] py-[14px]">
      <ul className="flex gap-2  text-white">
        <li>
          <Link href="#" className="hover:text-primary p-[10px]">
            Buy
          </Link>
        </li>
        <li>
          <Link href="#" className="hover:text-primary p-[10px]">
            Rent
          </Link>
        </li>
        <li>
          <Link href="#" className="hover:text-primary p-[10px]">
            Sell
          </Link>
        </li>
        <li>
          <Link href="#" className="hover:text-primary p-[10px]">
            Short Let
          </Link>
        </li>
      </ul>
      <Image src={Logo} alt="Housinn logo" width={80} height={48} />
      <div className="flex gap-4">
        <Image src={Like} alt="heart" width={18} height={16} />
        <button className="bg-primary text-white px-6 py-[11px] rounded ">
          Sign in
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
