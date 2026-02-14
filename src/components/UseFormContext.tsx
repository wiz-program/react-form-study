import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import InputForm from './form/InputForm'
import ConfirmForm from './form/ConfirmForm'

const schema  = z.object({
  name: z.string().min(1, '名前は必須です').min(3, '名前は3文字以上で入力してください'),
  email: z.email('メールアドレスの形式が不正です').min(1, 'メールアドレスは必須です'),
  password: z.string().min(1, 'パスワードは必須です').min(8, 'パスワードは8文字以上で入力してください'),
  gender: z.string().min(1, '性別は必須です'),
  prize: z.enum(['A', 'B', 'C'], { message: 'プレゼントは必須です' }),
});

export type FormValues = z.infer<typeof schema>;

function UseFormContext() {
  const [isConfirm, setIsConfirm] = useState(false);
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
  });


  return (
    <FormProvider {...methods}>
      {!isConfirm ? <InputForm setIsConfirm={setIsConfirm}/> : <ConfirmForm setIsConfirm={setIsConfirm}/>}
    </FormProvider>
  );
}

export default UseFormContext