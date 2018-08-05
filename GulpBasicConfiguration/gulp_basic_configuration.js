const gulp = require('gulp')
const del = require('del')
const imageminPngquant = require('imagemin-pngquant')
const colors = require('colors')
const browserSync = require('browser-sync').create()
const $ = require('gulp-load-plugins')()

const STATIC = './src/static'

gulp.task('del', (callback) => {
  del(['./assets/**/*']).then(paths => {
    console.log('Deleted files and folders:\n'.red, paths.join('\n').yellow)
    callback()
  })
})

// 備份靜態HTML文件
gulp.task('html', () => {
	const options = {
		removeComments: false,//清除HTML注释
    collapseWhitespace: false,//压缩HTML
    collapseInlineTagWhitespace: false,//不在显示之间留下任何空格
    collapseBooleanAttributes: false,//省略布尔属性的值 <input checked="true"/> ==> <input />
    decodeEntities: false,//尽可能使用直接Unicode字符
    removeEmptyAttributes: false,//删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: false,//删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: false,//删除<style>和<link>的type="text/css"
    minifyJS: false,//压缩页面JS
    minifyCSS: false,//压缩页面CSS
    keepClosingSlash: true, //在单例元素上保留尾部斜杠
    useShortDoctype: false //用短（HTML5）doctype替换doctype
	}
	return gulp.src(['./*.html'])
		.pipe($.htmlmin(options))
		.pipe(gulp.dest('./src/views'))
})

gulp.task('fonts', () => {
  return gulp.src([STATIC + '/fonts/**'])
    .pipe(gulp.dest('assets/fonts'))
})

// 複製並壓縮圖片
// 只压缩修改的图片。压缩图片比较耗时，在很多情况下我们只修改了某些图片，没有必要压缩所有图片
// 使用 `gulp-cache` 只压缩修改的图片，没有修改的图片直接从缓存文件读取（C:\Users\Administrator\AppData\Local\Temp\gulp-cache）
gulp.task('images', (callback) => {
  gulp.src([STATIC + '/images/**/*'])
    .pipe($.cache($.imagemin({
      verbose: true,
      optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
      progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
      interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
      multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
      svgoPlugins: [{removeViewBox: false}], //不要移除svg的viewbox属性
      use: [imageminPngquant()] //使用imageminPngquant深度压缩png图片
    })))
    .pipe(gulp.dest('assets/images'))
  callback()
})

gulp.task('pageSass', () => {
  return gulp.src([STATIC + '/sass/page/**/*.scss', '!' + STATIC + '/sass/page/details.scss'])
    .pipe($.sourcemaps.init())
    .pipe($.sass())
    .pipe($.cleanCss({compatibility: 'ie8', debug: true}, (details) => {
      console.log(`${details.name}: ${details.stats.originalSize}`)
      console.log(`${details.name}: ${details.stats.minifiedSize}`)
    }))
    .pipe($.autoprefixer({
      browsers: ['last 4 versions', 'Android >= 4.0'],
      cascade: false, //是否美化属性值
      remove: true //是否去掉不必要的前缀
    }))
    .pipe($.rename((path) => {
      path.basename = path.basename + '.min'
    }))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('assets/css'))
    .pipe(browserSync.stream())
})

// JS插件
gulp.task('plugins', () => {
  return gulp.src([STATIC + '/js/plugins/**/*.js'])
    .pipe(gulp.dest('assets/js'))
})

// 公共JS
gulp.task('commonJs', (callback) => {
  gulp.src([STATIC + '/js/common/**/*.js'])
    .pipe($.sourcemaps.init())
    .pipe($.babel({
      presets: ['es2015'],
      // plugins: ['transform-runtime']
    }))
    .pipe($.uglify())
    .pipe($.rename((path) => {
      path.basename = path.basename + '.min'
    }))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('assets/js'))
  callback()
})

gulp.task('pageJs', (callback) => {
  gulp.src([STATIC + '/js/page/*.js', '!' + STATIC + '/js/page/details.js'])
    .pipe($.sourcemaps.init())
    .pipe($.babel({
      presets: ['es2015'],
      // plugins: ['transform-runtime']
    }))
    .pipe($.uglify())
    .pipe($.rename((path) => {
      path.basename = path.basename + '.min'
    }))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('assets/js'))
  callback()
})

// RequireJS配置
gulp.task('requirePage', (callback) => {
  gulp.src([STATIC + '/js/page/page_config/*.js', '!' + STATIC + '/js/page/page_config/detail_app.js'])
    .pipe(gulp.dest('assets/js'))
  callback()
})

gulp.task('watch', () => {
    $.livereload.listen()
    gulp.watch([STATIC + '/sass/**/*.scss', STATIC + '/js/**/*.js'], ['pageSass', 'commonJs', 'pageJs']);
})

gulp.task('serve', ['pageSass'], () => {
    browserSync.init({
      // proxy: 'yourlocal.dev'
      server: {
          baseDir: './'
      }
    })
    gulp.watch(STATIC + '/sass/**/*.scss', ['pageSass'], (done) => {
      browserSync.reload()
      done()
    })
    gulp.watch('./*.html').on('change', browserSync.reload)
    gulp.watch(STATIC + '/js/**/*.js').on('change', browserSync.reload)
})

gulp.task('default', ['html', 'fonts', 'images', 'pageSass', 'plugins', 'commonJs', 'pageJs', 'requirePage'], () => {
  console.log('All tasks have been completed.'.underline.green)
})

gulp.task('production', ['del'], () => {
    gulp.start(['default'], () => {})
})
