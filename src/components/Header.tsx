import React from "react";

const Color = {
  primary: "#6f4f38",
  secondary: "#eee6da",
  text: "#11181C",
  textSecondary: "#6f4f38",
  background: "#fff",
};

const Header = () => {
  return (
    <header
      className="border-b px-6 py-3 flex justify-between items-center"
      style={{
        backgroundColor: Color.background,
        borderColor: Color.secondary,
      }}
    >
      {/* Left: Brand */}
      <div className="flex items-center space-x-2">
        <h1
          className="text-xl font-semibold tracking-wide"
          style={{ color: Color.primary }}
        >
          Dashboard
        </h1>
      </div>

      {/* Center: Search */}
      <div className="flex-1 max-w-md mx-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-9 pr-4 py-2 text-sm rounded-full outline-none border"
            style={{
              borderColor: Color.secondary,
              color: Color.text,
              backgroundColor: Color.secondary,
            }}
          />
          <svg
            className="w-5 h-5 absolute left-3 top-2.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            style={{ color: Color.textSecondary }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Right: Icons + User */}
      <div className="flex items-center space-x-6">
        {/* Notification */}
        <button
          className="relative focus:outline-none"
          style={{ color: Color.text }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span
            className="absolute -top-1 -right-1 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
            style={{ backgroundColor: Color.primary }}
          >
            3
          </span>
        </button>

        {/* User */}
        <div className="flex items-center space-x-3">
          <div
            className="h-9 w-9 rounded-full flex items-center justify-center font-medium text-sm shadow-sm"
            style={{
              backgroundColor: Color.secondary,
              color: Color.primary,
            }}
          >
            User
          </div>
          <span
            className="text-sm font-medium"
            style={{ color: Color.text }}
          >
            User-one
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
