import React from 'react';

const Color = {
  primary: "#6f4f38",
  secondary: "#eee6da",
  text: "#11181C",
  textSecondary: "#6f4f38",
  background: "#fff",
};

function getImageUrl(src: string | File): string {
  if (src instanceof File) {
    return URL.createObjectURL(src);
  }
  return src;
}

const ProductCard = ({ product }: any) => {
  return (
    <div
      className="rounded-xl shadow-sm overflow-hidden"
      style={{ backgroundColor: Color.background }}
    >
      <div className="relative">
        <img
          src={product?.imageUrls?.[0]}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3">
          <span
            className="px-2 py-1 text-xs rounded-full"
            style={{
              backgroundColor:
                product.status === "Published" ? "#d1fae5" : Color.secondary,
              color: product.status === "Published" ? "#065f46" : Color.text,
            }}
          >
            {product.status}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-medium" style={{ color: Color.text }}>
          {product.name}
        </h3>
        <p className="text-sm mt-1" style={{ color: Color.textSecondary }}>
          {product.category}
        </p>

        <div className="flex justify-between items-center mt-4">
          <span className="font-bold" style={{ color: Color.primary }}>
            ₹{product.price}
          </span>
          <div className="flex space-x-2">
            <button
              className="p-2 rounded-lg"
              style={{ color: Color.textSecondary, backgroundColor: "transparent" }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
            <button
              className="p-2 rounded-lg"
              style={{ color: "red", backgroundColor: "transparent" }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
