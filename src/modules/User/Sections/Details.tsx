import { Avatar, Button, Divider, Flex, Group, Paper, Text, useMantineTheme } from '@mantine/core';

import useGlobalCtx from 'src/store/global/use-global-ctx';

import { IconBrandGithub, IconBrandGitlab, IconDownload, IconMail, IconUser } from '@tabler/icons-react';
import { useSession } from '@supabase/auth-helpers-react';
import useDownload from '@hooks/use-download';

const Details = () => {
  const { translate, content } = useGlobalCtx();
  const { jsFileDownload } = useDownload();
  const theme = useMantineTheme();
  const session = useSession();

  // GitHub metadata
  const ghImg = session.user.user_metadata?.avatar_url;
  const ghName = session.user.user_metadata?.user_name;

  // GitLab metadata
  const glName = session.user.user_metadata?.name;

  const avatarUrl = ghImg;
  const username = ghName || glName;

  const provider = session.user.app_metadata.provider;
  const providerIcon = {
    github: <IconBrandGithub size={24} />,
    gitlab: <IconBrandGitlab size={24} color={theme.colors.orange[6]} />,
  };

  const handleDownload = () => {
    jsFileDownload({ text: JSON.stringify(session.user), filename: 'data.json' });
  };

  return (
    <Paper radius="md" p="xl" mb={40} withBorder>
      <Flex align="center" mb="xl">
        <IconUser size={32} />

        <Text size={28} weight={600} ml="sm">
          {translate(content.pages.user.details.title)}
        </Text>
      </Flex>

      <Divider my="md" />

      <Flex align="center">
        <Avatar size="xl" radius="xl" mr="md" src={avatarUrl} />

        <div style={{ flex: 1 }}>
          {username && (
            <Flex align="center" mb="xs">
              {providerIcon[provider]}

              <Text weight={600} size="xl" ml="xs" truncate>
                {username}
              </Text>
            </Flex>
          )}

          <Flex align="center">
            <IconMail size={24} />

            <Text size="md" weight={500} color="dimmed" ml="xs" mb={2} truncate>
              {session.user.email}
            </Text>
          </Flex>
        </div>

        <div style={{ flex: 1 }}></div>

        <Button leftIcon={<IconDownload size={20} />} onClick={handleDownload}>
          Download my data
        </Button>
      </Flex>
    </Paper>
  );
};

export default Details;
