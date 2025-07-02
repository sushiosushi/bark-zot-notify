export default async function handler(req, res) {
  const { sound, key } = req.query;

  if (!sound || !key) {
    return res.status(400).json({ error: "Missing sound or key" });
  }

  const title = "ZOT通知音テスト";
  const body = `通知音: ${sound}`;
  const url = `https://bark-zot-server.up.railway.app/${key}?title=${encodeURIComponent(
    title
  )}&body=${encodeURIComponent(body)}&sound=${sound}`;

  try {
    const r = await fetch(url);
    const result = await r.json(); // Parse JSON response

    if (result.code && result.message) {
      console.error("API Error Response:", result);
      return res.status(result.code).json({ error: result.message });
    }

    console.log("Notification Result:", result);
    return res.status(200).json({ result });
  } catch (err) {
    console.error("API Error:", err);
    return res.status(500).json({ error: "Failed to send notification" });
  }
}
