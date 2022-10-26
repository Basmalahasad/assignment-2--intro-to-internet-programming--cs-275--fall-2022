const { src, dest, series, watch } = require(`gulp`),
htmlValidator = require(`gulp-html`),
htmlCompressor = require(`gulp-htmlmin`),
CSSLinter = require(`gulp-stylelint`),
cssCompressor = require(`gulp-clean-css`),
jsLinter = require(`gulp-eslint`),
babel = require(`gulp-babel`);

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

exports.validateHTML = validateHTML;
exports.compressHTML = compressHTML;
exports.lintCSS = lintCSS;
exports.compressCSS = compressCSS;
exports.validateJS = validateJS;
exports.transpileJSForDev = transpileJSForDev;

