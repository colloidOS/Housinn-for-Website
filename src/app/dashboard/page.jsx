import React from "react";
import Subscription from "../dashboard/components/layout/pricing/index";

function Dashboard() {
  return (
    <div className="w-full bg-background-2 px-12 py-10 ">
      <h2 className="text-2xl font-bold text-black">Dashboard</h2>
      <Subscription />
    </div>
  );
}

export default Dashboard;
