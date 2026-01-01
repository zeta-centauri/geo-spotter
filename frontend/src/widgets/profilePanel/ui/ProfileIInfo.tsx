import type { FC } from 'react';
import { Avatar, Flex, HStack, Progress, Text, VStack } from '@chakra-ui/react';

import { getUserInfo } from 'shared/lib';

import { ProfileMenu } from './ProfileMenu';

type ProfileInfoProps = {
    openEditProfilePanel: () => void;
};

export const ProfileInfo: FC<ProfileInfoProps> = ({ openEditProfilePanel }) => {
    const { username, level, xp } = getUserInfo() ?? {};

    return (
        <Flex
            direction="column"
            gap={4}
            bgColor="bg.panel"
            borderRadius="lg"
            shadow="md"
            padding={4}
        >
            <Flex w="full">
                <Flex w="full" justifyContent="space-between">
                    <Flex gap={4} alignItems="center" grow={1}>
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
                    </Flex>
                    <ProfileMenu openEditProfilePanel={openEditProfilePanel} />
                </Flex>
            </Flex>

            <Progress.Root
                defaultValue={40}
                maxW="sm"
                striped
                colorPalette="red"
                variant="subtle"
            >
                <VStack>
                    <HStack justifyContent="space-between" w="full">
                        <Progress.Label>{level} ур.</Progress.Label>
                        <Progress.Label>{(level ?? 0) + 1} ур.</Progress.Label>
                    </HStack>

                    <VStack w="full" gap="0.5">
                        <HStack
                            justifyContent="space-between"
                            w="full"
                            alignItems="center"
                        >
                            <Progress.Track flex="1">
                                <Progress.Range>
                                    {/* <Text
                                        position="absolute"
                                        right={-2}
                                        bottom={-6}
                                        fontSize="smaller"
                                    >
                                        {xp} XP
                                    </Text> */}
                                </Progress.Range>
                            </Progress.Track>
                        </HStack>

                        <HStack
                            w="full"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Text fontSize="smaller">{xp} XP</Text>
                            <Text fontSize="smaller">{xp} XP</Text>
                        </HStack>
                    </VStack>
                </VStack>
            </Progress.Root>
        </Flex>
    );
};
