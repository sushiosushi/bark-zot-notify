const deviceKeys = [
  "4b439da65a345ee95d0bbbccadcdc3a819ddd7ed37cfd86ef080057cdfd6aa8e",
];

const send = async (sound) => {
  const title = "ZOT通知";
  const body = `通知音: ${sound}`;
  const soundUrl = `https://bark-zot-notify.vercel.app/sound/${sound}`;

  try {
    await Promise.all(
      deviceKeys.map((key) => {
        const url = `https://bark-zot-server.up.railway.app/${key}?title=${encodeURIComponent(
          title
        )}&body=${encodeURIComponent(body)}&sound=${sound}`;
        return fetch(url).catch((error) => {
          console.error(`Failed to fetch for key ${key}:`, error);
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
      <button onClick={() => send("bereal.caf")}>BeReal</button>
      <button onClick={() => send("jingle_zot_1.caf")}>ZOT (Jingle 1)</button>
      <button onClick={() => send("jingle_zot_2.caf")}>ZOT (Jingle 2)</button>
    </div>
  );
}
