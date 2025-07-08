import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { key } = req.body;

    if (!key) {
      return res.status(400).json({ error: "Key is required" });
    }

    const filePath = path.join(process.cwd(), "public", "deviceKeys.csv");

    try {
      const exists = fs.existsSync(filePath);
      const data = `${key}\n`;

      if (exists) {
        fs.appendFileSync(filePath, data, "utf8");
      } else {
        fs.writeFileSync(filePath, data, "utf8");
      }
      return res.status(200).json({ message: "Key saved successfully" });
    } catch (error) {
      console.error("Error saving key:", error);
      return res.status(500).json({ error: "Failed to save key" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
