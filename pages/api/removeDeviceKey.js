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
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: "File not found" });
      }

      const data = fs.readFileSync(filePath, "utf8");
      const keys = data
        .split("\n")
        .filter((line) => line.trim() !== "" && line.trim() !== key);

      fs.writeFileSync(filePath, keys.join("\n") + "\n", "utf8");

      return res.status(200).json({ message: "Key removed successfully" });
    } catch (error) {
      console.error("Error removing key:", error);
      return res.status(500).json({ error: "Failed to remove key" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
