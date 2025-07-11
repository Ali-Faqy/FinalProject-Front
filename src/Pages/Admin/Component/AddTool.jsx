"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { ArrowLeft, ImageIcon, Loader2, Save, X } from "lucide-react"
import Layout from "../UI/Layout"
import PageContainer from "../UI/PageContainer"

export default function AddTool() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
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
    specifications: "",
    company_id: "",
    sub_category_id: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImages((prev) => [...prev, { file, preview: reader.result }])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index))
  }

  // Convert base64 to File object
  const base64ToFile = (base64String, filename) => {
    const arr = base64String.split(",")
    const mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, { type: mime })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Prepare the product data
      const productData = {
        product_name: formData.product_name,
        year_of_manufacture: Number.parseInt(formData.year_of_manufacture),
        original_price: Number.parseFloat(formData.original_price),
        selling_price: Number.parseFloat(formData.selling_price),
        offer_percentage: formData.offer_percentage ? Number.parseFloat(formData.offer_percentage) : 0,
        total_quantity: Number.parseInt(formData.quantity),
        remaining_quantity: Number.parseInt(formData.quantity),
        how_use_it: formData.how_use_it,
        description: formData.description,
        specifications: formData.specifications,
        company_id: formData.company_id ? Number.parseInt(formData.company_id) : null,
        sub_category_id: formData.sub_category_id ? Number.parseInt(formData.sub_category_id) : null,
      }

      // Create FormData for the request
      const submitFormData = new FormData()

      // Add JSON data as string
      submitFormData.append("json_data", JSON.stringify(productData))

      // Add the first image as attachment if exists
      if (images.length > 0) {
        const firstImage = images[0]
        if (firstImage.file) {
          // If we have the original file, use it
          submitFormData.append("attachment", firstImage.file)
        } else if (firstImage.preview) {
          // If we only have base64, convert it to File
          const file = base64ToFile(firstImage.preview, `product-image-${Date.now()}.jpg`)
          submitFormData.append("attachment", file)
        }
      }

      // Submit to the API
      const response = await fetch("http://localhost:8000/AI/predict-and-create-product", {
        method: "POST",
        body: submitFormData,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      // Success handling
      alert("Product added successfully with AI-predicted metadata!")
      navigate("/tools")
    } catch (error) {
      console.error("Error adding product:", error)
      alert(`Failed to add product: ${error.message}. Please try again.`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Layout adminName="Ali Othman">
      <PageContainer title="Add New Product" description="Add a new product to your inventory">
        <Link to="/tools">
          <button
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Back to Products</span>
          </button>
        </Link>

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
                  "company_id",
                  "sub_category_id",
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
                          "company_id",
                          "sub_category_id",
                        ].includes(field)
                          ? "number"
                          : "text"
                      }
                      min={
                        field === "year_of_manufacture"
                          ? "1900"
                          : [
                                "original_price",
                                "selling_price",
                                "offer_percentage",
                                "quantity",
                                "company_id",
                                "sub_category_id",
                              ].includes(field)
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
              </div>
            </div>
          </div>

          {/* Product Description */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Product Description</h2>
              {["description", "how_use_it", "specifications"].map((field) => (
                <div key={field}>
                  <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">
                    {field.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    {field === "description" && <span className="text-red-500"> *</span>}
                  </label>
                  <textarea
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    rows={5}
                    required={field === "description"}
                    className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder={
                      field === "description"
                        ? "Enter product description"
                        : field === "how_use_it"
                          ? "Describe how to use this product"
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
                        src={image.preview || "/placeholder.svg"}
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
                Upload product images. The first image will be sent to the AI for metadata prediction.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end">
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
              className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white rounded-lg transition-all duration-300 hover:shadow-lg flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing with AI...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Add Product
                </>
              )}
            </button>
          </div>
        </form>
      </PageContainer>
    </Layout>
  )
}
