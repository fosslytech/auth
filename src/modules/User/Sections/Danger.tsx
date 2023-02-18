import { Button, Divider, Flex, Paper, Text } from '@mantine/core';

import useGlobalCtx from 'src/store/global/use-global-ctx';

import useStyles from './Danger.styles';

import { IconAlertTriangle, IconTrash, IconFileText } from '@tabler/icons-react';
import { useApiAuth } from 'src/api/auth/use-api-auth';
import { openConfirmModal } from '@mantine/modals';
import { useSession } from '@supabase/auth-helpers-react';

const Danger = () => {
  const { classes, theme } = useStyles();
  const { translate, content } = useGlobalCtx();
  const { auth_deleteAccount, isLoading } = useApiAuth();
  const session = useSession();

  // Delete account confirmation
  const openDeleteModal = () =>
    openConfirmModal({
      title: (
        <Text size="lg" fw={600}>
          Please confirm your action
        </Text>
      ),
      children: <Text size="sm">{translate(content.pages.user.danger.deleteAccDescription)}</Text>,
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      onCancel: () => {},
      onConfirm: () => auth_deleteAccount(session.user.id),
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

      <Flex direction="row" align="center" justify="space-between">
        <Text size="md" weight={400} w="50%">
          {translate(content.pages.user.danger.deleteDocDescription)}
        </Text>

        <Button color="red" leftIcon={<IconFileText size={20} />} disabled>
          {translate(content.pages.user.danger.deleteDocButton)}
        </Button>
      </Flex>

      <Divider my="md" />

      <Flex direction="row" align="center" justify="space-between">
        <Text size="md" weight={400} w="50%">
          {translate(content.pages.user.danger.deleteAccDescription)}
        </Text>

        <Button color="red" leftIcon={<IconTrash size={20} />} onClick={openDeleteModal} loading={isLoading}>
          {translate(content.pages.user.danger.deleteAccButton)}
        </Button>
      </Flex>
    </Paper>
  );
};

export default Danger;
