# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


v1.3.0
------------------------------
*October 26, 2018*

### Added
- `concat` handlebars helper added to project


v1.3.0
------------------------------
*August 10, 2018*

### Added
- `handlebars-helper-inlinesvg` added to project to allow inlining of SVGs into global projects


v1.2.0
------------------------------
*August 9, 2018*

### Added
- Added Babel object rest spread transform.
- Added danger module and checks.

### Changed
- Updated dependencies.
- Webpack updated and build modified to output production code.
- Small refactor of the templates module.
- Tpdated Travis config.

### Removed
- Removed badges for deprecated and unused services.

### Fixed
- Fixed linting issues.


v1.1.0
------------------------------
*June 18, 2018*

### Changed
- Wrapped template logic in try/catch block.
- Updated readme.


v1.0.0
------------------------------
*April 4, 2018*

### Changed
- Bumped to version 1.0.0 for release version.


v0.1.0
------------------------------
*February 1, 2018*

### Added
- Added webpack and associated loaders which allow this module to be bundled up along with all of its dependencies.

### Changed
- Changed `compile` task to use webpack.
- Switched from `module.exports` to a named export in `templates.js`.
- Updated module dependencies.

### Removed
- Removed `babel-cli` & `babel-minify` modules.


v0.0.4
------------------------------
*January 31, 2018*

### Changed
- Changed destination directory for `template.js` file.


v0.0.3
------------------------------
*January 16, 2018*

### Added
- Added ability to pass in language.


v0.0.2
------------------------------
*January 08, 2018*

### Added
- Added support for internationalisation.
- Added support for partial views.


v0.0.1
------------------------------
*January 04, 2018*

### Added
- Added initial project files.
