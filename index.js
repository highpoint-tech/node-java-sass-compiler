const exec = require('child_process').exec;
const os = require('os');

const compileCallback = (
  {
    compress = false,
    ignoreWarnings = false,
    in: pathIn = '',
    minify = false,
    out: pathOut = '',
    urlMode = false
  },
  cb
) => {
  let cmd = os.platform() === 'win32' ? 'java' : '/usr/bin/env java';
  cmd = `${cmd} -cp ${__dirname}/vaadin-sass-compiler.jar \
com.vaadin.sass.SassCompiler ${pathIn} ${pathOut}`;

  if (minify) {
    cmd = `${cmd} -minify:true`;
  }

  if (compress && pathOut.length > 0) {
    cmd = `${cmd} -compress:true`;
  }

  if (urlMode) {
    cmd = `${cmd} -urlMode:${urlMode}`;
  }

  if (ignoreWarnings) {
    cmd = `${cmd} -ignore-warnings:true`;
  }

  exec(cmd, cb);
};

const compile = opts =>
  new Promise((resolve, reject) =>
    compileCallback(opts, err => {
      if (err) return reject(err);
      resolve();
    })
  );

module.exports = {
  compile,
  compileCallback,
  default: compile
};
