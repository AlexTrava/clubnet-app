import { Group, Image, Menu, UnstyledButton } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getLocalStorage } from '@/shared/helpers/useLocalStorage';

import images from './images';
import classes from './LanguagePicker.module.css';
import type { LanguagePickerProps, LanPickerProps } from './types';

const data = [
  { label: 'en', image: images.english },
  { label: 'ru', image: images.ru }
];

export const LanguagePicker = ({ type }: LanguagePickerProps) => {
  const initialLeng = data.find((i) => i.label === getLocalStorage('i18nextLng')) ?? data[0];
  const [selected, setSelected] = useState(initialLeng);
  const { i18n } = useTranslation();

  const changeLanguage = (item: LanPickerProps) => {
    i18n.changeLanguage(item.label);
    setSelected(item);
  };

  const items = data.map((item) => (
    <Menu.Item
      leftSection={<Image src={item.image} width={18} height={18} alt="flag" />}
      onClick={() => changeLanguage(item)}
      key={item.label}>
      {item.label}
    </Menu.Item>
  ));

  return (
    <Menu radius="sm" withinPortal width={200}>
      <Menu.Target>
        <UnstyledButton className={classes.control}>
          <Group gap="xs">
            <Image src={selected.image} width={22} height={22} alt="flag" />
            {type === 'expanded' && <span className={classes.label}>{selected.label}</span>}
          </Group>
          {type === 'expanded' && (
            <IconChevronDown size="1rem" className={classes.icon} stroke={1.5} />
          )}
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>{items}</Menu.Dropdown>
    </Menu>
  );
};
