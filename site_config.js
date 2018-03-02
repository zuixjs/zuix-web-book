var siteConfig = {

    content: [
        {
            id: 'about',
            template: 'app/layout/side_menu_item',
            data: {
                title: 'About',
                icon: 'info_outline',
                link: '#/about',
                file: 'content/about.md'
            }
        },
        {
            id: 'docs',
            template: 'app/layout/side_menu_item',
            data: {
                title: 'Documentation',
                icon: 'import_contacts',
                link: '#/docs/usage'
            },
            list: [
                {
                    id: 'usage',
                    template: 'app/layout/side_menu_subitem',
                    data: {
                        title: 'Usage',
                        link: '#/docs/usage',
                        file: 'content/docs/usage.md'
                    }
                },
                {
                    id: 'customization',
                    template: 'app/layout/side_menu_subitem',
                    data: {
                        title: 'Customization',
                        link: '#/docs/customization',
                        file: 'content/docs/customization.md'
                    }
                }
            ]
        },
        {
            id: 'components',
            template: 'app/layout/side_menu_item',
            data: {
                title: 'Components',
                icon: 'extension',
                link: '#/components',
                file: 'content/components.md'
            }
        }
    ],

    strings: {
        startPage: '#/about',
        baseUrl: '/',
        title: 'Website Demo'
    }

};
