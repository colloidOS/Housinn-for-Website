import React from "react";
import property from '../../../public/icons/property.png'
import Image from "next/image";

const AboutUs = () => {
    return (
        <>
        <div className="flex justify-center w-full bg-primary text-white/90 gap-[18px] py-5 px-[104px]">
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-5">
                    <h3 className="text-[32px]">About Us</h3>
                    <p className="text-lg max-w-[800px] text-wrap">At Housinn, we're dedicated to making your property search effortless and enjoyable. Whether it's a cozy house, modern apartment, or expansive land, we're here to guide you. With a passion for real estate and a commitment to exceptional service, Housinn is your ultimate destination for all your property needs.</p>
                </div>
            </div>
            <div>
                <Image src={property} width={400} height={400} alt="property-icon" />
            </div>
        </div>
        </>
    )
}
export default AboutUs;