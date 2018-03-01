// TODO: use config object instead of contstants
var CONST_BASE_URL = '/';
var CONST_SITE_TITLE = 'Web Book';
var CONST_STARTPAGE = '#/about';

var contentTree = {

    main: [
        {
            id: 'about',
            template: 'app/layout/side_menu_item',
            data: {
                title: 'Introduction',
                icon: 'info_outline',
                link: '#/about',
                file: 'content/about.md'
            }
        },
        {
            id: 'insights',
            template: 'app/layout/side_menu_item',
            data: {
                title: 'Insights',
                icon: 'import_contacts',
                link: '#/insights/components'
            },
            list: [
                {
                    id: 'components',
                    template: 'app/layout/side_menu_subitem',
                    data: {
                        title: 'Components',
                        link: '#/insights/components',
                        file: 'content/insights/components.md'
                    }
                },
                {
                    id: 'linking',
                    template: 'app/layout/side_menu_subitem',
                    data: {
                        title: 'Local links',
                        link: '#/insights/linking',
                        file: 'content/insights/linking.md'
                    }
                }
            ]
        },
        {
            id: 'resources',
            template: 'app/layout/side_menu_item',
            data: {
                title: 'Resources',
                icon: 'extension',
                link: '#/resources/github'
            },
            list: [
                {
                    id: 'github',
                    template: 'app/layout/side_menu_subitem',
                    data: {
                        title: 'GitHub page',
                        link: 'https://github.com/genielabs/zuix-web-book',
                        attr: 'target="_blank"'
                    }
                }
            ]
        }
    ]

};
