import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AlertCircle,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Download,
  MessageCircle,
  Search,
  Shield,
  ThumbsUp,
} from "lucide-react";

import { getActiveUsers } from "./UsersData.js";

export default function SocialMediaUsersPage() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("engagement");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("all");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const usersPerPage = 5;

  const fetchActiveUser = async () => {
    try {
      setLoading(true);
      const data = await getActiveUsers();
      if (!data) {
        throw new Error("Failed to fetch active users data");
      }
      // Map boolean status to string and add default role
      const mappedData = data.map((user) => ({
        ...user,
        status: user.status ? "active" : "inactive",
        role: user.role || "user", // Default to "user" if role is undefined
      }));
      setUsers(mappedData);
      setError(null);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveUser();
  }, []);

  // Get users based on active tab
  const getTabUsers = () => {
    switch (activeTab) {
      case "active":
        return users.filter((user) => user.status === "active");
      case "inactive":
        return users.filter((user) => user.status === "inactive");
      case "reported":
        return users.filter((user) => user.reports > 0);
      default:
        return users;
    }
  };

  // Filter and sort users
  const filteredUsers = getTabUsers()
    .filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.location &&
          user.location.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStatus =
        statusFilter === "all" ||
        user.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "engagement") {
        return (b.engagement || 0) - (a.engagement || 0);
      } else if (sortBy === "posts") {
        return (b.posts || 0) - (a.posts || 0);
      } else if (sortBy === "joined") {
        return new Date(b.joined).getTime() - new Date(a.joined).getTime();
      } else if (sortBy === "reports") {
        return (b.reports || 0) - (a.reports || 0);
      }
      return 0;
    });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Handle export users (placeholder)
  const handleExportUsers = () => {
    console.log("Exporting users:", filteredUsers);
    alert("Export functionality not implemented yet.");
  };

  // Tabs for filtering users
  const tabs = [
    { id: "all", label: "All Users" },
    { id: "active", label: "Active" },
    { id: "inactive", label: "Inactive" },
    { id: "reported", label: "Reported" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            to="/socialMedia"
            className="inline-flex items-center justify-center h-10 w-10 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="flex flex-col items-start">
            <h1 className="text-3xl font-bold text-black m-0">
              Community Users
            </h1>
            <p className="text-muted-foreground m-0">
              Manage and monitor user accounts
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            onClick={handleExportUsers}
          >
            <Download className="h-4 w-4 mr-2" />
            Export Users
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === tab.id
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => {
              setActiveTab(tab.id);
              setCurrentPage(1);
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search users..."
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-8 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          {activeTab === "all" && (
            <div className="relative w-full sm:w-[150px]">
              <div
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              >
                <span>
                  {statusFilter === "all"
                    ? "All Status"
                    : statusFilter === "active"
                    ? "Active"
                    : "Inactive"}
                </span>
                <ChevronRight
                  className={`h-4 w-4 transition-transform ${
                    showStatusDropdown ? "rotate-90" : ""
                  }`}
                />
              </div>
              {showStatusDropdown && (
                <div className="absolute z-10 mt-1 w-full rounded-md border border-input bg-white shadow-lg">
                  <div className="py-1">
                    <div
                      className="px-3 py-2 text-sm hover:bg-accent cursor-pointer"
                      onClick={() => {
                        setStatusFilter("all");
                        setShowStatusDropdown(false);
                        setCurrentPage(1);
                      }}
                    >
                      All Status
                    </div>
                    <div
                      className="px-3 py-2 text-sm hover:bg-accent cursor-pointer"
                      onClick={() => {
                        setStatusFilter("active");
                        setShowStatusDropdown(false);
                        setCurrentPage(1);
                      }}
                    >
                      Active
                    </div>
                    <div
                      className="px-3 py-2 text-sm hover:bg-accent cursor-pointer"
                      onClick={() => {
                        setStatusFilter("inactive");
                        setShowStatusDropdown(false);
                        setCurrentPage(1);
                      }}
                    >
                      Inactive
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="relative w-full sm:w-[180px]">
            <div
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
              onClick={() => setShowSortDropdown(!showSortDropdown)}
            >
              <span>
                {sortBy === "engagement"
                  ? "Engagement"
                  : sortBy === "posts"
                  ? "Post Count"
                  : sortBy === "joined"
                  ? "Join Date"
                  : "Report Count"}
              </span>
              <ChevronRight
                className={`h-4 w-4 transition-transform ${
                  showSortDropdown ? "rotate-90" : ""
                }`}
              />
            </div>
            {showSortDropdown && (
              <div className="absolute z-10 mt-1 w-full rounded-md border border-input bg-white shadow-lg">
                <div className="py-1">
                  <div
                    className="px-3 py-2 text-sm hover:bg-accent cursor-pointer"
                    onClick={() => {
                      setSortBy("engagement");
                      setShowSortDropdown(false);
                      setCurrentPage(1);
                    }}
                  >
                    Engagement
                  </div>
                  <div
                    className="px-3 py-2 text-sm hover:bg-accent cursor-pointer"
                    onClick={() => {
                      setSortBy("posts");
                      setShowSortDropdown(false);
                      setCurrentPage(1);
                    }}
                  >
                    Post Count
                  </div>
                  <div
                    className="px-3 py-2 text-sm hover:bg-accent cursor-pointer"
                    onClick={() => {
                      setSortBy("joined");
                      setShowSortDropdown(false);
                      setCurrentPage(1);
                    }}
                  >
                    Join Date
                  </div>
                  <div
                    className="px-3 py-2 text-sm hover:bg-accent cursor-pointer"
                    onClick={() => {
                      setSortBy("reports");
                      setShowSortDropdown(false);
                      setCurrentPage(1);
                    }}
                  >
                    Report Count
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading users...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="flex items-center justify-center gap-2 text-red-500">
              <AlertCircle className="h-5 w-5" />
              <p className="text-muted-foreground">{error}</p>
            </div>
            <button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 mt-4"
              onClick={fetchActiveUser}
            >
              Retry
            </button>
          </div>
        ) : currentUsers.length > 0 ? (
          <>
            {currentUsers.map((user) => (
              <div
                key={user.id}
                className={`rounded-lg border bg-card text-card-foreground shadow-sm p-6 ${
                  user.status === "inactive"
                    ? "border-gray-200 bg-gray-50/30"
                    : ""
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex gap-4">
                    <div className="relative flex h-16 w-16 shrink-0 overflow-hidden rounded-full">
                      <img
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                        className="aspect-square h-full w-full"
                      />
                    </div>
                    <div className="flex flex-col items-start">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold m-0">
                          {user.name}
                        </h3>
                      </div>
                      <p className="text-muted-foreground m-0">
                        @{user.username}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            user.status === "active"
                              ? "bg-green-500 text-white"
                              : "border border-gray-300 text-foreground"
                          }`}
                        >
                          {user.status === "active" ? "Active" : "Inactive"}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 md:mt-0">
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-sm font-medium text-black m-0">
                        Contact
                      </p>
                      <p className="text-sm text-black m-0">{user.email}</p>
                      <p className="text-sm text-black m-0">
                        {user.location || "N/A"}
                      </p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-sm font-medium text-black m-0">
                        Activity
                      </p>
                      <p className="text-sm text-muted-foreground m-0">
                        Joined: {new Date(user.joined).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-black text-start m-0">
                        Engagement
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="relative w-full h-2 overflow-hidden rounded-full bg-gray-200">
                          <div
                            className="h-full bg-black"
                            style={{
                              width: `${Math.min(user.engagement || 0, 100)}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-sm text-black m-0">
                          {user.engagement || 0}%
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-1">
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" />
                          <span className="text-xs">{user.posts || 0} Posts</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" />
                          <span className="text-xs">
                            {user.comments || 0} Comments
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" />
                          <span className="text-xs">{user.likes || 0} Likes</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 mt-4 md:mt-0">
                    <Link
                      to={`/customers/${user.id}`}
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 py-2"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>

                {user.reports > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-red-500" />
                        <p className="text-sm font-medium text-red-500 m-0">
                          This user has {user.reports} report
                          {user.reports > 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Pagination */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {indexOfFirstUser + 1}-
                {Math.min(indexOfLastUser, filteredUsers.length)} of{" "}
                {filteredUsers.length} users
              </p>
              <div className="flex items-center gap-1">
                <button
                  className={`inline-flex items-center justify-center h-10 w-10 rounded-md border border-input bg-background ${
                    currentPage === 1
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-accent hover:text-accent-foreground"
                  }`}
                  onClick={() =>
                    currentPage > 1 && setCurrentPage(currentPage - 1)
                  }
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      className={`inline-flex items-center justify-center h-9 min-w-[2.25rem] rounded-md text-sm font-medium ${
                        currentPage === page
                          ? "bg-primary text-primary-foreground"
                          : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                      }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  className={`inline-flex items-center justify-center h-10 w-10 rounded-md border border-input bg-background ${
                    currentPage === totalPages
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-accent hover:text-accent-foreground"
                  }`}
                  onClick={() =>
                    currentPage < totalPages && setCurrentPage(currentPage + 1)
                  }
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No users match your search criteria
            </p>
            <button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 mt-4"
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setCurrentPage(1);
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}