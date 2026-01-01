import type { FC } from 'react';
import { Dialog, type DialogOpenChangeDetails } from '@chakra-ui/react';

export type EditProfilePanelProps = {
    isOpen: boolean;
    onOpenChange: (details: DialogOpenChangeDetails) => void;
};

export const EditProfilePanel: FC<EditProfilePanelProps> = ({
    isOpen,
    onOpenChange,
}) => {
    return (
        <Dialog.Root
            size="cover"
            lazyMount
            onOpenChange={onOpenChange}
            open={isOpen}
            closeOnEscape
        >
            <Dialog.Trigger />
            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content>
                    <Dialog.CloseTrigger />
                    <Dialog.Header>
                        <Dialog.Title>Ваш профиль</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body></Dialog.Body>
                    <Dialog.Footer />
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>
    );
};
