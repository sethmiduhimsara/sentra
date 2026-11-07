
import { useEffect, useRef, useState } from "react";
import {
  Send,
  Bot,
  User,
  Plus,
  MessageSquare,
  LoaderCircle,
} from "lucide-react";

import { sendChatMessage } from "../services/api";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Hello! I'm SENTRA. How can I help you today? You can talk to me in Sinhala or English.",
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  async function handleSend(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = input.trim();

    if (!message || isLoading) return;

    setMessages((previous) => [
      ...previous,
      {
        id: Date.now(),
        role: "user",
        content: message,
      },
    ]);

    setInput("");
    setError("");
    setIsLoading(true);

    try {
      const reply = await sendChatMessage(message);

      setMessages((previous) => [
        ...previous,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: reply,
        },
      ]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to connect to SENTRA."
      );
    } finally {
      setIsLoading(false);
    }
  }

  function handleNewChat() {
    if (isLoading) return;

    setMessages([
      {
        id: Date.now(),
        role: "assistant",
        content: "Hello again! What would you like to explore?",
      },
    ]);

    setError("");
    setInput("");
  }

  return (
    <section className="chat-panel">

      {/* Chat Header */}
      <div className="chat-panel-header">
        <div className="chat-heading">
          <div className="chat-heading-icon">
            <MessageSquare size={19} />
          </div>

          <div>
            <h2>AI Conversation</h2>
            <p>Chat with your personal assistant</p>
          </div>
        </div>

        <button
          className="new-chat-button"
          onClick={handleNewChat}
          disabled={isLoading}
        >
          <Plus size={17} />
          <span>New Chat</span>
        </button>
      </div>

      {/* Messages */}
      <div className="chat-messages">

        {messages.map((message) => (
          <div
            key={message.id}
            className={`chat-message ${
              message.role === "user" ? "user-message" : "ai-message"
            }`}
          >
            <div className="message-avatar">
              {message.role === "assistant" ? (
                <Bot size={19} />
              ) : (
                <User size={19} />
              )}
            </div>

            <div className="message-content">
              <span className="message-sender">
                {message.role === "assistant" ? "SENTRA" : "YOU"}
              </span>

              <p>{message.content}</p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="chat-message ai-message">
            <div className="message-avatar">
              <Bot size={19} />
            </div>

            <div className="message-content">
              <span className="message-sender">SENTRA</span>

              <div className="loading-response">
                <LoaderCircle size={17} className="animate-spin" />
                <span>Thinking...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Error */}
      {error && (
        <div className="chat-error">
          {error}
        </div>
      )}

      {/* Message Input */}
      <form className="chat-input-area" onSubmit={handleSend}>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask SENTRA anything..."
          disabled={isLoading}
        />

        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          aria-label="Send message"
        >
          <Send size={19} />
        </button>
      </form>

      <p className="chat-footer-note">
        SENTRA may occasionally make mistakes. Verify important information.
      </p>

    </section>
  );
}

export default ChatPanel;
