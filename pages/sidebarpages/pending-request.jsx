import { columns, peoples } from "@/components/dummyData/FormData";
import Sidebar from "@/components/Sidebar";
import Table from "@/components/tables/table";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const PendingRequest = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingRequests = async () => {
      let token = Cookies.get("authToken"); 
      const apiUrl = process.env.NEXT_PUBLIC_MAP_KEY;

      try {
        const response = await axios.get(`${apiUrl}/api/requests`, {
          params: { request_status: "pending" },
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        setPendingRequests(response.data); 
      } catch (error) {
        console.error("Error fetching pending requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingRequests();
  }, []);
  return (
    <div className="m w-full bg-white flex ">
      {/* Sidebar Component */}
      <Sidebar className="w-64 min-h-screen fixed top-0 left-0 bg-white shadow-md hidden md:block" />

      <div className="flex-1 md:ml-72">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="flex max-w-7xl mx-auto px-6 md:items-start items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Pending Request
            </h1>
          </div>
        </div>

        {/* Page Content */}
        <div className="px-6 py-8">
          <div className="flex-1 bg-white shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-indigo-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-indigo-900 mb-2">
                  Total Pending
                </h3>
                <p className="text-3xl font-bold text-indigo-600">{pendingRequests.total_requests}</p>
              </div>
              {/* <div className="bg-orange-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-orange-900 mb-2">Deny</h3>
                <p className="text-3xl font-bold text-orange-600">8</p>
              </div>
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-2">Processing</h3>
                <p className="text-3xl font-bold text-green-600">12</p>
              </div> */}
            </div>
            <div className="flex  md:items-start items-center py-4">
              <h1 className="text-xl font-bold text-gray-900">
                Pending Requests
              </h1>
            </div>
            <div className="px-6">
              <Table columns={columns} data={pendingRequests?.data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingRequest;
