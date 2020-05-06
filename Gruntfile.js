module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        concat: {
            options: {banner: "/*! <%= pkg.name %> v<%= pkg.version %> | <%= pkg.homepage %> | <%= pkg.license %> License */\n\n", footer: "\n/*! Author: <%= pkg.author.name %> <<%= pkg.author.email %>>\n Updated: <%= grunt.template.today('dS mmm yyyy @ h:MM:ss TT') %> */"},
            dist: {src: ["src/Animadio.js", "src/Input.js", "src/Slider.js",], dest: "dist/animadio.js"}},
        /*uglify: {
            dist: {files: [{"dist/min/animadio.min.js": ["dist/animadio.js"]}]}}*/
    });
    grunt.loadNpmTasks("grunt-contrib-concat");
    /*grunt.loadNpmTasks("grunt-contrib-uglify");*/
    grunt.registerTask("default", ["concat"/*, "uglify"*/]);
};
