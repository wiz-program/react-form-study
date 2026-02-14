import { useFormContext } from 'react-hook-form'
import type { FormValues } from '../UseFormContext'

function InputForm({ setIsConfirm }: { setIsConfirm: (isConfirm: boolean) => void }) {
  const { register, handleSubmit, formState: { errors } } = useFormContext<FormValues>();

  const onSubmit = () => {
    setIsConfirm(true);
  }

  return (
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

  )
}

export default InputForm