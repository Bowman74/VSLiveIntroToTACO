module.exports = function (grunt) {
    grunt.initConfig({
        bowercopy: {
            options: {
                clean: false
            },
            fastclick: {
                files: {
                    'www/scripts/fastclick': 'fastclick/lib/*.*'
                }
            },
            jquery: {
                files: {
                    'www/scripts/jquery': 'jquery/dist/*.*'
                }
            }
        }
    });

    grunt.registerTask("default", ["bowercopy"]);
    grunt.loadNpmTasks("grunt-bowercopy");
};