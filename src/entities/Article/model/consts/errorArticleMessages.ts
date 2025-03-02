export const ERROR_ARTICLE_MESSAGES = {
    USER_NOT_FOUND: 'User not found.',
    FETCH_ARTICLE_ERROR: (articleId: string) =>
        `Failed to fetch article with ID "${articleId}".`,
    ARTICLES_FETCH_FAIL: 'Failed to fetch articles.',
    FILTERED_ARTICLES_FETCH_FAIL: 'Failed to fetch filtered articles.',
    DELETE_ARTICLE_ERROR: (articleId: string) =>
        `Failed to delete article with id ${articleId}`,
    ARTICLE_SNAPSHOT_FAIL: (articleId: string) =>
        `Error in article with id "${articleId}" snapshot.`,
    ARTICLE_RETRIEVAL_FAIL: 'Failed to retrieve created article.',
    ADD_ARTICLE_FAIL: 'Error adding new article.',
    ARTICLES_SNAPSHOT_FAIL: 'Error in articles snapshot.',
    ARTICLE_NOT_FOUND: (articleId: string) =>
        `Article with id "${articleId}" not found.`,
    UPDATE_ARTICLE_ERROR: (articleId: string) =>
        `Error updating article with id "${articleId}".`,
    INCREMENT_VIEWS_ERROR: (articleId: string) =>
        `Error incrementing article views with id "${articleId}".`,
    UPDATED_DATA_RETRIEVAL_ERROR: (articleId: string) =>
        `Failed to retrieve updated data for article with id ${articleId}`,
    ARTICLES_BY_USER_ID_FETCH_FAIL: (userId: string) =>
        `Failed to fetch articles for user with ID "${userId}".`,
    DELETE_ERROR: 'Something when wrong when deleting article.',
    ARTICLE_ID_REQUIRED: 'Article ID is required.',
    FIREBASE_STORAGE_NOT_INITIALIZED: 'Firebase storage is not initialized',
    DELETE_IMAGE_ERROR: 'Failed to delete image',
    IMAGE_NOT_FOUND: (imagePath: string) => `Image not found: ${imagePath}`,
    AUTHOR_VIEWS_NOT_COUNTED: "Author's views are not counted",
    NO_API_DATA: 'No data received from API.',
    UPDATE_ARTICLE_VIEWS_ERROR: 'Failed to update article views.',
    UPLOAD_IMAGE_ERROR: 'Failed to upload image',
};
