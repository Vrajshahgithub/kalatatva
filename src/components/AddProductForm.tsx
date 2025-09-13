import { db } from "../Firebase.config"
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { toast } from "react-toastify";

const Color = {
  primary: "#6f4f38",
  secondary: "#eee6da",
  text: "#11181C",
  textSecondary: "#6f4f38",
  background: "#fff",
};

// ...existing code...
const AddProductForm = ({ onAddProduct, onCancel }: any) => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    history: "",
    imageUrls: [""], // Start with one empty input
    status: "Draft",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle change for a specific image URL input
  const handleImageUrlChange = (idx: number, value: string) => {
    setProduct((prev) => {
      const newUrls = [...prev.imageUrls];
      newUrls[idx] = value;
      return { ...prev, imageUrls: newUrls };
    });
  };

  // Add new image URL input
  const handleAddImageUrl = () => {
    setProduct((prev) => ({
      ...prev,
      imageUrls: [...prev.imageUrls, ""],
    }));
  };

  // Remove an image URL input
  const handleRemoveImageUrl = (idx: number) => {
    setProduct((prev) => {
      const newUrls = prev.imageUrls.filter((_, i) => i !== idx);
      return { ...prev, imageUrls: newUrls };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    toast.success("✅ Product added successfully!");
    setProduct({
      name: "",
      price: "",
      category: "",
      description: "",
      history: "",
      imageUrls: [""],
      status: "Draft",
    });

    onAddProduct();

    try {
      await addDoc(collection(db, "products"), {
        name: product.name,
        price: parseFloat(product.price),
        category: product.category,
        description: product.description,
        history: product.history,
        imageUrls: product.imageUrls.filter((url) => url.trim() !== ""), // filter out empty
        status: product.status,
        createdAt: serverTimestamp(),
      });

    } catch (error: any) {
      console.error("❌ Error adding product:", error);

      if (error.code === "permission-denied") {
        toast.error("Permission denied. Please check Firebase Firestore rules.");
      } else {
        toast.error("Error adding product. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 z-50"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div
        className="rounded-2xl shadow-lg p-8 w-full max-w-lg"
        style={{ backgroundColor: Color.background }}
      >
        <h2
          className="text-2xl font-semibold mb-6 text-center"
          style={{ color: Color.primary }}
        >
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Product Name */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: Color.text }}
            >
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-2"
              style={{ borderColor: Color.secondary, color: Color.text }}
              required
            />
          </div>

          {/* Price */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: Color.text }}
            >
              Price
            </label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-2"
              style={{ borderColor: Color.secondary, color: Color.text }}
              required
            />
          </div>

          {/* Category */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: Color.text }}
            >
              Category
            </label>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-2"
              style={{ borderColor: Color.secondary, color: Color.text }}
              required
            >
              <option value="">Select a category</option>
              <option value="Paintings and Visual-arts">
                Paintings and Visual-arts
              </option>
              <option value="Textiles and Weaving">Textiles and Weaving</option>
              <option value="Crafts from natural materials">
                Crafts from natural materials
              </option>
              <option value="Metal and Jewellery work">
                Metal and Jewellery work
              </option>
              <option value="Pottery and Terracotta">Pottery and Terracotta</option>
              <option value="Performing arts">Performing arts</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: Color.text }}
            >
              Description
            </label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-2"
              style={{ borderColor: Color.secondary, color: Color.text }}
            />
          </div>

          {/* History */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: Color.text }}
            >
              Product History
            </label>
            <textarea
              name="history"
              value={product.history}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-2"
              style={{ borderColor: Color.secondary, color: Color.text }}
              placeholder="Describe the history and background of this product..."
              rows={4}
            />
          </div>

          {/* Multiple Image URLs Input */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: Color.text }}
            >
              Image URLs
            </label>
            {product.imageUrls.map((url, idx) => (
              <div key={idx} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => handleImageUrlChange(idx, e.target.value)}
                  className="w-full rounded-lg border px-4 py-2"
                  style={{ borderColor: Color.secondary, color: Color.textSecondary }}
                  placeholder={`Image URL #${idx + 1}`}
                />
                {product.imageUrls.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveImageUrl(idx)}
                    className="px-2 py-1 rounded bg-red-100 text-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddImageUrl}
              className="mt-2 px-4 py-1 rounded bg-green-100 text-green-700"
            >
              + Add New Image
            </button>
            {/* Preview images */}
            <div className="flex flex-wrap gap-2 mt-2">
              {product.imageUrls
                .filter((url) => url.trim() !== "")
                .map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`preview-${idx}`}
                    className="w-20 h-20 object-contain rounded border"
                    style={{ borderColor: Color.secondary }}
                  />
                ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: Color.text }}
            >
              Status
            </label>
            <select
              name="status"
              value={product.status}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-2"
              style={{ borderColor: Color.secondary, color: Color.text }}
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2 rounded-lg border hover:opacity-80"
              style={{ color: Color.text, borderColor: Color.secondary }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg text-white hover:opacity-90"
              style={{ backgroundColor: Color.primary }}
            >
              {loading ? "Adding..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
// ...existing code...
// ...existing code...