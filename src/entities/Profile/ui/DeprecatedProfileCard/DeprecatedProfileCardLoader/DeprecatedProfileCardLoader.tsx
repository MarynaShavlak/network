import { Loader } from '@/shared/ui/deprecated/Loader';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { HStack } from '@/shared/ui/common/Stack';
import cls from '../DeprecatedProfileCard.module.scss';

export const DeprecatedProfileCardLoader = () => {
    return (
        <HStack
            justify="center"
            max
            className={classNames(cls.ProfileCard, { [cls.loading]: true })}
        >
            <Loader />
        </HStack>
    );
};
