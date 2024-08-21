import React from 'react';
import Check from '@/../public/icons/check.svg';
import Image from 'next/image';

function Subscription() {
  return (
    <div className='flex flex-col gap-5 w-[350px] px-3 pt-6 pb-4 text-white bg-secondary rounded-2xl'>
        <div className='flex flex-col  gap-1 text-white'>
            <div className='flex flex-col gap-0'>
                <h2 className='text-lg font-semibold px-3'>Subscription</h2>
                <div className='flex flex-col gap-1'>
                    <p className='text-center'>Pro</p>
                    <span className='text-2xl font-bold pl-14'>₦10,000 / Month</span>
                </div>
            </div>
            <div className='flex flex-col gap-2 pl-14'>
                <div className='flex gap-2'><Image src={Check} width={16} height={16}/><p>Unlimited Listings</p></div>
                <div className='flex gap-2'><Image src={Check} width={16} height={16}/><p>5 sponsored listings</p></div>
                <div className='flex gap-2'><Image src={Check} width={16} height={16}/><p>Unlimited Images / Listing</p></div>
                <div className='flex gap-2'><Image src={Check} width={16} height={16}/><p>Unlimited Images / Listing</p></div>
            </div>
        </div>
            <button className='w-full rounded-md py-[11px] font-semibold text-secondary flex justify-center items-center bg-white'>
                View Plans
            </button>
    </div>
  )
};

export default Subscription;