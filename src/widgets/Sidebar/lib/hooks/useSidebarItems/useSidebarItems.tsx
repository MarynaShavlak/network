import { useUserAuthData } from '@/entities/User';
import AboutIconDeprecated from '@/shared/assets/icons/about-20-20.svg';
import ArticleIconDeprecated from '@/shared/assets/icons/article-20-20.svg';
import ArticleIcon from '@/shared/assets/icons/article.svg';
import ProfileIcon from '@/shared/assets/icons/avatar.svg';
import MainIcon from '@/shared/assets/icons/home.svg';
import AboutIcon from '@/shared/assets/icons/Info.svg';
import LibIcon from '@/shared/assets/icons/lib.svg';
import MainIconDeprecated from '@/shared/assets/icons/main-20-20.svg';
import ProfileIconDeprecated from '@/shared/assets/icons/profile-20-20.svg';
import {
    getRouteAbout,
    getRouteArticles,
    getRouteMain,
    getRouteMyArticles,
    getRouteProfile,
} from '@/shared/const/router/router';
import { toggleFeatures } from '@/shared/lib/features';
import { SidebarItemType } from '../../../model/types/sidebar';

/**
 * Custom hook for managing sidebar items based on user authentication and feature toggles.
 * This hook generates a list of sidebar items with appropriate icons and paths, including
 * conditional items for authenticated users.
 *
 * @returns {{
 *    sidebarItemsList: SidebarItemType[];
 *  }} An array of sidebar item objects with the following properties:
 *  * `path`: string - The route path for the sidebar item.
 *  * `Icon`: React.ComponentType - The icon component associated with the sidebar item.
 *  * `text`: string - The display text for the sidebar item.
 *  * `authOnly`: boolean - (Optional) Indicates whether the sidebar item should only be visible to authenticated users.
 *
 */

export const useSidebarItems = () => {
    const userData = useUserAuthData();
    const sidebarItemsList: SidebarItemType[] = [
        {
            path: getRouteMain(),
            Icon: toggleFeatures({
                name: 'isAppRedesigned',
                off: () => MainIconDeprecated,
                on: () => MainIcon,
            }),
            text: 'Головна',
        },
        {
            path: getRouteAbout(),
            Icon: toggleFeatures({
                name: 'isAppRedesigned',
                off: () => AboutIconDeprecated,
                on: () => AboutIcon,
            }),
            text: 'Про сайт',
        },
    ];

    if (userData) {
        sidebarItemsList.push(
            {
                path: getRouteProfile(userData.id),
                Icon: toggleFeatures({
                    name: 'isAppRedesigned',
                    off: () => ProfileIconDeprecated,
                    on: () => ProfileIcon,
                }),
                text: 'Профіль',
                authOnly: true,
            },
            {
                path: getRouteArticles(),
                Icon: toggleFeatures({
                    name: 'isAppRedesigned',
                    off: () => ArticleIconDeprecated,
                    on: () => ArticleIcon,
                }),
                text: 'Статті',
                authOnly: true,
            },
            {
                path: getRouteMyArticles(),
                Icon: toggleFeatures({
                    name: 'isAppRedesigned',
                    off: () => LibIcon,
                    on: () => LibIcon,
                }),
                text: 'Мої статті',
                authOnly: true,
            },
        );
    }

    return sidebarItemsList;
};
