"use client";
import Navbar from "@/components/Navbar";
import React from "react";
import PrivacyPolicyData from "./components/PrivacyPolicyData";

const PrivacyPolicy = () => {
  return (
    <div>
      <Navbar colorScheme="alternate" />
      <PrivacyPolicyData/>
    </div>
  );
};

export default PrivacyPolicy;
