import { Flex } from '@mantine/core';

import { ProfileInfo } from '@/enteties/ui/ProfileInfo/ProfileInfo';

function ProfilePage() {
  return (
    <>
      <Flex mt={'48px'} ml={'48px'}>
        <ProfileInfo />
      </Flex>
    </>
  );
}

export default ProfilePage;
