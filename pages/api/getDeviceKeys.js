import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "GET") {
    const filePath = path.join(process.cwd(), "public", "deviceKeys.csv");

    try {
      if (!fs.existsSync(filePath)) {
        return res.status(200).json({ keys: [] });
      }

      const data = fs.readFileSync(filePath, "utf8");
      const keys = data.split("\n").filter((key) => key.trim() !== "");

      return res.status(200).json({ keys });
    } catch (error) {
      console.error("Error reading keys:", error);
      return res.status(500).json({ error: "Failed to read keys" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
