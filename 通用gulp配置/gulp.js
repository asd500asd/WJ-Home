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
        babel = require('gulp-babel'),             // js es6->es5
        uglify = require('gulp-uglify'),           // js压缩
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
        runSequence = require('run-sequence'),     // 任务队列
        rev = require('gulp-rev'),
        stripDebug = require('gulp-strip-debug'),
        htmlmin  = require('gulp-htmlmin'),
        revCollector = require('gulp-rev-collector');


    // 定义路径对象
    var srcRoot = 'src/';                            // 源目录文件夹 ./表示当前目录,这里没有设置./是因为需要监听新增的图片
    var distRoot = 'dist/';                     // 输出目录文件夹
    var paths = {
        src: {
            libs: srcRoot + 'libs/',
            less: srcRoot + 'less/',
            scripts: srcRoot + 'js/',
            fonts: srcRoot + 'fonts/',
            img: srcRoot + 'img/',
            html: srcRoot + 'templates/'
        },
        dist: {
            libs: distRoot + 'libs/',
            css: distRoot + 'css/',
            scripts: distRoot + 'js/',
            fonts: distRoot + 'fonts/',
            img: distRoot + 'img/',
            html: 'dist/'
        }
    };

    // ejs
    gulp.task('html', function () {
        var htmlSrc = [paths.src.html + '**/*.html', '!' + paths.src.html + 'include/**'];
        var htmlDest = paths.dist.html;
        var options = {
            removeComments: true,//清除HTML注释
            collapseWhitespace: true,//压缩HTML
            collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
            removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
            minifyJS: true,//压缩页面JS
            minifyCSS: true//压缩页面CSS
        };
        gulp.src(htmlSrc)
            .pipe(ejs({}, {}, { ext: '.html' }))
            .pipe(htmlmin(options))
            .pipe(gulp.dest(htmlDest))
    });

    //Html替换css、js文件版本
    gulp.task('revHtmlCss', function () {
        return gulp.src([paths.dist.css + '/*.json', paths.dist.html + '**/*.html'])
            .pipe(revCollector())             //替换html中对应的记录
            .pipe(gulp.dest(paths.dist.html));        //输出到该文件夹中
    });
    gulp.task('revHtmlJs', function () {
        return gulp.src([paths.dist.scripts +'/*.json', paths.dist.html + '**/*.html'])
            .pipe(revCollector())
            .pipe(gulp.dest(paths.dist.html));
    });


    //拷贝图片，开发环境不需要每次都压缩图片。之所以需要拷贝一次，是因为会执行clean任务。
    gulp.task('img', function () {
        var imgSrc = paths.src.img + '**/*.+(jpeg|jpg|png|svg|gif|ico)';
        var imgDest = paths.dist.img;

        return gulp.src(imgSrc)
            .pipe(changed(imgDest))
            .pipe(gulp.dest(imgDest))
    });

    // 压缩图片。只在build任务中才压缩图片
    gulp.task('imgMin', function () {
        var imgSrc = paths.src.img + '**/*.+(jpeg|jpg|png|svg|gif|ico)';
        var imgDest = paths.dist.img;

        return gulp.src(imgSrc)
            .pipe(changed(imgDest))
            .pipe(imagemin({
                optimizationLevel: 5,                     //类型：Number  默认：3  取值范围：0-7（优化等级）
                progressive: true,                        //类型：Boolean 默认：false 无损压缩jpg图片
                interlaced: true,                         //类型：Boolean 默认：false 隔行扫描gif进行渲染
                multipass: true,                          //类型：Boolean 默认：false 多次优化svg直到完全优化
                svgoPlugins: [{removeViewBox: false}]    //不要移除svg的viewbox属性
            }))
            .pipe(gulp.dest(imgDest))
    });

    //less转css,自动补齐前缀并压缩
    gulp.task('css', function () {
        var cssSrc = paths.src.less + 'style.less';
        var cssDest = paths.dist.css;

        return gulp.src(cssSrc)
            .pipe(changed(cssDest))
            .pipe(less())
            .pipe(autoprefix({
                browsers: ['last 2 versions'],
                cascade: false
            }))

            .pipe(cssVer())

            .pipe(cssMin({
                advanced: false, //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
                compatibility: 'ie7', //保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
                keepBreaks: true, //类型：Boolean 默认：false [是否保留换行]
                keepSpecialComments: '*' //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
            }))
            .pipe(rename({ suffix: '.min' }))
            .pipe(rev())
            .pipe(gulp.dest(cssDest))
            .pipe(rev.manifest())
            .pipe(gulp.dest(cssDest))
    });
    gulp.task('css-dev', function () {
        var cssSrc = paths.src.less + 'style.less';
        var cssDest = paths.dist.css;

        return gulp.src(cssSrc)
            .pipe(changed(cssDest))
            .pipe(less())
            .pipe(autoprefix({
                browsers: ['last 2 versions'],
                cascade: false
            }))

            .pipe(cssVer())

            .pipe(cssMin({
                advanced: false, //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
                compatibility: 'ie7', //保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
                keepBreaks: true, //类型：Boolean 默认：false [是否保留换行]
                keepSpecialComments: '*' //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
            }))
            .pipe(rename({ suffix: '.min' }))

            .pipe(gulp.dest(cssDest))
    });
    // 检查、合并、压缩js文件
    gulp.task('js', function () {
        var jsSrc = paths.src.scripts + '**/*.js';
        var jsDest = paths.dist.scripts;

        return gulp.src(jsSrc)
            .pipe(changed(jsDest))
            .pipe(babel())

            // .pipe(jshint())
            // .pipe(jshint.reporter('default'))
            /*.pipe(concat('all.js'))*/
            .pipe(stripDebug())
            .pipe(uglify({
                // mangle: false,//类型：Boolean 默认：true 是否修改变量名
                // compress: false,//类型：Boolean 默认：true 是否完全压缩
                // preserveComments: 'all' //保留所有注释
            }))
            .pipe(rename({ suffix: '.min' }))
            .pipe(rev())
            .pipe(gulp.dest(jsDest))
            .pipe(rev.manifest())

            .pipe(gulp.dest(jsDest))


    });
    gulp.task('js-dev', function () {
        var jsSrc = paths.src.scripts + '**/*.js';
        var jsDest = paths.dist.scripts;

        return gulp.src(jsSrc)
            .pipe(changed(jsDest))
            .pipe(babel())

            // .pipe(jshint())
            // .pipe(jshint.reporter('default'))
            /*.pipe(concat('all.js'))*/
            .pipe(rename({ suffix: '.min' }))

            .pipe(gulp.dest(jsDest))
        // .pipe(uglify())

    });

    // 复制libs文件
    gulp.task('libs', function () {
        var libsSrc = paths.src.libs + '**/*';
        var libsDist = paths.dist.libs;

        return gulp.src(libsSrc)
            .pipe(gulp.dest(libsDist))
    });

    //拷贝字体
    gulp.task('fonts', function () {
        var fontSrc = paths.src.fonts + '*.*';
        var fontDest = paths.dist.fonts;

        return gulp.src(fontSrc)
            .pipe(changed(fontDest))
            .pipe(gulp.dest(fontDest))
    });

    gulp.task('browser-sync', function () {
        var middleware = proxy('/api/',  {
            target: 'http://127.0.0.1:9000',
            changeOrigin:true,
            // pathRewrite: {
            //     '^/wxapi/': ''
            // }
        });
        browserSync.init({
            server: {
                baseDir: "./dist/",
                middleware: middleware
            },
            files: [ distRoot + '**/*'],
            browser: "google chrome",
            notify: true,
            port: 4002
        });
    });

    gulp.task('serverName', function() {
        connect.server({
            root: './',
            port: 8088,
            livereload: true,
            middleware: function(connect, opt) {
                return [
                    proxy('/api',  {
                        target: 'http://127.0.0.1:9000/',
                        changeOrigin:true,
                        // pathRewrite: {
                        //     '^/wxapi': ''
                        // }
                    }),
                ]
            }
        });
    });

    //定义监听任务
    gulp.task('watch', function () {
        gulp.watch(paths.src.img + '**/*.+(jpeg|jpg|png|svg|gif|ico)', ['img']);//此任务好像没有效果？ 原因：用 './xx' 开头作为当前路径开始，会导致无法监测到新增文件，所以直接省略掉 './' 即可。'./images/*' === 'images/*'
        gulp.watch(paths.src.less + '**/*.less', ['css-dev']);
        gulp.watch(paths.src.scripts + '*.js', ['js-dev']);
        gulp.watch(paths.src.scripts + '**/*.json', ['libs']);
        gulp.watch(paths.src.html + '**/*.html', ['html']);
        gulp.watch(paths.src.libs + '**/*.js', ['libs']);
        gulp.watch(paths.src.libs + '**/*.css', ['libs']);
    });

    // 清空dist目录下的所有文件
    gulp.task('clean', function () {
        return gulp.src(distRoot + '**/**.*', {read: false})
            .pipe(clean({force: true}));
    });

    // gulp命令默认启动的就是default认为,这里将clean任务作为依赖,也就是先执行一次clean任务,流程再继续.
    gulp.task('default', function () {
        runSequence(
            'dev',
            'watch',
            'browser-sync'
        );
    });

    gulp.task('dev', ['clean'], function() {
        runSequence(
            'img',
            'css-dev',
            ['html', 'libs', 'js-dev', 'fonts'],

        );
    });

    //push时需要调用的任务，在build中调用
    gulp.task('build', ['clean'],  function () {
        // 这里必须等图片压缩完再执行其他任务 因为图片压缩需要时间 后续的 css 任务可能找不到图片.
        runSequence(
            'imgMin',
            ['html', 'css', 'libs', 'js', 'fonts'],
            'revHtmlCss',
            'revHtmlJs'
        );
        // gulp.start('imgMin', 'css', 'js', 'fonts');
    });
})();
