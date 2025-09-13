import React from "react";

const Color = {
  primary: "#6f4f38",
  secondary: "#eee6da",
  text: "#11181C",
  textSecondary: "#6f4f38",
  background: "#fff",
};

const Sidebar = ({ activeTab, setActiveTab }: any) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "products", label: "Products", icon: "🛍️" },
    { id: "categories", label: "Categories", icon: "📁" },
    { id: "orders", label: "Orders", icon: "📦" },
    { id: "customers", label: "Customers", icon: "👥" },
    { id: "analytics", label: "Analytics", icon: "📈" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <aside
      className="w-60 h-screen border-r flex flex-col"
      style={{
        backgroundColor: Color.background,
        borderColor: Color.secondary,
      }}
    >
      {/* Brand / Logo */}
      <div className="px-6 py-5 border-b flex items-center" style={{ borderColor: Color.secondary }}>
         <img src="src/assets/logo.png" alt="Logo" className="w-22 h-17 inline-block" />
        <h2
          className="text-lg font-semibold tracking-wide mr-3"
          style={{ color: Color.primary }}
        >
          कला तत्त्व
        </h2>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 py-6">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className="w-full flex items-center space-x-3 px-4 py-2 rounded-md text-sm font-medium text-left transition-colors"
                style={{
                  backgroundColor:
                    activeTab === item.id ? Color.secondary : "transparent",
                  color:
                    activeTab === item.id ? Color.primary : Color.textSecondary,
                }}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Help Section */}
      <div
        className="px-6 py-4 border-t"
        style={{ borderColor: Color.secondary }}
      >
        <h3
          className="text-sm font-medium mb-1"
          style={{ color: Color.primary }}
        >
          Need help?
        </h3>
        <p
          className="text-xs"
          style={{ color: Color.textSecondary }}
        >
          Contact our support team
        </p>
        <button
          className="mt-2 text-xs font-medium hover:underline"
          style={{ color: Color.primary }}
        >
          Get Help
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
