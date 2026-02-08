## 概要
React Hook Form + Zod を使ったフォーム実装の学習コードです。

実務で使用されている Pug + jQuery によるレガシーなフォーム実装を  
React + TypeScript に書き換えることを想定して作成しています。

入力 → 確認 → API送信 という実務でよくあるフローを再現しています。

## 構成ファイル

- **UseStateForm.tsx**  
  useState のみを使ったフォーム実装  
  → controlled component の基本理解用

- **ReactHookForm.tsx**  
  react-hook-form を使ったフォーム実装  
  → uncontrolled なフォーム管理とバリデーションの簡略化を学習

- **ZodForm.tsx**  
  react-hook-form + Zod + Axios を使用した実践的なフォーム実装  
  → バリデーションの責務分離、確認画面、API送信、二重送信防止まで対応

## 使用技術
- React
- TypeScript
- react-hook-form
- Zod
- axios