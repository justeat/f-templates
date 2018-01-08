const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const { i18n } = require('handlebars-helper-i18n');
const glob = require('glob');

handlebars.registerHelper('i18n', i18n);


const loadPartials = templatePath => {
    // /path/to/module/{moduleName}/partials/*.hbs
    const partialsDir = path.resolve(templatePath, 'partials');
    const filenames = fs.readdirSync(partialsDir);

    filenames.forEach(filename => {
        const matches = /^([^.]+).hbs$/.exec(filename);

        if (!matches) {
            return;
        }

        const name = matches[1]; // eslint-disable-line prefer-destructuring
        const template = fs.readFileSync(`${partialsDir}/${filename}`, 'utf8');

        handlebars.registerPartial(name, template);
    });
};


module.exports = (callback, moduleName, options) => {
    const globPattern = '**/templates';
    const ignore = '**/node_modules/**';
    const globOptions = { ignore };

    glob(globPattern, globOptions, (err, [result]) => {
        if (err) {
            callback(err);
        }

        // /path/to/module/{moduleName}/index.hbs
        const templatePath = path.resolve(process.cwd(), result, moduleName);
        const rawTemplate = fs.readFileSync(`${templatePath}/index.hbs`, 'utf-8');
        const template = handlebars.compile(rawTemplate);

        loadPartials(templatePath);

        // /path/to/module/{moduleName}/resources/{moduleName}.json
        const translationsPath = path.resolve(process.cwd(), result, `resources/${moduleName}.json`);
        const rawTranslations = fs.readFileSync(translationsPath, 'utf-8');
        const translations = JSON.parse(rawTranslations);

        const opts = Object.assign({}, translations, options);

        callback(null, template(opts));
    });
};
