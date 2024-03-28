import { Button, Container, Flex, Paper, Text, TextInput } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import { useTranslation } from 'react-i18next';

import { handlerNicknameInput } from '@/features/Authentication/model/slice';
import type { FC, FormFields } from '@/features/Authentication/model/types';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';

import classes from './NickNameForm.module.css';

interface NickNameFormProps {
  form: UseFormReturnType<FormFields>;
}

export const NickNameForm: FC<NickNameFormProps> = ({ form }) => {
  const dispatch = useAppDispatch();

  const displayNameHandler = () => {
    dispatch(handlerNicknameInput(form.values.nickName));
  };

  const { t } = useTranslation();

  return (
    <Container size={460} my={30} ta="center">
      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <Text>{t('auth.nickName')}</Text>
        <TextInput required ta="left" {...form.getInputProps('nickName')} />
        <Flex mih={50} gap="sm" justify="center" align="center" direction="column" wrap="wrap">
          <Button
            className={classes.control}
            radius="lg"
            mt={20}
            id="sign-in-button"
            onClick={displayNameHandler}>
            {t('auth.send')}
          </Button>
        </Flex>
      </Paper>
    </Container>
  );
};
