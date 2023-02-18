import { Center, Container, Loader } from '@mantine/core';
import { useSession } from '@supabase/auth-helpers-react';
import React from 'react';
import Danger from './Sections/Danger';
import Details from './Sections/Details';

const Profile = () => {
  const session = useSession();

  if (!session) {
    return (
      <Center h="100%">
        <Loader size="xl" />
      </Center>
    );
  }

  return (
    <Container size="lg" py="xl" mt={40} mb={40}>
      <Details />

      <Danger />
    </Container>
  );
};

export default Profile;
