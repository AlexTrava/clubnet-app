import { notifications } from '@mantine/notifications';

const errorHandler = (error: unknown, title: string): string => {
  const color = 'red';
  return notifications.show({
    id: 'error-notifications',
    title: title,
    message: error as string,
    color
  });
};

export default errorHandler;
