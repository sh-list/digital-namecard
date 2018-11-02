var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    rucksack = require('rucksack-css'),
    cssnano = require('cssnano');


var src = {
    scss: './scss/**/*.scss',
    css: './css/main.css',
    html: './**/*.html'
};


gulp.task('sass', function(){
    var processors = [
        rucksack({autoprefixer: true}),
        cssnano()
    ];

    return gulp.src(src.scss)

    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))

    .pipe(gulp.dest('./css'));
});


gulp.task('watch', function(){
    gulp.watch(src.scss, gulp.series('sass'));
    gulp.watch(src.css);
    gulp.watch(src.html);
});


gulp.task('default', gulp.series('sass', gulp.parallel('watch')));