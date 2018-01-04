const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const glob = require('glob');

module.exports = (callback, moduleName, options) => {
    const globPattern = '**/templates';
    const ignore = '**/node_modules/**';
    const globOptions = { ignore };

    glob(globPattern, globOptions, (err, files) => {
        if (err) {
            callback(err);
        }

        const [result] = files;

        const templatePath = path.resolve(process.cwd(), result, `${moduleName}.hbs`);
        const source = fs.readFileSync(templatePath, 'utf-8');
        const compiled = handlebars.compile(source);

        callback(null, compiled(options));
    });
};
