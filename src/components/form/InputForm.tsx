import { useFormContext } from 'react-hook-form'
import type { FormValues, FormStep } from '../UseFormContext'

function InputForm({ setStep }: { setStep: (step: FormStep) => void }) {
  const { register, handleSubmit, formState: { errors } } = useFormContext<FormValues>();

  const onSubmit = () => {
    setStep('confirm');
  }

  return (
    <div className="form-page">
      <div className="form-container">
        <header className="form-header">
          <h1>入力画面</h1>
          <p className="form-description">必要事項を入力して、確認画面へ進んでください。</p>
        </header>

        <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-field">
            <label className="form-label" htmlFor="name">名前</label>
            <input
              id="name"
              type="text"
              className="form-input"
              placeholder="山田 太郎"
              {...register('name')}
            />
            {errors.name && <p className="form-error">{errors.name.message}</p>}
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="email">メールアドレス</label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="example@email.com"
              {...register('email')}
            />
            {errors.email && <p className="form-error">{errors.email.message}</p>}
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="password">パスワード</label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="8文字以上"
              {...register('password')}
            />
            {errors.password && <p className="form-error">{errors.password.message}</p>}
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="gender">性別</label>
            <select id="gender" className="form-select" defaultValue="" {...register('gender')}>
              <option value="" disabled>性別を選択してください</option>
              <option value="男性">男性</option>
              <option value="女性">女性</option>
              <option value="その他">その他</option>
            </select>
            {errors.gender && <p className="form-error">{errors.gender.message}</p>}
          </div>

          <fieldset className="form-field">
            <legend>プレゼント</legend>
            <div className="form-radio-group">
              <label className="form-radio-item" htmlFor="prizeA">
                <input type="radio" id="prizeA" value="A" {...register('prize')} />
                <span>A</span>
              </label>
              <label className="form-radio-item" htmlFor="prizeB">
                <input type="radio" id="prizeB" value="B" {...register('prize')} />
                <span>B</span>
              </label>
              <label className="form-radio-item" htmlFor="prizeC">
                <input type="radio" id="prizeC" value="C" {...register('prize')} />
                <span>C</span>
              </label>
            </div>
            {errors.prize && <p className="form-error">{errors.prize.message}</p>}
          </fieldset>

          <div className="form-actions">
            <button type="submit" className="form-button form-button--primary">
              確認画面へ
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default InputForm
