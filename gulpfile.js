const { src, dest, parallel, series, watch } = require('gulp'),
browserSync 											= require('browser-sync').create(),
concat													= require('gulp-concat'),
uglify													= require('gulp-uglify-es').default,
sass														= require('gulp-sass')(require('sass')),
prefixer													= require('gulp-autoprefixer'),
cleancss													= require('gulp-clean-css');

function browsersync() {
	browserSync.init({
		server: { baseDir: 'app/' },
		notify: false,
		online: true
	})
}

function scripts() {
	return src(['node_modules/jquery/dist/jquery.min.js',
					'app/js/app.js'])
	.pipe(concat('app.min.js'))
	.pipe(uglify())
	.pipe(dest('app/js/'))
	.pipe(browserSync.stream())
}

function styles() {
	return src('app/sass/style.sass')
	.pipe(sass())
	.pipe(concat('app.min.css'))
	.pipe(prefixer({
			overrideBrowserslist: ['last 8 versions'],
			browsers: [
			'Android >= 4',
			'Chrome >= 20',
			'Firefox >= 24',
			'Explorer >= 11',
			'iOS >= 6',
			'Opera >= 12',
			'Safari >= 6',
		]}))
	.pipe(cleancss({ level: 2 }))
	.pipe(dest('app/css/'))
	.pipe(browserSync.stream())
}

function startwatch() {

	watch(['app/js/*.js', '!app/**/*.min.js'], scripts);
	watch('app/sass/*.sass', styles);
	watch('app/*.html').on('change', browserSync.reload);

}

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
exports.default = parallel(styles, scripts, browsersync, startwatch);