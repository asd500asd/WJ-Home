(function () {
    'use strict'

    // 引入gulp
    var gulp = require('gulp');

    // 引入组件
    var less = require('gulp-less'),               // less
        ejs = require('gulp-ejs'),                 // ejs
        cssMin = require('gulp-clean-css'),        // css压缩
        cssVer = require('gulp-make-css-url-version'), // css 引用文件添加 MD5
        autoprefix = require('gulp-autoprefixer'), // 自动补齐前缀
        jshint = require('gulp-jshint'),           // js检测
        uglify = require('gulp-uglify'),           // js压缩
        htmlmin = require('gulp-htmlmin'),         // html压缩
        concat = require('gulp-concat'),           // 合并文件
        rename = require('gulp-rename'),           // 重命名
        // spritesmith = require('gulp.spritesmith'), // 精灵图
        imagemin = require('gulp-imagemin'),       // 图片压缩
        // pngquant = require('imagemin-pngquant'),   //深度压缩png图片的imagemin插件
        changed = require('gulp-changed'),         // 过滤改动的文件
        browserSync = require('browser-sync'),     // 自动刷新浏览器，代理
        connect = require('gulp-connect'),
        proxy = require('http-proxy-middleware'),
        clean = require('gulp-clean'),             // 清空文件夹
        runSequence = require('run-sequence');     // 任务队列


    // 定义路径对象
    var srcRoot = 'views/';                            // 源目录文件夹 ./表示当前目录,这里没有设置./是因为需要监听新增的图片
    var distRoot = 'dist/views/';                      // 输出目录文件夹
    var srcLib = 'lib/';                               // 源目录lib文件夹
    var distLib = 'dist/lib/';                         // 输出目录lib文件夹

    // 清空dist目录下的所有文件
    gulp.task('clean', function () {
        return gulp.src([distRoot, distLib], {read: false})
            .pipe(clean({force: true}));
    });

    // 复制所有文件
    gulp.task('copy', function () {
       return gulp.src([srcRoot + '**/**.*', '!' +srcRoot + '**/**.js', '!' +srcRoot + '**/**.css', '!' + srcRoot +'**/**.html', '!'+ srcRoot + '**/**.+(jpeg|jpg|png|svg|gif|ico)'])
           .pipe(gulp.dest(distRoot));
    });

    // 压缩图片。只在build任务中才压缩图片
    gulp.task('imgMin', function () {
        var imgSrc = srcRoot + '**/**.+(jpeg|jpg|png|svg|gif|ico)';
        var imgDest = distRoot;

        return gulp.src(imgSrc)
            .pipe(changed(imgDest))
            .pipe(imagemin({
                optimizationLevel: 3,                     //类型：Number  默认：3  取值范围：0-7（优化等级）
                progressive: true,                        //类型：Boolean 默认：false 无损压缩jpg图片
                interlaced: true,                         //类型：Boolean 默认：false 隔行扫描gif进行渲染
                multipass: true,                          //类型：Boolean 默认：false 多次优化svg直到完全优化
                svgoPlugins: [{removeViewBox: false}]    //不要移除svg的viewbox属性
            }))
            .pipe(gulp.dest(imgDest))
    });

    // 复制lib文件
    gulp.task('copyLib', function () {
        return gulp.src(srcLib + '**/**.*')
            .pipe(gulp.dest(distLib));
    });

    // 压缩 html 文件
    gulp.task('html',function(){
        var options = {
            collapseWhitespace:true,
            collapseBooleanAttributes:true,
            removeComments:true,
            removeEmptyAttributes:true,
            removeScriptTypeAttributes:true,
            removeStyleLinkTypeAttributes:true,
            minifyJS:true,
            minifyCSS:true
        };
        gulp.src(srcRoot + '**/**.html')
            .pipe(htmlmin(options))
            .pipe(gulp.dest(distRoot));
    });

    //less转css,自动补齐前缀并压缩  压缩src
    gulp.task('css', function () {
        return gulp.src(srcRoot + '**/*.css')
            .pipe(autoprefix({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(cssMin({
                inline: ['remote'],
                advanced: false, //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
                compatibility: 'ie7', //保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
                keepBreaks: true, //类型：Boolean 默认：false [是否保留换行]
                keepSpecialComments: '*' //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
            }))
            // .pipe(rename({ suffix: '.min' }))
            .pipe(gulp.dest(distRoot))
    });



    // 检查、合并、压缩js文件 压缩src
    gulp.task('js', function () {
        return gulp.src(srcRoot + '**/*.js')
            // .pipe(changed(jsDest))
            // .pipe(jshint())
            // .pipe(jshint.reporter('default'))
            /*.pipe(concat('all.js'))*/
            // .pipe(rename({ suffix: '.min' }))
            .pipe(uglify())
            .pipe(gulp.dest(distRoot))
    });




    //push时需要调用的任务，在build中调用
    gulp.task('build', ['clean'],  function () {
        // 这里必须等图片压缩完再执行其他任务 因为图片压缩需要时间 后续的 css 任务可能找不到图片.
        runSequence(
            'imgMin',
            ['copyLib', 'copy', 'html', 'css','js']
        );
    });
})();
