import { memo } from 'react';
import { getRouteProfile } from '@/shared/const/router/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/deprecated/Text';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import cls from '../CommentCard.module.scss';
import { Comment } from '../../../model/types/comment';

interface DeprecatedCommentCardProps {
    className?: string;
    comment: Comment;
}

export const DeprecatedCommentCard = memo(
    (props: DeprecatedCommentCardProps) => {
        const { className, comment } = props;

        return (
            <VStack
                max
                gap="8"
                className={classNames(cls.CommentCard, {}, [className])}
            >
                <AppLink
                    to={`${getRouteProfile(comment.user.id)}`}
                    className={cls.header}
                >
                    {comment.user.avatar ? (
                        <Avatar
                            className={cls.avatar}
                            size={30}
                            src={comment.user.avatar}
                        />
                    ) : null}
                    <Text title={comment.user.username} />
                </AppLink>
                <Text text={comment.text} />
            </VStack>
        );
    },
);
