declare module 'webpack.dev-client.js' {
    export = configProdClient;
}

interface configProdClient {
    // ... There's other stuff in this interface
    mode?: string
    module?: Module;
}
