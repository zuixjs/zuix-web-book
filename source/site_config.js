var siteConfig = {

    content: [
        {
            id: 'about',
            template: 'layout/side_menu_item',
            data: {
                title: 'About',
                icon: 'info_outline',
                link: '#/about',
                file: 'content/about.html'
            }
        },
        {
            id: 'docs',
            template: 'layout/side_menu_item',
            data: {
                title: 'Documentation',
                icon: 'import_contacts',
                link: '#/docs/content_files'
            },
            list: [
                {
                    id: 'content_files',
                    template: 'layout/side_menu_subitem',
                    data: {
                        title: 'Content',
                        link: '#/docs/content_files',
                        file: 'content/docs/content_files.html'
                    }
                },
                {
                    id: 'side_menu',
                    template: 'layout/side_menu_subitem',
                    data: {
                        title: 'Side menu',
                        link: '#/docs/side_menu',
                        file: 'content/docs/side_menu.html'
                    }
                },
                {
                    id: 'theme',
                    template: 'layout/side_menu_subitem',
                    data: {
                        title: 'Theme',
                        link: '#/docs/theme',
                        file: 'content/docs/theme.html'
                    }
                }

            ]
        },
        {
            id: 'kit',
            template: 'layout/side_menu_item',
            data: {
                title: 'Kit',
                icon: 'extension',
                link: 'https://genielabs.github.io/zkit'
            }
        }
    ],

    strings: {
        startPage: '#/about',
        baseUrl: '/',
        title: 'Website Demo'
    }


};
if (typeof module !== 'undefined') {
    module.exports = siteConfig;
}