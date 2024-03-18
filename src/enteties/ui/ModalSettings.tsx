import { Button, Input, Modal, Space, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSettings } from '@tabler/icons-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const ModalSettings: FC = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { t } = useTranslation();

  return (
    <>
      <Modal opened={opened} onClose={close} title={t('profile.update')} centered>
        <Text size="xxl">{t('profile.name')}</Text>
        <Space h="xs" />
        <Input placeholder={t('profile.enterYourName')} />
        <Space h="md" />
        <Button variant="filled">{t('profile.update')}</Button>
      </Modal>
      <Button onClick={open} color="#192E3E">
        <IconSettings width="22" height="22" color="#A0D4F9" />
      </Button>
    </>
  );
};
