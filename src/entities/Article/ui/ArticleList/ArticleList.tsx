import { HTMLAttributeAnchorTarget, memo, useEffect, useState } from 'react';
import { ArticleListSkeleton } from './ArticleListSkeleton/ArticleListSkeleton';
import { ArticleListError } from './ArticleListError/ArticleListError';

import cls from './ArticleList.module.scss';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem/ArticleListItem';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Each } from '@/shared/lib/components/Each/Each';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { toggleFeatures } from '@/shared/lib/features';
import { Article } from '../../model/types/article';
import { ArticleView } from '../../model/consts/articleConsts';

export interface ArticleListProps {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    target?: HTMLAttributeAnchorTarget;
    view?: ArticleView;
}

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        className,
        articles,
        view = ArticleView.GRID,
        isLoading,
        target,
    } = props;

    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        if (isLoading === false && articles.length > 0) {
            setHasLoaded(true);
        }
    }, [isLoading, articles]);

    const hasSkeletonBeShown = isLoading;
    const hasErrorBeShown = !articles.length && !isLoading && hasLoaded;

    const mainClass = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => cls.ArticleListRedesigned,
        off: () => cls.ArticleList,
    });
    const classes = classNames(mainClass, {}, [className, cls[view]]);

    const content = (
        <Each
            of={articles}
            render={(item) => {
                return (
                    <ArticleListItem
                        article={item}
                        view={view}
                        target={target}
                        key={item.id}
                    />
                );
            }}
        />
    );
    if (!view) {
        return null;
    }
    if (hasSkeletonBeShown) {
        return <ArticleListSkeleton view={view} />;
    }
    if (hasErrorBeShown) {
        return <ArticleListError view={view} />;
    }

    if (view === ArticleView.LIST) {
        return (
            <VStack gap="16" className={classes}>
                {content}
            </VStack>
        );
    }

    return (
        <HStack wrap="wrap" gap="16" className={classes}>
            {content}
        </HStack>
    );
});
