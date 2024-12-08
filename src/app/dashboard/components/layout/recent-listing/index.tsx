import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import api from "@/lib/api";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, TooltipItem } from "chart.js";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PostType {
  type: keyof typeof colorMap; 
  count: number;
}

interface DashboardData {
  postsByType: PostType[];
}

const colorMap = {
  rent: "#4c91f7",
  shortlet: "#ffd700",
  sale: "#333",
};

const hoverColorMap = {
  rent: "#3a7de0",
  shortlet: "#e5c300",
  sale: "#292929",
};

const DashboardChart = () => {
  const [postData, setPostData] = useState<DashboardData | null>(null); // Explicitly typed
  const { user } = useAuth();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get(`/users/dashboard`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });

        if (response.data?.status === "success") {
          setPostData(response.data.data);
          toast.success("Dashboard data loaded successfully!");
        } else {
          toast.error("Failed to load dashboard data.");
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Error loading dashboard data.");
      }
    };

    fetchDashboardData();
  }, [user]);

  if (!postData) return <div>Loading...</div>;

  // Prepare data for the chart
  const postsByTypes = postData.postsByType || [];

  const typeOrder: Array<keyof typeof colorMap> = ["rent", "shortlet", "sale"];
  const sortedData = typeOrder.map((type) => {
    const typeData = postsByTypes.find((item) => item.type === type);
    return typeData || { type, count: 0 }; // Default to 0 count if type is missing
  });

  const labels = sortedData.map((item) => item.type.charAt(0).toUpperCase() + item.type.slice(1));
  const dataCounts = sortedData.map((item) => item.count);
  const totalPosts = dataCounts.reduce((acc, count) => acc + count, 0);

  const chartData = {
    labels: labels.length > 0 ? labels : ["No Data"],
    datasets: [
      {
        data: labels.length > 0 ? dataCounts : [1],
        backgroundColor: labels.length > 0 ? sortedData.map((item) => colorMap[item.type]) : ["#d3d3d3"],
        hoverBackgroundColor: labels.length > 0 ? sortedData.map((item) => hoverColorMap[item.type]) : ["#b0b0b0"],
        borderWidth: 3, 
      },
    ],
  };

  const chartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<"doughnut">) => {
            // Narrow `raw` to a number
            const label = tooltipItem.label || "";
            const value = tooltipItem.raw as number || 0; // Ensure raw is treated as a number
            return ` ${label}: ${value}`;
          },
        },
      },
      legend: {
        display: false, // Disable the default legend to create custom blocks
      },
    },
    cutout: "70%",
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm p-4 mx-auto bg-white rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold">Total Listings</h3>
      <div className="relative w-full h-full">
        <Doughnut data={chartData} options={chartOptions} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-chart-shadow text-center  rounded-full  p-10">
          <span className="text-2xl font-bold">{totalPosts}</span>
          <p className="text-gray-500">Total Listings</p>
        </div>
      </div>
      <div className="mt-4 flex gap-3 space-y-2">
        {labels.map((label, index) => (
          <div key={index} className="flex items-center justify-center mt-2 space-x-2">
            <span
              className="inline-block -2 w-2 h-2 rounded-full"
              style={{ backgroundColor: colorMap[typeOrder[index]] }}
            ></span>
            <p className="text-sm font-medium">
            {dataCounts[index]} {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardChart;
