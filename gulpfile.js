const { src, dest, series, watch } = require(`gulp`),
htmlValidator = require(`gulp-html`),
CSSLinter = require(`gulp-stylelint`);

let validateHTML = () => {
    return src([
        `index.html`])
        .pipe(htmlValidator(undefined));
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

exports.validateHTML = validateHTML;
exports.lintCSS = lintCSS;