/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { v4 } = require('uuid');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const { getFirestore } = require('firebase-admin/firestore');

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send('Hello, ninjas!');
});

admin.initializeApp();
const db = getFirestore();

async function createNotification(notification) {
    try {
        await db
            .collection('notifications')
            .doc('general')
            .collection('messages')
            .doc(notification.id) // Store using a unique ID
            .set(notification);
        console.log('Notification created:', notification);
    } catch (error) {
        console.error('Error creating notification:', error);
    }
}

async function createPersonalNotification(notification, userId) {
    try {
        await db
            .collection('notifications')
            .doc('personal')
            .collection(userId)
            .doc(notification.id) // Store using a unique ID
            .set(notification);
        console.log('Notification created:', notification);
    } catch (error) {
        console.error('Error creating personal notification:', error);
    }
}

exports.articleCreated = onDocumentCreated(
    'articles/{articleId}',
    async (event) => {
        const doc = event.data;
        if (!doc) return null; // Ensure the document exists

        const article = doc.data();
        const { category, user } = article;
        const { id: userId } = user;
        const categoryText =
            category.length > 1 ? `${category.join(', ')}` : `${category}`;
        const notification = {
            id: v4(),

            localizationTitle: {
                en: 'New Article Published!',
                uk: 'Опубліковано нову статтю!',
            },
            localizationMessage: {
                en: `A new article, "${article.title}",  has been added to the following categories: ${categoryText}. Check it out!`,
                uk: `Нова стаття "${article.title}" була додана до таких рубрик: ${categoryText}. Скоріше перегляньте!`,
            },
            href: `/article/${article.id}`,
            timestamp: new Date().toISOString(),
            type: 'general',
            authorId: userId,
            dismissedBy: [userId],
        };

        return createNotification(notification);
    },
);

exports.notifyArticleCommented = onDocumentCreated(
    'comments/{commentId}',
    async (event) => {
        const doc = event.data;
        if (!doc) return null;

        const comment = doc.data();
        const { articleId, user, text } = comment;
        const { username } = user;

        const articleQuerySnapshot = await db
            .collection('articles')
            .where('id', '==', articleId)
            .limit(1)
            .get();

        if (articleQuerySnapshot.empty) {
            console.log(`No article found with id: ${articleId}`);
            return null;
        }

        const articleDoc = articleQuerySnapshot.docs[0];
        const articleData = articleDoc.data();
        const title =
            articleData.title.length > 30
                ? `${articleData.title.slice(0, 30)}...`
                : articleData.title;
        const commentText = text.length > 20 ? `${text.slice(0, 30)}...` : text;
        const notification = {
            id: v4(),
            localizationTitle: {
                en: 'New comment on your article!',
                uk: 'Новий коментар до Вашої статті!',
            },
            localizationMessage: {
                en: `User <b>${username}</b> commented your article "${title}" with comment "${commentText}"`,
                uk: `Користувач <b>${username}</b> додав до Вашої статті  "${title}" коментар "${commentText}"`,
            },
            href: `/article/${articleData.id}`,
            timestamp: new Date().toISOString(),
            type: 'personal_comment',
        };

        return createPersonalNotification(notification, articleData.user.id);
    },
);

exports.notifyArticleRated = onDocumentCreated(
    'ratings/{ratingId}',
    async (event) => {
        const doc = event.data;
        if (!doc) return null;

        const rating = doc.data();
        const { articleId, user, rate, feedback } = rating;
        const { username } = user;

        const articleQuerySnapshot = await db
            .collection('articles')
            .where('id', '==', articleId)
            .limit(1)
            .get();

        if (articleQuerySnapshot.empty) {
            console.log(`No article found with id: ${articleId}`);
            return null;
        }

        const articleDoc = articleQuerySnapshot.docs[0];
        const articleData = articleDoc.data();
        const title =
            articleData.title.length > 30
                ? `${articleData.title.slice(0, 30)}...`
                : articleData.title;
        const feedbackText =
            feedback?.length > 20 ? `${feedback?.slice(0, 20)}...` : feedback;
        const stars = '⭐'.repeat(rate);

        const enMessage = `User <b>${username}</b> rated your article "${title}" with ${stars} ${
            feedback
                ? ` 
        and left feedback: "${feedbackText}"`
                : ''
        }.`;
        const ukMessage = `Користувач <b>${username}</b> оцінив Вашу статтю "${title}" на ${stars}
${feedback ? ` і залишив відгук: "${feedbackText}"` : ''}.`;
        const notification = {
            id: v4(),
            localizationTitle: {
                en: 'Your article has been rated!',
                uk: 'Вашу статтю було оцінено!',
            },
            localizationMessage: {
                en: enMessage,
                uk: ukMessage,
            },
            href: `/article/${articleData.id}`,
            timestamp: new Date().toISOString(),
            type: 'personal_rating',
        };

        return createPersonalNotification(notification, articleData.user.id);
    },
);
