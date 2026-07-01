import axios from "axios";
import { useFormContext } from 'react-hook-form'
import type { FormValues } from '../UseFormContext'

function ConfirmForm({ setIsConfirm }: { setIsConfirm: (isConfirm: boolean) => void }) {
  const { getValues, handleSubmit, formState: { isSubmitting }, reset } = useFormContext<FormValues>();

  const formData = getValues();

  const sendToApi = async (data: FormValues) => {
    try {
      await axios.post('https://jsonplaceholder.typicode.com/posts', data);
      setIsConfirm(false);
      console.log('データの送信に成功しました');
    } catch (error) {
      console.error('Error sending data to API:', error);
      console.log('データの送信に失敗しました');
    } finally {
      reset();
      console.log('データの送信が終了しました');
    }
  }

  return (
    <div className="form-page">
      <div className="form-container">
        <header className="form-header">
          <h1>確認画面</h1>
          <p className="form-description">入力内容をご確認のうえ、送信してください。</p>
        </header>

        <dl className="confirm-list">
          <div className="confirm-item">
            <dt>名前</dt>
            <dd>{formData.name}</dd>
          </div>
          <div className="confirm-item">
            <dt>メールアドレス</dt>
            <dd>{formData.email}</dd>
          </div>
          <div className="confirm-item">
            <dt>パスワード</dt>
            <dd>{formData.password}</dd>
          </div>
          <div className="confirm-item">
            <dt>性別</dt>
            <dd>{formData.gender}</dd>
          </div>
          <div className="confirm-item">
            <dt>プレゼント</dt>
            <dd>{formData.prize}</dd>
          </div>
        </dl>

        <div className="form-actions form-actions--split">
          <button
            type="button"
            className="form-button form-button--secondary"
            onClick={() => setIsConfirm(false)}
            disabled={isSubmitting}
          >
            戻る
          </button>
          <button
            type="button"
            className="form-button form-button--primary"
            onClick={handleSubmit(sendToApi)}
            disabled={isSubmitting}
          >
            {isSubmitting ? '送信中...' : '送信する'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmForm
