import React from "react";
import {
  Activity,
  BarChart3,
  Calendar,
  ChevronDown,
  CreditCard,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Package,
  Settings,
  ShoppingBag,
  Users,
  Zap,
} from "lucide-react";

import pic from "../../assets/rengoku.jpg";

import { useState } from "react";

const menuItems = [
  {
    id: "dashborad",
    icon: LayoutDashboard,
    label: "Dashboard",
    active: true,
    badge: "New",
  },

  {
    id: "analytics ",
    icon: BarChart3,
    label: "Analytics",
    subMenu: [
      { id: "overview", label: " Overview" },
      { id: "reports", label: " Reports" },
      { id: "insights", label: "Insights" },
    ],
  },

  {
    id: "users",
    icon: Users,
    label: "Users",
    count: "2.4k",
    subMenu: [
      { id: "all-users", label: "All Users" },
      { id: "roles", label: "Role & Permissions" },
      { id: "activity", label: "User Activity" },
    ],

  },
  {
    id: "ecommerce",
    icon: ShoppingBag,
    label: "E-commerce",
    count: "2.4k",

    subMenu: [
      { id: "products", label: "Products" },
      { id: "orders", label: "Orders" },
      { id: "customers", label: "Customers" },
    ],
  },

  {
    id: "inventory",
    icon: Package,
    label: "Inventory",
    count: "847",
  },

  {
    id: "transcations",
    icon: CreditCard,
    label: "Transcations",
  },

  {
    id: "messages",
    icon: MessageSquare,
    label: "Messages",
    badge: 12,
  },

  {
    id: "calendar",
    icon: Calendar,
    label: "Calendar",
  },

  {
    id: "reports",
    icon: FileText,
    label: "Reports",
  },

  {
    id: "settings",
    icon: Settings,
    label: "Settings",
  },

];


const Sidebar = ({ Collapsed, onToggle, currentPage, onPageChange }) => {
  const [expandedItems, setExpandedItems] = useState(new Set(["analytics"]));

  const toggleExpanded = (itemid) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemid)) {
      newExpanded.delete(itemid);
    } else {
    newExpanded.add(itemid);
    }

    setExpandedItems(newExpanded);
  };

  return (
    <div
      className={`${
        Collapsed ? "w-20" : "w-72"
      } transition-all duration-300 ease-in-out bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-700/50 flex flex-col relative z-10 `}
    >
      {/* logo */}
      <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Zap className="w-6 h-6 text-white" />
          </div>
          {/* condition rendering */}
          {!Collapsed && (
            <div className="text-xl font-bold text-slate-800 dark:text-white">
              <h1 className="text-xl font-bold text-slate-800 dark:text-white">
                vishal
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Admin panel
              </p>
            </div>
          )}
        </div>
      </div>

      {/* display dynamic menus */}
      <nav className=" flex-1 p-4 space-x-2 overflow-y-auto">
        {menuItems.map((item) => {
          return (
            <div key={item.id}>
              <button
                className={`w-full mb-0.5 flex items-center justify-between p-3 rounded-xl transition-all duration-200
                  ${
                    currentPage === item.id || item.active
                      ? " bg-gradient-to-r from-red-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 "
                      : " text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                  }
                  
           `}
                onClick={() => {
                  if (item.subMenu) {
                    toggleExpanded(item.id);
                  } else {
                    onPageChange(item.id);
                  }
                }}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5" />

                  {/* condition rendering  */}

                  {!Collapsed && (
                    <>
                      <span className="font-medium ml-2">{item.label}</span>
                      {item.badge && (
                        <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full">
                          {item.badge}
                        </span>
                      )}

                      {item.count && (
                        <span className="px-2 py-1 text-xs bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full">
                          {item.count}
                        </span>
                      )}
                    </>
                  )}
                </div>

                {!Collapsed && item.subMenu && (
                  <ChevronDown className="w-4 h-4 transition-transform" />
                )}
              </button>

              {/* submenus */}

              {!Collapsed && item.subMenu && expandedItems.has(item.id) && (
                <div className="ml-8 mt-2 space-y-1">
                  {item.subMenu.map((subitem) => {
                    return (
                      <button
                        className=" w-full text-left p-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg transition-all
                "
                      >
                        {subitem.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* user profile */}
      {!Collapsed && (
        <div className="p-4 border-t border-slate-200/50 dark:border-slate-700/50 ">
          <div
            className=" flex items-center space-x-3 p-3 rounded-xl
 bg-slate-50 dark:bg-slate-800/50"
          >
            <img
              className="w-10 h-10 rounded-full ring-2 ring-blue-500"
              src={pic}
              alt=""
            />
            <div className="flex-1 min-w-0">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 dark:text-white truncate">
                  vishal daksh
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                  administrator
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
