export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  try {
    const webhookUrl =
      "https://script.google.com/macros/s/AKfycbwi06dt0RzPkB2rkkLi9bapwWVQrSMDkLQhmf05aCqOAHxrQT8f9bn1Ym59OSZgLUQPlQ/exec";

    const response = await fetch(webhookUrl, {
      method: "GET",
    });

    const data = await response.json();

    return res.status(200).json({ keys: data.keys || [] });
  } catch (err) {
    console.error("Error getting keys:", err);
    return res.status(500).json({ error: "Failed to fetch keys" });
  }
}
