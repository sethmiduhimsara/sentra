
import {
  LayoutDashboard,
  MessageSquare,
  History,
  Mic,
  Settings,
  Info,
  Sparkles,
} from "lucide-react";

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const navigationItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "new-chat", label: "New Chat", icon: MessageSquare },
  { id: "history", label: "Chat History", icon: History },
  { id: "voice", label: "Voice Assistant", icon: Mic },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "about", label: "About", icon: Info },
];

function Sidebar({ activePage, onNavigate }: SidebarProps) {
  return (
    <aside className="sentra-sidebar">
      <div className="sidebar-brand">
        <div className="brand-logo">
          <span>S</span>
        </div>

        <h1>SENTRA</h1>
        <p>Your Personal AI Assistant</p>
      </div>

      <nav className="sidebar-navigation">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`nav-item ${isActive ? "active" : ""}`}
            >
              <Icon size={20} strokeWidth={2} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-status">
          <div className="status-heading">
            <span className="online-dot" />
            <span>System Status</span>
          </div>

          <p>All Systems Online</p>
        </div>

        <div className="sidebar-powered">
          <Sparkles size={15} />
          <span>Powered by Google Gemini</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
