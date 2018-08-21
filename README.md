# java-sass-compiler #

Node wrapper around [Vaadin's Java sass-compiler](https://github.com/vaadin/sass-compiler)

## Installation ##

`npm install @highpoint/java-sass-compiler`

## Usage ##

```javascript
const { compile, compileCallback } = require('@highpoint/java-sass-compiler');

// Using Promise
compile({
  in: 'file.scss',
  out: 'file.css',
  minify: true
})
  .then((stdout, stderr) => {
    console.log(`stdout ${stdout}`);
    console.log(`stderr ${stderr}`);
  })
  .catch(err => {
    console.error(`Compile error: ${err}`);
  });

// Using callback
compileCallback({
  in: 'file.scss',
  out: 'file.css',
  minify: true
}, (err, stdout, stderr) => {
  if (err) {
    console.error(`Compile error: ${err}`);
  }

  console.log(`stdout ${stdout}`);
  console.log(`stderr ${stderr}`);
});
```

## Options ##

| Option         | Values                    | Default | Explanation                                                                                                                 |
|----------------|---------------------------|---------|-----------------------------------------------------------------------------------------------------------------------------|
| compress       | true, false               | false   | Create also a compressed version of the compiled CSS (only when output file is given)                                       |
| ignoreWarnings | true, false               | false   | Let compilation succeed even though there are warnings                                                                      |
| in             | File path                 | None    | The .scss file to compile (**required**)                                                                                    |
| minify         | true, false               | false   | Minify the compiled CSS with YUI Compressor                                                                                 |
| out            | File path                 | None    | The .css file where the generated CSS is stored. If it is not defined, the compiled CSS will be written to standard output. |
| urlMode        | mixed, absolute, relative | mixed   | Set URL handling mode                                                                                                       |
