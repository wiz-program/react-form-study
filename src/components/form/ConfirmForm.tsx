import axios from "axios";
import { useFormContext } from 'react-hook-form'
import type { FormValues } from '../UseFormContext'

function ConfirmForm({ setIsConfirm }: { setIsConfirm: (isConfirm: boolean) => void }) {
  const { getValues, handleSubmit, formState: { isSubmitting}, reset } = useFormContext<FormValues>();

const formData = getValues();

  const sendToApi = async (data: FormValues) => {  
  try {
    await axios.post('https://jsonplaceholder.typicode.com/posts', data );
    setIsConfirm(false);
    // navigate('complete');
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
    <>
    <h1>確認画面</h1>
    <div>
      <p>Name: {formData.name}</p>
      <p>Email: {formData.email}</p>
      <p>Password: {formData.password}</p>
      <p>Gender: {formData.gender}</p>
      <p>Prize: {formData.prize}</p>
    </div>
    <button type="button" onClick={() => setIsConfirm(false)} disabled={isSubmitting}>戻る</button>
    <button type="button" onClick={handleSubmit(sendToApi)} disabled={isSubmitting}>
      {isSubmitting ? '送信中...' : '送信する'}
     </button>
    </>

  )

};





export default ConfirmForm;