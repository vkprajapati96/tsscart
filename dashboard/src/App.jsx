import React from "react";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import { useState } from "react";
import Dashboard from "./components/dashboard/Dashboard";
// const stats =[
//     {
//         title:"Total Revenue",
//         value:"$124,563",
//         change:"+12.5%",
//         trend: "up",
//         icon:DollarSign,
//         color:"from-emerald-500 to-real-600",
//         bgColor:"bg-emerald-50 dark:bg-emerald-900/20",
//         textColor:"text-emerald-600 dark:text-emerald-400",
//     },
//      {
//         title:"Active Users",
//         value:"8,549",
//         change:"+8.5%",
//         trend: "up",
//         icon:User,
//         color:"from-blue-500 to-indigo-600",
//         bgColor:"bg-blue-50 dark:bg-blue-900/20",
//         textColor:"text-blue-600 dark:text-blue-400",
//     },
//      {
//         title:"Total Orders",
//         value:"2,847",
//         change:"+15.5%",
//         trend: "up",
//         icon:ShoppingCart,
//         color:"from-purple-500 to-pink-600",
//         bgColor:"bg-purple-50 dark:bg-purple-900/20",
//         textColor:"text-purple-600 dark:text-purple-400",
//     },
//      {
//         title:"page Views",
//         value:"45,892",
//         change:"-2.1%",
//         trend: "down",
//         icon:Eye,
//         color:"from-Orange-500 to-red-600",
//         bgColor:"bg-Orange-50 dark:bg-Orange-900/20",
//         textColor:"text-Orange-600 dark:text-Orange-400 " ,
    
//     },

// ]


const App = () => {
const [sideBarCollapsed,setSideBarCollapses ]  = useState(false);
const [currentPage,setCurrentPage]   = useState("dashboard")

  return (
    <div className=" min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-500">
<div className="flex h-screen overflow-hidden ">
  <Sidebar 
   Collapsed={sideBarCollapsed}
   onToggle={()=>setSideBarCollapses(!sideBarCollapsed)}
   currentPage={currentPage}
   onPageChange={setCurrentPage}
  />
  <div className="flex-1 flex flex-col overflow-hidden">
    <Header sideBarCollapsed={sideBarCollapsed} onToggleSideBar={()=>setSideBarCollapses(!sideBarCollapsed)}/>

      <main className=" flex-1 overflow-y-auto bg-transparent">
        <div className="p-6 space-y-6">
          {currentPage=== "dashborad"  && <Dashboard/> }
        </div>
      </main>
  </div>
</div>
    </div>
  );

};

export default App;
