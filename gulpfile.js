"use strict";

const gulp = require("gulp");
const connect = require("gulp-connect");
const open = require("gulp-open");
const browserify = require("browserify");
const babelify = require("babelify");
const source = require("vinyl-source-stream");
const concat = require("gulp-concat");
const lint = require("gulp-eslint");

const config = {
  port: 9090,
  devBaseUrl: "http://localhost",
  paths: {
    html: "./src/*.html",
    js: "./src/**/*.js",
    images: "./src/images/*",
    css: ["node_modules/bootstrap/dist/css/bootstrap.min.css"],
    dist: "./dist",
    mainJs: "./src/main.js",
  },
};

//Start a local development server
gulp.task("connect", () => {
  connect.server({
    root: ["dist"],
    port: config.port,
    base: config.devBaseUrl,
    livereload: true,
  });
});

gulp.task(
  "open",
  gulp.series("connect", () => {
    gulp
      .src("dist/index.html")
      .pipe(open({ uri: config.devBaseUrl + ":" + config.port + "/" }));
  }),
);

gulp.task("html", () =>
  gulp
    .src(config.paths.html)
    .pipe(gulp.dest(config.paths.dist))
    .pipe(connect.reload()),
);

gulp.task("js", () =>
  browserify(config.paths.mainJs)
    .transform(babelify, {
      presets: ["@babel/preset-env", "@babel/preset-react"],
    })
    .bundle()
    .on("error", console.error.bind(console))
    .pipe(source("bundle.js"))
    .pipe(gulp.dest(config.paths.dist + "/scripts"))
    .pipe(connect.reload()),
);

gulp.task("css", () =>
  gulp
    .src(config.paths.css)
    .pipe(concat("bundle.css"))
    .pipe(gulp.dest(config.paths.dist + "/css")),
);

gulp.task("images", () =>
  gulp
    .src(config.paths.images)
    .pipe(gulp.dest(config.paths.dist + "/images"))
    .pipe(connect.reload()),
);

gulp.task("lint", () =>
  gulp
    .src(config.paths.js)
    .pipe(lint())
    .pipe(lint.format()),
);

gulp.task("watch", () => {
  gulp.watch(config.paths.html, ["html"]);
  gulp.watch(config.paths.js, ["js", "lint"]);
});

gulp.task(
  "default",
  gulp.series("html", "js", "css", "images", "lint", "open", "watch", done =>
    done(),
  ),
);
