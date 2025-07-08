# ZOT テスト通知システム

このプロジェクトは、ZOT テスト通知音を一斉に送信するためのシステムです。以下のリンクから通知音を選択して送信できます。

[ZOT テスト通知システム](https://bark-zot-notify.vercel.app/)

---

## 初期設定

1. 以下のアプリをインストールしてください。
   [Bark Custom Notifications](https://apps.apple.com/us/app/bark-custom-notifications/id1403753865)
   ![qr-code](https://github.com/user-attachments/assets/f1857f32-2ad3-41b3-a4f7-bd855b8995db)

2. アプリを開き、右上の「+」をクリック。
3. Server Address で QR を読みとる
   （または `https://bark-zot-server.up.railway.app` を入力）
   ![qr-code-2](https://github.com/user-attachments/assets/e68a1631-6113-4d5f-8cfe-a2d7a809cb41)
4. 右上のクラウドアイコンをクリック。
5. `bark-zot-server.up.railway.app` の下に表示される Key を確認してください。
   その値を管理者に伝えてください。          
   - （管理者は`pages/index.jsx` の `deviceKeys` の値をその Key に追加します）
   - （管理者は`npm run dev` を実行するか、main ブランチにプッシュしてください）

---

## 新しい通知音の追加
1. https://www.icloud.com/iclouddrive/033RUDQghOZfLrB3hJuo0VjLQ
   から共有フォルダを受け取る

   ![qr-code-3](https://github.com/user-attachments/assets/798dd311-f63f-418d-a1ad-4ec0b8c2a066)

   
1. アプリ内のホーム画面で、青文字のリンク `Click here to view all available sounds` をクリック。
2. 表示されたページで、カスタムの `.caf` ファイルをアップロード。

https://github.com/user-attachments/assets/0b6f7ff5-80f5-48b6-bdb3-2deb7b675b4c

3. 開発者向け`pages/index.jsx` の `send` 関数に以下のように音声ファイル名を追加してください。
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
