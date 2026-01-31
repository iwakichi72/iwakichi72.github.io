# iwakichi72.github.io

Fuminori Iwaki のポートフォリオサイト。

## 技術スタック

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- GitHub Pages (静的エクスポート)

## セットアップ

```bash
npm install
npm run dev     # 開発サーバー起動 (http://localhost:3000)
npm run build   # 静的ビルド (out/ に出力)
```

## デプロイ

`main` ブランチに push すると GitHub Actions で自動デプロイされます。

GitHub リポジトリの Settings > Pages > Source を **GitHub Actions** に設定してください。

## プロフィールデータの編集

`src/data/profile.json` を編集すると各セクションの内容が更新されます。
