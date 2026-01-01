import { GiHamburgerMenu } from 'react-icons/gi';
import { IoChatbubbleOutline, IoPersonRemoveOutline } from 'react-icons/io5';
import { IconButton, Menu, Portal } from '@chakra-ui/react';
export const FriendMenu = () => {
    return (
        <Menu.Root>
            <Menu.Trigger asChild>
                <IconButton variant="plain" size="sm">
                    <GiHamburgerMenu />
                </IconButton>
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner>
                    <Menu.Content>
                        <Menu.Item value="edit">
                            <IoChatbubbleOutline />
                            Написать сообщение
                        </Menu.Item>
                        <Menu.Item value="logout" color="red">
                            <IoPersonRemoveOutline />
                            Удалить из друзей
                        </Menu.Item>
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    );
};
