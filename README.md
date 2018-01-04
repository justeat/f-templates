# `f-templates` :bear:

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-templates.svg)](https://badge.fury.io/js/%40justeat%2Ff-templates)
[![Build Status](https://travis-ci.org/justeat/f-templates.svg)](https://travis-ci.org/justeat/f-templates)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-templates/badge.svg)](https://coveralls.io/github/justeat/f-templates)
[![Dependency Status](https://gemnasium.com/badges/github.com/justeat/f-templates.svg)](https://gemnasium.com/github.com/justeat/f-templates)


## About

The purpose of this module is to copy a JavaScript module into your web project which can
locate, compile, and serve HTML from templates. This is achieved by using the [gulp-build-fozzie `copy:assets`](https://github.com/justeat/gulp-build-fozzie#copyassets) task.


## Adding `f-templates` to your project

Add the module to your dependencies

```bash
yarn add @justeat/f-templates
```

Once the module has been copied into your project (via the [gulp-build-fozzie `copy:assets`](https://github.com/justeat/gulp-build-fozzie#copyassets) task) you can use it in the following ways.

### Node

Require and call the imported module:

```js
const compileTemplate = require('./templates');

const html = compileTemplate(callback, moduleName, options);
```

### .Net Core

If you are using the [NodeServices NuGet package](https://github.com/aspnet/JavaScriptServices/tree/dev/src/Microsoft.AspNetCore.NodeServices#microsoftaspnetcorenodeservices) then you can call it like this:

```csharp
public async Task<IActionResult> MyAction([FromServices] INodeServices nodeServices)
{
    var result = await nodeServices.InvokeAsync<string>("./templates", templateName, options);
    return new HtmlString(result);
}
```

## Parameters

- `callback` is a function which should be called upon completion. This is not required when using NodeServices in .Net Core.

- `moduleName` is the name of the template file which you would should be used to generate the HTML.

- `options` is an optional parameter in which you can pass parameters which will be used in the template.
