import { FcBiohazard } from "react-icons/fc";
import { GiAce } from "react-icons/gi";
import { createRoot } from "react-dom/client";
import './assets/tailwind.css';
import Sidebar from "./layouts/Sidebar";
import Header from "./layouts/Header";
import Dashboard from "./pages/Dashboard";

createRoot(document.getElementById("root"))
    .render(
        <div id="app-container" className="bg-gray-100 min-h-screen flex">
            {/* Ini pertemuan 5
           <FcBiohazard />
           <GiAce className="text-5xl text-merah"/> */}
            <div id="layout-wrapper" className="flex flex-row flex-1">
                <Sidebar />
                <div id="main-content" className="flex-1 p-4">
                    <Header />
                    <Dashboard />
                </div>
            </div>
        </div>
    )

