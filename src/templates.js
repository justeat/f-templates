/* eslint-disable import/prefer-default-export */

const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const { i18n } = require('handlebars-helper-i18n');
const { inlineSVG } = require('handlebars-helper-inlinesvg');
const glob = require('glob');

const loadPartials = templatePath => {
    // /path/to/module/{moduleName}/partials/*.hbs
    const partialsDir = path.resolve(templatePath, 'partials');
    const filenames = fs.readdirSync(partialsDir);

    filenames.forEach(filename => {
        const matches = /^([^.]+).hbs$/.exec(filename);

        if (!matches) {
            return;
        }

        // Array destructuring, taking the second item and assigning it to the `name` variable.
        const [, name] = matches;
        const template = fs.readFileSync(`${partialsDir}/${filename}`, 'utf8');

        handlebars.registerPartial(name, template);
    });
};

const getTemplate = (callback, moduleName, language, options) => {
    const globPattern = '**/templates';
    const ignore = '**/node_modules/**';
    const globOptions = { ignore };

    handlebars.registerHelper('i18n', i18n);
    handlebars.registerHelper('inlineSVG', inlineSVG);
    handlebars.registerHelper('concat', (...args) => args.slice(0, -1).join(''));

    glob(globPattern, globOptions, (err, [result]) => {
        if (err) {
            callback(err);
        }

        try {
            // /path/to/module/{moduleName}/index.hbs
            const templatePath = path.resolve(process.cwd(), result, moduleName);

            loadPartials(templatePath);

            const rawTemplate = fs.readFileSync(`${templatePath}/index.hbs`, 'utf-8');
            const template = handlebars.compile(rawTemplate);

            // /path/to/module/{moduleName}/resources/{moduleName}.json
            const translationsPath = path.resolve(process.cwd(), result, `resources/${moduleName}.json`);
            const rawTranslations = fs.readFileSync(translationsPath, 'utf-8');
            const translations = JSON.parse(rawTranslations);

            const opts = { language, ...translations, ...options };
            const compiled = template(opts);

            callback(null, compiled);
        } catch (ex) {
            callback(ex);
        }
    });
};

export {
    getTemplate
};
