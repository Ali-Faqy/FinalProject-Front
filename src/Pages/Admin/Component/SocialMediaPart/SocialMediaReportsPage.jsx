import { useState, useEffect } from "react"
import { Link }  from "react-router-dom"
import { AlertTriangle, ArrowLeft, ChevronLeft, ChevronRight, Download, Filter, MoreHorizontal, Search, ChevronDown} from 'lucide-react'
import {getReportedData} from "./ReportedData.js"
export default function SocialMediaReportsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const reportsPerPage = 5
  const [openDropdownId, setOpenDropdownId] = useState(null)
  const [activeTab, setActiveTab] = useState("all")
  const [openSelect, setOpenSelect] = useState(null)
  const [reports, setReports] = useState([])

  const fetchReportedData = async () => {
    try {
         const data = await getReportedData();
         setReports(data);
       } catch (error) {
         console.error("Error fetching sales analytics:", error);
       }
     };
     useEffect(() => {
       fetchReportedData();
     }, []);
  // Toast state for notifications
  const [toasts, setToasts] = useState([])

  // Toast function
  const toast = ({ title, description, variant = "default" }) => {
    const id = Date.now()
    setToasts([...toasts, { id, title, description, variant }])
    setTimeout(() => {
      setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id))
    }, 3000)
  }

  // Add these action handler functions
  const handleMarkAsReviewed = (reportId) => {
    setReports(
      reports.map((report) =>
        report.id === reportId
          ? {
              ...report,
              status: "reviewed",
              notes: report.notes + " | Marked as reviewed on " + new Date().toLocaleDateString(),
            }
          : report,
      ),
    )
    toast({
      title: "Report Reviewed",
      description: `Report #${reportId} has been marked as reviewed.`,
    })
  }

  const handleResolve = (reportId) => {
    setReports(
      reports.map((report) =>
        report.id === reportId
          ? { ...report, status: "resolved", notes: report.notes + " | Resolved on " + new Date().toLocaleDateString() }
          : report,
      ),
    )
    toast({
      title: "Report Resolved",
      description: `Report #${reportId} has been resolved.`,
    })
  }

  const handleRemoveContent = (reportId) => {
    // In a real app, this would call an API to remove the content
    // For now, we'll just update the status and add a note
    setReports(
      reports.map((report) =>
        report.id === reportId
          ? {
              ...report,
              status: "resolved",
              notes: report.notes + " | Content removed on " + new Date().toLocaleDateString(),
              content: "[Content has been removed]",
            }
          : report,
      ),
    )
    toast({
      title: "Content Removed",
      description: `Content from report #${reportId} has been removed.`,
      variant: "destructive",
    })
  }

  const handleViewDetails = (reportId) => {
    // This would navigate to a detailed view in a real app
    alert(`Viewing details for report #${reportId}`)
  }

  const handleViewOriginalContent = (reportId) => {
    // This would show the original content in a real app
    const report = reports.find((r) => r.id === reportId)
    alert(`Original content for report #${reportId}: ${report.content}`)
  }

  const handleContactUser = (reportId) => {
    // This would open a contact form in a real app
    const report = reports.find((r) => r.id === reportId)
    alert(`Contacting user @${report.user} regarding report #${reportId}`)
  }

  // Toggle dropdown
  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id)
  }

  // Toggle select
  const toggleSelect = (name) => {
    setOpenSelect(openSelect === name ? null : name)
  }

  // Filter reports
  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reportedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.postTitle.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || report.status === statusFilter
    const matchesType = typeFilter === "all" || report.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  // Pagination
  const totalPages = Math.ceil(filteredReports.length / reportsPerPage)
  const indexOfLastReport = currentPage * reportsPerPage
  const indexOfFirstReport = indexOfLastReport - reportsPerPage
  const currentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport)

  // Filter reports by tab
  const getReportsByTab = (tab) => {
    if (tab === "all") return currentReports
    return filteredReports.filter((report) => report.status === tab)
  }

  const displayReports = getReportsByTab(activeTab)

  return (
    <div className="p-6 space-y-6">
      {/* Toast notifications */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`p-4 rounded-md shadow-md ${
              toast.variant === "destructive" ? "bg-red-100 border border-red-200" : "bg-white border"
            } max-w-md`}
          >
            <div className="font-semibold text-black">{toast.title}</div>
            <div className="text-sm text-gray-600 text-black">{toast.description}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/socialMedia" className="p-2 border rounded-md hover:bg-gray-100">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="flex flex-col gap-1 items-start">
            <h1 className="text-3xl font-bold text-black m-0">Content Reports</h1>
            <p className="text-gray-500 m-0">Review and manage reported content</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-4 py-2 border rounded-md hover:bg-gray-100 flex items-center gap-2 cursor-pointer">
            <Download className="h-4 w-4" />
            Export Reports
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search reports..."
              className="w-full pl-8 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative w-full sm:w-[150px]">
            <div
              className="flex items-center justify-between w-full px-3 py-2 border rounded-md cursor-pointer"
              onClick={() => toggleSelect("status")}
            >
              <span>{statusFilter === "all" ? "All Status" : statusFilter}</span>
              <ChevronDown className="h-4 w-4" />
            </div>
            {openSelect === "status" && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                <div
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setStatusFilter("all")
                    setOpenSelect(null)
                  }}
                >
                  All Status
                </div>
                <div
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setStatusFilter("pending")
                    setOpenSelect(null)
                  }}
                >
                  Pending
                </div>
                <div
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setStatusFilter("reviewed")
                    setOpenSelect(null)
                  }}
                >
                  Reviewed
                </div>
                <div
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setStatusFilter("resolved")
                    setOpenSelect(null)
                  }}
                >
                  Resolved
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="relative w-full sm:w-[150px]">
            <div
              className="flex items-center justify-between w-full px-3 py-2 border rounded-md cursor-pointer"
              onClick={() => toggleSelect("type")}
            >
              <span>{typeFilter === "all" ? "All Types" : typeFilter}</span>
              <ChevronDown className="h-4 w-4" />
            </div>
            {openSelect === "type" && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                <div
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setTypeFilter("all")
                    setOpenSelect(null)
                  }}
                >
                  All Types
                </div>
                <div
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setTypeFilter("Post")
                    setOpenSelect(null)
                  }}
                >
                  Posts
                </div>
                <div
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setTypeFilter("Comment")
                    setOpenSelect(null)
                  }}
                >
                  Comments
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      <div className="space-y-4">
        <div className="flex border-b">
          <div
            className={`px-4 py-2 cursor-pointer ${
              activeTab === "all" ? "border-b-2 border-blue-600 font-medium" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("all")}
          >
            All Reports
          </div>
          <div
            className={`px-4 py-2 cursor-pointer ${
              activeTab === "pending" ? "border-b-2 border-blue-600 font-medium" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("pending")}
          >
            Pending
          </div>
          <div
            className={`px-4 py-2 cursor-pointer ${
              activeTab === "reviewed" ? "border-b-2 border-blue-600 font-medium" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("reviewed")}
          >
            Reviewed
          </div>
          <div
            className={`px-4 py-2 cursor-pointer ${
              activeTab === "resolved" ? "border-b-2 border-blue-600 font-medium" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("resolved")}
          >
            Resolved
          </div>
        </div>

        <div className="space-y-4 mt-4">
          {displayReports.length > 0 ? (
            <>
              {displayReports.map((report) => (
                <div
                  key={report.id}
                  className={`border rounded-lg`}
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        <AlertTriangle
                          className={`h-5 w-5`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div
                              className={`px-2 py-1 text-xs font-medium rounded-full ${
                                report.type === "Comment" ? "border text-gray-700" : "bg-gray-200 text-gray-800"
                              }`}
                            >
                              {report.type}
                            </div>
                            <div
                              className={`px-2 py-1 text-xs font-medium rounded-full ${
                                report.status === "pending"
                                  ? "bg-red-100 text-red-800"
                                  : report.status === "reviewed"
                                    ? "border text-gray-700"
                                    : "bg-green-100 text-green-800"
                              }`}
                            >
                              {report.status}
                            </div>
                          </div>
                          <div className="relative">
                            <div
                              className="p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                              onClick={() => toggleDropdown(report.id)}
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </div>
                            {openDropdownId === report.id && (
                              <div className="absolute right-0 z-10 mt-1 w-48 bg-white border rounded-md shadow-lg">
                                <div
                                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                  onClick={() => {
                                    handleViewDetails(report.id)
                                    setOpenDropdownId(null)
                                  }}
                                >
                                  View Details
                                </div>
                                <div
                                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                  onClick={() => {
                                    handleViewOriginalContent(report.id)
                                    setOpenDropdownId(null)
                                  }}
                                >
                                  View Original Content
                                </div>
                                <div
                                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                  onClick={() => {
                                    handleContactUser(report.id)
                                    setOpenDropdownId(null)
                                  }}
                                >
                                  Contact User
                                </div>
                                <div
                                  className="px-3 py-2 hover:bg-gray-100 text-red-600 cursor-pointer"
                                  onClick={() => {
                                    handleRemoveContent(report.id)
                                    setOpenDropdownId(null)
                                  }}
                                >
                                  Remove Content
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="mt-2">
                          <h3 className="text-lg font-semibold m-0">Report #{report.id}</h3>
                          <p className="mt-1 font-medium text-black text-start">Re: {report.postTitle}</p>
                          <p className="mt-1 text-black text-start">{report.content}</p>
                          <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-black m-0">User:</span>
                              <span className="text-sm m-0">@{report.user}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">Reported by:</span>
                              <span className="text-sm">@{report.reportedBy}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">Date:</span>
                              <span className="text-sm">{new Date(report.reportedDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                          {report.notes && (
                            <div className="flex flex-col items-start gap-2 mt-3 p-2 bg-gray-100 rounded-md">
                              <p className="text-sm font-medium text-black m-0">Notes:</p>
                              <p className="text-sm text-black m-0">{report.notes}</p>
                            </div>
                          )}
                          <div className="flex items-center gap-2 mt-4">
                            <button
                              className={`px-3 py-1 text-sm border rounded-md hover:bg-gray-100 ${
                                report.status === "reviewed" || report.status === "resolved"
                                  ? "opacity-50 cursor-not-allowed"
                                  : "cursor-pointer"
                              }`}
                              onClick={() => handleMarkAsReviewed(report.id)}
                              disabled={report.status === "reviewed" || report.status === "resolved"}
                            >
                              Mark as Reviewed
                            </button>
                            <button
                              className={`px-3 py-1 text-sm border rounded-md hover:bg-gray-100 ${
                                report.status === "resolved" ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                              }`}
                              onClick={() => handleResolve(report.id)}
                              disabled={report.status === "resolved"}
                            >
                              Resolve
                            </button>
                            <button
                              className={`px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 ${
                                report.content === "[Content has been removed]"
                                  ? "opacity-50 cursor-not-allowed"
                                  : "cursor-pointer"
                              }`}
                              onClick={() => handleRemoveContent(report.id)}
                              disabled={report.content === "[Content has been removed]"}
                            >
                              Remove Content
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Pagination */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Showing {indexOfFirstReport + 1}-{Math.min(indexOfLastReport, filteredReports.length)} of{" "}
                  {filteredReports.length} reports
                </p>
                <div className="flex items-center gap-1">
                  <button
                    className={`p-2 border rounded-md ${
                      currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100 cursor-pointer"
                    }`}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      className={`px-3 py-1 text-sm rounded-md ${
                        currentPage === page
                          ? "bg-blue-600 text-white"
                          : "border hover:bg-gray-100 cursor-pointer"
                      }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    className={`p-2 border rounded-md ${
                      currentPage === totalPages
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gray-100 cursor-pointer"
                    }`}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No reports match your search criteria</p>
              <button
                className="mt-4 px-4 py-2 border rounded-md hover:bg-gray-100"
                onClick={() => {
                  setSearchTerm("")
                  setStatusFilter("all")
                  setTypeFilter("all")
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
