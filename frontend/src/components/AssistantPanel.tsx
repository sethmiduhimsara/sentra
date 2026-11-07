
import {
  Mic,
  AudioLines,
  Keyboard,
  Zap,
  CalendarDays,
  Lightbulb,
  ChartNoAxesColumn,
} from "lucide-react";

import sentraAvatar from "../assets/sentra-avatar.png";

interface AssistantPanelProps {
  onStartListening: () => void;
  onSwitchToChat: () => void;
  isListening: boolean;
}

function AssistantPanel({
  onStartListening,
  onSwitchToChat,
  isListening,
}: AssistantPanelProps) {
  return (
    <section className="assistant-panel">

      {/* AI Avatar */}
      <div className="assistant-visual">
        <div className="avatar-glow" />
        <div className="avatar-ring" />

        <img
          src={sentraAvatar}
          alt="SENTRA AI Assistant"
          className="assistant-avatar"
        />

        <div className="assistant-greeting">
          <h2>👋 Hello, I'm SENTRA!</h2>
          <p>Your Intelligent Personal Assistant</p>
        </div>
      </div>

      {/* Voice Waveform */}
      <div className={`voice-waveform ${isListening ? "listening" : ""}`}>
        {Array.from({ length: 35 }).map((_, index) => (
          <span
            key={index}
            style={{
              height: `${12 + Math.abs(Math.sin(index * 0.65)) * 42}px`,
            }}
          />
        ))}
      </div>

      <p className="voice-status">
        {isListening ? "Listening to your voice..." : "Ready when you are"}
      </p>

      {/* Main Microphone */}
      <button
        className={`microphone-button ${isListening ? "listening" : ""}`}
        onClick={onStartListening}
        aria-label={isListening ? "Stop listening" : "Start voice input"}
      >
        <Mic size={34} />
      </button>

      <p className="microphone-label">
        {isListening ? "Listening..." : "Tap to Speak"}
      </p>

      {/* Quick Features */}
      <div className="quick-features">
        <h3>Quick Features</h3>

        <div className="quick-feature-grid">
          <button onClick={onSwitchToChat}>
            <Zap />
            <span>Smart Search</span>
          </button>

          <button onClick={onSwitchToChat}>
            <CalendarDays />
            <span>Plan Tasks</span>
          </button>

          <button onClick={onSwitchToChat}>
            <Lightbulb />
            <span>Get Ideas</span>
          </button>

          <button onClick={onSwitchToChat}>
            <ChartNoAxesColumn />
            <span>Analyze Info</span>
          </button>
        </div>
      </div>

      {/* Type Instead */}
      <button className="type-instead-button" onClick={onSwitchToChat}>
        <Keyboard size={18} />
        <span>Type Instead</span>
        <AudioLines size={18} />
      </button>

    </section>
  );
}

export default AssistantPanel;
