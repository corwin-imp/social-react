"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// tslint:disable-next-line:no-var-requires
const { getBundles } = require("react-loadable/webpack");
const react_helmet_1 = tslib_1.__importDefault(require("react-helmet"));
class HtmlBuilder {
    constructor(stats) {
        this.chunkPlaceholder = "<//-CHUNKS-//>";
        this.stylePlaceholder = "<//-STYLES-//>";
        this.componentPlaceHolder = "<//-ROOT-//>";
        this.metaPlaceHolder = "<//-META-//>";
        this.htmlString = "";
        this.buildTag = (url) => {
            return `<script src="/static/${url}"></script>`;
        };
        this.buildStyle = (url) => `<link rel="stylesheet" type="text/css" href="/static/${url}">`;
        this.stats = stats;
        this.htmlString = this.cacheHtmlString();
    }
    renderToString(component, modules) {
        const bundles = getBundles(this.stats, modules);
        const helmetContent = react_helmet_1.default.renderStatic();
        const meta = `
      ${helmetContent.meta.toString()}
      ${helmetContent.title.toString()}
      ${helmetContent.link.toString()}
    `.trim();
        const scripts = bundles
            .filter((bundle) => bundle.file.endsWith(".js"))
            .map((bundle) => this.buildTag(bundle.file))
            .join("\n");
        const styles = bundles
            .filter((bundle) => bundle.file.endsWith(".css"))
            .map((bundle) => this.buildStyle(bundle.file))
            .join("\n");
        return this.htmlString
            .replace(this.chunkPlaceholder, scripts)
            .replace(this.stylePlaceholder, styles)
            .replace(this.componentPlaceHolder, component)
            .replace(this.metaPlaceHolder, meta);
    }
    cacheHtmlString() {
        console.log('process.env.NODE_ENV', process.env.NODE_ENV);
        return `
            <!doctype html>
            <html>
                <head>
                    <link rel='shortcut icon' type='image/x-icon' href='/static/favicon.ico' />
                    <title>react-typescript-ssr</title>
                    ${this.metaPlaceHolder}
                    ${process.env.NODE_ENV === "production" && this.getAsset("vendors", ".css") || ""}
                    ${process.env.NODE_ENV === "production" && this.getAsset("main", ".css") || ""}
                    ${this.stylePlaceholder}
                </head>
                <body>
                    <div id="react-root">${this.componentPlaceHolder}</div>
                    ${process.env.NODE_ENV === "production"
            ? this.getAsset("runtime")
            : ""}
                    ${process.env.NODE_ENV === "production"
            ? this.getAsset("vendors")
            : ""}
                    ${this.chunkPlaceholder}
                    ${process.env.NODE_ENV === "production"
            ? this.getAsset("main")
            : this.buildTag("main.js")}
                </body>
            </html>`;
    }
    getAsset(chunkName, extension = ".js") {
        let chunks = this.stats && this.stats.assetsByChunkName
            && this.stats.assetsByChunkName[chunkName];
        if (!chunks) {
            throw new Error(`Chunk name ${chunkName} does not exists in stats file`);
        }
        if (!Array.isArray(chunks)) {
            chunks = [chunks];
        }
        const asset = chunks.find((chunk) => chunk.endsWith(extension));
        if (asset && extension === ".js") {
            return this.buildTag(asset);
        }
        else if (asset && extension === ".css") {
            return this.buildStyle(asset);
        }
        return "";
    }
}
exports.HtmlBuilder = HtmlBuilder;
