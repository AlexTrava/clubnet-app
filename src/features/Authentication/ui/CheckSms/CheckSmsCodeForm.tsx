import { Button, Flex, Paper, Text, TextInput } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import { useTranslation } from 'react-i18next';

import { handlerVerifyCode } from '@/features/Authentication/model/slice';
import type { FC, FormFields } from '@/features/Authentication/model/types';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';

import classes from './CheckSmsCodeForm.module.css';

interface CheckSmsCodeFormProps {
  form: UseFormReturnType<FormFields>;
}

export const CheckSmsCodeForm: FC<CheckSmsCodeFormProps> = ({ form }) => {
  const dispatch = useAppDispatch();

  const handlerVerifyCodeSms = () => {
    dispatch(handlerVerifyCode(form.values.smsCode));
  };

  const { t } = useTranslation();

  return (
    <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
      <Text>{t('enterCode')}</Text>
      <TextInput required ta="left" {...form.getInputProps('smsCode')} />
      <Flex mih={50} gap="sm" justify="center" align="center" direction="column" wrap="wrap">
        <Button
          className={classes.control}
          radius="lg"
          mt={20}
          id="sign-in-button"
          onClick={handlerVerifyCodeSms}>
          {t('send')}
        </Button>
      </Flex>
    </Paper>
  );
};
