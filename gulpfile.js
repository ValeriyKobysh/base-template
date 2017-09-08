const gulp = require('gulp');

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

const pug = require('gulp-pug');
/**
 * ***PUG***
 */
function templates() {
    return gulp.src(paths.templates.pages)
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest(paths.root));
}

const sass = require('gulp-sass'),
      rename = require('gulp-rename'),
      sourcemaps = require('gulp-sourcemaps');
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

const del = require('del');
/**
 * ***CLEAR DIST DIR***
 */
function clear(){
    return del(paths.root);
}

exports.templates = templates;
exports.styles = styles;
exports.clear = clear;

gulp.task('default', gulp.series(
    clear,
    gulp.parallel(styles, templates)
));