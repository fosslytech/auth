import { Button, Center, Container, Divider, Paper, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconUser } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';
import useGlobalCtx from 'src/store/global/use-global-ctx';

const Deleted = () => {
  const { translate, content } = useGlobalCtx();

  const isMobile = useMediaQuery('(max-width: 500px)');

  return (
    <Center style={{ height: '100%' }}>
      <Container size={460} style={{ width: '100%' }} my={40} px={0}>
        <Title align="center" sx={() => ({ fontWeight: 900 })}>
          {translate(content.pages.user_deleted.title)}
        </Title>
        {/* <Text color="dimmed" size="sm" align="center" mt={5}>
          {translate(content.pages.auth_confirm.description)}
        </Text> */}

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Link href={'mailto:'} style={{ minWidth: isMobile ? '100%' : 'unset' }}>
            <Button variant="default" fullWidth leftIcon={<IconUser size={22} />} size="md">
              {translate(content.pages.user_deleted.newAcc)}
            </Button>
          </Link>

          <Divider label="Or you can" labelPosition="center" my="xl" />

          <Link href={'/'}>
            <Button variant="light" fullWidth size="md">
              {translate(content.pages.user_deleted.goBack)}
            </Button>
          </Link>
        </Paper>
      </Container>
    </Center>
  );
};

export default Deleted;
