import { memo, useCallback } from 'react';
import { RedesignedEditableProfileCardHeader } from './RedesignedEditableProfileCardHeader/RedesignedEditableProfileCardHeader';
import { DeprecatedEditableProfileCardHeader } from './DeprecatedEditableProfileCardHeader/DeprecatedEditableProfileCardHeader';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { useUserAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useProfileActions } from '../../model/slices/profileSlice';
import { useProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { useProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { updateUserProfileThunk } from '../../model/services/updateUserProfileThunk/updateUserProfileThunk';
import { useProfile } from '../../lib/hooks/useProfile';
import { useUploadedProfilePhoto } from '../../model/selectors/getUploadedProfilePhoto/getUploadedProfilePhoto';
import { uploadImageThunk } from '../../model/services/uploadImageThunk/uploadImageThunk';
import { useProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';

interface EditableProfileCardHeaderProps {
    className?: string;
}

export const EditableProfileCardHeader = memo(
    (props: EditableProfileCardHeaderProps) => {
        const { className } = props;

        const authData = useUserAuthData();
        const profileData = useProfileData();
        const formData = useProfileForm();
        const canEdit = authData?.id === profileData?.id;
        const readonly = useProfileReadonly();
        const dispatch = useAppDispatch();
        const { hasErrors, onChangeAvatar } = useProfile();
        const { setReadonly, cancelEdit } = useProfileActions();
        const uploadedProfilePhoto = useUploadedProfilePhoto();

        const onSave = useCallback(async () => {
            // console.log('profileData', profileData);
            // console.log('formData', formData);
            // console.log('uploadedProfilePhoto', uploadedProfilePhoto);
            if (uploadedProfilePhoto) {
                const url = await dispatch(
                    uploadImageThunk(uploadedProfilePhoto),
                ).unwrap();
                onChangeAvatar(url);
            }
            if (uploadedProfilePhoto == null) {
                onChangeAvatar('');
            }

            dispatch(updateUserProfileThunk());
        }, [
            dispatch,
            formData,
            onChangeAvatar,
            profileData,
            uploadedProfilePhoto,
        ]);

        const onEdit = useCallback(() => {
            setReadonly(false);
        }, [setReadonly]);

        const onCancelEdit = useCallback(() => {
            cancelEdit();
        }, [cancelEdit]);

        const commonProps = {
            onEdit,
            onCancelEdit,
            onSave,
            canEdit,
            readonly,
            hasErrors,
            className,
        };

        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<RedesignedEditableProfileCardHeader {...commonProps} />}
                off={<DeprecatedEditableProfileCardHeader {...commonProps} />}
            />
        );
    },
);
