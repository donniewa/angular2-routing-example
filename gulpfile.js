var gulp      = require('gulp');
var del       = require('del');
var plumber   = require('gulp-plumber');
var rename    = require('gulp-rename');
var traceur   = require('gulp-traceur');
var ts        = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

var PATHS = {
    src: {
      ts: 'src/**/*.ts',
      js: 'src/**/*.js',
      html: 'src/**/*.html'
    },
    lib: [
      'node_modules/gulp-traceur/node_modules/traceur/bin/traceur-runtime.js',
      'node_modules/systemjs/dist/system-csp-production.src.js',
      'node_modules/reflect-metadata/Reflect.js',
      'node_modules/angular2/bundles/angular2.dev.js',
      'node_modules/angular2/bundles/http.dev.js',
      'node_modules/angular2/bundles/router.dev.js'
    ]
};

gulp.task('clean', function(done) {
  del(['dist'], done);
});

gulp.task('typescripts', function() {
  var tsResult = tsProject.src(PATHS.src.ts) // instead of gulp.src(...)
    .pipe(ts(tsProject));

  return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('js', function () {
    return gulp.src(PATHS.src.js)
        .pipe(rename({extname: ''})) //hack, see: https://github.com/sindresorhus/gulp-traceur/issues/54
        .pipe(plumber())
        .pipe(traceur({
            modules: 'instantiate',
            moduleName: true,
            annotations: true,
            types: true,
            memberVariables: true
        }))
        .pipe(rename({extname: '.js'})) //hack, see: https://github.com/sindresorhus/gulp-traceur/issues/54
        .pipe(gulp.dest('dist'));
});

gulp.task('html', function () {
    return gulp.src(PATHS.src.html)
        .pipe(gulp.dest('dist'));
});

gulp.task('libs', function () {
    var size = require('gulp-size');
    return gulp.src(PATHS.lib)
      .pipe(size({showFiles: true, gzip: true}))
      .pipe(gulp.dest('dist/lib'));
});

gulp.task('play', ['default'], function () {

    var express = require('express');
    var open    = require('open');
    var app     = express();
    var port    = 9000;

    gulp.watch(PATHS.src.html, ['html']);
    gulp.watch(PATHS.src.js, ['js']);
    gulp.watch(PATHS.src.ts, ['typescripts']);

    // Serve the static content
    app.use(express.static(__dirname + '/dist'));  // serve everything that is static

    app.get('*', function(req, res) {
      res.sendFile(__dirname + '/dist/index.html'); // load our public/index.html file
    });

    app.listen(port, function () {
      open('http://localhost:' + port);
    });
});

gulp.task('default', ['typescripts', 'js', 'html', 'libs']);
