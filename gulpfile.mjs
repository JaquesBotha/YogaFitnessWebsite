import gulp from 'gulp';
import webp from 'gulp-webp';
import webpackStream from 'webpack-stream';
import webpack from 'webpack';

// webpackConfig is your existing webpack configuration
import webpackConfig from './webpack.config.js';

// Task to copy HTML files to dist
gulp.task('html', function() 
{
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist/'));
});

// Task to copy CSS files to dist
gulp.task('css', function() {
    return gulp.src('src/css/*.css')
        .pipe(gulp.dest('dist/css/'));
});
//Webp Conversion From JPG
gulp.task('webp', function () {
    return gulp.src('src/img/*.jpg')
    .pipe(webp({ quality: 98 }))
        .pipe(gulp.dest('dist/img/'));
});
//Webp Conversion From PNG
gulp.task('webpPng', function () {
    return gulp.src('src/img/*.png')
    .pipe(webp({ quality: 98 }))
        .pipe(gulp.dest('dist/img/'));
});

//SVG Conversion
gulp.task('Svg', function () {
    return gulp.src('src/img/*.svg')
        .pipe(gulp.dest('dist/img/'));
});

// Task to bundle JS files using Webpack
gulp.task('js', function() {
    console.log("Running JS task with Webpack config:", webpackConfig);
    return gulp.src('src/js/*.js')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('dist/js/'))
});

// Watch for changes in src
gulp.task('watch', function() {
    gulp.watch('src/*.html', gulp.series('html'));
    gulp.watch('src/css/*.css', gulp.series('css'));
    gulp.watch('src/js/**/*.js', gulp.series('js'));
    gulp.watch('src/img/*.jpg', gulp.series('webp'));
    gulp.watch('src/img/*.png', gulp.series('webpPng'));
    gulp.watch('src/img/*.svg', gulp.series('Svg'));
    // Add other file types you want to watch
});
// Default task running all the above tasks
gulp.task('default', gulp.parallel('html', 'css', 'js', 'watch'));