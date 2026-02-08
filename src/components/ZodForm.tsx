import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'

const schema  = z.object({
  name: z.string().min(1, '名前は必須です').min(3, '名前は3文字以上で入力してください'),
  email: z.email('メールアドレスの形式が不正です').min(1, 'メールアドレスは必須です'),
  password: z.string().min(1, 'パスワードは必須です').min(8, 'パスワードは8文字以上で入力してください'),
  gender: z.string().min(1, '性別は必須です'),
  prize: z.enum(['A', 'B', 'C'], { message: 'プレゼントは必須です' }),
});

type FormValues = z.infer<typeof schema>;

function ZodForm() {
  const [isConfirm, setIsConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmData, setConfirmData] = useState<FormValues | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    setConfirmData(data);
    setIsConfirm(true);
  }

  const sendToApi = async () => {
    if (!confirmData || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await axios.post('https://jsonplaceholder.typicode.com/posts', confirmData);
      setConfirmData(null);
      setIsConfirm(false);
      reset(); // フォームをリセット
      // navigate('complete');
    } catch (error) {
      console.error('Error sending data to API:', error);
      alert('データの送信に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
    {!isConfirm ? (
    <>
    <h1>入力画面</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder='Name' {
        ...register('name')
      } />
      {errors.name && <p className="error">{errors.name.message}</p>}
      <input type="email" placeholder='Email' {
        ...register('email')
      } />
      {errors.email && <p className="error">{errors.email.message}</p>}
      <input type="password" placeholder='Password' {
        ...register('password')
      } />
      {errors.password && <p className="error">{errors.password.message}</p>}
      <select defaultValue="" id="gender" {
        ...register('gender')
      }>
        <option value="" disabled>性別を選択してください</option>
        <option value="男性">男性</option>
        <option value="女性">女性</option>
        <option value="その他">その他</option>
      </select>
      {errors.gender && <p className="error">{errors.gender.message}</p>}
      <input type="radio"  id="prizeA" value="A" {
        ...register('prize')
      } />
      <label htmlFor="prizeA">A</label>
      <input type="radio" id="prizeB" value="B" {
        ...register('prize')
      } />
      <label htmlFor="prizeB">B</label>
      <input type="radio" id="prizeC" value="C" {
        ...register('prize')
      } />
      <label htmlFor="prizeC">C</label>
      {errors.prize && <p className="error">{errors.prize.message}</p>}
        <button type="submit">Submit</button>
      </form>
    </>
    ) : (
      <>
      <h1>確認画面</h1>
      <div>
        <p>Name: {confirmData?.name}</p>
        <p>Email: {confirmData?.email}</p>
        <p>Password: {confirmData?.password}</p>
        <p>Gender: {confirmData?.gender}</p>
        <p>Prize: {confirmData?.prize}</p>
      </div>
      <button type="button" onClick={() => setIsConfirm(false)}>戻る</button>
      <button type="button" onClick={sendToApi} disabled={isSubmitting}>
        {isSubmitting ? '送信中...' : '送信する'}
       </button>
      </>
    )
    }
    </>
  )
}

export default ZodForm