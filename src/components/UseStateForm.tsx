import { useState } from 'react'

type Prize = 'A' | 'B' | 'C' | '';

type FormDataState = {
  name: string;
  email: string;
  password: string;
  gender: string;
  prize: Prize;
}

function useStateForm() {
  const [isConfirm, setIsConfirm] = useState(false);
  const [formDataState, setFormDataState] = useState<FormDataState>({
    name: '',
    email: '',
    password: '',
    gender: '',
    prize: ''
  })

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const name = data.get('name') as string;
    const email = data.get('email') as string;
    const password = data.get('password') as string;
    const gender = data.get('gender') as string;
    const prize = data.get('prize') as Prize;

    if (name && email && password && gender && prize) {
      setFormDataState({ name, email, password, gender, prize });
      setIsConfirm(true); // ボタンを押すとtrueになり、再描画される
    }
  }
  return (
    <>
      {!isConfirm ? (
        <>
      <h1>入力画面</h1>
      <form onSubmit={handleSubmit} >
        <input type="text" name="name" placeholder="Name" />
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <select name="gender" id="gender" defaultValue="">
          <option value="" disabled>性別を選択してください</option>
          <option value="男性">男性</option>
          <option value="女性">女性</option>
          <option value="その他">その他</option>
        </select>
        <input type="radio" name="prize" id="prizeA" value="A" />
        <label htmlFor="prizeA">A</label>
        <input type="radio" name="prize" id="prizeB" value="B" />
        <label htmlFor="prizeB">B</label>
        <input type="radio" name="prize" id="prizeC" value="C" />
        <label htmlFor="prizeC">C</label>
        <button type="submit">Submit</button>
      </form>
      </>
      ) : (
        <>
        <h1>確認画面</h1>
        <div>
          <p>Name: {formDataState.name}</p>
          <p>Email: {formDataState.email}</p>
          <p>Password: {formDataState.password}</p>
          <p>Gender: {formDataState.gender}</p>
          <p>Prize: {formDataState.prize}</p>
        </div>
        <button type="button" onClick={() => setIsConfirm(false)}>もう一度入力する</button>

      </>
      )}
    </>
  )
}

export default useStateForm