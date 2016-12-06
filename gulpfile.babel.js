/* eslint-disable import/no-extraneous-dependencies */
import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';
import eslint from 'gulp-eslint';
import webpack from 'webpack-stream';
import webpackConfig from './webpack.config.babel';

const paths = {
  allSrcJs: 'src/**/*.js?(x)',
  serverSrcJs: 'src/server/**/*.js?(x)',
  sharedSrcJs: 'src/shared/**/*.js?(x)',
  clientEntryPoint: 'src/client/app.jsx',
  clientManagerEntryPoint: 'src/client/manager/app.jsx',
  gulpFile: 'gulpfile.babel.js',
  webpackFile: 'webpack.config.babel.js',
  clientBundle: 'dist/client-bundle.js?(.map)',
  clientManagerBundle: 'dist/manager/client-bundle.js',
  libDir: 'lib',
  distDir: 'dist',
  distManagerDir: 'dist/manager',
};

gulp.task('lint', () =>
  gulp.src([
    paths.allSrcJs,
    paths.gulpFile,
    paths.webpackFile,
  ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task('clean', () => del([
  paths.libDir,
  paths.clientBundle,
  paths.clientManagerBundle,
]));

gulp.task('build', ['lint', 'clean'], () =>
  gulp.src(paths.allSrcJs)
    .pipe(babel())
    .pipe(gulp.dest(paths.libDir))
);

gulp.task('main', ['lint', 'clean'], () => {
  gulp.src(paths.clientEntryPoint)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(paths.distDir));
  gulp.src(paths.clientManagerEntryPoint)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(paths.distManagerDir));
});

gulp.task('watch', () => {
  gulp.watch(paths.allSrcJs, ['main']);
});

gulp.task('server', ['main', 'build']);
gulp.task('default', ['watch', 'main']);
