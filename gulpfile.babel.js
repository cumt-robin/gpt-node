import { series, src } from "gulp";
import clean from "gulp-clean";
import { startBuild } from "./build/build";
import { ROOT_PATH } from "./build/path";

const ARTIFACTS_DIRS = ["dist", "es", "lib", "types"]

function cleanDir(dir = "dist", options = {}) {
    return src(dir, { allowEmpty: true, ...options }).pipe(clean({ force: true }))
}

export const cleanBuild = cleanDir.bind(null, ARTIFACTS_DIRS, { cwd: ROOT_PATH })

export const buildAll = series(cleanBuild, startBuild);
