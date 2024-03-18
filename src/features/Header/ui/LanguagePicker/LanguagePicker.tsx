import { Group, Image, Menu, UnstyledButton } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { LanguagePickerData } from '@/shared/config/LanguagePicker/LanguagePicker';

import classes from './LanguagePicker.module.css';

type LanPickerProps = { label: string; image: string };

type LanguagePickerProps = {
  type: 'collapsed' | 'expanded';
};

export const LanguagePicker = ({ type }: LanguagePickerProps) => {
  const [selected, setSelected] = useState(LanguagePickerData[0]);
  const { i18n } = useTranslation();

  const changeLanguage = (item: LanPickerProps) => {
    i18n.changeLanguage(item.label);
    setSelected(item);
  };

  const items = LanguagePickerData.map((item) => (
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
