import { useState, useRef, useEffect } from "react";

import { useParams, Link } from "react-router-dom";

import { ArrowLeft, MapPin, Package, Truck, Shield, Save, ChevronDown  } from "lucide-react";

import Layout from "../UI/Layout.jsx";

import PageContainer from "../UI/PageContainer.jsx";

export default function TrackCustomerOrder() {
  const params = useParams();
  const orderId = params.id;
  const [isAdmin, setIsAdmin] = useState(false);

  const [tracking, setTracking] = useState({
    orderId: orderId,
    status: "In Transit",
    estimatedDelivery: "April 25, 2023",
    trackingNumber: "PO-TRK987654321",
    carrier: "Supplier Logistics",
    origin: "Supplier Warehouse, Detroit, MI",
    destination: "AgriTech Warehouse, Chicago, IL",
    currentLocation: "Toledo, OH",
    updates: [
      {
        date: "April 20, 2023 - 09:15 AM",
        location: "Detroit, MI",
        status: "Shipped",
        description: "Order has been shipped from supplier",
      },
      {
        date: "April 20, 2023 - 03:45 PM",
        location: "Detroit, MI",
        status: "In Transit",
        description: "Package is in transit to the next facility",
      },
      {
        date: "April 21, 2023 - 11:30 AM",
        location: "Toledo, OH",
        status: "In Transit",
        description: "Package arrived at carrier facility",
      },
      {
        date: "April 25, 2023",
        location: "Chicago, IL",
        status: "Estimated Delivery",
        description: "Package is scheduled for delivery",
      },
    ],
  });

  const [newStatus, setNewStatus] = useState(tracking.status);
  const [newLocation, setNewLocation] = useState(tracking.currentLocation);
  const [newDescription, setNewDescription] = useState("");

  // State for dropdown menus
  const [statusOpen, setStatusOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);

  // Refs for click outside detection
  const statusRef = useRef(null);
  const locationRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (statusRef.current && !statusRef.current.contains(event.target)) {
        setStatusOpen(false);
      }
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setLocationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getProgressPercentage = (status) => {
    const statusMap = {
      Shipped: 25,
      "In Transit": 50,
      "Out for Delivery": 75,
      Delivered: 100,
    };
    return statusMap[status] || 0;
  };

  const progressPercentage = getProgressPercentage(tracking.status);

  const handleUpdateStatus = () => {
    const now = new Date();
    const dateOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const formattedDate = now.toLocaleDateString("en-US", dateOptions);

    // Create new update
    const newUpdate = {
      date: formattedDate,
      location: newLocation,
      status: newStatus,
      description: newDescription,
    };

    // Update tracking state
    setTracking((prev) => ({
      ...prev,
      status: newStatus,
      currentLocation: newLocation,
      updates: [...prev.updates, newUpdate],
    }));

    setNewDescription("");
  };

  const toggleAdminMode = () => {
    setIsAdmin(!isAdmin);
  };

  // Custom dropdown option component
  const DropdownOption = ({ value, onClick }) => (
    <div
      className="px-2 py-1.5 text-sm hover:bg-gray-100 cursor-pointer rounded"
      onClick={onClick}
    >
      {value}
    </div>
  );

  return (
    <Layout adminName={"Ali Othman"}>
        <PageContainer title="Track Customer Order" description="Track the status of customer orders and update shipping information.">
    <div >
      {/* Back button */}
      <div className="flex justify-between items-center mb-6">
        <Link to="/orders">
          <button className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Back to all Orders</span>
          </button>
        </Link>

        {/* Admin mode toggle */}
        <button
          onClick={toggleAdminMode}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-md ${
            isAdmin
              ? "bg-amber-100 text-amber-800 border border-amber-200"
              : "bg-gray-100 text-gray-800 border border-gray-200"
          }`}
        >
          <Shield className="h-4 w-4" />
          {isAdmin ? "Exit Admin Mode" : "Admin Mode"}
        </button>
      </div>

      {/* Tracking Header */}
      <div className="mb-6 border rounded-lg shadow-sm p-4">
        <div className="mb-2">
          <h2 className="text-xl font-semibold m-0">
            Track Purchase Order #{tracking.orderId}
          </h2>
          <p className="text-sm text-gray-500 m-0 pt-2 text-start">
            Tracking Number: {tracking.trackingNumber}
          </p>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {tracking.status}
            </span>
            <span className="text-gray-600">
              Estimated Delivery: {tracking.estimatedDelivery}
            </span>
          </div>
        </div>
      </div>

      {isAdmin && (
  <div className="mb-6 border-2 border-amber-200 bg-amber-50 rounded-lg p-4">
    <div className="pb-2 mb-2 border-b border-amber-100">
      <h3 className="text-lg flex items-center gap-2 font-semibold">
        <Shield className="h-5 w-5 text-amber-600" />
        Admin Controls
      </h3>
      <p className="text-sm text-gray-500">
        Update shipping status for this purchase order
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      {/* Status Dropdown */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Status</label>
        <div ref={statusRef} className="relative">
          <button
            type="button"
            className="flex items-center justify-between w-full p-2 border border-gray-300 rounded-md bg-white"
            onClick={() => setStatusOpen(!statusOpen)}
          >
            <span className="text-sm">{newStatus || "Select status"}</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>

          {statusOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg p-1">
              {["Shipped", "In Transit", "Out for Delivery", "Delivered"].map((status) => (
                <div
                  key={status}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded"
                  onClick={() => {
                    setNewStatus(status);
                    setStatusOpen(false);
                  }}
                >
                  {status}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Location Dropdown */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Current Location</label>
        <div ref={locationRef} className="relative">
          <button
            type="button"
            className="flex items-center justify-between w-full p-2 border border-gray-300 rounded-md bg-white"
            onClick={() => setLocationOpen(!locationOpen)}
          >
            <span className="text-sm">{newLocation || "Select location"}</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>

          {locationOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg p-1">
              {["Detroit, MI", "Toledo, OH", "Cleveland, OH", "Chicago, IL"].map((location) => (
                <div
                  key={location}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded"
                  onClick={() => {
                    setNewLocation(location);
                    setLocationOpen(false);
                  }}
                >
                  {location}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Description Field */}
    <div className="space-y-2 mb-4">
      <label className="text-sm font-medium">Update Description</label>
      <textarea
        className="w-full p-2 border border-gray-300 rounded-md"
        placeholder="Enter details about this status update"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
        rows={3}
      />
    </div>

    {/* Submit Button */}
    <div>
      <button
        onClick={handleUpdateStatus}
        className="w-full sm:w-auto flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        <Save className="h-4 w-4" />
        Update Shipping Status
      </button>
    </div>
  </div>
)}


      {/* Tracking Progress */}
      <div className="mb-6 border rounded-lg shadow-sm p-4">
        <h3 className="text-lg font-semibold mb-4 m-0">Shipping Progress</h3>
        <div className="relative mb-8">
          <div className="h-2 w-full bg-gray-200 rounded-full">
            <div
              className="h-full bg-green-500 rounded-full transition-all duration-1000"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          <div className="flex justify-between mt-2">
            {["Shipped", "In Transit", "Out for Delivery", "Delivered"].map(
              (label, idx) => {
                const thresholds = [25, 50, 75, 100];
                return (
                  <div key={label} className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 ${
                        progressPercentage >= thresholds[idx]
                          ? "bg-green-500"
                          : "bg-gray-300"
                      } rounded-full flex items-center justify-center text-white transition-colors`}
                    >
                      {idx === 0 && <Package className="h-4 w-4" />}
                      {(idx === 1 || idx === 2) && (
                        <Truck className="h-4 w-4" />
                      )}
                      {idx === 3 && <MapPin className="h-4 w-4" />}
                    </div>
                    <span className="text-xs mt-1 text-gray-600">{label}</span>
                  </div>
                );
              }
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-base font-medium text-gray-800 mb-2">
              Shipping Details
            </h3>
            <div className="space-y-5">
              <div className="flex flex-col items-start gap-2">
                <p className="text-sm text-gray-500 m-0">Carrier</p>
                <p className="font-medium m-0 text-black">{tracking.carrier}</p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <p className="text-sm text-gray-500 m-0">Origin</p>
                <p className="font-medium m-0 text-black">{tracking.origin}</p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <p className="text-sm text-gray-500 m-0">Destination</p>
                <p className="font-medium m-0 text-black">
                  {tracking.destination}
                </p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <p className="text-sm text-gray-500 m-0">Current Location</p>
                <p className="font-medium m-0 text-black">
                  {tracking.currentLocation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tracking History */}
      <div className="border rounded-lg shadow-sm p-4">
        <h3 className="text-lg font-semibold mb-4">Tracking History</h3>
        <div className="space-y-6">
          {tracking.updates.map((update, index) => (
            <div
              key={index}
              className="relative pl-6 pb-6 border-l-2 border-gray-200 last:border-l-transparent last:pb-0"
            >
              <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-green-500"></div>
              <div className="mb-1">
                <span className="font-medium">{update.status}</span>
                <span className="text-sm text-gray-500 ml-2">
                  {update.date}
                </span>
              </div>
              <div className="text-sm">
                <p className="text-gray-700">{update.location}</p>
                <p className="text-gray-600">{update.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
        </PageContainer>
    </Layout>
  );
}
