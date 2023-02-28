import { Button, Divider, Flex, Paper, Text } from '@mantine/core';

import useGlobalCtx from 'src/store/global/use-global-ctx';

import useStyles from './Danger.styles';

import { IconAlertTriangle, IconTrash, IconFileText } from '@tabler/icons-react';
import { useApiAuth } from 'src/api/auth/use-api-auth';
import { openConfirmModal } from '@mantine/modals';
import { useSession } from '@supabase/auth-helpers-react';
import { useResponsive } from '@hooks/use-responsive';

const Danger = () => {
  const { classes, theme } = useStyles();
  const { translate, content } = useGlobalCtx();
  const isSm = useResponsive('max', 'sm');
  const { auth_deleteAllDocuments, isLoading: isLoading1 } = useApiAuth();
  const { auth_deleteAccount, isLoading: isLoading2 } = useApiAuth();

  // Delete account confirmation
  const openDeleteAccModal = () =>
    openConfirmModal({
      title: (
        <Text size="lg" fw={600}>
          Please confirm your action
        </Text>
      ),
      children: <Text size="sm">{translate(content.pages.user.danger.deleteAccDescription)}</Text>,
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      onCancel: () => {},
      onConfirm: () => auth_deleteAccount(),
      confirmProps: { color: 'red' },
      centered: true,
    });

  // Delete all documents confirmation
  const openDeleteDocsModal = () =>
    openConfirmModal({
      title: (
        <Text size="lg" fw={600}>
          Please confirm your action
        </Text>
      ),
      children: <Text size="sm">{translate(content.pages.user.danger.deleteDocDescription)}</Text>,
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      onCancel: () => {},
      onConfirm: () => auth_deleteAllDocuments(),
      confirmProps: { color: 'red' },
      centered: true,
    });

  return (
    <Paper radius="md" p="xl" withBorder className={classes.paper}>
      <Flex align="center" mb="xl">
        <IconAlertTriangle size={32} color={theme.colors.red[6]} />

        <Text size={28} weight={600} ml="sm">
          {translate(content.pages.user.danger.title)}
        </Text>
      </Flex>

      <Divider my="md" />

      <Flex
        align={isSm ? 'start' : 'center'}
        justify="space-between"
        direction={isSm ? 'column' : 'row'}
        gap="xl"
      >
        <Text size="md" weight={400} w={isSm ? '100%' : '50%'}>
          {translate(content.pages.user.danger.deleteDocDescription)}
        </Text>

        <Button
          color="red"
          leftIcon={<IconFileText size={20} />}
          onClick={openDeleteDocsModal}
          loading={isLoading1}
        >
          {translate(content.pages.user.danger.deleteDocButton)}
        </Button>
      </Flex>

      <Divider my="md" />

      <Flex
        align={isSm ? 'start' : 'center'}
        justify="space-between"
        direction={isSm ? 'column' : 'row'}
        gap="xl"
      >
        <Text size="md" weight={400} w={isSm ? '100%' : '50%'}>
          {translate(content.pages.user.danger.deleteAccDescription)}
        </Text>

        <Button
          color="red"
          leftIcon={<IconTrash size={20} />}
          onClick={openDeleteAccModal}
          loading={isLoading2}
        >
          {translate(content.pages.user.danger.deleteAccButton)}
        </Button>
      </Flex>
    </Paper>
  );
};

export default Danger;
