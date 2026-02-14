## 概要
React Hook Form + Zod を使ったフォーム実装の学習コードです。

実務で使用されている Pug + jQuery によるレガシーなフォーム実装を  
React + TypeScript に書き換えることを想定して作成しています。

入力 → 確認 → API送信 という実務でよくあるフローを再現しています。

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
  - 画面切り替え管理（入力 / 確認）

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

---

## 今回の改善ポイント

- フォーム状態の二重管理（confirmData, isSubmitting）を廃止
- 入力値は react-hook-form に一元管理させる設計へ変更
- FormProvider + useFormContext によるコンポーネント分割
- 型（FormValues）を export / import type で共有
- handleSubmit 経由での安全な API 送信
- バリデーションロジックとUI責務の分離

---

## 設計方針

- フォームの責務は useForm に集約する
- 画面制御（入力 / 確認）は親コンポーネントで管理する
- 子コンポーネントでは useFormContext を使用する
- バリデーションは Zod schema に集約する

---

## 使用技術

- React
- TypeScript
- react-hook-form
- Zod
- axios