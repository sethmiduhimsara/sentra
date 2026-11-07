
import {
  Activity,
  Wifi,
  BrainCircuit,
  ShieldCheck,
} from "lucide-react";

interface StatusBarProps {
  backendOnline: boolean;
}

function StatusBar({ backendOnline }: StatusBarProps) {
  return (
    <footer className="sentra-status-bar">

      <div className="status-bar-left">
        <div className="status-item">
          <span
            className={`status-indicator ${
              backendOnline ? "online" : "offline"
            }`}
          />
          <span>
            Backend {backendOnline ? "Connected" : "Disconnected"}
          </span>
        </div>

        <div className="status-item">
          <BrainCircuit size={15} />
          <span>Google Gemini</span>
        </div>

        <div className="status-item">
          <Wifi size={15} />
          <span>API Service</span>
        </div>
      </div>

      <div className="status-bar-right">
        <div className="status-item">
          <ShieldCheck size={15} />
          <span>Local Environment</span>
        </div>

        <div className="status-item">
          <Activity size={15} />
          <span>SENTRA v0.1.0</span>
        </div>
      </div>

    </footer>
  );
}

export default StatusBar;
