module.exports = function(grunt) {

  grunt.initConfig({
    'path-to-animation': {
      // custom configuration goes here:
      'customTask': {
        // where to save the sass file when ready
        dest: './example/output.scss',
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
      },

      'smallerElement': {
        // where to save the sass file when ready
        dest: './example/output1.scss',
        // property name to read from. It will be used for the css class name
        //  and for the css @keyframes name.
        // the namespace should contain valid css class names characters
        namespace: 'smaller-element',
        // we need the size of the animated element in order to calculate the translate values
        elementSize: {
          width: 50,
          height: 50
        },
        // which sass mixin to @include (this should be  created by the user)s
        //  the default is 'curved-animation'
        sassMixin: 'sassence',
      }
    },

    sass: {
      options: {
          lineNumbers: true,
          sourceMap: true
      },
      dist: {
        style: 'expanded',
        files: [{
          'example/output.css': 'example/output_master.scss'
        }]
      }
    }
  });

  grunt.registerTask('default', ['path-to-animation', 'sass']);

  grunt.loadNpmTasks('grunt-sass');

  grunt.loadTasks('./tasks');
}