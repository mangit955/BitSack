import { useEffect, useState } from "react";
import {
  Search,
  Bell,
  Settings,
  ShoppingBag,
  List,
  MessageCircle,
  CreditCard,
  Users,
  HelpCircle,
  Home,
  Share2,
  Plus,
} from "lucide-react";
import axios from "axios";
import { CreateContentModel } from "../components/ui/CreateContentModel";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { useContent } from "../hooks/useContent";
import { BACKEND_URL } from "../config";
import logo2 from "../assets/logo2.png";
import pp1 from "../assets/pp1.jpeg";

interface ContentItem {
  type: string;
  link: string;
  title: string;
}

export default function Dashboard() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    contents,
    refresh,
  }: { contents: ContentItem[]; refresh: () => void } = useContent();

  // Refresh when modal closes/opens
  useEffect(() => {
    refresh();
  }, [isModalOpen, refresh]);

  /** Handles brain sharing */
  const handleShare = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/brain/content/share`,
        { share: true },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const shareUrl = `${BACKEND_URL}/share/${response.data.hash}`;
      alert(`Your brain is shared at: ${shareUrl}`);
    } catch (error) {
      console.error("Error sharing brain:", error);
      alert("Failed to share. Please try again.");
    }
  };

  /** Sidebar items */
  const mainMenu = [
    { label: "Dashboard", icon: Home },
    { label: "Youtube", icon: ShoppingBag },
    { label: "Instagram", icon: List },
    { label: "X", icon: MessageCircle },
  ];

  const secondaryMenu = [
    { label: "Settings", icon: Settings },
    { label: "Payment", icon: CreditCard },
    { label: "Accounts", icon: Users },
    { label: "Help", icon: HelpCircle },
  ];

  return (
    <div className="flex h-screen bg-cover bg-center bg-no-repeat p-4">
      {/* Sidebar */}
      <aside className="w-64 bg-neutral-100 shadow-md flex flex-col rounded-xl">
        <div className="p-6 flex items-center gap-3">
          {/* Logo Image */}
          <img
            src={logo2} // replace with your logo path
            alt="Logo"
            className="w-16 h-16 rounded-full"
          />
          {/* Text */}
          <span className="font-bold text-lg text-black/70">BitSACK</span>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {mainMenu.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => setActiveMenu(label)}
              className={`relative flex items-center gap-3 px-3 py-2 w-full rounded-lg text-left transition-all duration-300 ease-in-out ${
                activeMenu === label
                  ? "bg-indigo-50 text-indigo-600" // Changed to indigo to match indicator
                  : "text-gray-600 hover:bg-gray-200 hover:text-gray-800"
              }`}
            >
              {/* Indigo left border indicator */}
              <div
                className={`absolute left-0 top-0 h-full w-1 bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-700 rounded-r-full transition-all duration-300 ease-in-out ${
                  activeMenu === label
                    ? "opacity-100 scale-y-100"
                    : "opacity-0 scale-y-0"
                }`}
              />
              {/* Icon with smooth color transition */}
              <Icon
                size={18}
                className="transition-colors duration-300 ease-in-out"
              />
              {/* Text with smooth color transition */}
              <span className="transition-colors duration-300 ease-in-out">
                {label}
              </span>
            </button>
          ))}

          <hr className="my-4" />

          {secondaryMenu.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className="relative flex items-center gap-3 px-3 py-2 w-full rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-800 text-left transition-all duration-300 ease-in-out"
            >
              <Icon
                size={18}
                className="transition-colors duration-300 ease-in-out"
              />
              <span className="transition-colors duration-300 ease-in-out">
                {label}
              </span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col pl-4">
        {/* Top Navbar */}
        <header className="flex items-center justify-between bg-neutral-100 px-6 py-3 shadow-md rounded-xl pl-4">
          {/* Search Bar */}
          <div className="flex items-center bg-white rounded-lg px-3 py-2 w-1/3 shadow-sm">
            <Search size={18} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <div className="p-2 bg-white rounded-full shadow-sm">
              <Bell size={20} className="text-gray-600 cursor-pointer" />
            </div>
            <div className="flex items-center gap-4 rounded-full shadow-md">
              <img src={pp1} alt="profile" className="w-8 h-8 rounded-full" />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-y-auto relative">
          {/* Modal Overlay */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
              <CreateContentModel
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              />
            </div>
          )}

          {/* Cards */}
          <div
            className={`transition ${
              isModalOpen ? "blur-sm pointer-events-none" : ""
            }`}
          >
            <div className=" relative bg-neutral-100 rounded-xl shadow-md p-4 w-full h-full flex flex-col">
              {/* Top buttons aligned to the right */}
              <div className="flex justify-end gap-2 mb-4">
                <Button
                  onClick={() => setIsModalOpen(true)}
                  startIcon={<Plus size={16} />}
                  variant="primary"
                  size="sm"
                  text="Create"
                />
                <Button
                  onClick={handleShare}
                  startIcon={<Share2 size={16} />}
                  variant="secondary"
                  size="sm"
                  text="Share"
                />
              </div>

              {/* Grid of cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {contents
                  .filter(
                    ({ type }) => type === "twitter" || type === "youtube"
                  )
                  .map(({ type, link, title }) => (
                    <div key={link}>
                      <Card
                        type={type as "twitter" | "youtube"}
                        link={link}
                        title={title}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
