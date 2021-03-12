import gulp, { series } from "gulp";
import buildEs from "./build/config/build-ts";

function buildTask(cb) {
  console.log("build");
  cb();
}
const build = series(buildTask, buildEs);
export default build;
