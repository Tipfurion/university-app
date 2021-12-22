export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'nuxt-hw',
        htmlAttrs: {
            lang: 'en',
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
    loading: false,
    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ['element-ui/lib/theme-chalk/index.css', '~/assets/css/main.css'],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: ['@/plugins/element-ui'],

    env: {
        API_ENDPOINT: process.env.API_ENDPOINT,
    },
    server: {
        port: 3000, // default: 3000
        host: '0.0.0.0', // default: localhost
    },
    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,
    debug: true,
    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: ['@nuxtjs/axios', '@nuxtjs/auth-next'],

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        transpile: [/^element-ui/],
    },

    router: {
        //middleware: ["test"]
    },
    serverMiddleware: {
        '/': '~/server',
    },
    auth: {
        strategies: {
            local: {
                token: {
                    property: 'data.token',
                    global: true,
                    // required: true,
                    type: 'Bearer',
                },
                user: {
                    property: 'data',
                    autoFetch: true,
                },
                endpoints: {
                    login: { url: '/api/auth/login', method: 'post' },
                    logout: { url: '/api/auth/logout', method: 'post' },
                    user: { url: '/api/auth/me', method: 'get' },
                },
            },
        },
        redirect: {
            login: '/login',
            logout: '/login',
            callback: '/login',
            home: '/',
        },
    },
}
