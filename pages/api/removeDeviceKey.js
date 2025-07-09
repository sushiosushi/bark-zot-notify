// pages/api/removeDeviceKey.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  const { key } = req.body;
  if (!key) return res.status(400).json({ error: "Key is required" });

  try {
    const webhookUrl =
      "https://script.google.com/macros/s/AKfycbwi06dt0RzPkB2rkkLi9bapwWVQrSMDkLQhmf05aCqOAHxrQT8f9bn1Ym59OSZgLUQPlQ/exec";

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode: "delete", key }),
    });

    const text = await response.text();

    if (text === "Deleted") {
      return res.status(200).json({ message: "Key removed successfully" });
    } else {
      return res.status(404).json({ error: "Key not found" });
    }
  } catch (err) {
    console.error("Error removing key:", err);
    return res.status(500).json({ error: "Failed to remove key" });
  }
}
