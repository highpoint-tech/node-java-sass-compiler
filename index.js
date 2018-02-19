const exec = require('child_process').exec;

function compile(opts, cb) {
  /* eslint-disable no-param-reassign */
  opts = Object.assign({
    compress: false,
    ignoreWarnings: false,
    in: '',
    minify: false,
    out: '',
    urlMode: false
  }, opts || {});

  let cmd = process.platform === 'win32' ? '' : '/usr/bin/env';
  cmd = `${cmd} java -cp ${__dirname}/vaadin-sass-compiler.jar com.vaadin.sass.SassCompiler \
${opts.in} ${opts.out}`;

  if (opts.minify) {
    cmd = `${cmd} -minify:true`;
  }

  if (opts.compress && opts.out.length > 0) {
    cmd = `${cmd} -compress:true`;
  }

  if (opts.urlMode) {
    cmd = `${cmd} -urlMode:${opts.urlMode}`;
  }

  if (opts.ignoreWarnings) {
    cmd = `${cmd} -ignore-warnings:true`;
  }

  exec(cmd, cb);
}

module.exports = compile;
