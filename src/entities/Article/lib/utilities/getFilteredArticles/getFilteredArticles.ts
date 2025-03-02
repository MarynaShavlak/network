import { DocumentData, getDocs, Query } from 'firebase/firestore';
import { Article } from '../../../model/types/article';

export const getFilteredArticles = async (
    filteredQuery: Query<Article, DocumentData>,
) => {
    const snapshot = await getDocs(filteredQuery);
    return snapshot.docs.map((doc) => ({
        ...doc.data(),
        // id: doc.id,
    })) as Article[];
};
