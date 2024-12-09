"use client";
import Navbar from "@/components/Navbar";
import React from "react";
import TermsAndConditions from "./components/TermsAndConditions";

const TermsAndConditionsPage = () => {
  return (
    <div>
      <Navbar heroAnimated colorScheme="alternate" />
      <TermsAndConditions />
    </div>
  );
};

export default TermsAndConditionsPage;
