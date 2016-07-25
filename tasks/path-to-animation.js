var brain = require('./lib/brain');
var _ = require('lodash');

module.exports = function(grunt) {

  // the defaults
  grunt.config.merge({
    'path-to-animation': {
      options: {
        src: './animation-paths.json'
      }
    }
  });

  grunt.registerMultiTask('path-to-animation', '', function() {
      var config = _.assign({}, this.options(), this.data);

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