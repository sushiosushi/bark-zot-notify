const deviceKeys = ["49gJgkjqz3XWiMTF7ZyguP"];

const send = async (sound) => {
  try {
    await Promise.all(
      deviceKeys.map((key) => {
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

export default function Home() {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>ZOT 通知テスト</h1>
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
  );
}
