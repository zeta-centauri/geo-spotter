import type { FC } from 'react';
import { Avatar, Flex, HStack, Text } from '@chakra-ui/react';

import { FriendMenu } from './FriendMenu';
import type { Friend } from './Friends';

export const FriendItem: FC<Friend> = ({ username, level }) => {
    return (
        <Flex
            gap={4}
            alignItems="center"
            justifyContent="space-between"
            w="full"
        >
            <HStack alignItems="center" justifyContent="space-between">
                <Avatar.Root>
                    <Avatar.Fallback />
                    <Avatar.Image />
                </Avatar.Root>
                <Flex direction="column">
                    <Text textStyle="md" fontWeight="semibold">
                        {username}
                    </Text>
                    <Text textStyle="xs" color="fg.muted">
                        {level} уровень
                    </Text>
                </Flex>
            </HStack>
            <FriendMenu />
        </Flex>
    );
};
