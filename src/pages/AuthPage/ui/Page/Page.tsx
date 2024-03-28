import { Flex } from '@mantine/core';

import { AuthenticationForm } from '@/widgets/AuthenticationForm/index';

export default function AuthPage() {
  // const navigate = useNavigate();
  // const user = true;

  // console.log('useEffect');

  // useEffect(() => {
  //   if (user) {
  //     navigate(RoutersPaths.MAIN);
  //   }
  // }, [navigate, user]);

  return (
    <Flex h="100%" justify={'space-around'} mt={'100px'}>
      <AuthenticationForm />
    </Flex>
  );
}
