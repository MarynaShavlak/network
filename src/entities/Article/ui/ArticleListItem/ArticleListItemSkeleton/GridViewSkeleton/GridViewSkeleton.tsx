import { memo } from 'react';
import { toggleFeatures } from '@/shared/lib/features';
import { ArticleListItemSkeletonProps } from '../ArticleListItemSkeleton';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Card as CardRedesigned } from '@/shared/ui/redesigned/Card';
import cls from '../../ArticleListItem.module.scss';

export const GridViewSkeleton = memo((props: ArticleListItemSkeletonProps) => {
    const { className, view } = props;

    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated,
    });

    const Card = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => CardRedesigned,
        off: () => CardDeprecated,
    });

    return (
        <div
            className={classNames(cls.ArticleListItem, {}, [
                className,
                cls[view],
            ])}
        >
            <Card className={cls.card}>
                <div className={cls.imageWrapper}>
                    <Skeleton width={200} height={200} className={cls.img} />
                </div>
                <div className={cls.infoWrapper}>
                    <Skeleton width={130} height={16} />
                </div>
                <Skeleton width={150} height={16} className={cls.title} />
            </Card>
        </div>
    );
});
