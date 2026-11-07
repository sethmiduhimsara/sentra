
import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";
import AssistantPanel from "./components/AssistantPanel";
import ChatPanel from "./components/ChatPanel";
import StatusBar from "./components/StatusBar";

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [backendOnline, setBackendOnline] = useState(false);

  // Check backend connection
  useEffect(() => {
    let isMounted = true;

    async function checkBackend() {
      try {
        const response = await fetch("http://127.0.0.1:8000/health");

        if (isMounted) {
          setBackendOnline(response.ok);
        }
      } catch {
        if (isMounted) {
          setBackendOnline(false);
        }
      }
    }

    checkBackend();

    const interval = window.setInterval(checkBackend, 15000);

    return () => {
      isMounted = false;
      window.clearInterval(interval);
    };
  }, []);

  function handleVoiceClick() {
    setActivePage("voice");

    window.alert(
      "SENTRA voice recognition will be connected in the next development step."
    );
  }

  function handleNavigate(page: string) {
    setActivePage(page);
  }

  return (
    <main className="sentra-app">

      <Sidebar
        activePage={activePage}
        onNavigate={handleNavigate}
      />

      <div className="sentra-main">

        <header className="top-header">
          <div>
            <p className="header-eyebrow">PERSONAL AI SYSTEM</p>
            <h1>
              {activePage === "dashboard"
                ? "Dashboard"
                : activePage === "new-chat"
                  ? "New Conversation"
                  : activePage === "voice"
                    ? "Voice Assistant"
                    : activePage === "history"
                      ? "Chat History"
                      : activePage === "settings"
                        ? "Settings"
                        : "About SENTRA"}
            </h1>
          </div>

          <div className="header-right">
            <div className="header-date">
              <span className="header-live-dot" />
              <span>SENTRA SYSTEM ACTIVE</span>
            </div>

            <div className="header-user">
              <span>U</span>
            </div>
          </div>
        </header>

        <div className="dashboard-content">

          <AssistantPanel
            onStartListening={handleVoiceClick}
            onSwitchToChat={() => setActivePage("new-chat")}
            isListening={false}
          />

          <ChatPanel />

        </div>

        <StatusBar backendOnline={backendOnline} />

      </div>

    </main>
  );
}

export default App;
