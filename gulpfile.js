var gulp         = require('gulp');
var browserSync  = require('browser-sync').create();
var concat       = require('gulp-concat');
var concatCss    = require('gulp-concat-css');
var minifyCSS    = require('gulp-minify-css');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var spritesmith  = require('gulp.spritesmith');
var merge        = require('merge-stream');
var sass         = require('gulp-sass');
sass.compiler    = require('node-sass');

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
});

// sass
gulp.task('sass', function() {
	return gulp.src('app/sass/main.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8'], { cascade: true }))
	.pipe(gulp.dest('app/css/'))
	.pipe(browserSync.reload({stream: true}));
});

// concat js
gulp.task('scripts', function() {
  return gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
        'app/js/lips/jquery-ui.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
        ])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('app/js/'));
});

// sprites
gulp.task('sprite', function () {
    let spriteData = gulp.src('app/img/icons/*.png')
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.css',
            imgPath: '../../img/sprite.png'
        }));

    let imgStream = spriteData.img
        .pipe(gulp.dest('app/img'));

    let cssStream = spriteData.css
        .pipe(gulp.dest('app/css/components/'));
    return merge(imgStream, cssStream);
});


// // concat components css
// gulp.task('componentsCss', function () {
//     return gulp.src([
//         'node_modules/bootstrap/dist/css/*.min.css',
//         'app/css/components/*.css'
//         ])
//     .pipe(concatCss('all.css'))
//     .pipe(gulp.dest('app/css/'));
// });

// // min
// gulp.task('minify-css', function() {
//     return gulp.src('app/css/*.css')
//     .pipe(sourcemaps.init())
//     .pipe(minifyCSS())
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest('app/css/'));
// });

//build
gulp.task('build', function() {
    var buildCss = gulp.src([
            'app/css/main.css',
            'app/css/all.css'
        ])
    .pipe(gulp.dest('dist/css'));

    var buildFonts = gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));

    var buildImg = gulp.src('app/img/**/*')
    .pipe(gulp.dest('dist/img'));

    var buildJs = gulp.src([
            'app/js/all.js',
            'app/js/common.js'
        ])
    .pipe(gulp.dest('dist/js'));

    var buildHtml = gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));

});

// gulp watch
gulp.task('watch', ['browser-sync', 'scripts', 'sprite', 'sass'], function() {
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/css/**/*.css', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
    gulp.watch('app/img/icons/*.png', ['sprite']);
    gulp.watch('app/sass/**/*.scss', ['sass'], browserSync.reload);
});

gulp.task('default', ['watch']);