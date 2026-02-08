import { useForm } from 'react-hook-form'

function ReactHookForm() {
  type Prize = 'A' | 'B' | 'C';
  type FormValues = {
    name: string;
    email: string;
    password: string;
    gender: string;
    prize: Prize;
  }

  const {
    register,
    handleSubmit,
    formState: { errors},
  } = useForm<FormValues>();


  const onSubmit = (data: FormValues) => {
    console.log(data);
  }
  


  return (
    <>
    <h1>入力画面</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder='Name' {
        ...register('name', { required: '名前は必須です', minLength: { value: 3, message: '名前は3文字以上で入力してください' } })
      } />
      {errors.name && <p>{errors.name.message}</p>}
      <input type="email" placeholder='Email' {
        ...register('email', { required: 'メールアドレスは必須です', pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'メールアドレスの形式が不正です' } })
      } />
      {errors.email && <p>{errors.email.message}</p>}
      <input type="password" placeholder='Password' {
        ...register('password', { required: 'パスワードは必須です', minLength: { value: 8, message: 'パスワードは8文字以上で入力してください' } })
      } />
      {errors.password && <p>{errors.password.message}</p>}
      <select defaultValue="" id="gender" {
        ...register('gender', { required: '性別は必須です' })
      }>
        <option value="" disabled>性別を選択してください</option>
        <option value="男性">男性</option>
        <option value="女性">女性</option>
        <option value="その他">その他</option>
      </select>
      {errors.gender && <p>{errors.gender.message}</p>}
      <input type="radio"  id="prizeA" value="A" {
        ...register('prize', { required: 'プレゼントは必須です' })
      } />
      <label htmlFor="prizeA">A</label>
      <input type="radio" id="prizeB" value="B" {
        ...register('prize', { required: 'プレゼントは必須です' })
      } />
      <label htmlFor="prizeB">B</label>
      <input type="radio" id="prizeC" value="C" {
        ...register('prize', { required: 'プレゼントは必須です' })
      } />
      <label htmlFor="prizeC">C</label>
      {errors.prize && <p>{errors.prize.message}</p>}
      <button type="submit">Submit</button>
    </form>
    </>
  )
}

export default ReactHookForm