"use client"

import { useState, useEffect } from "react"
import { Plus, Edit, Eye, Phone, Mail, MapPin, Car, Building, Truck, X, Upload, Lock } from "lucide-react"
import Layout from "../UI/Layout.jsx"
import PageContainer from "../UI/PageContainer.jsx"
import {
  getAllDrivers,
  editDriver,
  insertDriver,
  getAllCompanies,
  insertCompany,
  editCompany,
  getAllSuppliers,
  insertSupplier,
  editSupplier,
} from "../Data/SettingData.js"

// Custom Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SettingsPage() {
  // Active tab state
  const [activeTab, setActiveTab] = useState("drivers")

  // State for each entity
  const [drivers, setDrivers] = useState([])
  const [companies, setCompanies] = useState([])
  const [suppliers, setSuppliers] = useState([])

  // Loading and error states
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Modal states
  const [isDriverModalOpen, setIsDriverModalOpen] = useState(false)
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false)
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  // Form states
  const [currentDriver, setCurrentDriver] = useState({})
  const [currentCompany, setCurrentCompany] = useState({})
  const [currentSupplier, setCurrentSupplier] = useState({})
  const [viewData, setViewData] = useState(null)
  const [viewType, setViewType] = useState("")

  // Edit mode states
  const [editingDriverId, setEditingDriverId] = useState(null)
  const [editingCompanyId, setEditingCompanyId] = useState(null)
  const [editingSupplierId, setEditingSupplierId] = useState(null)

  // File upload state
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  // Fetch all data on component mount
  useEffect(() => {
    fetchAllData()
  }, [])

  const fetchAllData = async () => {
    await Promise.all([fetchDrivers(), fetchCompanies(), fetchSuppliers()])
  }

  const fetchDrivers = async () => {
    try {
      setLoading(true)
      setError(null)
      const driversData = await getAllDrivers()
      // Map API response to include email and password
      const mappedDrivers = driversData.map((driver) => ({
        id: driver.id,
        name: driver.name,
        phone: driver.phone,
        email: driver.email || "",
        password: driver.password || "",
        photo: driver.photo,
        vehicleId: driver.vehicleId,
      }))
      setDrivers(mappedDrivers)
    } catch (err) {
      setError("Failed to fetch drivers")
      console.error("Error fetching drivers:", err)
    } finally {
      setLoading(false)
    }
  }

  const fetchCompanies = async () => {
    try {
      setLoading(true)
      setError(null)
      const companiesData = await getAllCompanies()
      // Map API response to component state format
      const mappedCompanies = companiesData.map((company) => ({
        id: company.company_id,
        name: company.company_name,
        phone: company.company_phone,
        location: company.location,
      }))
      setCompanies(mappedCompanies)
    } catch (err) {
      setError("Failed to fetch companies")
      console.error("Error fetching companies:", err)
    } finally {
      setLoading(false)
    }
  }

  const fetchSuppliers = async () => {
    try {
      setLoading(true)
      setError(null)
      const suppliersData = await getAllSuppliers()
      // Map API response to component state format
      const mappedSuppliers = suppliersData.map((supplier) => ({
        id: supplier.supplier_id,
        name: supplier.name,
        phone: supplier.phone,
        email: supplier.email,
        address: supplier.address,
      }))
      setSuppliers(mappedSuppliers)
    } catch (err) {
      setError("Failed to fetch suppliers")
      console.error("Error fetching suppliers:", err)
    } finally {
      setLoading(false)
    }
  }

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)

      // Create preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
        setCurrentDriver({ ...currentDriver, photo: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  // Driver CRUD operations
  const handleAddDriver = async () => {
    if (currentDriver.name && currentDriver.phone && currentDriver.email && currentDriver.vehicleId) {
      try {
        setLoading(true)
        setError(null)

        const newDriverData = {
          name: currentDriver.name,
          phone: currentDriver.phone,
          email: currentDriver.email,
          password: currentDriver.password || "", // Password is optional
          photo: currentDriver.photo || "/placeholder.svg?height=40&width=40",
          vehicleId: currentDriver.vehicleId,
        }

        const insertedDriver = await insertDriver(newDriverData)

        // Add the new driver to local state
        setDrivers([...drivers, insertedDriver])

        setCurrentDriver({})
        setSelectedFile(null)
        setPreviewUrl(null)
        setIsDriverModalOpen(false)
      } catch (err) {
        setError("Failed to add driver")
        console.error("Error adding driver:", err)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleUpdateDriver = async () => {
    if (editingDriverId && currentDriver.name && currentDriver.phone && currentDriver.email && currentDriver.vehicleId) {
      try {
        setLoading(true)
        setError(null)

        const updateData = {
          id: Number.parseInt(editingDriverId),
          name: currentDriver.name,
          phone: currentDriver.phone,
          email: currentDriver.email,
          password: currentDriver.password || "",
          photo: currentDriver.photo,
          vehicleId: currentDriver.vehicleId,
        }

        await editDriver(updateData)

        // Update local state
        setDrivers(drivers.map((driver) => (driver.id === editingDriverId ? { ...driver, ...currentDriver } : driver)))

        setCurrentDriver({})
        setEditingDriverId(null)
        setSelectedFile(null)
        setPreviewUrl(null)
        setIsDriverModalOpen(false)
      } catch (err) {
        setError("Failed to update driver")
        console.error("Error updating driver:", err)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleEditDriver = (driver) => {
    setCurrentDriver(driver)
    setEditingDriverId(driver.id)
    setPreviewUrl(driver.photo)
    setIsDriverModalOpen(true)
  }

  const handleViewDriver = (driver) => {
    setViewData(driver)
    setViewType("driver")
    setIsViewModalOpen(true)
  }

  // Company CRUD operations
  const handleAddCompany = async () => {
    if (currentCompany.name && currentCompany.phone && currentCompany.location) {
      try {
        setLoading(true)
        setError(null)

        const newCompanyData = {
          company_name: currentCompany.name,
          company_phone: currentCompany.phone,
          location: currentCompany.location,
        }

        const insertedCompany = await insertCompany(newCompanyData)

        // Map response and add to local state
        const mappedCompany = {
          id: insertedCompany.company_id,
          name: insertedCompany.company_name,
          phone: insertedCompany.company_phone,
          location: insertedCompany.location,
        }

        setCompanies([...companies, mappedCompany])
        setCurrentCompany({})
        setIsCompanyModalOpen(false)
      } catch (err) {
        setError("Failed to add company")
        console.error("Error adding company:", err)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleUpdateCompany = async () => {
    if (editingCompanyId && currentCompany.name && currentCompany.phone && currentCompany.location) {
      try {
        setLoading(true)
        setError(null)

        const updateData = {
          company_id: Number.parseInt(editingCompanyId),
          company_name: currentCompany.name,
          company_phone: currentCompany.phone,
          location: currentCompany.location,
        }
        console.log("Update Data:", updateData)
        await editCompany(updateData)

        // Update local state
        setCompanies(
          companies.map((company) => (company.id === editingCompanyId ? { ...company, ...currentCompany } : company)),
        )

        setCurrentCompany({})
        setEditingCompanyId(null)
        setIsCompanyModalOpen(false)
      } catch (err) {
        setError("Failed to update company")
        console.error("Error updating company:", err)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleEditCompany = (company) => {
    setCurrentCompany(company)
    setEditingCompanyId(company.id)
    setIsCompanyModalOpen(true)
  }

  const handleViewCompany = (company) => {
    setViewData(company)
    setViewType("company")
    setIsViewModalOpen(true)
  }

  // Supplier CRUD operations
  const handleAddSupplier = async () => {
    if (currentSupplier.name && currentSupplier.phone && currentSupplier.email && currentSupplier.address) {
      try {
        setLoading(true)
        setError(null)

        const newSupplierData = {
          name: currentSupplier.name,
          phone: currentSupplier.phone,
          email: currentSupplier.email,
          address: currentSupplier.address,
        }

        const insertedSupplier = await insertSupplier(newSupplierData)

        // Add to local state
        const mappedSupplier = {
          id: insertedSupplier.supplier_id,
          name: insertedSupplier.name,
          phone: insertedSupplier.phone,
          email: insertedSupplier.email,
          address: insertedSupplier.address,
        }

        setSuppliers([...suppliers, mappedSupplier])
        setCurrentSupplier({})
        setIsSupplierModalOpen(false)
      } catch (err) {
        setError("Failed to add supplier")
        console.error("Error adding supplier:", err)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleUpdateSupplier = async () => {
    if (
      editingSupplierId &&
      currentSupplier.name &&
      currentSupplier.phone &&
      currentSupplier.email &&
      currentSupplier.address
    ) {
      try {
        setLoading(true)
        setError(null)

        const updateData = {
          supplier_id: Number.parseInt(editingSupplierId),
          name: currentSupplier.name,
          phone: currentSupplier.phone,
          email: currentSupplier.email,
          address: currentSupplier.address,
        }

        await editSupplier(updateData)

        // Update local state
        setSuppliers(
          suppliers.map((supplier) =>
            supplier.id === editingSupplierId ? { ...supplier, ...currentSupplier } : supplier,
          ),
        )

        setCurrentSupplier({})
        setEditingSupplierId(null)
        setIsSupplierModalOpen(false)
      } catch (err) {
        setError("Failed to update supplier")
        console.error("Error updating supplier:", err)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleEditSupplier = (supplier) => {
    setCurrentSupplier(supplier)
    setEditingSupplierId(supplier.id)
    setIsSupplierModalOpen(true)
  }

  const handleViewSupplier = (supplier) => {
    setViewData(supplier)
    setViewType("supplier")
    setIsViewModalOpen(true)
  }

  const resetModals = () => {
    setCurrentDriver({})
    setCurrentCompany({})
    setCurrentSupplier({})
    setEditingDriverId(null)
    setEditingCompanyId(null)
    setEditingSupplierId(null)
    setSelectedFile(null)
    setPreviewUrl(null)
  }

  return (
    <Layout adminName={localStorage.getItem("userName") || "Admin"}>
      <PageContainer title="Settings" description="Manage drivers, companies, and suppliers">
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto p-6 max-w-7xl">
            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
                <button onClick={() => setError(null)} className="float-right text-red-700 hover:text-red-900">
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Custom Tabs */}
            <div className="w-full">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setActiveTab("drivers")}
                    className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === "drivers"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <Car className="h-4 w-4" />
                    <span>Drivers</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("companies")}
                    className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === "companies"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <Building className="h-4 w-4" />
                    <span>Companies</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("suppliers")}
                    className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === "suppliers"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <Truck className="h-4 w-4" />
                    <span>Suppliers</span>
                  </button>
                </nav>
              </div>

              {/* Drivers Tab */}
              {activeTab === "drivers" && (
                <div className="mt-6">
                  <div className="bg-white shadow rounded-lg">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg leading-6 font-medium text-gray-900">Drivers Management</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Manage your drivers and their vehicle assignments
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            resetModals()
                            setIsDriverModalOpen(true)
                          }}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                          disabled={loading}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Driver
                        </button>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      {loading ? (
                        <div className="flex justify-center items-center py-8">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                      ) : (
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Photo
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Phone
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Vehicle ID
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {drivers.map((driver) => (
                              <tr key={driver.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <img
                                    src={driver.photo || "/placeholder.svg"}
                                    alt={driver.name}
                                    className="w-10 h-10 rounded-full object-cover"
                                  />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {driver.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  <div className="flex items-center space-x-1">
                                    <Phone className="h-4 w-4 text-gray-400" />
                                    <span>{driver.phone}</span>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  <div className="flex items-center space-x-1">
                                    <Mail className="h-4 w-4 text-gray-400" />
                                    <span>{driver.email}</span>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {driver.vehicleId}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  <div className="flex space-x-2">
                                    <button
                                      onClick={() => handleViewDriver(driver)}
                                      className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"
                                    >
                                      <Eye className="h-4 w-4" />
                                    </button>
                                    <button
                                      onClick={() => handleEditDriver(driver)}
                                      className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50 transition-colors"
                                      disabled={loading}
                                    >
                                      <Edit className="h-4 w-4" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Companies Tab */}
              {activeTab === "companies" && (
                <div className="mt-6">
                  <div className="bg-white shadow rounded-lg">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg leading-6 font-medium text-gray-900">Companies Management</h3>
                          <p className="text-sm text-gray-500 mt-1">Manage company information and contacts</p>
                        </div>
                        <button
                          onClick={() => {
                            resetModals()
                            setIsCompanyModalOpen(true)
                          }}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                          disabled={loading}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Company
                        </button>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Phone
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Location
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {companies.map((company) => (
                            <tr key={company.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {company.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <Phone className="h-4 w-4 text-gray-400" />
                                  <span>{company.phone}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <MapPin className="h-4 w-4 text-gray-400" />
                                  <span>{company.location}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => handleViewCompany(company)}
                                    className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"
                                  >
                                    <Eye className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => handleEditCompany(company)}
                                    className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50 transition-colors"
                                    disabled={loading}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Suppliers Tab */}
              {activeTab === "suppliers" && (
                <div className="mt-6">
                  <div className="bg-white shadow rounded-lg">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg leading-6 font-medium text-gray-900">Suppliers Management</h3>
                          <p className="text-sm text-gray-500 mt-1">Manage supplier contacts and information</p>
                        </div>
                        <button
                          onClick={() => {
                            resetModals()
                            setIsSupplierModalOpen(true)
                          }}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                          disabled={loading}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Supplier
                        </button>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Phone
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Address
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {suppliers.map((supplier) => (
                            <tr key={supplier.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {supplier.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <Phone className="h-4 w-4 text-gray-400" />
                                  <span>{supplier.phone}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <Mail className="h-4 w-4 text-gray-400" />
                                  <span>{supplier.email}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <MapPin className="h-4 w-4 text-gray-400" />
                                  <span className="truncate max-w-xs">{supplier.address}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => handleViewSupplier(supplier)}
                                    className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"
                                  >
                                    <Eye className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => handleEditSupplier(supplier)}
                                    className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50 transition-colors"
                                    disabled={loading}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Driver Modal */}
            <Modal
              isOpen={isDriverModalOpen}
              onClose={() => {
                setIsDriverModalOpen(false)
                resetModals()
              }}
              title={editingDriverId ? "Edit Driver" : "Add New Driver"}
            >
              <div className="space-y-4">
                <div>
                  <label htmlFor="driver-name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="driver-name"
                    value={currentDriver.name || ""}
                    onChange={(e) => setCurrentDriver({ ...currentDriver, name: e.target.value })}
                    placeholder="Enter driver name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="driver-phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="driver-phone"
                    value={currentDriver.phone || ""}
                    onChange={(e) => setCurrentDriver({ ...currentDriver, phone: e.target.value })}
                    placeholder="Enter phone number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="driver-email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="driver-email"
                    value={currentDriver.email || ""}
                    onChange={(e) => setCurrentDriver({ ...currentDriver, email: e.target.value })}
                    placeholder="Enter email address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="driver-password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="driver-password"
                    value={currentDriver.password || ""}
                    onChange={(e) => setCurrentDriver({ ...currentDriver, password: e.target.value })}
                    placeholder="Enter password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="driver-photo" className="block text-sm font-medium text-gray-700 mb-2">
                    Photo
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-4">
                      {previewUrl && (
                        <img
                          src={previewUrl || "/placeholder.svg"}
                          alt="Preview"
                          className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
                        />
                      )}
                      <div className="flex-1">
                        <input
                          type="file"
                          id="driver-photo"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <label
                          htmlFor="driver-photo"
                          className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          {selectedFile ? "Change Photo" : "Upload Photo"}
                        </label>
                      </div>
                    </div>
                    {selectedFile && <p className="text-sm text-gray-500">Selected: {selectedFile.name}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="driver-vehicle" className="block text-sm font-medium text-gray-700 mb-2">
                    Vehicle ID
                  </label>
                  <input
                    type="text"
                    id="driver-vehicle"
                    value={currentDriver.vehicleId || ""}
                    onChange={(e) => setCurrentDriver({ ...currentDriver, vehicleId: e.target.value })}
                    placeholder="Enter vehicle ID"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                <button
                  onClick={editingDriverId ? handleUpdateDriver : handleAddDriver}
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {editingDriverId ? "Updating..." : "Adding..."}
                    </div>
                  ) : editingDriverId ? (
                    "Update Driver"
                  ) : (
                    "Add Driver"
                  )}
                </button>
              </div>
            </Modal>

            {/* Company Modal */}
            <Modal
              isOpen={isCompanyModalOpen}
              onClose={() => {
                setIsCompanyModalOpen(false)
                resetModals()
              }}
              title={editingCompanyId ? "Edit Company" : "Add New Company"}
            >
              <div className="space-y-4">
                <div>
                  <label htmlFor="company-name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="company-name"
                    value={currentCompany.name || ""}
                    onChange={(e) => setCurrentCompany({ ...currentCompany, name: e.target.value })}
                    placeholder="Enter company name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="company-phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="company-phone"
                    value={currentCompany.phone || ""}
                    onChange={(e) => setCurrentCompany({ ...currentCompany, phone: e.target.value })}
                    placeholder="Enter phone number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="company-location" className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    id="company-location"
                    value={currentCompany.location || ""}
                    onChange={(e) => setCurrentCompany({ ...currentCompany, location: e.target.value })}
                    placeholder="Enter location"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                <button
                  onClick={editingCompanyId ? handleUpdateCompany : handleAddCompany}
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {editingCompanyId ? "Updating..." : "Adding..."}
                    </div>
                  ) : editingCompanyId ? (
                    "Update Company"
                  ) : (
                    "Add Company"
                  )}
                </button>
              </div>
            </Modal>

            {/* Supplier Modal */}
            <Modal
              isOpen={isSupplierModalOpen}
              onClose={() => {
                setIsSupplierModalOpen(false)
                resetModals()
              }}
              title={editingSupplierId ? "Edit Supplier" : "Add New Supplier"}
            >
              <div className="space-y-4">
                <div>
                  <label htmlFor="supplier-name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="supplier-name"
                    value={currentSupplier.name || ""}
                    onChange={(e) => setCurrentSupplier({ ...currentSupplier, name: e.target.value })}
                    placeholder="Enter supplier name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="supplier-phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="supplier-phone"
                    value={currentSupplier.phone || ""}
                    onChange={(e) => setCurrentSupplier({ ...currentSupplier, phone: e.target.value })}
                    placeholder="Enter phone number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="supplier-email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="supplier-email"
                    value={currentSupplier.email || ""}
                    onChange={(e) => setCurrentSupplier({ ...currentSupplier, email: e.target.value })}
                    placeholder="Enter email address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="supplier-address" className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <textarea
                    id="supplier-address"
                    value={currentSupplier.address || ""}
                    onChange={(e) => setCurrentSupplier({ ...currentSupplier, address: e.target.value })}
                    placeholder="Enter address"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  />
                </div>
                <button
                  onClick={editingSupplierId ? handleUpdateSupplier : handleAddSupplier}
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {editingSupplierId ? "Updating..." : "Adding..."}
                    </div>
                  ) : editingSupplierId ? (
                    "Update Supplier"
                  ) : (
                    "Add Supplier"
                  )}
                </button>
              </div>
            </Modal>

            {/* View Modal */}
            <Modal
              isOpen={isViewModalOpen}
              onClose={() => setIsViewModalOpen(false)}
              title={
                viewType === "driver"
                  ? "Driver Details"
                  : viewType === "company"
                    ? "Company Details"
                    : "Supplier Details"
              }
            >
              {viewData && (
                <div className="space-y-4">
                  {viewType === "driver" && (
                    <>
                      <div className="flex items-center space-x-4">
                        <img
                          src={viewData.photo || "/placeholder.svg"}
                          alt={viewData.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="text-lg font-semibold">{viewData.name}</h3>
                          <p className="text-sm text-gray-500">Driver ID: {viewData.id}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                          <p className="flex items-center space-x-1 mt-1">
                            <Phone className="h-4 w-4 text-gray-500" />
                            <span>{viewData.phone}</span>
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Email</label>
                          <p className="flex items-center space-x-1 mt-1">
                            <Mail className="h-4 w-4 text-gray-500" />
                            <span>{viewData.email}</span>
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Vehicle ID</label>
                          <p className="flex items-center space-x-1 mt-1">
                            <Car className="h-4 w-4 text-gray-500" />
                            <span>{viewData.vehicleId}</span>
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                  {viewType === "company" && (
                    <>
                      <div>
                        <h3 className="text-lg font-semibold">{viewData.name}</h3>
                        <p className="text-sm text-gray-500">Company ID: {viewData.id}</p>
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                          <p className="flex items-center space-x-1 mt-1">
                            <Phone className="h-4 w-4 text-gray-500" />
                            <span>{viewData.phone}</span>
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Location</label>
                          <p className="flex items-center space-x-1 mt-1">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span>{viewData.location}</span>
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                  {viewType === "supplier" && (
                    <>
                      <div>
                        <h3 className="text-lg font-semibold">{viewData.name}</h3>
                        <p className="text-sm text-gray-500">Supplier ID: {viewData.id}</p>
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                          <p className="flex items-center space-x-1 mt-1">
                            <Phone className="h-4 w-4 text-gray-500" />
                            <span>{viewData.phone}</span>
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Email</label>
                          <p className="flex items-center space-x-1 mt-1">
                            <Mail className="h-4 w-4 text-gray-500" />
                            <span>{viewData.email}</span>
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Address</label>
                          <p className="flex items-center space-x-1 mt-1">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span>{viewData.address}</span>
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </Modal>
          </div>
        </div>
      </PageContainer>
    </Layout>
  )
}