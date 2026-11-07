
const API_BASE_URL = "http://127.0.0.1:8000";

export interface ChatResponse {
  reply: string;
}

export async function sendChatMessage(
  message: string
): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/chat/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.detail || "Unable to get a response from SENTRA."
    );
  }

  const data: ChatResponse = await response.json();

  return data.reply;
}
