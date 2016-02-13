import babel from 'babelify';
import del from 'del';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import gutil from 'gulp-util';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import cssnano from 'gulp-cssnano';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';
import browserify from 'browserify';
import scss from 'gulp-scss';
import * as yargs from 'yargs';

const paths = {
  in: {
    js: './plugin/source/',
    css: './plugin/source/styles/'
  },
  out: {
    js: './plugin/extension/js/',
    css: './plugin/extension/assets/styles/'
  }
};

function build(file) {
  cleanDirectory('js', file);

  browserify(paths.in.js + file + '/' + file + '.js', { debug: true })
    .transform(babel)
    .bundle()
    .on('error', (error) => {
      gutil.log(error)
    })
    .pipe(source(file + '.js'))
    .pipe(buffer())
    .pipe(gulpif(yargs.argv.production, uglify()))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.out.js));
}

function cleanDirectory(type, file = '/') {
  var deleteFile = paths.out[type] + file + '*';
  del([ deleteFile ]);
}

gulp.task('buildBackground', () => {
  build('background');
});

gulp.task('buildContent', () => {
  build('content');
});

gulp.task('buildPopup', () => {
  build('popup');
});

gulp.task('buildCss', () => {
  cleanDirectory('css');
  return gulp.src(paths.in.css + '**/*.scss')
           .pipe(scss())
           .pipe(cssnano())
           .pipe(gulp.dest(paths.out.css));
});

gulp.task('build', [
  'buildBackground', 
  'buildContent',
  'buildPopup',
  'buildCss'
]);

gulp.task('watch', () => {
  gulp.watch('plugin/source/background/**/*.js', [ 'buildBackground' ]);
  gulp.watch('plugin/source/content/**/*.js', [ 'buildContent' ]);
  gulp.watch('plugin/source/popup/**/*.js', [ 'buildPopup' ]);
  gulp.watch('plugin/source/styles/**/*.scss' [ 'buildCss' ]);
});

gulp.task('default', [ 'build', 'watch' ]);