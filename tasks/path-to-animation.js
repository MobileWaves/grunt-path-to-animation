var brain = require('../lib/brain');
var _ = require('lodash');

module.exports = function(grunt) {

  function logError(error) {
    grunt.fail.fatal('path-to-animation: ' + error);
  }

  function throwForMissingConfig(property) {
    logError(property + ' is missing in the task configuration');
  }

  // the defaults
  grunt.config.merge({
    'path-to-animation': {
      options: {
        src: './animation-paths.json',
        'sassMixin': 'curved-animation'
      }
    }
  });

  // Used to check if the namespace is a valid name for css classname to be used
  var validCssClassNameRule = /^[a-z\-\_0-9]+$/;

  grunt.registerMultiTask('path-to-animation', '', function() {
    var config = _.assign({}, this.options(), this.data);

    // error handling
    if (typeof config.dest != 'string') {
      throwForMissingConfig('dest');
    }

    if (typeof config.namespace != 'string') {
      throwForMissingConfig('namespace');
    } else if (!validCssClassNameRule.test(config.namespace)) {
      logError('namespace ' + config.namespace + ' should contain valid css characters');
    }

    if (typeof config.elementSize === 'undefined') {
      throwForMissingConfig('elementSize');
    } else if (typeof config.elementSize.width === 'undefined' || typeof config.elementSize.height === 'undefined') {
      throwForMissingConfig('elementSize.width or elementSize.height');
    }

    var pathsFile = JSON.parse(grunt.file.read(config.src, {encoding: 'utf8'}));

    if (!pathsFile[config.namespace]) {
      logError('Can not find ' + config.namespace + ' in ' + config.src + ' file');
    }

    var paths = pathsFile[config.namespace];

    // flattens all layouts
    var fileContent = brain.generateCss(paths, config.namespace, config.elementSize.width, config.elementSize.height, config.sassMixin);

    grunt.file.write(config.dest, fileContent, {encoding: 'utf8'});
    grunt.log.write(config.dest + ' was created');
  });

}