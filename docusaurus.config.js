module.exports = {
  title: 'Testing Library',
  tagline:
    'Simple and complete testing utilities that encourage good testing practices',
  url: 'https://testing-library.com',
  baseUrl: '/',
  projectName: 'testing-library-docs',
  scripts: [
    'https://buttons.github.io/buttons.js',
    'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js',
  ],
  stylesheets: [
    'https://fonts.googleapis.com/css?family=IBM+Plex+Mono:500,700|Source+Code+Pro:500,700|Source+Sans+Pro:400,400i,700',
  ],
  favicon: 'img/octopus-32x32.png',
  customFields: {
    // List of projects/orgs using your project for the users page.
    // You should add a lightImage and a darkImage for each theme.
    users: [
      {
        caption: 'Autodesk',
        darkImage: '/img/users/autodesk.svg',
        lightImage: '/img/users/autodesk.svg',
        infoLink: 'https://www.autodesk.com',
        pinned: true,
      },
      {
        caption: 'Coches.net',
        darkImage: '/img/users/coches.svg',
        lightImage: '/img/users/coches.svg',
        infoLink: 'https://www.coches.net/',
        pinned: false,
      },
      {
        caption: 'Codecademy',
        darkImage: '/img/users/codecademy.svg',
        lightImage: '/img/users/codecademy.svg',
        infoLink: 'https://www.codecademy.com',
        pinned: false,
      },
      {
        caption: 'CDK Global Inc.',
        darkImage: '/img/users/cdkglobal.png',
        lightImage: '/img/users/cdkglobal.png',
        infoLink: 'https://www.cdkglobal.com/us',
        pinned: false,
      },
      {
        caption: 'Expedia Group',
        darkImage: '/img/users/expediagroup.svg',
        lightImage: '/img/users/expediagroup.svg',
        infoLink: 'https://www.expediagroup.com',
        pinned: true,
      },
      {
        caption: 'Facebook Open Source',
        darkImage: '/img/users/facebook-open-source.png',
        lightImage: '/img/users/facebook-open-source.png',
        infoLink: 'https://opensource.facebook.com',
        pinned: true,
      },
      {
        caption: 'Fotocasa',
        darkImage: '/img/users/fotocasa.svg',
        lightImage: '/img/users/fotocasa.svg',
        infoLink: 'https://www.fotocasa.es/',
        pinned: false,
      },
      {
        caption: 'Global CTO Forum',
        darkImage: '/img/users/global-cto-forum.svg',
        lightImage: '/img/users/global-cto-forum.svg',
        infoLink: 'https://globalctoforum.org',
        pinned: false,
      },
      {
        caption: 'Gusto',
        darkImage: '/img/users/gusto.svg',
        lightImage: '/img/users/gusto.svg',
        infoLink: 'https://gusto.com/',
        pinned: false,
      },
      {
        caption: 'Habitaclia',
        darkImage: '/img/users/habitaclia.svg',
        lightImage: '/img/users/habitaclia.svg',
        infoLink: 'https://www.habitaclia.com/',
        pinned: false,
      },
      {
        caption: 'iFood',
        darkImage: '/img/users/ifood.png',
        lightImage: '/img/users/ifood.png',
        infoLink: 'https://www.ifood.com.br',
        pinned: false,
      },
      {
        caption: 'Infojobs',
        darkImage: '/img/users/infojobs.svg',
        lightImage: '/img/users/infojobs.svg',
        infoLink: 'https://www.infojobs.net/',
        pinned: false,
      },
      {
        caption: 'intelliHR',
        darkImage: '/img/users/intellihr.svg',
        lightImage: '/img/users/intellihr.svg',
        infoLink: 'https://intellihr.com.au',
        pinned: false,
      },
      {
        caption: 'Milanuncios',
        darkImage: '/img/users/milanuncios.svg',
        lightImage: '/img/users/milanuncios.svg',
        infoLink: 'https://www.milanuncios.com',
        pinned: false,
      },
      {
        caption: 'Parsley Health',
        darkImage: '/img/users/parsleyhealth.svg',
        lightImage: '/img/users/parsleyhealth.svg',
        infoLink: 'https://www.parsleyhealth.com',
        pinned: false,
      },
      {
        caption: 'PayPal',
        darkImage: '/img/users/paypal.svg',
        lightImage: '/img/users/paypal.svg',
        infoLink: 'https://www.paypal.com',
        pinned: true,
      },
      {
        caption: 'Quizlet',
        darkImage: '/img/users/quizlet.svg',
        lightImage: '/img/users/quizlet.svg',
        infoLink: 'https://quizlet.com',
        pinned: false,
      },
      {
        caption: 'Radity',
        darkImage: '/img/users/radity.svg',
        lightImage: '/img/users/radity.svg',
        infoLink: 'https://radity.com',
        pinned: false,
      },
      {
        caption: 'SUI Components',
        darkImage: '/img/users/sui.svg',
        lightImage: '/img/users/sui.svg',
        infoLink: 'https://sui-components.now.sh/',
        pinned: false,
      },
      {
        caption: 'Sweepbright',
        darkImage: '/img/users/sweepbright.svg',
        lightImage: '/img/users/sweepbright.svg',
        infoLink: 'https://sweepbright.com',
        pinned: false,
      },
      {
        caption: 'Testsigma',
        darkImage: '/img/users/testsigma.svg',
        lightImage: '/img/users/testsigma.svg',
        infoLink: 'https://www.testsigma.com',
        pinned: false,
      },
      {
        caption: 'Tiller',
        darkImage: '/img/users/tiller.svg',
        lightImage: '/img/users/tiller.svg',
        infoLink: 'https://www.tillersystems.com',
        pinned: false,
      },
      {
        caption: 'TravelPerk',
        darkImage: '/img/users/travelperk.svg',
        lightImage: '/img/users/travelperk.svg',
        infoLink: 'https://www.travelperk.com',
        pinned: false,
      },
      {
        caption: 'Velo Payments',
        darkImage: '/img/users/velopayments.svg',
        lightImage: '/img/users/velopayments.svg',
        infoLink: 'https://www.velopayments.com',
        pinned: false,
      },
      {
        caption: 'Walmart Labs',
        darkImage: '/img/users/walmart.png',
        lightImage: '/img/users/walmart.png',
        infoLink: 'https://www.walmartlabs.com/',
        pinned: true,
      },
      {
        caption: 'Wix.com',
        darkImage: '/img/users/wix.svg',
        lightImage: '/img/users/wix.svg',
        infoLink: 'https://www.wix.com',
        pinned: false,
      },
      {
        caption: 'Zup I.T. Innovation',
        darkImage: '/img/users/zup.png',
        lightImage: '/img/users/zup.png',
        infoLink: 'https://www.zup.com.br/',
        pinned: false,
      },
    ],
    fonts: {
      fontMain: ['Source Sans Pro', 'sans-serif'],
      fontCode: ['IBM Plex Mono', 'monospace'],
    },
    repoUrl: 'https://github.com/testing-library/dom-testing-library',
    docsRepoUrl: 'https://github.com/testing-library/testing-library-docs',
    docsPath: 'docs',
  },
  onBrokenLinks: 'log',
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          editUrl:
            'https://github.com/testing-library/testing-library-docs/edit/main/',
          path: './docs',
          sidebarPath: './sidebars.js',
        },
        blog: {
          path: './blog',
          blogSidebarCount: 'ALL',
          blogSidebarTitle: 'All posts',
          feedOptions: {
            type: 'all',
          },
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: [],
  themeConfig: {
    navbar: {
      title: 'Testing Library',
      logo: {
        src: 'img/octopus-64x64.png',
      },
      items: [
        {
          type: 'doc',
          docId: 'introduction',
          label: 'Docs',
          position: 'left',
        },
        {
          type: 'doc',
          docId: 'recipes',
          label: 'Examples',
          position: 'left',
        },
        {
          to: '/help',
          label: 'Help',
          position: 'right',
        },
        {
          to: '/blog',
          label: 'Blog',
          position: 'right',
        },
      ],
    },
    image: 'img/octopus-128x128.png',
    footer: {
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: 'docs',
            },
            {
              label: 'Examples',
              to: 'docs/example-codesandbox',
            },
            {
              label: 'API',
              to: 'docs/dom-testing-library/api',
            },
            {
              label: 'Help',
              to: 'docs/dom-testing-library/faq',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'Stack Overflow',
              href:
                'https://stackoverflow.com/questions/tagged/react-testing-library',
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/testing-library',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              html: `
              <a target="_blank" rel="noreferrer noopener" class="github-button"
                href="https://github.com/testing-library/react-testing-library"
                data-icon="octicon-star"
                data-count-href="/testing-library/react-testing-library/stargazers"
                data-show-count="true"
                data-count-aria-label="# stargazers on GitHub"
                aria-label="Star this project on GitHub">Star</a>
              `,
            },
            {
              label: 'GitHub',
              href: 'https://github.com/testing-library',
            },
            {
              label: 'Edit Docs on GitHub',
              href: 'https://github.com/testing-library/testing-library-docs',
            },
            {
              label: 'Hosted by Netlify',
              href: 'https://netlify.com',
            },
          ],
        },
      ],
      copyright: `Copyright © 2018-${new Date().getFullYear()} Kent C. Dodds and contributors`,
      logo: {
        src: 'img/octopus-128x128.png',
      },
    },
    algolia: {
      apiKey: 'bda29e6557dc5be1ce5c05f2dbff8f33',
      indexName: 'testing-library',
    },
    gtag: {
      trackingID: 'UA-137787095-1',
    },
  },
}
