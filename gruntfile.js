module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            externalLibraries: {
                files:{
                'build/external.min.js' : ['js/external/handlebars-v4.0.5.js',
                'js/external/moment.min.js',
                'js/external/tether.min.js']
                }
            },
            app: {
                files : {
                'build/app.min.js' : ['js/app/model/*.js', 'js/app/collection/*.js',
                'js/app/view/*.js', 'js/app/router/*.js',
                'js/app/util/*.js', 'js/app/*.js' ],
                    }
                },
            },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: false,
                globals: {
                    jQuery: true
                },
                ignores: ['js/external/**/.*.js'],
                reporterOutput : 'reports/jshint.txt'
                },
                files: {
                    src: ['js/app/**/*.js']
                },
            }
    });
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    //grunt.registerTask('default', ['jshint']);
    // Default task(s).
    grunt.registerTask('default', ['uglify']);    
}