import { Article } from '@/entities/Article';

export interface ArticlePartial
    extends Omit<Article, 'category' | 'blocks' | 'image' | 'subtitle'> {
    categories: string;
}

export interface UserArticlesTableInfo extends ArticlePartial {
    commentsQuantity: number;
    averageRating: number | string;
}
