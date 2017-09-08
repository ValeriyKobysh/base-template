const gulp = require('gulp'),
      pug = require('gulp-pug');

const sass = require('gulp-sass'),
      rename = require('gulp-rename'),
      sourcemaps = require('gulp-sourcemaps');

const paths = {
    root: './dist',
    templates: {
        pages: 'src/views/*.pug',
        dist: 'dist/'
    },
    styles: {
        source: './src/sass/index.sass',
        dist: 'dist/css'
    }
}

/**
 * ***PUG***
 */
function templates() {
    return gulp.src(paths.templates.pages)
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest(paths.root));
}

/**
 * ***SASS***
 */
function styles() {
    return gulp.src(paths.styles.source)
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(sourcemaps.write())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.styles.dist))
}

exports.templates = templates;
exports.styles = styles;