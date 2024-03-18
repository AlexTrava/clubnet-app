import { Flex } from '@mantine/core';
import { useForm } from '@mantine/form';

import { getStepFormState } from '@/app/providers/StoreProvider/config/selectors'; // поправить импорт
import { CheckSmsCodeForm, LoginForm, NickNameForm } from '@/features/Authentication/index';
import type { FormFields } from '@/features/Authentication/model/types'; // поправить импорт
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';

export const AuthenticationForm = () => {
  const stepForm = useAppSelector(getStepFormState);
  const form = useForm<FormFields>({
    validateInputOnChange: true,
    initialValues: {
      phoneNumber: '',
      smsCode: '',
      nickName: ''
    },
    validate: {
      phoneNumber: (value: string) =>
        value.length < 12 ? 'The phone number must consist of 12 characters' : null,
      smsCode: (value: string) =>
        value.length < 6 ? 'The smc code number must consist of 6 characters' : null,
      nickName: (value: string) => (value.length < 2 ? 'Name must have at least 2 letters' : null)
    }
  });

  const renderForm = (stepForm: string) => {
    switch (stepForm) {
      case 'login':
        return <LoginForm form={form} />;
      case 'sms':
        return <CheckSmsCodeForm form={form} />;
      case 'auth':
        // return <SuccessCheckCode />;
        return <div>Succes</div>;
      case 'nick':
        return <NickNameForm form={form} />;
    }
  };

  return (
    <Flex>
      <form>{renderForm(stepForm)}</form>
    </Flex>
  );
};
