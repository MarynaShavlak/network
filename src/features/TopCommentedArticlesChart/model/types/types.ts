import { ChartDimensions } from '@/shared/ui/common/Charts/ui/types';

export interface ArticleCommentCount {
    articleId: string;
    commentCount: number;
    articleTitle: string;
}

export interface TopCommentedArticlesChartProps {
    articleCommentCounts: ArticleCommentCount[];
    className?: string;
    chartDimensions: ChartDimensions;
}
