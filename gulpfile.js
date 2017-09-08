const gulp = require('gulp'),
      pug = require('gulp-pug');

const paths = {
    root: './dist',
    templates: {
        pages: 'src/views/*.pug',
        // src: 'src/views/'
        dist: 'dist/'
    }
}

/**
 * ***Pug***
 */
function templates() {
    return gulp.src(paths.templates.pages)
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest(paths.root));
}

exports.templates = templates;