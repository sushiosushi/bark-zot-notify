import { useState, useEffect } from "react";

export default function Home() {
  const [deviceKeys, setDeviceKeys] = useState([""]);
  const [newKey, setNewKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState("データ取得中...");

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const fetchDeviceKeys = async () => {
      setLoading(true);
      setLoadingMessage("データ取得中...");
      try {
        const response = await fetch("/api/getDeviceKeys");
        if (!response.ok) {
          throw new Error("Failed to fetch device keys");
        }
        const data = await response.json();
        setDeviceKeys(data.keys);
        showToast("デバイスキーが正常に取得されました。");
      } catch (error) {
        console.error("Error fetching device keys:", error);
        showToast("デバイスキーの取得に失敗しました。", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchDeviceKeys();
  }, []);

  const addDeviceKey = async () => {
    if (newKey.trim() !== "") {
      setLoadingMessage("登録中...");
      setLoading(true);
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
        showToast("デバイスキーが登録されました。");
      } catch (error) {
        console.error("Error saving device key:", error);
        showToast("デバイスキーの保存に失敗しました。", "error");
      } finally {
        setLoading(false);
      }
    } else {
      showToast("デバイスキーを入力してください。", "error");
    }
  };

  const removeDeviceKey = async (keyToRemove) => {
    setLoadingMessage("削除中...");
    setLoading(true);
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
      showToast("デバイスキーが削除されました。");
    } catch (error) {
      console.error("Error removing device key:", error);
      showToast("デバイスキーの削除に失敗しました。", "error");
    } finally {
      setLoading(false);
    }
  };

  const send = async (sound) => {
    setLoadingMessage("通知送信中...");
    setLoading(true);
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
      showToast("通知が送信されました。");
    } catch (error) {
      console.error("Error sending notification:", error);
      showToast("通知の送信に失敗しました。", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {loading && <div className="loading">{loadingMessage}</div>}
      {toast && <div className={`toast ${toast.type}`}>{toast.message}</div>}
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
        <h2>まずは Address and Key を登録</h2>
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            placeholder="Address and Keyを入力"
            style={{ marginRight: "0.5rem" }}
          />
          <button onClick={addDeviceKey}>登録</button>
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
