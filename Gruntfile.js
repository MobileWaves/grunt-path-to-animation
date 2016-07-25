module.exports = function(grunt) {

  grunt.initConfig({
    'path-to-animation': {
      // custom configuration goes here:
      'customTask': {
        // where to save the sass file when ready
        dest: './output/manamana1111111.scss',
        // property name to read from. It will be used for the css class name
        //  and for the css @keyframes name.
        // the namespace should contain valid css class names characters
        namespace: 'custom-namespace-name',
        // we need the size of the animated element in order to calculate the translate values
        elementSize: {
          width: 100,
          height: 100
        },
        // which sass mixin to @include (this should be  created by the user)s
        //  the default is 'curved-animation'
        sassMixin: 'sassence',
      }
    }
  });

  grunt.registerTask('default', ['path-to-animation']);

  grunt.loadTasks('./tasks');
}