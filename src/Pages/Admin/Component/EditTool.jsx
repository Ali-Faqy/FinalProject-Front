import { useState, useEffect } from "react"
import { useNavigate, Link, useParams } from "react-router-dom"
import { ArrowLeft, ImageIcon, Loader2, Save, X, Trash2, AlertTriangle } from "lucide-react"
import Layout from "../UI/Layout"
import PageContainer from "../UI/PageContainer"

export default function EditTool() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditMode = !!id
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [images, setImages] = useState([])
  const [formData, setFormData] = useState({
    product_name: "",
    year_of_manufacture: "",
    original_price: "",
    selling_price: "",
    offer_percentage: "",
    quantity: "",
    how_use_it: "",
    description: "",
    category: "",
    sub_category: "",
  })

  const categories = [
    "Tractors",
    "Harvesters",
    "Irrigation",
    "Drones",
    "Tools",
    "Seeds",
    "Fertilizers",
    "Parts",
    "Other",
  ]

  // Fetch product data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      // Simulating API call to fetch product data
      const fetchProductData = async () => {
        try {
          // In a real app, you would fetch data from your API
          // For demo purposes, we'll use mock data
          await new Promise((resolve) => setTimeout(resolve, 500))

          // Mock data for the product being edited
          const productData = {
            product_name: "Compact Tractor X200",
            year_of_manufacture: "2022",
            original_price: "26000",
            selling_price: "24500",
            offer_percentage: "5",
            quantity: "24",
            how_use_it:
              "1. Prepare the soil by clearing debris\n2. Attach appropriate implements\n3. Adjust settings for the specific task\n4. Operate at recommended speed",
            description:
              "The Compact Tractor X200 is a versatile and powerful machine designed for small to medium-sized farms and landscaping projects. With its efficient engine and compact design, it offers excellent maneuverability while providing enough power for demanding tasks.",
            category: "Tractors",
            sub_category: "Compact",
            images: ["/placeholder.svg?height=200&width=200", "/placeholder.svg?height=200&width=200"],
          }

          setFormData(productData)
          setImages(productData.images.map((img) => img))
        } catch (error) {
          console.error("Error fetching product data:", error)
          alert("Failed to load product data. Please try again.")
        }
      }

      fetchProductData()
    }
  }, [id, isEditMode])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImages((prev) => [...prev, reader.result])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      alert(isEditMode ? "Product updated successfully!" : "Product added successfully!")
      navigate("/tools")
    } catch (error) {
      console.error(isEditMode ? "Error updating product:" : "Error adding product:", error)
      alert(isEditMode ? "Failed to update product. Please try again." : "Failed to add product. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      alert("Product deleted successfully!")
      navigate("/tools")
    } catch (error) {
      console.error("Error deleting product:", error)
      alert("Failed to delete product. Please try again.")
    } finally {
      setIsDeleting(false)
      setShowDeleteConfirm(false)
    }
  }

  return (
    <Layout adminName={localStorage.getItem("userName") || "Admin"}>
      <PageContainer
        title={isEditMode ? "Edit Product" : "Add New Product"}
        description={isEditMode ? "Update product information" : "Add a new product to your inventory"}
      >
          <button className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Back to Products</span>
          </button>


        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  "product_name",
                  "year_of_manufacture",
                  "original_price",
                  "selling_price",
                  "offer_percentage",
                  "quantity",
                ].map((field) => (
                  <div key={field}>
                    <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">
                      {field.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      {["product_name", "year_of_manufacture", "original_price", "selling_price", "quantity"].includes(
                        field,
                      ) && <span className="text-red-500"> *</span>}
                    </label>
                    <input
                      type={
                        [
                          "year_of_manufacture",
                          "original_price",
                          "selling_price",
                          "offer_percentage",
                          "quantity",
                        ].includes(field)
                          ? "number"
                          : "text"
                      }
                      min={
                        field === "year_of_manufacture"
                          ? "1900"
                          : ["original_price", "selling_price", "offer_percentage", "quantity"].includes(field)
                            ? "0"
                            : undefined
                      }
                      id={field}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      required={[
                        "product_name",
                        "year_of_manufacture",
                        "original_price",
                        "selling_price",
                        "quantity",
                      ].includes(field)}
                      className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                ))}

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="sub_category" className="block text-sm font-medium text-gray-700 mb-1">
                    Sub-category
                  </label>
                  <input
                    type="text"
                    id="sub_category"
                    name="sub_category"
                    value={formData.sub_category}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Product Description */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Product Description</h2>
              {["description", "how_use_it", "uses", "specifications"].map((field) => (
                <div key={field}>
                  <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">
                    {field.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    {field === "description" && <span className="text-red-500"> *</span>}
                  </label>
                  <textarea
                    id={field}
                    name={field}
                    value={formData[field] || ""}
                    onChange={handleChange}
                    rows={5}
                    required={field === "description"}
                    className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder={
                      field === "description"
                        ? "Enter product description"
                        : field === "how_use_it"
                          ? "List how to use product"
                          : field === "uses"
                            ? "List uses of product"
                            : "engine: 4-cylinder\nhorsepower: 1200 HP\nweight: 2000 kg"
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Product Images</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Product ${index + 1}`}
                        className="object-contain h-full w-full p-2"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                ))}
                <label className="cursor-pointer aspect-square bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors">
                  <ImageIcon className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Add Image</span>
                  <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Upload product images. The first image will be used as the main product image.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between">
            {isEditMode && (
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Product
              </button>
            )}
            <div className="flex ml-auto">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg mr-4 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white rounded-lg transition-all duration-300 hover:shadow-lg flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    {isEditMode ? "Update Product" : "Add Product"}
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <div className="flex items-center text-red-500 mb-4">
                <AlertTriangle className="h-6 w-6 mr-2" />
                <h3 className="text-lg font-semibold">Confirm Deletion</h3>
              </div>
              <p className="text-gray-700 mb-6">
                Are you sure you want to delete this product? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    "Delete Product"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </PageContainer>
    </Layout>
  )
}
