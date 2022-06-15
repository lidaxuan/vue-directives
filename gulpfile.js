/* jshint esversion: 6 */
/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-01-21 09:58:50
 * @FilePath: /vue-directives/gulpfile.js
 */
var gulp = require('gulp');
var babel = require('gulp-babel');//把es6语法解析成es5
// var concat = require('gulp-concat');//合并
var uglify = require('gulp-uglify');//压缩
// var htmlmin = require('gulp-htmlmin'); //压缩html里面的js，css，去除空格
var del = require('del');//删除文件


gulp.task('clean:Build', function (done) {
  del([
    './build/**/',
  ]);
  done();
});


//js压缩
gulp.task('js', function (done) {
  gulp.src('./src/*.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('./build/'));
  done();
});

gulp.task('directive', function (done) {
  gulp.src('./src/**/*.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('./build/'));
  done();
});


gulp.task('vue', function (done) {
  gulp.src('./src/**/*.vue')
    .pipe(gulp.dest('./build/'));
  done();
});

//css压缩
var minifyCss = require('gulp-minify-css');//压缩
gulp.task('style', function (done) {
  gulp.src('./src/**/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('./build/'));
  done();
});

//img
// gulp.task('images', function (){
//     return gulp.src(['./images/*.jpg','./images/*.png','./images/*.gif'])
//         .pipe(rev())//文件名加MD5后缀
//         .pipe(gulp.dest('./build/images'))
//         .pipe(rev.manifest('rev-images-manifest.json'))//生成一个rev-manifest.json
//         .pipe(gulp.dest('./build/images'));//将 rev-manifest.json 保存到 rev 目录内
// });

// //html压缩
// // gulp.task('revHtml',function(){
// //     var options = {
// //         removeComments: true,//清除HTML注释
// //         collapseWhitespace: true,//压缩HTML
// //         collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
// //         removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
// //         removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
// //         removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
// //         minifyJS: true,//压缩页面JS
// //         babel:true,
// //         minifyCSS: true//压缩页面CSS
// //     };
// //     return gulp.src('./html/*.html')
// //         .pipe(htmlmin(options))
// //         .pipe(gulp.dest('./build/html'))
// // });


// gulp.task('revimg', function() {
//     //css，主要是针对img替换
//     return gulp.src(['./build/**/rev-images-manifest.json', './build/css/*.css'])
//         .pipe(revCollector({
//             replaceReved:true
//         }))
//         .pipe(gulp.dest('./build/css'));
// });
// gulp.task('revjs', function() {
//     //css，主要是针对img替换
//     return gulp.src(['./build/**/rev-images-manifest.json', './build/js/*.js'])
//         .pipe(revCollector({
//             replaceReved:true,
//             dirReplacements:{
//                 '../images': '../build/images'
//             }
//          }))
//         .pipe(gulp.dest('./build/js'));
// });

// //使用rev替换成md5文件名，这里包括html和css的资源文件也一起
// gulp.task('rev', function() {
//     //html，针对js,css,img
//     return gulp.src(['./build/**/*.json', './html/*.html'])
//         .pipe(revCollector({

//             replaceReved:true
//         }))
//         .pipe(gulp.dest('./html'));
// });

//删除Build文件


//执行多个任务gulp4的用法 gulp.series()串行，gulp.parallel()并行
gulp.task('default', gulp.series('clean:Build', gulp.parallel('js', 'directive', 'vue', 'style'), function () {
  console.log('执行完成');
}))