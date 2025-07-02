# ZOT テスト通知システム

このプロジェクトは、ZOT テスト通知音を一斉に送信するためのシステムです。以下のリンクから通知音を選択して送信できます。

[ZOT テスト通知システム](https://bark-zot-notify.vercel.app/)

---

## 初期設定

1. 以下のアプリをインストールしてください。
   [Bark Custom Notifications](https://apps.apple.com/us/app/bark-custom-notifications/id1403753865)

2. アプリを開き、右上の「+」をクリック。
3. Server Address に `https://bark-zot-server.up.railway.app` を入力。
4. 右上のクラウドアイコンをクリック。
5. `bark-zot-server.up.railway.app` の下に表示される Key を確認してください。
   - Key が `49gJgkjqz3XWiMTF7ZyguP` でない場合は、`pages/index.jsx` の `deviceKeys` の値をその Key に変更してください。
   - 変更後、`npm run dev` を実行するか、main ブランチにプッシュしてください。

---

## 新しい通知音の追加

1. アプリ内のホーム画面で、青文字のリンク `Click here to view all available sounds` をクリック。
2. 表示されたページで、カスタムの `.caf` ファイルをアップロード。
3. `pages/index.jsx` の `send` 関数に以下のように音声ファイル名を追加してください。
   ```javascript
   send("音声ファイル名.caf");
   ```
   - 変更後、`npm run dev` を実行するか、main ブランチにプッシュしてください。

---

## 既存の通知音の変更

1. アプリ内のホーム画面で、青文字のリンク `Click here to view all available sounds` をクリック。
2. 変更したい音声ファイルを左スワイプして削除。
3. 新しい音声ファイルをアップロードし、必要に応じてコードを更新してください。

---

## 注意事項

- 開発環境では `npm run dev` を使用してください。

---
