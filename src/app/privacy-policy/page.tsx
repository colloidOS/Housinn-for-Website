"use client";
import Navbar from "@/components/Navbar";
import React from "react";
import PrivacyPolicy from "./components/PrivacyPolicy";


const PrivacyPolicyPage = () => {
  return (
    <div>
      <Navbar colorScheme="alternate" />
      <PrivacyPolicy/>
    </div>
  );
};

export default PrivacyPolicyPage;
