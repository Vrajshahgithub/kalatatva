import { db } from "../Firebase.config";
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

const AddCategoryForm = ({ onAddCategory, onCancel }: any) => {
  const [category, setCategory] = useState({
    name: "",
    description: "",
    imageUrls: [""], // Array of image URLs
    status: "Active",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUrlChange = (index: number, value: string) => {
    setCategory((prev) => {
      const newImageUrls = [...prev.imageUrls];
      newImageUrls[index] = value;
      return { ...prev, imageUrls: newImageUrls };
    });
  };

  const handleAddImageUrl = () => {
    setCategory((prev) => ({
      ...prev,
      imageUrls: [...prev.imageUrls, ""],
    }));
  };

  const handleRemoveImageUrl = (index: number) => {
    setCategory((prev) => {
      const newImageUrls = prev.imageUrls.filter((_, i) => i !== index);
      return { ...prev, imageUrls: newImageUrls };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "categories"), {
        name: category.name,
        description: category.description,
        imageUrls: category.imageUrls.filter((url) => url.trim() !== ""),
        status: category.status,
        productCount: 0,
        createdAt: serverTimestamp(),
      });

      toast.success("✅ Category added successfully!");

      setCategory({
        name: "",
        description: "",
        imageUrls: [""],
        status: "Active",
      });

      onAddCategory && onAddCategory();
    } catch (error: any) {
      console.error("❌ Error adding category:", error);
      toast.error("Error adding category. Please try again.");
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
          Add New Category
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Category Name */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: Color.text }}
            >
              Category Name
            </label>
            <input
              type="text"
              name="name"
              value={category.name}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-2"
              style={{
                borderColor: Color.primary,
                color: Color.text,
                backgroundColor: Color.secondary,
              }}
              required
            />
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
              value={category.description}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-2"
              rows={3}
              style={{
                borderColor: Color.primary,
                color: Color.text,
                backgroundColor: Color.secondary,
              }}
            />
          </div>

          {/* Multiple Image URLs */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: Color.text }}
            >
              Image URLs
            </label>
            {category.imageUrls.map((url, idx) => (
              <div key={idx} className="flex items-center mb-2">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => handleImageUrlChange(idx, e.target.value)}
                  className="w-full rounded-lg border px-4 py-2"
                  style={{
                    borderColor: Color.primary,
                    color: Color.text,
                    backgroundColor: Color.secondary,
                  }}
                  placeholder={`Image URL ${idx + 1}`}
                  required={idx === 0}
                />
                {category.imageUrls.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveImageUrl(idx)}
                    className="ml-2 px-2 py-1 rounded bg-red-100 text-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddImageUrl}
              className="mt-2 px-3 py-1 rounded bg-green-100 text-green-700"
            >
              Add Another Image
            </button>
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
              value={category.status}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-2"
              style={{
                borderColor: Color.primary,
                color: Color.text,
                backgroundColor: Color.secondary,
              }}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2 rounded-lg border"
              style={{
                borderColor: Color.primary,
                color: Color.text,
                backgroundColor: Color.secondary,
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg"
              style={{
                backgroundColor: Color.primary,
                color: Color.background,
                opacity: loading ? 0.5 : 1,
              }}
            >
              {loading ? "Adding..." : "Add Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryForm;