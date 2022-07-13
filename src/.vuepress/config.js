const sidebar = {
  // cookbook: [
  //   {
  //     title: 'Cookbook',
  //     collapsable: false,
  //     children: [
  //       '/cookbook/',
  //       '/cookbook/editable-svg-icons',
  //       '/cookbook/debugging-in-vscode',
  //       '/cookbook/automatic-global-registration-of-base-components'
  //     ]
  //   }
  // ],
  guide: [
    {
      title: 'Guide',
      collapsable: false,
      children: [
        '/guide/DZDintroduction',
        '/guide/ZUsecases',
        // '/guide/ZGettingStarted',
        // '/guide/DZDproduction-deployment',
      ]
    },
    {
      title: 'Architecture',
      collapsable: false,
      children: [
        '/guide/ZArchitecture',
        '/guide/ZQueues',
        // '/guide/DZDproduction-deployment',
      ]
    },
    {
      title: 'Mondat',
      collapsable: false,
      children: [
        '/guide/DZDmondat',
        '/guide/DZDmondat-caches',
        '/guide/DZDmondat-queues',
        '/guide/DZDmondat-nodes',
        '/guide/DZDmondat-transactions',
        '/guide/DZDmondat-pipelines',
        '/guide/DZDmondat-testing',
        // '/guide/DZDmondat-generic-api',
        // '/guide/DZDmondat-generic-mapping'
      ]
    },
    {
      title: 'Developer Guide',
      collapsable: false,
      children: [
        '/guide/DZDinstallation',
        '/guide/DZDdeveloper-guide',
        // '/guide/DZDconfiguration',
      ]
    },
    // {
    //   title: 'Administrator Guide',
    //   collapsable: false,
    //   children: [
    //     '/guide/DZDproduction-deployment',
    //   ]
    // },
    // {
    //   title: 'Deploying on AWS',
    //   collapsable: false,
    //   children: [
    //     // '/guide/DZDaws-deployment',
    //     '/guide/DZDaws-introduction',
    //     '/guide/DZDaws-step-1',// environment
    //     '/guide/DZDaws-step-2',// database
    //     '/guide/DZDaws-step-3',// docker image
    //     '/guide/DZDaws-step-4',// master node
    //     // '/guide/DZDaws-step-5',
    //   ]
    // },
    {
      title: 'Transaction Updates',
      collapsable: false,
      children: [
        '/guide/DZDpolling',
        '/guide/DZDwebhooks',
        '/guide/DZDprogress-reports',
      ]
    },
    {
      title: 'Miscellaneous',
      collapsable: false,
      children: [
        '/guide/DZDsleeping',
        '/guide/DZDreply-converters',
        '/guide/DZDthrottling',
        '/guide/DZDerror-messages',
        '/guide/DZDstep-definitions',
      ]
    },
    // {
    //   title: 'Developing Steps',
    //   collapsable: false,
    //   children: [
    //     '/guide/component-registration',
    //     '/guide/component-props',
    //     '/guide/component-attrs',
    //     '/guide/component-custom-events',
    //     '/guide/component-slots',
    //     '/guide/component-provide-inject',
    //     '/guide/component-dynamic-async',
    //     '/guide/component-template-refs',
    //     '/guide/component-edge-cases'
    //   ]
    // },
  ],
  api: [
    '/api/DZDDATP',
    // '/api/DZDDATPextras',
    {
      title: 'Classes',
      collapsable: false,
      children: [
        '/api/DZDstepInstance',
        '/api/DZDstep',
      ]
    },
    {
      title: 'Variables',
      collapsable: false,
      children: [
        // '/api/DZDDATPextras',
      ]
    },
    {
      title: 'Other',
      collapsable: false,
      children: [
        // '/guide/DZDaws-deployment',
        '/api/DZDDATPextras',
        // '/deployment/DZDaws-step-1',// environment
        // '/deployment/DZDaws-step-2',// database
        // '/deployment/DZDaws-step-3',// docker image
        // '/deployment/DZDaws-step-4',// master node
      ]
    },
  ],
  deployment: [
    '/deployment/DZDconfiguration',
    // {
    //   title: 'Deployment 2',
    //   collapsable: false,
    //   children: [
    //     // '/guide/DZDinstallation',
    //     // '/guide/DZDdeveloper-guide',
    //     '/deployment/DZDconfiguration',
    //     // '/guide/template-syntax',
    //     // '/guide/data-methods',
    //     // '/guide/computed',
    //     // '/guide/class-and-style',
    //     // '/guide/conditional',
    //     // '/guide/list',
    //     // '/guide/events',
    //     // '/guide/forms',
    //     // '/guide/component-basics'
    //   ]
    // },
    {
      title: 'Deploying on AWS',
      collapsable: false,
      children: [
        // '/guide/DZDaws-deployment',
        '/deployment/DZDaws-introduction',
        '/deployment/DZDaws-step-1',// environment
        '/deployment/DZDaws-step-2',// database
        '/deployment/DZDaws-step-3',// docker image
        '/deployment/DZDaws-step-4',// master node
      ]
    },
  ],
  // examples: [
  //   {
  //     title: 'Examples',
  //     collapsable: false,
  //     children: [
  //       '/examples/markdown',
  //       '/examples/commits',
  //       '/examples/grid-component',
  //       '/examples/tree-view',
  //       '/examples/svg',
  //       '/examples/modal',
  //       '/examples/elastic-header',
  //       '/examples/select2',
  //       '/examples/todomvc'
  //     ]
  //   }
  // ],
  // migration: [
  //   '/guide/migration/introduction',
  //   '/guide/migration/migration-build',
  //   {
  //     title: 'Details',
  //     collapsable: false,
  //     children: [
  //       '/guide/migration/array-refs',
  //       '/guide/migration/async-components',
  //       '/guide/migration/attribute-coercion',
  //       '/guide/migration/attrs-includes-class-style',
  //       '/guide/migration/children',
  //       '/guide/migration/custom-directives',
  //       '/guide/migration/custom-elements-interop',
  //       '/guide/migration/data-option',
  //       '/guide/migration/emits-option',
  //       '/guide/migration/events-api',
  //       '/guide/migration/filters',
  //       '/guide/migration/fragments',
  //       '/guide/migration/functional-components',
  //       '/guide/migration/global-api',
  //       '/guide/migration/global-api-treeshaking',
  //       '/guide/migration/inline-template-attribute',
  //       '/guide/migration/key-attribute',
  //       '/guide/migration/keycode-modifiers',
  //       '/guide/migration/listeners-removed',
  //       '/guide/migration/mount-changes',
  //       '/guide/migration/props-data',
  //       '/guide/migration/props-default-this',
  //       '/guide/migration/render-function-api',
  //       '/guide/migration/slots-unification',
  //       '/guide/migration/suspense',
  //       '/guide/migration/transition',
  //       '/guide/migration/transition-as-root',
  //       '/guide/migration/transition-group',
  //       '/guide/migration/v-on-native-modifier-removed',
  //       '/guide/migration/v-model',
  //       '/guide/migration/v-if-v-for',
  //       '/guide/migration/v-bind',
  //       '/guide/migration/vnode-lifecycle-events',
  //       '/guide/migration/watch'
  //     ]
  //   }
  // ],
  // ssr: [
  //   ['/guide/ssr/introduction', 'Introduction'],
  //   '/guide/ssr/getting-started',
  //   '/guide/ssr/universal',
  //   '/guide/ssr/structure',
  //   '/guide/ssr/build-config',
  //   '/guide/ssr/server',
  //   '/guide/ssr/routing',
  //   '/guide/ssr/hydration'
  // ],
  // contributing: [
  //   {
  //     title: 'Contribute to the Docs',
  //     collapsable: false,
  //     children: [
  //       '/guide/contributing/writing-guide',
  //       '/guide/contributing/doc-style-guide',
  //       '/guide/contributing/translations'
  //     ]
  //   }
  // ]
}

module.exports = {
  title: 'DATP',
  description: 'DATP - Distributed Aynchronous Transaction Pipelines',
  // base: '/datp.io/',
  head: [
    [
      'link',
      {
        href:
          'https://fonts.googleapis.com/css?family=Inter:300,400,500,600|Open+Sans:400,600;display=swap',
        rel: 'stylesheet'
      }
    ],
    [
      'link',
      {
        href:
          'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
        rel: 'stylesheet'
      }
    ],
    [
      'link',
      {
        rel: 'icon',
        href: '/datp-images/TooltwistLogo.png'
      }
    ],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }
    ],
    [
      'link',
      {
        rel: 'apple-touch-icon',
        href: '/images/icons/apple-icon-152x152.png'
      }
    ],
    [
      'meta',
      {
        name: 'msapplication-TileImage',
        content: '/images/icons/ms-icon-144x144.png'
      }
    ],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
    [
      'script',
      {
        src: 'https://player.vimeo.com/api/player.js'
      }
    ],
    [
      'script',
      {
        src: 'https://extend.vimeocdn.com/ga/72160148.js',
        defer: 'defer'
      }
    ]
  ],
  themeConfig: {
    logo: '/datp-images/TooltwistLogo.png',
    nav: [
      {
        text: 'Guide',
        // ariaLabel: 'Documentation Menu',
        // items: [
        //   {
        //     text: 'Guide',
            link: '/guide/DZDintroduction'
          // },
        // ]
      },
      {
        text: 'API Reference',
        link: '/api/DZDDATP.html'
      },
      {
        text: 'Deployment',
        link: '/deployment/DZDconfiguration'
      },
    ],
    // repo: 'vuejs/docs',
    editLinks: true,
    editLinkText: 'Edit this on GitHub!',
    lastUpdated: 'Last updated',
    docsDir: 'src',
    sidebarDepth: 2,
    sidebar: {
      collapsable: false,
      '/guide/migration/': sidebar.migration,
      '/guide/contributing/': sidebar.contributing,
      '/guide/ssr/': sidebar.ssr,
      '/guide/': sidebar.guide,
      '/community/': sidebar.guide,
      '/cookbook/': sidebar.cookbook,
      '/api/': sidebar.api,
      '/deployment/': sidebar.deployment,
      '/examples/': sidebar.examples
    },
    smoothScroll: false,
    algolia: {
      indexName: 'vuejs-v3',
      appId: 'BH4D9OD16A',
      apiKey: 'bc6e8acb44ed4179c30d0a45d6140d3f'
    },
    carbonAds: {
      carbon: 'CEBDT27Y',
      custom: 'CKYD62QM',
      placement: 'vuejsorg'
    },
    topBanner: false
  },
  plugins: [
    [
      '@vuepress/last-updated',
      {
        transformer(timestamp) {
          const date = new Date(timestamp)

          const digits = [
            date.getUTCFullYear(),
            date.getUTCMonth() + 1,
            date.getUTCDate(),
            date.getUTCHours(),
            date.getUTCMinutes(),
            date.getUTCSeconds()
          ].map(num => String(num).padStart(2, '0'))

          return '{0}-{1}-{2}, {3}:{4}:{5} UTC'.replace(
            /{(\d)}/g,
            (_, num) => digits[num]
          )
        }
      }
    ],
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: {
          '/': {
            message: 'New content is available.',
            buttonText: 'Refresh'
          }
        }
      }
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'info',
        before: info =>
          `<div class="custom-block info"><p class="custom-block-title">${info}</p>`,
        after: '</div>'
      }
    ]
  ],
  markdown: {
    lineNumbers: true,
    /** @param {import('markdown-it')} md */
    extendMarkdown: md => {
      md.options.highlight = require('./markdown/highlight')(
        md.options.highlight
      )
    }
  }
}
