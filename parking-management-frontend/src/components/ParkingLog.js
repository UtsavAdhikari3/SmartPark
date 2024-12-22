import React, { useState, useEffect } from "react";
import {
  Upload,
  LogIn,
  LogOut,
  AlertCircle,
  Car,
  Clock,
  Hash,
  DollarSign,
  Loader2,
} from "lucide-react";
import axios from "axios";

const ParkingLog = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState({ type: "", content: "" });
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/parking/logs"
      );
      setLogs(response.data);
    } catch (err) {
      setMessage({
        type: "error",
        content: "Failed to fetch parking logs",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setMessage({ type: "", content: "" });
    }
  };

  const handleOperation = async (type) => {
    if (!file) {
      setMessage({
        type: "error",
        content: "Please upload an image first",
      });
      return;
    }

    setIsProcessing(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        `http://localhost:5000/api/parking/${type}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setMessage({
        type: "success",
        content:
          type === "entry"
            ? `Vehicle successfully entered. Assigned slot: ${response.data.slotNumber}`
            : `Vehicle successfully exited. Parking fee: $${response.data.fee}`,
      });

      fetchLogs();
      setFile(null);
    } catch (err) {
      setMessage({
        type: "error",
        content: err.response?.data?.message || `Failed to process ${type}`,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Loading skeleton component
  const TableSkeleton = () => (
    <div className="animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="border-b border-gray-200 h-16 flex items-center space-x-4"
        >
          <div className="h-4 bg-gray-200 rounded w-1/5"></div>
          <div className="h-4 bg-gray-200 rounded w-1/5"></div>
          <div className="h-4 bg-gray-200 rounded w-1/5"></div>
          <div className="h-4 bg-gray-200 rounded w-1/5"></div>
          <div className="h-4 bg-gray-200 rounded w-1/5"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <Car className="mr-2 text-indigo-600" />
              Parking Management
            </h2>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
              className="px-4 py-2 bg-indigo-600 text-white font-medium rounded hover:bg-indigo-700 transition duration-200"
            >
              Logout
            </button>
          </div>

          {/* File Upload and Actions */}
          <div className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex-1">
                <label className="relative flex items-center justify-center px-6 py-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 transition-colors cursor-pointer group">
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                  <div className="text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400 group-hover:text-indigo-500" />
                    <span className="mt-2 block text-sm font-medium text-gray-600 group-hover:text-indigo-500">
                      {file ? file.name : "Upload vehicle image"}
                    </span>
                  </div>
                </label>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => handleOperation("entry")}
                  disabled={isProcessing}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  ) : (
                    <LogIn className="h-5 w-5 mr-2" />
                  )}
                  Vehicle Entry
                </button>

                <button
                  onClick={() => handleOperation("exit")}
                  disabled={isProcessing}
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  ) : (
                    <LogOut className="h-5 w-5 mr-2" />
                  )}
                  Vehicle Exit
                </button>
              </div>
            </div>

            {/* Status Message */}
            {message.content && (
              <div
                className={`rounded-lg p-4 ${
                  message.type === "success" ? "bg-green-50" : "bg-red-50"
                }`}
              >
                <div className="flex">
                  <AlertCircle
                    className={`h-5 w-5 ${
                      message.type === "success"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  />
                  <div className="ml-3">
                    <p
                      className={`text-sm ${
                        message.type === "success"
                          ? "text-green-700"
                          : "text-red-700"
                      }`}
                    >
                      {message.content}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Parking Log Table */}
            <div className="mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                      <div className="flex items-center">
                        <Car className="h-4 w-4 text-gray-400 mr-2" />
                        License Plate
                      </div>
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-400 mr-2" />
                        Entry Time
                      </div>
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      <div className="flex items-center">
                        <Hash className="h-4 w-4 text-gray-400 mr-2" />
                        Slot
                      </div>
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-400 mr-2" />
                        Exit Time
                      </div>
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-gray-400 mr-2" />
                        Fee
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {isLoading ? (
                    <TableSkeleton />
                  ) : (
                    logs.map((log, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                          {log.licensePlate}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {new Date(log.entryTime).toLocaleString()}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {log.slotNumber}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {log.exitTime
                            ? new Date(log.exitTime).toLocaleString()
                            : "-"}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {log.fee ? `$${log.fee}` : "-"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkingLog;
