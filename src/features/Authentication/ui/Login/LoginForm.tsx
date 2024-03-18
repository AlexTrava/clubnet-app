import '@mantine/core/styles.css';

import { Button, Flex, Group, Image, Paper, Space, Text, TextInput } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import { useTranslation } from 'react-i18next';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

import { setUserByGithub, setUserByGoogle, signIn } from '@/features/Authentication/model/slice';
import type { FC, FormFields } from '@/features/Authentication/model/types';
import iconSteam from '@/shared/assets/steam.svg';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { RoutersPaths } from '@/shared/types/enums';

import classes from './LoginForm.module.css';

interface LoginFormProps {
  form: UseFormReturnType<FormFields>;
}

export const LoginForm: FC<LoginFormProps> = ({ form }) => {
  const dispatch = useAppDispatch();
  const validFieldPhone = form.isValid('phoneNumber');
  const navigate = useNavigate();

  const handleGithub = () => {
    dispatch(setUserByGithub(() => navigate(RoutersPaths.ADMIN)));
  };

  const handleGoogle = () => {
    dispatch(setUserByGoogle(() => navigate(RoutersPaths.ADMIN)));
  };

  const handlerAuth = () => {
    dispatch(signIn(form.values.phoneNumber));
  };

  const { t } = useTranslation();

  return (
    <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
      <Text size="lg">{t('auth.sign')}</Text>
      <TextInput
        label={t('auth.yourPhone')}
        placeholder={t('auth.enterPhone')}
        required
        ta="left"
        {...form.getInputProps('phoneNumber')}
      />
      <Flex mih={50} gap="sm" justify="center" align="center" direction="column" wrap="wrap">
        <Button
          className={classes.control}
          mt={30}
          radius="lg"
          id="sign-in-button"
          onClick={handlerAuth}
          disabled={!validFieldPhone}>
          {t('auth.sendSms')}
        </Button>
        <Space h="xs" />
        <Group>
          <Button leftSection={<FcGoogle />} variant="default" onClick={handleGoogle}>
            {t('auth.withGoogle')}
          </Button>
          <Button leftSection={<FaGithub />} color="dark.4" onClick={handleGithub}>
            {t('auth.withGithub')}
          </Button>
        </Group>
      </Flex>
      <Space h="md" />
      <Button
        fullWidth
        color="grape.6"
        // radius="lg"
        leftSection={<Image h={20} w={20} src={iconSteam} />}>
        {t('auth.signSteam')}
      </Button>
    </Paper>
  );
};
