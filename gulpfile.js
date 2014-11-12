var gulp = require('gulp'),
    tasks = require('gulp-load-plugins')(),
    rimraf = require('rimraf'),
    dist = 'dist/';



gulp.task('clean', function (callback) {
    rimraf.sync(dist);
    callback();
});



gulp.task('stylesheets', function () {
    gulp.src(['src/stylesheets/app.styl'])
        .pipe(tasks.plumber())
        .pipe(tasks.stylus())
        .pipe(tasks.csso())
        .pipe(gulp.dest(dist));
});



gulp.task('scripts', function () {
    gulp.src('src/scripts/app.js', { read: false })
        .pipe(tasks.plumber())
        .pipe(tasks.jshint())
        .pipe(tasks.jshint.reporter('default'))
        .pipe(tasks.browserify({
            insertGlobals : false,
            transform: ['reactify'],
            extensions: ['.jsx']
        }))
        .pipe(tasks.uglify())
        .pipe(gulp.dest(dist));
});



gulp.task('copy', function () {
    gulp.src(['node_modules/leaflet/dist/**/*', '!node_modules/leaflet/dist/*.js'])
        .pipe(gulp.dest(dist));
});



gulp.task('default', ['clean', 'stylesheets', 'scripts', 'copy']);