export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { key } = req.body;
  if (!key) {
    return res.status(400).json({ error: "Key is required" });
  }

  try {
    const webhookUrl =
      "https://script.google.com/macros/s/AKfycbwi06dt0RzPkB2rkkLi9bapwWVQrSMDkLQhmf05aCqOAHxrQT8f9bn1Ym59OSZgLUQPlQ/exec";

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key }),
    });

    if (!response.ok) throw new Error("Webhook error");

    return res.status(200).json({ message: "Key saved to Google Sheets" });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: "Failed to save key" });
  }
}
