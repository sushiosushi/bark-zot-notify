import { useState, useEffect } from "react";

export default function Home() {
  const [deviceKeys, setDeviceKeys] = useState([""]);
  const [newKey, setNewKey] = useState("");

  useEffect(() => {
    const fetchDeviceKeys = async () => {
      try {
        const response = await fetch("/api/getDeviceKeys");
        if (!response.ok) {
          throw new Error("Failed to fetch device keys");
        }
        const data = await response.json();
        setDeviceKeys(data.keys);
      } catch (error) {
        console.error("Error fetching device keys:", error);
      }
    };

    fetchDeviceKeys();
  }, []);

  const addDeviceKey = async () => {
    if (newKey.trim() !== "") {
      // Extract the key from the URL if it matches the pattern
      const match = newKey.trim().match(/https?:\/\/[^/]+\/([^/]+)\/?/);
      const extractedKey = match ? match[1] : newKey.trim();

      try {
        const response = await fetch("/api/saveDeviceKey", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ key: extractedKey }),
        });

        if (!response.ok) {
          throw new Error("Failed to save key");
        }

        setDeviceKeys([...deviceKeys, extractedKey]);
        setNewKey("");
        alert("デバイスキーが登録されました。");
      } catch (error) {
        console.error("Error saving device key:", error);
        alert("デバイスキーの保存に失敗しました。");
      }
    } else {
      alert("デバイスキーを入力してください。");
    }
  };

  const removeDeviceKey = async (keyToRemove) => {
    try {
      const response = await fetch("/api/removeDeviceKey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key: keyToRemove }),
      });

      if (!response.ok) {
        throw new Error("Failed to remove key");
      }

      setDeviceKeys(deviceKeys.filter((key) => key !== keyToRemove));
      alert("デバイスキーが削除されました。");
    } catch (error) {
      console.error("Error removing device key:", error);
      alert("デバイスキーの削除に失敗しました。");
    }
  };

  const send = async (sound) => {
    try {
      await Promise.all(
        deviceKeys.map((key) => {
          console.log(
            `Sending notification with sound: ${sound} to key: ${key}`
          );
          return fetch(
            `/api/send?sound=${encodeURIComponent(
              sound
            )}&key=${encodeURIComponent(key)}`
          )
            .then((res) => {
              if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
              return res.json();
            })
            .catch((error) => {
              console.error(`通知失敗: ${key}`, error);
              throw error;
            });
        })
      );
    } catch (error) {
      console.error("Error sending notification:", error);
      alert("通知の送信に失敗しました。詳細はコンソールをご確認ください。");
    }
  };

  return (
    <div className="container">
      <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <h1>ZOT 一斉通知システム</h1>
        <p>各ボタンを押すと、対象の通知音が全員に送信されます。</p>
        <p>
          公開URL:{" "}
          <a
            href="https://bark-zot-notify.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://bark-zot-notify.vercel.app
          </a>
        </p>
        <h2>まずはデバイスキーを登録</h2>
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            placeholder="デバイスキーを入力"
            style={{ marginRight: "0.5rem" }}
          />
          <button onClick={addDeviceKey}>デバイスキーを登録</button>
        </div>

        <div>
          {deviceKeys.map((key, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center" }}>
              <p style={{ marginRight: "1rem" }}>登録済みキー: {key}</p>
              <button
                onClick={() => removeDeviceKey(key)}
                style={{
                  marginLeft: "0.5rem",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "0.25rem",
                  padding: "0.5rem 1rem",
                  cursor: "pointer",
                }}
              >
                削除
              </button>
            </div>
          ))}
        </div>
        <h2>鳴らしてみる</h2>
        <p>※ 通知が届くまでに数秒かかる場合があります。</p>
        <button onClick={() => send("bereal")}>BeReal</button>
        <button onClick={() => send("zot_v1.caf")}>ZOT v1</button>
        <button onClick={() => send("zot_v1_voice.caf")}>ZOT v1 +voice</button>
        <button onClick={() => send("minuet")}>Default minuet</button>
        <button onClick={() => send("zot_v2_01.caf")}>ZOT v2 01</button>
        <button onClick={() => send("zot_v2_02.caf")}>ZOT v2 02</button>
        <button onClick={() => send("zot_v2_03.caf")}>ZOT v2 03</button>
        <button onClick={() => send("zot_v2_04.caf")}>ZOT v2 04</button>
        <button onClick={() => send("zot_v2_05.caf")}>ZOT v2 05</button>
        <button onClick={() => send("zot_v2_06.caf")}>ZOT v2 06</button>
      </div>
    </div>
  );
}
