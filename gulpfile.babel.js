import gulp from "gulp";
import sass from "gulp-sass";
import del from "del";
import browserify from "gulp-browserify";
import babel from "babelify";

sass.compiler = require("node-sass");

const paths = {
  styles: {
    src: "assets/scss/styles.scss",
    dest: "src/static/styles",
    watch: "assets/scss/**/*.scss"
  },
  js: {
    src: "assets/js/main.js",
    dest: "src/static/js",
    watch: "assets/js/**/*.js"
  }
};

function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(sass())
    .pipe(gulp.dest(paths.styles.dest));
}

function js() {
  return gulp
    .src(paths.js.src)
    .pipe(
      browserify({
        transform: [
          babel.configure({
            presets: ["@babel/preset-env"]
          })
        ]
      })
    )
    .pipe(gulp.dest(paths.js.dest));
}

function watchFiles() {
  gulp.watch(paths.js.src, js);
  gulp.watch(paths.styles.watch, styles);
}

function clean() {
  return del("src/static");
}

const dev = gulp.series([clean, js, styles, watchFiles]);

export default dev;
