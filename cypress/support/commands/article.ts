import { Article } from '../../../src/entities/Article';

const defaultArticle = {
    title: 'TESTING ARTICLE',
    subtitle: 'React hooks',
    img: 'https://miro.medium.com/v2/resize:fit:1400/0*5KGuaB1kovyV4EbV.png',
    views: 1022,
    createdAt: '26.02.2024',
    userId: '1',
    category: ['IT'],
    blocks: [],
};

export const createArticle = (article?: Article) => {
    return cy
        .request({
            method: 'POST',
            url: `${Cypress.env('apiUrl')}/articles`,
            headers: { Authorization: 'asasf' },
            body: article ?? defaultArticle,
        })
        .then((resp) => resp.body);
};

export const removeArticle = (articleId: string) => {
    return cy.request({
        method: 'DELETE',
        url: `${Cypress.env('apiUrl')}/articles/${articleId}`,
        headers: { Authorization: 'asasf' },
    });
};

declare global {
    namespace Cypress {
        interface Chainable {
            createArticle(article?: Article): Chainable<Article>;
            removeArticle(articleId: string): Chainable<void>;
        }
    }
}
