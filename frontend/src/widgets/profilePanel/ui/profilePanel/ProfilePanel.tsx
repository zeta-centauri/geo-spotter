import type { FC } from 'react';
import { Flex } from '@chakra-ui/react';

import { Friends } from '../friends/Friends';
import { ProfileInfo } from '../ProfileIInfo';

type ProfilePanelProps = {
    openEditProfilePanel: () => void;
};

export const ProfilePanel: FC<ProfilePanelProps> = ({
    openEditProfilePanel,
}) => {
    return (
        <Flex
            h="full"
            w={400}
            position="fixed"
            right={0}
            top={0}
            padding={4}
            direction="column"
            borderRadius="lg"
            gap={4}
            maxHeight="full"
        >
            <ProfileInfo openEditProfilePanel={openEditProfilePanel} />
            <Friends />
        </Flex>
    );
};
