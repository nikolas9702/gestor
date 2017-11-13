var gulp = require('gulp'),
    jshint = require('gulp-jshint');

var webpack = require('webpack-stream');
var WebpackStrip = require('strip-loader');

var notify = require("gulp-notify");
var livereload = require('gulp-livereload');

const path = require('path');

var folders = {
	src: 'public/js/asset/',
	build: 'public/js/build/'
};
 
gulp.task('procesos', function() {
	var out = folders.build ; 
	return gulp.src(folders.src + '/**/*')
		.pipe(notify("Gulp compiled!"))
		// .pipe(jshint({"esversion": 6 }))
        .pipe(jshint.reporter('jshint-stylish'))

        .pipe(webpack({
            output: {
                //archivo de salida       
                // path: __dirname + "/ambiental/Scripts/",
                path: path.resolve(__dirname, 'dist')
                // filename: 'form_amb_aspectos_ambientales.bundle.js',    
            },
            module: {
                //Ecmascript 6 - babel loader convert ES6 to pure javascript
                loaders: [
                    {
                        test: /\.js$/,
                        loader: 'babel-loader',
                        query: {
                            presets: ['es2015']
                        }
                    }
                ]
            },
        }))

		.pipe(gulp.dest(out));
});