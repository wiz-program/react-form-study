## 概要
React Hook Form + Zod を使ったフォーム実装の学習コードです。

| 項目 | URL |
|---|---|
| フロントエンド（このリポジトリ） | https://github.com/wiz-program/react-form-study |
| バックエンド（Python） | https://github.com/wiz-program/python-form-study |
| デプロイ先（GitHub Pages） | https://wiz-program.github.io/react-form-study/ |

API 連携の相手となる Python バックエンドは [python-form-study](https://github.com/wiz-program/python-form-study) を参照してください。  
フロントエンドは GitHub Actions により `main` ブランチへの push 時に上記 GitHub Pages URL へ自動デプロイされます。

実務で使用されている Pug + jQuery によるレガシーなフォーム実装を  
React + TypeScript に書き換えることを想定して作成しています。

入力 → 確認 → API送信 → 応募完了 という実務でよくあるフローを再現しています。

今回の学習では、フォームを単一コンポーネントで完結させる構成から、
FormProvider + useFormContext を用いた「責務分離された設計」へと改善しました。

---

## 構成ファイル

### 1. 基礎理解フェーズ

- **UseStateForm.tsx**  
  useState のみを使ったフォーム実装  
  → controlled component の基本理解用

- **ReactHookForm.tsx**  
  react-hook-form を使ったフォーム実装  
  → uncontrolled なフォーム管理とバリデーションの簡略化を学習

---

### 2. 実践フェーズ（改善前）

- **ZodForm.tsx**  
  react-hook-form + Zod + Axios を使用したフォーム実装  
  → バリデーション、確認画面、API送信までを1ファイルで実装

  ※ フォーム状態・確認データ・送信状態を useState で管理していたため、
  責務が集中していた構成

---

### 3. 実践フェーズ（改善後）

- **UseFormContext.tsx**  
  フォーム全体の司令塔  
  - useForm の定義
  - Zod resolver の適用
  - FormProvider によるフォーム状態共有
  - 画面切り替え管理（入力 / 確認 / 完了）

- **InputForm.tsx**  
  入力画面コンポーネント  
  - useFormContext を利用してフォーム状態を取得
  - register / errors 表示
  - handleSubmit による確認画面遷移

- **ConfirmForm.tsx**  
  確認画面コンポーネント  
  - getValues による入力値取得
  - handleSubmit を通した最終送信
  - formState.isSubmitting による送信状態管理
  - reset によるフォーム初期化
  - axios による API 送信（エンドポイント URL を実装済み）
  - 送信成功時に応募完了画面へ遷移

- **CompleteForm.tsx**  
  応募完了画面コンポーネント  
  - API レスポンスの `message` を表示
  - 「もう一度応募する」で入力画面へ戻る

---

## API 連携

確認画面の「送信する」ボタンから、バックエンド API へフォームデータを送信します。

### フロントエンド（このリポジトリ）

`ConfirmForm.tsx` の `sendToApi` 関数で、以下のエンドポイントへ `POST` リクエストを送ります。

```
https://python-form-study.onrender.com/api/v1/register-questionnaire
```

送信成功時は応募完了画面へ遷移し、API から返却された `message`（例: 「山田太郎さんの応募を受付、データベースに保存しました。」）を表示します。フォームは `reset` で初期化され、「もう一度応募する」で入力画面へ戻れます。

### バックエンド

API の受付・サーバーバリデーション・データベース保存の実装は、別リポジトリで管理しています。

| レイヤー | リポジトリ | 役割 |
|---|---|---|
| フロントエンド | このリポジトリ | フォーム UI・クライアントバリデーション・確認画面・API 送信・応募完了画面 |
| バックエンド | [python-form-study](https://github.com/wiz-program/python-form-study) | API 受付・サーバーバリデーション・DB 保存 |

バックエンドの API 仕様、セットアップ手順、データベース定義などの詳細は [python-form-study の README](https://github.com/wiz-program/python-form-study) を参照してください。

---

## 今回の改善ポイント

- フォーム状態の二重管理（confirmData, isSubmitting）を廃止
- 入力値は react-hook-form に一元管理させる設計へ変更
- FormProvider + useFormContext によるコンポーネント分割
- 型（FormValues）を export / import type で共有
- handleSubmit 経由での安全な API 送信
- `ConfirmForm.tsx` にバックエンド API の URL を実装し、入力 → 確認 → API 送信のフローを完結
- `CompleteForm.tsx` を追加し、送信成功時のフィードバックを応募完了画面で表示
- 画面状態を `input` / `confirm` / `complete` の3段階で管理
- バリデーションロジックとUI責務の分離

---

## 設計方針

- フォームの責務は useForm に集約する
- 画面制御（入力 / 確認 / 完了）は親コンポーネントで管理する
- 子コンポーネントでは useFormContext を使用する
- バリデーションは Zod schema に集約する

---

## 使用技術

- React
- TypeScript
- react-hook-form
- Zod
- axios