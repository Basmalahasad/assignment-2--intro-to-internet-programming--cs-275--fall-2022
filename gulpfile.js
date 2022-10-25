const { src, dest, series, watch } = require(`gulp`),
htmlValidator = require(`gulp-html`),
htmlCompressor = require(`gulp-htmlmin`),
CSSLinter = require(`gulp-stylelint`),
cssValidator = require(`gulp-clean-css`);

let validateHTML = () => {
    return src([
        `index.html`])
        .pipe(htmlValidator(undefined));
};

let compressHTML = () => {
    return src([`index.html`])
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

let validateCSS = () => {
    return src([
        `css/style.css`])
        .pipe(cssValidator(undefined));
};

exports.validateHTML = validateHTML;
exports.compressHTML = compressHTML;
exports.lintCSS = lintCSS;
exports.validateCSS = validateCSS;
