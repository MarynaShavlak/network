import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { EditableProfileCard } from '@/features/editableProfileCard';
import { VStack } from '@/shared/ui/redesigned/Stack';

export const ProfileContainer = memo(() => {
    const { id } = useParams<{ id: string }>();

    return (
        <VStack gap="16" max>
            <EditableProfileCard id={id} />
        </VStack>
    );
});
