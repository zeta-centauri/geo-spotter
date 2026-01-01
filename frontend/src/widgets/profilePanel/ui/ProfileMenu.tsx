import type { FC } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IconButton, Menu, Portal } from '@chakra-ui/react';

type ProfileMenuProps = {
    openEditProfilePanel: () => void;
};

export const ProfileMenu: FC<ProfileMenuProps> = ({ openEditProfilePanel }) => {
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
                        <Menu.Item value="edit" onClick={openEditProfilePanel}>
                            Редактировать
                        </Menu.Item>
                        <Menu.Item value="logout" color="red">
                            Выйти
                        </Menu.Item>
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    );
};
