import { LuSearch } from 'react-icons/lu';
import { Flex, Heading, Input, InputGroup, VStack } from '@chakra-ui/react';

import type { User } from 'shared/types';

import { FriendItem } from './FriendItem';

export type Friend = Omit<User, 'email' | 'birthDate' | 'xp'>;

const mockFriends: Friend[] = [
    {
        id: '1',
        username: 'Dasha',
        level: 88,
        avatarUrl: null,
    },
    {
        id: '2',
        username: 'Amir',
        level: 13,
        avatarUrl: null,
    },
    {
        id: '3',
        username: 'Julia',
        level: 42,
        avatarUrl: null,
    },
    {
        id: '4',
        username: 'Alina',
        level: 69,
        avatarUrl: null,
    },
    {
        id: '1',
        username: 'Dasha',
        level: 88,
        avatarUrl: null,
    },
    {
        id: '2',
        username: 'Amir',
        level: 13,
        avatarUrl: null,
    },
    {
        id: '3',
        username: 'Julia',
        level: 42,
        avatarUrl: null,
    },
    {
        id: '4',
        username: 'Alina',
        level: 69,
        avatarUrl: null,
    },
    {
        id: '1',
        username: 'Dasha',
        level: 88,
        avatarUrl: null,
    },
    {
        id: '2',
        username: 'Amir',
        level: 13,
        avatarUrl: null,
    },
    {
        id: '3',
        username: 'Julia',
        level: 42,
        avatarUrl: null,
    },
    {
        id: '4',
        username: 'Alina',
        level: 69,
        avatarUrl: null,
    },
    {
        id: '1',
        username: 'Dasha',
        level: 88,
        avatarUrl: null,
    },
    {
        id: '2',
        username: 'Amir',
        level: 13,
        avatarUrl: null,
    },
    {
        id: '3',
        username: 'Julia',
        level: 42,
        avatarUrl: null,
    },
];

export const Friends = () => {
    return (
        <Flex
            direction="column"
            w="full"
            gap={4}
            bgColor="bg.panel"
            borderRadius="lg"
            shadow="md"
            padding={4}
            maxHeight="full"
            overflow="hidden"
        >
            <Heading size="md">Друзья</Heading>

            <InputGroup startElement={<LuSearch />}>
                <Input
                    variant="subtle"
                    size="sm"
                    placeholder="Введите имя вашего друга"
                />
            </InputGroup>

            <VStack w="full" overflowY="scroll">
                {mockFriends.map((friend, index) => (
                    <FriendItem {...friend} key={index} />
                ))}
            </VStack>
        </Flex>
    );
};
