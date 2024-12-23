import React, { memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Code } from '@/shared/ui/redesigned/Code';
import { Code as CodeDeprecated } from '@/shared/ui/deprecated/Code';
import cls from './ArticleCodeBlockComponent.module.scss';
import { ArticleCodeBlock } from '../../model/types/article';
import { Text } from '@/shared/ui/redesigned/Text';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { VStack } from '@/shared/ui/common/Stack';

interface ArticleCodeBlockComponentProps {
    className?: string;
    block: ArticleCodeBlock;
}

export const ArticleCodeBlockComponent = memo(
    (props: ArticleCodeBlockComponentProps) => {
        const { className, block } = props;

        return (
            <VStack className={className} gap="16" max align="center">
                {block.description && (
                    <ToggleFeaturesComponent
                        feature="isAppRedesigned"
                        on={<Text text={block.description} bold />}
                        off={
                            <TextDeprecated
                                text={block.description}
                                className={cls.title}
                            />
                        }
                    />
                )}
                <ToggleFeaturesComponent
                    feature="isAppRedesigned"
                    on={<Code text={block.code} />}
                    off={<CodeDeprecated text={block.code} />}
                />
            </VStack>
        );
    },
);
