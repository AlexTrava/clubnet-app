import { Avatar, CloseButton, Combobox, Group, Text, TextInput, useCombobox } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import {
  getFindUser,
  getUsersArray,
  getUserState
} from '@/features/UserSearchAutocomplete/model/selectors';
import {
  handlerSearchUserInput,
  setClearSearchImputCloseButton,
  setClearSearchImputOnClose,
  setFindUser
} from '@/features/UserSearchAutocomplete/model/slice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';

export const UserSearchAutocomplete = () => {
  const dispatch = useAppDispatch();

  const combobox = useCombobox();

  const usersArray = useAppSelector(getUsersArray);
  const userState = useAppSelector(getUserState);
  const findUser = useAppSelector(getFindUser);

  const { t } = useTranslation();
  const options = usersArray.map((item) => (
    <Combobox.Option value={item.displayName!} key={item.id}>
      {
        <Group gap="sm">
          <Avatar size={26} src={item.photo} radius={26} />
          <Text size="xs">{item.displayName}</Text>
        </Group>
      }
    </Combobox.Option>
  ));

  const searchUser = (string: string) => {
    dispatch(setFindUser(string));
  };

  const setUsers = (string: string) => {
    dispatch(handlerSearchUserInput(string));
  };

  const onCloseCombobox = () => {
    dispatch(setClearSearchImputOnClose());
  };

  const onCloseButton = () => {
    dispatch(setClearSearchImputCloseButton());
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    searchUser(event.currentTarget.value);
    setUsers(event.currentTarget.value);
    combobox.openDropdown();
    combobox.updateSelectedOptionIndex();
  };

  return (
    <Combobox
      onOptionSubmit={(optionValue) => {
        searchUser(optionValue);
        combobox.closeDropdown();
      }}
      store={combobox}
      onClose={onCloseCombobox}
      withinPortal={false}>
      <Combobox.Target>
        <TextInput
          placeholder={t('autocomplete.searchUser')}
          value={findUser}
          onChange={onChangeInput}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => combobox.closeDropdown}
          rightSection={
            findUser !== '' && (
              <CloseButton
                size="sm"
                onMouseDown={(event) => event.preventDefault()}
                onClick={onCloseButton}
                aria-label="Clear value"
              />
            )
          }
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options.length === 0 || userState === '' ? (
            <Combobox.Empty>{t('autocomplete.nothingFound')}</Combobox.Empty>
          ) : (
            options
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};
