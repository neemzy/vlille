var gulp = require('gulp'),
    tasks = require('gulp-load-plugins')(),
    rimraf = require('rimraf'),
    server = require('tiny-lr')();



gulp.task('clean', function (callback) {
    rimraf.sync('dist/');
    callback();
});



gulp.task('stylesheets', function () {
    gulp.src(['src/stylesheets/app.styl'])
        .pipe(tasks.plumber())
        .pipe(tasks.stylus())
        .pipe(tasks.autoprefixer())
        .pipe(tasks.if(tasks.util.env.dist, tasks.csso()))
        .pipe(gulp.dest('dist/'))
        .pipe(tasks.livereload(server));
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
        .pipe(tasks.if(tasks.util.env.dist, tasks.uglify()))
        .pipe(gulp.dest('dist/'))
        .pipe(tasks.livereload(server));
});



gulp.task('copy', function () {
    gulp.src(['node_modules/leaflet/dist/**/*', '!node_modules/leaflet/dist/*.js'])
        .pipe(gulp.dest('dist/'));
});



gulp.task('workflow', function () {
    if (!tasks.util.env.dist) {
        server.listen(35729, function (err) {
            gulp.watch('src/stylesheets/**/*.styl', ['stylesheets']);
            gulp.watch('src/scripts/**/*', ['scripts']);
        });
    }
});



gulp.task('default', ['clean', 'stylesheets', 'scripts', 'copy', 'workflow']);