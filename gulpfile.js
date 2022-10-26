const { src, dest, series, watch } = require(`gulp`),
htmlValidator = require(`gulp-html`),
htmlCompressor = require(`gulp-htmlmin`),
CSSLinter = require(`gulp-stylelint`),
cssCompressor = require(`gulp-clean-css`),
jsLinter = require(`gulp-eslint`),
jsCompressor = require(`gulp-uglify`),
babel = require(`gulp-babel`);
browserSync = require(`browser-sync`),
reload = browserSync.reload;

let browserChoice = `default`;

let validateHTML = () => {
    return src(`index.html`)
        .pipe(htmlValidator(undefined));
};

let compressHTML = () => {
    return src(`index.html`)
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod`));
};

let lintCSS = () => {
    return src(`css/style.css`)
        .pipe(CSSLinter({
            failAfterError: false,
            reporters: [
                {formatter: `string`, console: true}
            ]
        }));
};

let compressCSS = () => {
    return src(`index.html`)
        .pipe(cssCompressor())
        .pipe(dest(`prod`));
};

let validateJS = () => {
    return src(`js/app.js`)
        .pipe(jsLinter())
        .pipe(jsLinter.formatEach(`compact`));
};

let transpileJSForDev = () => {
    return src(`js/app.js`)
        .pipe(babel())
        .pipe(dest(`.tmp/js`));
};

let transpileJSForProd = () => {
    return src(`js/app.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/js`));
};

let serve = () => {
    browserSync({
        reloadDelay: 50,
        browser: browserChoice,
        server: {
            baseDir: [
                `.tmp`,
                `./`,
            ]
        }
    });

    watch(`js/app.js`, series(validateJS, transpileJSForDev)).on(`change`, reload);

    watch(`css/style.css`).on(`change`, reload);

    watch(`index.html`, validateHTML).on(`change`, reload);

    watch(`img/**/*`).on(`change`, reload);
};

exports.validateHTML = validateHTML;
exports.compressHTML = compressHTML;
exports.lintCSS = lintCSS;
exports.compressCSS = compressCSS;
exports.validateJS = validateJS;
exports.transpileJSForDev = transpileJSForDev;
exports.transpileJSForProd = transpileJSForProd;
exports.serve = series(
    validateHTML,
    validateJS,
    transpileJSForDev,
    serve,
);
exports.build = series(
    compressHTML,
    compressCSS,
    transpileJSForProd,
);