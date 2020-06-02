const message = "HELLO";
console.log(global.message); // undefined

/**
 * file -> module
 * variable or function defined in file => scope in module
 */

console.log(module);

/**
 * Module {
 *   id: '.',
 *   path: '/Users/chenhanting/drive/js-series/javascript/code',
 *   exports: {},
 *   parent: null,
 *   filename: '/Users/chenhanting/drive/js-series/javascript/code/global.js',
 *   loaded: false,
 *   children: [],
 *   paths: [
 *     '/Users/chenhanting/drive/js-series/javascript/code/node_modules',
 *     '/Users/chenhanting/drive/js-series/javascript/node_modules',
 *     '/Users/chenhanting/drive/js-series/node_modules',
 *     '/Users/chenhanting/drive/node_modules',
 *     '/Users/chenhanting/node_modules',
 *     '/Users/node_modules',
 *     '/node_modules'
 *   ]
 * }
 */

const logger = require("./logger");

console.log(logger);
