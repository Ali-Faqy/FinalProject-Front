import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Package,
  Truck,
  Shield,
  Save,
  ChevronDown,
} from "lucide-react";
import Layout from "../UI/Layout.jsx";
import PageContainer from "../UI/PageContainer.jsx";
import {
  getTrackingInformation,
  insertTrackRecord,
  getTrackingHistory,
  getAllDrivers,
} from "../Data/TrackCustomerOrder.js";

export default function TrackCustomerOrder() {
  const params = useParams();
  const orderId = params.id;
  const [isAdmin, setIsAdmin] = useState(false);
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [deliveryPerson, setDeliveryPerson] = useState("");
  const [deliveryPersonOpen, setDeliveryPersonOpen] = useState(false);
  const [trackingHistory, setTrackingHistory] = useState(null);
  const [error, setError] = useState("");
  const [deliveryPersons, setDeliveryPersons] = useState(null);

  // const deliveryPersons = [
  //   "John Smith",
  //   "Emma Johnson",
  //   "Michael Brown",
  //   "Sarah Davis",
  //   "David Wilson",
  // ];

  const [statusOpen, setStatusOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);

  const statusRef = useRef(null);
  const locationRef = useRef(null);
  const deliveryPersonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (statusRef.current && !statusRef.current.contains(event.target))
        setStatusOpen(false);
      if (locationRef.current && !locationRef.current.contains(event.target))
        setLocationOpen(false);
      if (
        deliveryPersonRef.current &&
        !deliveryPersonRef.current.contains(event.target)
      )
        setDeliveryPersonOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchTrackingInfo = async () => {
    try {
      const data = await getTrackingInformation(orderId);
      if (data) {
        setTrackingInfo(data);
      } else {
        console.error("No tracking information found for this order.");
      }
    } catch (error) {
      console.error("Error fetching tracking information:", error);
    }
  };

  const fetchTrackingHistory = async () => {
    try {
      const data = await getTrackingHistory(orderId);
      if (data) {
        setTrackingHistory(data);
        console.log(data);
      } else {
        console.error("No tracking history found for this order.");
      }
    } catch (error) {
      console.error("Error fetching tracking information:", error);
    }
  };

  const fetchDrivers = async () => {
    try {
      const data = await getAllDrivers();
      if (data) {
        setDeliveryPersons(data);
      } else {
        console.error("No tracking history found for this order.");
      }
    } catch (error) {
      console.error("Error fetching tracking information:", error);
    }
  };

  useEffect(() => {
    fetchTrackingInfo();
    fetchTrackingHistory();
    fetchDrivers();
  }, []);

  const getProgressPercentage = (status) => {
    const statusMap = {
      "Order Placed": 0,
      Processing: 20,
      Shipped: 40,
      "In Transit": 60,
      "Out for Delivery": 80,
      Delivered: 100,
    };
    return statusMap[status] || 0;
  };

  const progressPercentage = getProgressPercentage(trackingInfo?.order_status);

  const handleUpdateStatus = async () => {
    if (newStatus === "Out for Delivery" && !deliveryPerson) {
      setError(
        "Please select a delivery person for 'Out for Delivery' status."
      );
      return;
    }
    if (!newStatus || !newLocation) {
      setError("Please fill in all fields before updating.");
      return;
    }
    setError("");

    const newRecord = {
      order_id: orderId,
      order_status: newStatus,
      location: newLocation,
      description: newDescription,
    };

    try {
      const data = await insertTrackRecord(newRecord);
      if (!data) {
        setError("Failed to update tracking information. Please try again.");
        return;
      }

      fetchTrackingInfo();
      setNewStatus("");
      setNewLocation("");
      setNewDescription("");
      setDeliveryPerson("");
      setError("");
    } catch (err) {
      console.error("Failed to update tracking info:", err);
      setError("An unexpected error occurred.");
    }
  };

  const toggleAdminMode = () => setIsAdmin(!isAdmin);

  if (!trackingInfo || !trackingHistory || !deliveryPersons) {
    return (
      <Layout adminName={localStorage.getItem("userName") || "Admin"}>
        <PageContainer
          title="Social Media Reports"
          description="Loading analytics data..."
        >
          <div className="p-6">
            <p className="text-center text-muted-foreground">
              Loading tracking data, please wait...
            </p>
          </div>
        </PageContainer>
      </Layout>
    );
  }
  return (
    <Layout adminName={localStorage.getItem("userName") || "Admin"}>
      <PageContainer
        title="Track Customer Order"
        description="Track the status of customer orders and update shipping information."
      >
        <div>
          {/* Back button and Admin toggle */}
          <div className="flex justify-between items-center mb-6">
            <Link to="/admin/orders/customers">
              <button className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span>Back to all Orders</span>
              </button>
            </Link>
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
                Track Purchase Order #{trackingInfo.order_id}
              </h2>
              <p className="text-sm text-gray-500 m-0 pt-2 text-start">
                Tracking Number: {trackingInfo.tracking_number}
              </p>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {trackingInfo.order_status}
                </span>
                <span className="text-gray-600">
                  Estimated Delivery: {trackingInfo.estimated_delivery}
                </span>
              </div>
            </div>
          </div>

          {/* Admin Controls */}
          {isAdmin && (
            <div className="mb-6 border-2 border-amber-200 bg-amber-50 rounded-lg p-4">
              <div className="pb-2 mb-2 border-b border-amber-200">
                <h3 className="text-lg flex items-center gap-2 font-semibold">
                  <Shield className="h-5 w-5 text-amber-600" />
                  Admin Controls
                </h3>
                <p className="text-sm text-gray-500">
                  Update shipping status for this purchase order
                </p>
              </div>

              {error && (
                <div className="mb-4 text-red-600 text-sm">{error}</div>
              )}

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
                      <span className="text-sm">
                        {newStatus || "Select status"}
                      </span>
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </button>
                    {statusOpen && (
                      <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg p-1">
                        {[
                          "Processing",
                          "Shipped",
                          "In Transit",
                          "Out for Delivery",
                          "Delivered",
                        ].map((status) => (
                          <div
                            key={status}
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded"
                            onClick={() => {
                              setNewStatus(status);
                              setStatusOpen(false);
                              setError("");
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
                  <label className="text-sm font-medium">
                    Current Location
                  </label>
                  <div ref={locationRef} className="relative">
                    <button
                      type="button"
                      className="flex items-center justify-between w-full p-2 border border-gray-300 rounded-md bg-white"
                      onClick={() => setLocationOpen(!locationOpen)}
                    >
                      <span className="text-sm">
                        {newLocation || "Select location"}
                      </span>
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </button>
                    {locationOpen && (
                      <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg p-1">
                        {[
                          "Jenin",
                          "Tubas",
                          "Tulkarm",
                          "Nablus",
                          "Qalqilya",
                          "Salfit",
                          "Ramallah and Al-Bireh",
                          "Jericho and Al-Aghwar",
                          "Bethlehem",
                          "Hebron",
                          "Jerusalem",
                        ].map((location) => (
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

              {/* Delivery Person Dropdown */}
              {newStatus === "Out for Delivery" && (
                <div className="space-y-2 mb-4">
                  <label className="text-sm font-medium">Delivery Person</label>
                  <div ref={deliveryPersonRef} className="relative">
                    <button
                      type="button"
                      className="flex items-center justify-between w-full p-2 border border-gray-300 rounded-md bg-white"
                      onClick={() => setDeliveryPersonOpen(!deliveryPersonOpen)}
                    >
                      <span className="text-sm">
                        {deliveryPerson || "Select delivery person"}
                      </span>
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </button>
                    {deliveryPersonOpen && (
                      <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg p-1">
                        {deliveryPersons.map((person) => (
                          <div
                            key={person.delivery_id}
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded"
                            onClick={() => {
                              setDeliveryPerson(person.delivery_name);
                              setDeliveryPersonOpen(false);
                              setError("");
                            }}
                          >
                            {person.delivery_name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Description Field */}
              <div className="space-y-2 mb-4">
                <label className="text-sm font-medium">
                  Update Description
                </label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter details about this status update"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  rows={3}
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleUpdateStatus}
                className="w-full sm:w-auto flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                <Save className="h-4 w-4" />
                Update Shipping Status
              </button>
            </div>
          )}

          {/* Tracking Progress */}
          <div className="mb-6 border rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-semibold mb-4 m-0">
              Shipping Progress
            </h3>
            <div className="relative mb-8">
              <div className="h-2 w-full bg-gray-200 rounded-full">
                <div
                  className="h-full bg-green-500 rounded-full transition-all duration-1000"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2">
                {[
                  "Order Placed",
                  "Processing",
                  "Shipped",
                  "In Transit",
                  "Out for Delivery",
                  "Delivered",
                ].map((label, idx) => {
                  const thresholds = [0, 20, 40, 60, 80, 100];
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
                        {(idx === 3 || idx === 4 || idx === 5) && (
                          <MapPin className="h-4 w-4" />
                        )}
                      </div>
                      <span className="text-xs mt-1 text-gray-600">
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-base font-medium text-gray-800 mb-2">
                  Shipping Details
                </h3>
                <div className="space-y-5">
                  <div className="flex flex-col items-start gap-2">
                    <p className="text-sm text-gray-500 m-0">Origin</p>
                    <p className="font-medium m-0 text-black">
                      Warehouse, {trackingInfo.origin_location}, Palestine
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-2">
                    <p className="text-sm text-gray-500 m-0">Destination</p>
                    <p className="font-medium m-0 text-black">
                      {trackingInfo.going_location}
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-2">
                    <p className="text-sm text-gray-500 m-0">
                      Current Location
                    </p>
                    <p className="font-medium m-0 text-black">
                      {trackingInfo.current_location}
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
              {trackingHistory.map((update, index) => (
                <div
                  key={index}
                  className="relative pl-6 pb-6 border-l-2 border-gray-200 last:border-l-transparent last:pb-0"
                >
                  <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-green-500"></div>
                  <div className="mb-1">
                    <span className="font-medium">{update.order_status}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      {update.order_date}
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
