# ZOT 通知システム

ZOT 通知音を一斉通知できるシステム

[🔔 ウェブアプリで通知を送る | bark-zot-notify.vercel.app](https://bark-zot-notify.vercel.app/)

---

## 初期設定

1.  アプリをインストール。
    [Bark on AppStore](https://apps.apple.com/us/app/bark-custom-notifications/id1403753865)

    <img src="https://github.com/user-attachments/assets/f1857f32-2ad3-41b3-a4f7-bd855b8995db" alt="app-store" width="200"/>

2.  アプリを開き、右上の「+」をクリック。
3.  この QR を読みとる
    <img src="https://github.com/user-attachments/assets/20c33400-aff5-42eb-b087-0c565302baa3" alt="railway-docker" width="200"/>

4.  右上の「☁️」アイコンをクリック。
5.  `bark-zot-server.up.railway.app` をタップ、一番上のボタンをタップ（`Copy Address and Key`）
6.  その値を開発者 @soshi に伝える。

    ```
    開発者は　`index.jsx` の `deviceKeys` の値に追加して反映すること
    ```

---

## カスタム通知音の追加

1.  [共有 iCloud](https://www.icloud.com/iclouddrive/033RUDQghOZfLrB3hJuo0VjLQ) を受け取る

   <img src="https://github.com/user-attachments/assets/798dd311-f63f-418d-a1ad-4ec0b8c2a066" alt="icloud" width="200"/>

1. アプリの下の方にある青文字のリンク `Click here to view all available sounds` をクリック。
1. 動画の通りにして、全ての `.caf` ファイルをアップロード。

https://github.com/user-attachments/assets/0b6f7ff5-80f5-48b6-bdb3-2deb7b675b4c

---

## すでにアップロードした音声を変更したい時 s

1. アプリの下の方にある青文字のリンク `Click here to view all available sounds` をクリック。
2. 変更したい音声ファイルを左スワイプして削除。

---

## 開発者向け

カスタム通知音の追加

- `pages/index.jsx` の `send` 関数に音声ファイル名を追加

  ```javascript
  send("音声ファイル名.caf");
  ```

- 開発環境では `npm run dev` を使用してください。

---
