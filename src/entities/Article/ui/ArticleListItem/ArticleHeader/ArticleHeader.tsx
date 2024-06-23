import { HStack, VStack } from '@/shared/ui/Stack';
import { Article } from '../../../model/types/article';
import { Text } from '@/shared/ui/Text';
import cls from './ArticleHeader.module.scss';
import { Avatar } from '@/shared/ui/Avatar';

export const ArticleHeader = ({ article }: { article: Article }) => (
    <VStack className={cls.header} gap="16">
        <HStack gap="16">
            <Avatar size={30} src={article.user.avatar} />
            <Text text={article.user.username} className={cls.username} />
        </HStack>
        <Text text={article.createdAt} className={cls.date} />
    </VStack>
);