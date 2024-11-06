"use client"
import Navbar from "@/components/Navbar";
import React from "react";
import TermsAndConditionsData from "./components/TermsAndConditionData";

const TermsAndCondition = () => {
  return (
    <div>
      <Navbar colorScheme="alternate" />
      <TermsAndConditionsData />
    </div>
  );
};

export default TermsAndCondition;
