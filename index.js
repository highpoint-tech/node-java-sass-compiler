const exec = require('child_process').exec;
const os = require('os');

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

  let cmd = (os.platform() === 'win32') ?  'java' : '/usr/bin/env java';
  cmd = `${cmd} -cp ${__dirname}/vaadin-sass-compiler.jar com.vaadin.sass.SassCompiler ${opts.in} ${opts.out}`;

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
