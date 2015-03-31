/// <vs BeforeBuild='build' />
/*global module*/
module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        // task configuration objects
        bootlint: {
            options: {
                stoponerror: false,
                stoponwarning: false,
                relaxerror: [
                    "E001",
                    "W001",
                    "W002",
                    "W003",
                    "W005"
                ]
            },
            files: [
                "Views/**/*.cshtml"
            ]
        },
        clean: {
            options: {
                force: true
            },
            // "css" sub-task
            css: {
                src: ["Content-Build/*"]
            },
            // "js" sub-task
            js: {
                src: ["Scripts-Build/"]
            }
        },
        copy: {
            // "staticContent" sub-task
            staticContent: {
                files: [{
                    expand: true,
                    cwd: "Content/",
                    dest: "Content-Build/",
                    src: ["fonts/**.*"]
                }]
            }
        },
        jshint: {
            files: ["Gruntfile.js", "Scripts/my/*.js"],
            options: {
                jshintrc: "jshintrc.json"
            }
        },
        less: {
            // "development" sub-task
            development: {
                options: {
                    cleancss: true,
                    compress: true,
                    // Make sure the CSS output is compatible with IE 8.
                    ieCompat: true,
                    paths: ["Content/my"]
                },
                files: [{
                    expand: true,
                    cwd: "Content/",
                    dest: "Content-Build/",
                    // The file patterns to match (relative to "cwd" path).
                    src: [
                        // custom LESS
                        "my/*.less",

                        // vendor LESS
                        "bootstrap/bootstrap.less",
                        "bootstrap/theme.less"
                    ],
                    // Destination file names will have this extension.
                    ext: ".min.css",
                    // Extensions in file names begin after the last dot. This setting is critical
                    // for files with names such as "kendo.default.css". Setting this to "first"
                    // would result in a file named "kendo.min.css", which isn't what we're after.
                    extDot: "last"
                }]
            }
        },
        uglify: {
            development: {
                files: [{
                    expand: true,
                    cwd: "Scripts",
                    src: [
                        // process the following file patterns
                        "**/*.js",

                        // skip the following file patterns
                        "!_references.js",
                        "!*.intellisense.js",
                        "!*-vsdoc.js",
                        "!*.min.js"
                    ],
                    dest: "Scripts-Build",
                    // Destination file names will have this extension.
                    ext: ".min.js",
                    extDot: "last"
                }]
            }
        },
        watch: {
            files: ["<%= jshint.files %>"],
            tasks: ["jshint"]
        }
    });

    // Add all plugins that your project needs here
    grunt.loadNpmTasks("grunt-bootlint");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");

    // kick off all linting tasks by invoking the linting task
    grunt.registerTask("linting", "Multi task used to execute all 'linting' tasks (e.g., JavaScript, HTML, etc.)", function () {
        grunt.task.run([
            "jshint",
            "bootlint"
        ]);
    });

    // this would be run by typing "grunt build" on the command line
    grunt.registerTask("build", [
        "linting",
        "clean:css",
        "less:development",
        "copy:staticContent",
        "clean:js",
        "uglify:development"
    ]);

    // this would be run by typing "grunt build" on the command line
    // the array should contains the names of the tasks to run
    //grunt.registerTask("build", ["jshint", "bootlint", "clean:css", "less:development", "copy:staticContent", "clean:js", "uglify:development"]);

    // define the default task that can be run just by typing "grunt" on the command line
    // the array should contains the names of the tasks to run
    //grunt.registerTask("default", ["jshint", "bootlint", "clean:css", "less:development", "copy:staticContent", "clean:js", "uglify:development"]);
};