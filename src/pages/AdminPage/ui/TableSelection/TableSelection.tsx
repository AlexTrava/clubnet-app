import { ActionIcon, Avatar, Checkbox, Group, rem, ScrollArea, Table, Text } from '@mantine/core';
import { IconFileCheck } from '@tabler/icons-react';
import cx from 'clsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { data } from '../mocData';
import classes from './TableSelection.module.css';

export function TableSelection() {
  const [selection, setSelection] = useState(['1']);

  const navigate = useNavigate();
  const toggleRow = (id: string) =>
    setSelection((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) => (current.length === data.length ? [] : data.map((item) => item.id)));

  const userDetail = (id: string) => {
    navigate(`${id}`);
  };
  const rows = data.map((item) => {
    const selected = selection.includes(item.id);
    return (
      <Table.Tr
        onClick={() => {
          userDetail(item.id);
        }}
        key={item.id}
        className={cx({ [classes.rowSelected]: selected })}>
        <Table.Td>
          <Checkbox checked={selection.includes(item.id)} onChange={() => toggleRow(item.id)} />
        </Table.Td>
        <Table.Td>
          <Group gap="sm">
            <Avatar size={26} src={item.avatar} radius={26} />
            <Text size="sm" fw={500}>
              {item.name}
            </Text>
          </Group>
        </Table.Td>
        <Table.Td>{item.rule}</Table.Td>
        <Table.Td>{item.nickName}</Table.Td>
        <Table.Td>{item.phone}</Table.Td>
        <Table.Td>{item.balans}</Table.Td>
        <ActionIcon variant="subtle" color="gray">
          <IconFileCheck
            onClick={() => userDetail(item.id)}
            style={{ width: rem(16), height: rem(16) }}
            stroke={1.5}
          />
        </ActionIcon>
      </Table.Tr>
    );
  });

  return (
    <ScrollArea>
      <Table className={classes.tableWrapper} verticalSpacing="md">
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ width: rem(40) }}>
              <Checkbox
                onChange={toggleAll}
                checked={selection.length === data.length}
                indeterminate={selection.length > 0 && selection.length !== data.length}
              />
            </Table.Th>
            <Table.Th>ФИО</Table.Th>
            <Table.Th>Роль</Table.Th>
            <Table.Th>Никнейм</Table.Th>
            <Table.Th>Телефон</Table.Th>
            <Table.Th>Баланс</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
