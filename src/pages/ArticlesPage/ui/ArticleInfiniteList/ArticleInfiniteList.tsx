import { memo, RefObject, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
    Virtuoso,
    VirtuosoGrid,
    VirtuosoGridHandle,
    VirtuosoHandle,
} from 'react-virtuoso';
import {
    Text as TextDeprecated,
    TextAlign,
    TextTheme,
} from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import {
    getArticles,
    useArticlesPageActions,
} from '../../model/slices/articlesPageSlice';
import {
    useArticlesPageError,
    useArticlesPageIsLoading,
    useArticlesPageView,
    useScrollStopArticleIndex,
} from '../../model/selectors/articlesPageSelectors';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    Article,
    ArticleListSkeleton,
    ArticleView,
    NoArticlesFound,
    ArticleCard,
} from '@/entities/Article';

import cls from '../ArticlesPage/ArticlesPage.module.scss';
import { useVirtuosoGrid } from '../../lib/hooks/useVirtuosoGrid/useVirtuosoGrid';
import { useNoArticlesFound } from '../../lib/hooks/useNoArticlesFound/useNoArticlesFound';
import { ScrollToTopButton } from '@/features/scrollToTopButton';
import { FiltersContainer } from '../FiltersContainer/FiltersContainer';
import { ViewSelectorContainer } from '../ViewSelectorContainer/ViewSelectorContainer';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { Card } from '@/shared/ui/deprecated/Card';
import { HStack } from '@/shared/ui/redesigned/Stack';

interface ArticleInfiniteListProps {
    onInfiniteScroll: () => void;
}

export const ArticleInfiniteList = memo(
    ({ onInfiniteScroll }: ArticleInfiniteListProps) => {
        const dispatch = useAppDispatch();
        const articles = useSelector(getArticles.selectAll);
        const isLoading = useArticlesPageIsLoading();
        const view = useArticlesPageView();
        const error = useArticlesPageError();
        const { t } = useTranslation('articles');
        const errorMessage = t('Помилка запиту статей');
        const isNoArticlesFounded = useNoArticlesFound(isLoading, articles);

        const { setScrollStopArticleIndex } = useArticlesPageActions();
        const scrollStopArticleIndex = useScrollStopArticleIndex();
        const virtuosoListRef = useRef<VirtuosoHandle>(null);
        const virtuosoGridRef = useVirtuosoGrid(scrollStopArticleIndex);

        const handleSaveArticlesPageScrollPosition = useCallback(
            (index: number) => () => {
                dispatch(setScrollStopArticleIndex(index));
            },
            [dispatch, setScrollStopArticleIndex],
        );
        const scrollToTop = useCallback(
            (
                ref: RefObject<VirtuosoHandle> | RefObject<VirtuosoGridHandle>,
            ) => {
                ref.current?.scrollToIndex({
                    index: 0,
                    align: 'start',
                    behavior: 'smooth',
                });
            },
            [],
        );

        const scrollVirtuosoGridToTop = useCallback(() => {
            scrollToTop(virtuosoGridRef);
        }, [scrollToTop, virtuosoGridRef]);

        const scrollVirtuosoListToTop = useCallback(() => {
            scrollToTop(virtuosoListRef);
        }, [scrollToTop, virtuosoListRef]);

        const renderArticle = useCallback(
            (index: number, article: Article) => (
                <ArticleCard
                    article={article}
                    view={view}
                    key={article.id}
                    handleClick={handleSaveArticlesPageScrollPosition(index)}
                />
            ),
            [view, handleSaveArticlesPageScrollPosition],
        );

        const Footer = memo(() => {
            if (isLoading) {
                return <ArticleListSkeleton view={ArticleView.LIST} />;
            }
            return null;
        });

        const ScrollSeekPlaceholder = memo(() => (
            <ArticleListSkeleton view={ArticleView.GRID} />
        ));

        const Header = memo(() => {
            const scrollToTop =
                view === ArticleView.LIST
                    ? scrollVirtuosoListToTop
                    : scrollVirtuosoGridToTop;

            return (
                <div className={cls.scrollButton}>
                    <ScrollToTopButton scrollToTop={scrollToTop} />
                </div>
            );
        });

        if (error) {
            return <Text text={errorMessage} align="center" variant="error" />;
        }

        if (isNoArticlesFounded) {
            return <NoArticlesFound view={view} />;
        }

        const commonProps = {
            data: articles,
            endReached: onInfiniteScroll,
            itemContent: renderArticle,
            useWindowScroll: true,
        };

        if (view === ArticleView.LIST) {
            return (
                <Virtuoso
                    {...commonProps}
                    ref={virtuosoListRef}
                    style={{ height: '100vh' }}
                    initialTopMostItemIndex={scrollStopArticleIndex}
                    components={{
                        Footer,
                        Header,
                    }}
                />
            );
        }

        return (
            <VirtuosoGrid
                {...commonProps}
                ref={virtuosoGridRef}
                components={{
                    ScrollSeekPlaceholder,
                    Header,
                }}
                itemContent={renderArticle}
                listClassName={cls.itemsWrapper}
                scrollSeekConfiguration={{
                    enter: (velocity) => Math.abs(velocity) > 200,
                    exit: (velocity) => Math.abs(velocity) < 30,
                }}
            />
        );
    },
);

export const DeprecatedArticleInfiniteList = memo(
    ({ onInfiniteScroll }: ArticleInfiniteListProps) => {
        const dispatch = useAppDispatch();
        const articles = useSelector(getArticles.selectAll);
        const isLoading = useArticlesPageIsLoading();
        const view = useArticlesPageView();
        const error = useArticlesPageError();
        const { t } = useTranslation('articles');
        const errorMessage = t('Помилка запиту статей');
        const isNoArticlesFounded = useNoArticlesFound(isLoading, articles);

        const { setScrollStopArticleIndex } = useArticlesPageActions();
        const scrollStopArticleIndex = useScrollStopArticleIndex();
        console.log('scrollStopArticleIndex', scrollStopArticleIndex);
        const virtuosoListRef = useRef<VirtuosoHandle>(null);
        const virtuosoGridRef = useVirtuosoGrid(scrollStopArticleIndex);

        console.log('ref', virtuosoGridRef);

        const handleSaveArticlesPageScrollPosition = useCallback(
            (index: number) => () => {
                dispatch(setScrollStopArticleIndex(index));
            },
            [dispatch, setScrollStopArticleIndex],
        );

        const renderArticle = useCallback(
            (index: number, article: Article) => (
                <ArticleCard
                    article={article}
                    view={view}
                    key={article.id}
                    handleClick={handleSaveArticlesPageScrollPosition(index)}
                />
            ),
            [view, handleSaveArticlesPageScrollPosition],
        );

        const Footer = memo(() => {
            if (isLoading) {
                return <ArticleListSkeleton view={ArticleView.LIST} />;
            }
            return null;
        });

        const ScrollSeekPlaceholder = memo(() => (
            <ArticleListSkeleton view={ArticleView.GRID} />
        ));

        const Header = memo(() => {
            return (
                <div className={cls.controlsWrap}>
                    <FiltersContainer />
                    <ViewSelectorContainer className={cls.viewSelector} />
                </div>
            );
        });
        if (virtuosoGridRef.current && !isLoading) {
            return (
                <div className={cls.skeletonContainer}>
                    <Card>
                        <HStack max justify="between">
                            <Skeleton width="434px" height="31px" />
                            <Skeleton width="48px" height="31px" />
                        </HStack>

                        <Skeleton width="100%" height="54px" />
                        <Skeleton width="80%" height="56px" />
                    </Card>

                    <ArticleListSkeleton view={ArticleView.GRID} />
                </div>
            );
        }

        if (error) {
            return (
                <TextDeprecated
                    text={errorMessage}
                    align={TextAlign.CENTER}
                    theme={TextTheme.ERROR}
                />
            );
        }

        if (isNoArticlesFounded) {
            return <NoArticlesFound view={view} />;
        }

        const commonProps = {
            data: articles,
            endReached: onInfiniteScroll,
            itemContent: renderArticle,
        };

        return (
            <div className={cls.ArticlesPageDeprecated}>
                {view === ArticleView.LIST ? (
                    <Virtuoso
                        {...commonProps}
                        ref={virtuosoListRef}
                        style={{
                            height: 'calc(100vh - 80px)',
                        }}
                        initialTopMostItemIndex={scrollStopArticleIndex}
                        components={{
                            Footer,
                            Header,
                        }}
                    />
                ) : (
                    <VirtuosoGrid
                        {...commonProps}
                        totalCount={articles.length}
                        ref={virtuosoGridRef}
                        components={{
                            ScrollSeekPlaceholder,
                            Header,
                        }}
                        style={{
                            height: '100%',
                        }}
                        itemContent={renderArticle}
                        listClassName={cls.itemsWrapper}
                        scrollSeekConfiguration={{
                            enter: (velocity) => Math.abs(velocity) > 200,
                            exit: (velocity) => Math.abs(velocity) < 30,
                        }}
                    />
                )}
            </div>
        );
    },
);
