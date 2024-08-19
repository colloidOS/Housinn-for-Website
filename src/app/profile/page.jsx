import React from 'react';
import Image from 'next/image';
import profile from '../../../public/icons/profile.svg';
import Logout from '../../../public/icons/sign_out.svg';
import Button from './Button'

function Profile() {
  return (
    <>
    <div className='flex flex-col pl-12 pr-[74px] py-10 gap-8 bg-background-2 w-full'>
        <div className='flex flex-col gap-4'>
            <h3 className='text-2xl font-bold text-black'>Profile</h3>
            <hr className='text-gray-300'/>
        </div>
        <div className='flex flex-col gap-3'>
            <div className='flex gap-[164px]'>
                <div className='flex flex-col gap-0'>
                    <p className='text-lg font-semibold'>Profile Photo</p>
                    <p className='text-sm font-normal text-gray-600'>upload your profile photo</p>
                </div>
                <div className='flex flex-col justify-center items-center gap-[33px] px-[28px] pt-[62px] pb-[14px]'>
                    <div>
                        <Image
                        src={profile}
                        alt='select-profile'
                        height={137}
                        width={137}
                        className='border border-gray-300 rounded-full'
                        />
                    </div>
                    <div className='flex flex-col gap-4 items-center'>
                        <Button>Upload Profile Image/Photo</Button>
                        <span className='text-gray-500 text-sm font-normal'>*minimum 500px x 500px</span>
                    </div>
                </div>
            </div>
            <hr className='text-gray-300'/>
        </div>
        <div className='flex flex-col gap-6'>
            <div className='flex'>
                <div className='flex flex-col gap-2'>
                    <p className='text-lg font-semibold'>Edit Your Profile</p>
                    <p className='text-sm font-normal w-[308px] text-gray-600'>
                        Change your account type, edit your contact information, 
                        add your social media details and your user details.
                    </p>
                </div>
                <div className='flex flex-col px-12 pt-8 gap-16'>
                    <div className='flex flex-col gap-8'>
                        <div>
                            <p className='text-primary font-semibold'>Account Type</p>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <p className='text-primary font-semibold'>Contact Information</p>
                            <div className="flex flex-wrap gap-6">
                                <div className="flex gap-6 w-full">
                                    <div className="w-full gap-1">
                                        <label className="block text-gray-700 text-sm font-bold" htmlFor="firstName">
                                            First Name
                                        </label>
                                        <input
                                            id="firstName"
                                            type="text"
                                            placeholder="Michael"
                                            className="w-full px-4 py-2 border border-gray-300 placeholder:text-gray-500 text-gray-600 rounded-[4px] focus:outline"
                                        />
                                    </div>
                                    <div className="w-full gap-1">
                                        <label className="block text-gray-700 text-sm font-bold" htmlFor="lastName">
                                            Last Name
                                        </label>
                                        <input
                                            id="LastName"
                                            type="text"
                                            placeholder="Chukwueke"
                                            className="w-full px-4 py-2 border border-gray-300 placeholder:text-gray-500 text-gray-600 rounded-[4px] focus:outline"
                                        />
                                    </div>
                                </div>   
                                <div className="flex gap-6 w-full">
                                    <div className="w-full gap-1">
                                        <label className="block text-gray-700 text-sm font-bold" htmlFor="companyName">
                                            Company Name (optional)
                                        </label>
                                        <input
                                            id="company"
                                            type="text"
                                            placeholder="Mike’s Realties"
                                            className="w-full px-4 py-2 border border-gray-300 placeholder:text-gray-500 text-gray-600 rounded-[4px] focus:outline"
                                        />
                                    </div>
                                    <div className="w-full gap-1">
                                        <label className="block text-gray-700 text-sm font-bold" htmlFor="email">
                                            Email
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            placeholder="mikesrealties@gmail.com"
                                            className="w-full px-4 py-2 border border-gray-300 placeholder:text-gray-500 text-gray-600 rounded-[4px] focus:outline"
                                        />
                                    </div>
                                </div>   
                                <div className="w-full gap-1">
                                        <label className="block text-gray-700 text-sm font-bold" htmlFor="phoneNumber">
                                            Phone Number
                                        </label>
                                        <input
                                            id="number"
                                            type="text"
                                            placeholder="08012345678"
                                            className="w-full px-4 py-2 border border-gray-300 placeholder:text-gray-500 text-gray-600 rounded-[4px] focus:outline"
                                        />
                                    </div>
                            </div>
                        </div>
                    </div>
                    <Button className='w-fit'>Upload Profile</Button>
                </div>
            </div>
            <hr className='text-gray-300'/>
        </div>
        <div className='flex flex-col gap-4 w-full'>
            <div className='flex gap-[140px]'>
                <div className='flex flex-col gap-2 text-nowrap'>
                    <p className='text-lg font-semibold'>Verification</p>
                    <p className='text-sm font-normal text-gray-600'>Get your account verified!</p>
                </div>
                <div className='px-12 py-8 flex flex-col gap-8 w-full'>
                    <div className='flex flex-col gap-4'>
                        
                        <div className='flex gap-6 w-full'>
                            <div className='flex flex-col gap-1 w-full'>
                                <label className="block text-gray-700 text-sm font-bold" htmlFor="newPassword">
                                    New Password
                                </label>
                                <input
                                id="newPass"
                                type="text"
                                placeholder="Enter your new password"
                                className="w-full px-4 py-2 border border-gray-300 placeholder:text-gray-500 text-gray-600 rounded-[4px] focus:outline"
                                />
                            </div>
                            <div className='flex flex-col gap-1 w-full'>
                                <label className="block text-gray-700 text-sm font-bold" htmlFor="updatePass">
                                    Confirm Password
                                </label>
                                <input
                                id="updatePassword"
                                type=""
                                placeholder="Confirm your new password"
                                className="w-full px-4 py-2 border border-gray-300 placeholder:text-gray-500 text-gray-600 rounded-[4px] focus:outline"
                                />
                                <select name="" id="" className="w-full px-4 py-2 border border-gray-300 placeholder:text-gray-500 text-gray-600 rounded-[4px] focus:outline">
                                    Select
                                </select>
                            </div>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label className="block text-gray-700 text-sm font-bold" htmlFor="currentPassword">
                                Street
                            </label>
                            <input
                            id="street"
                            type="text"
                            placeholder="e.g No 25 Asokoro Street"
                            className="w-full px-4 py-2 border border-gray-300 placeholder:text-gray-500 text-gray-600 rounded-[4px] focus:outline"
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label className="block text-gray-700 text-sm font-bold" htmlFor="currentPassword">
                                CAC Number
                            </label>
                            <input
                            id="cacNumber"
                            type="text"
                            placeholder="Enter your CAC Registration Code(RC Number)"
                            className="w-full px-4 py-2 border border-gray-300 placeholder:text-gray-500 text-gray-600 rounded-[4px] focus:outline"
                            />
                        </div>
                    </div>
                    <Button className='w-fit'>Verify Account</Button>
                </div>
            </div>
            <div className='flex gap-3 w-full'>
                <div className='flex flex-col gap-0 '>
                    <p className='text-lg font-semibold'>Change Password</p>
                    <p className='text-sm font-normal text-gray-600 w-[300px]'>
                        *After you change the password you will have to login again.
                    </p>
                </div>
                <div className='px-12 py-8 flex flex-col gap-8 w-full'>
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-1'>
                            <label className="block text-gray-700 text-sm font-bold" htmlFor="currentPassword">
                                Current Password
                            </label>
                            <input
                            id="currentPass"
                            type="text"
                            placeholder="Enter your current password"
                            className="w-full px-4 py-2 border border-gray-300 placeholder:text-gray-500 text-gray-600 rounded-[4px] focus:outline"
                            />
                        </div>
                        <div className='flex gap-6 w-full'>
                            <div className='flex flex-col gap-1 w-full'>
                                <label className="block text-gray-700 text-sm font-bold" htmlFor="newPassword">
                                    New Password
                                </label>
                                <input
                                id="newPass"
                                type="text"
                                placeholder="Enter your new password"
                                className="w-full px-4 py-2 border border-gray-300 placeholder:text-gray-500 text-gray-600 rounded-[4px] focus:outline"
                                />
                            </div>
                            <div className='flex flex-col gap-1 w-full'>
                                <label className="block text-gray-700 text-sm font-bold" htmlFor="updatePass">
                                    Confirm Password
                                </label>
                                <input
                                id="updatePassword"
                                type="text"
                                placeholder="Confirm your new password"
                                className="w-full px-4 py-2 border border-gray-300 placeholder:text-gray-500 text-gray-600 rounded-[4px] focus:outline"
                                />
                            </div>
                        </div>
                    </div>
                    <Button className='w-fit'>Reset Password</Button>
                </div>
            </div>
            <hr className='text-gray-300 py-2'/>
        </div>
        <div>
            <hr className='text-gray-300'/>
            <div className='flex gap-[202px]'>
                <div className='flex flex-col gap-2 w-'>
                    <p className='text-lg font-semibold'>Logout</p>
                    <p className='text-sm font-normal text-gray-600'>Logout from this device</p>
                </div>
                <div>
                    <button 
                    className={`px-6 py-[11px] flex gap-2 items-center focus:outline-primary bg-primary text-white rounded-md text-base font-semibold`}
                    > <img src='/icons/sign_out.svg'/>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Profile
