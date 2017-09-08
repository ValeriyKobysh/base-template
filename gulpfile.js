const gulp = require('gulp'),
      browserSync = require('browser-sync').create();

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
/**
 * ***WATCH SOURCE FILES***
 */
function watch() {
    gulp.watch(paths.styles.source, styles);
    gulp.watch(paths.templates.pages, templates);
}
/**
 * ***WATCH BUILD FILES AND RELOAD BROWSER***
 */
function server(){
    browserSync.init({
        server: paths.root
    });
    browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
}


exports.templates = templates;
exports.styles = styles;
exports.clear = clear;

gulp.task('default', gulp.series(
    gulp.parallel(styles, templates),
    gulp.parallel(watch, server)
));

gulp.task('build', gulp.series(
    clear,
    gulp.parallel(styles, templates)
));