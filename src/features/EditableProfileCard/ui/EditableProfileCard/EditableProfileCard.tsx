import { memo, useEffect } from 'react';
import { EditableProfileCardContainer } from '../EditableProfileCardContainer/EditableProfileCardContainer';
import { useProfile } from '../../lib/hooks/useProfile/useProfile';
import { EditableProfileCardError } from '../EditableProfileCardError/EditableProfileCardError';
import { toggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { VStack } from '@/shared/ui/common/Stack';
import { profileReducer } from '../../model/slices/profileSlice';
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader';
import cls from './EditableProfileCard.module.scss';
import { getUserProfileThunk } from '../../model/services/getUserProfileThunk/getUserProfileThunk';

interface EditableProfileCardProps {
    className?: string;
    id?: string;
}

const reducers: ReducersList = {
    profile: profileReducer,
};

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
    const { className, id } = props;
    const { validateErrors } = useProfile();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (__PROJECT__ !== 'storybook' && __PROJECT__ !== 'jest' && id) {
            dispatch(getUserProfileThunk(id));
        }
    }, [id, dispatch]);

    const mainClass = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => cls.UserCardRedesigned,
        off: () => '',
    });

    return (
        <DynamicModuleLoader reducers={reducers}>
            <VStack
                gap="8"
                max
                className={classNames(mainClass, {}, [className])}
            >
                <EditableProfileCardHeader />
                {validateErrors?.length && (
                    <EditableProfileCardError validateErrors={validateErrors} />
                )}
                <EditableProfileCardContainer />
            </VStack>
        </DynamicModuleLoader>
    );
});

// useInitialEffect(() => {
//     if (id) {
//         dispatch(getUserProfileThunk(id));
//     }
// });

// useEffect(() => {
//     if (__PROJECT__ !== 'storybook' && __PROJECT__ !== 'jest') {
//         if (id) {
//             const action = dispatch(getUserProfileThunk(id));
//
//             // Cleanup the listener when component unmounts or id changes
//             return () => {
//                 // Abort the thunk action and clean up the listener if necessary
//                 action.abort();
//             };
//         }
//     }
//     // Ensure consistent return when no action is taken
//     return undefined; // Explicit return when no cleanup is needed
// }, [dispatch, id]);
