import { memo } from 'react';
import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { HStack } from '@/shared/ui/common/Stack';
import { ArticleViewSelectorProps } from '../ArticleViewSelector';

import { ArticleView } from '@/entities/Article';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Each } from '@/shared/lib/components/Each/Each';

import cls from '../ArticleViewSelector.module.scss';
import { getRedesignedViewTypes } from '../../../lib/utilities/getRedesignedViewTypes/getRedesignedViewTypes';

export const ArticleViewSelectorRedesigned = memo(
    (props: ArticleViewSelectorProps) => {
        const { className, view, onViewClick } = props;
        const onClick = (newView: ArticleView) => () => {
            onViewClick?.(newView);
        };
        const viewTypes = getRedesignedViewTypes();
        return (
            <Card
                className={classNames(cls.ArticleViewSelectorRedesigned, {}, [
                    className,
                ])}
                border="round"
            >
                <HStack gap="8">
                    <Each
                        of={viewTypes}
                        render={(viewType) => {
                            return (
                                <Icon
                                    width={32}
                                    height={32}
                                    clickable
                                    key={viewType.view}
                                    onClick={onClick(viewType.view)}
                                    Svg={viewType.icon}
                                    className={classNames('', {
                                        [cls.notSelected]:
                                            viewType.view !== view,
                                    })}
                                />
                            );
                        }}
                    />
                </HStack>
            </Card>
        );
    },
);
