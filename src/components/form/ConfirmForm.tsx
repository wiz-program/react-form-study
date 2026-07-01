import axios from "axios";
import { useFormContext } from 'react-hook-form'
import type { FormValues, FormStep } from '../UseFormContext'

function ConfirmForm({
  setStep,
  onComplete,
}: {
  setStep: (step: FormStep) => void;
  onComplete: (message: string) => void;
}) {
  const { getValues, handleSubmit, formState: { isSubmitting }, reset } = useFormContext<FormValues>();

  const formData = getValues();

  const sendToApi = async (data: FormValues) => {
    try {
      const { data: response } = await axios.post<{ message: string }>(
        'https://python-form-study.onrender.com/api/v1/register-questionnaire',
        data,
      );
      reset();
      onComplete(response.message);
    } catch (error) {
      console.error('Error sending data to API:', error);
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
            onClick={() => setStep('input')}
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
