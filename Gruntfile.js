'use strict';
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jsdoc : {
            dist : {
                src: ['app/js/**/*.js', '!app/bower_components/**/*', 'README.md'],
                options: {
                    destination : 'app/doc',
                    template : "node_modules/ink-docstrap/template",
                    configure : "node_modules/ink-docstrap/template/jsdoc.conf.json"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-jsdoc');

	grunt.registerTask('default', ['jsdoc']);


};
