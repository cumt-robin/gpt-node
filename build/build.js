import { rollup } from 'rollup'
import rollupTypescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from '@rollup/plugin-commonjs';
import { resolve } from 'path'
import fastGlob from 'fast-glob'
import { dest, parallel, series, src } from 'gulp'
import { ROOT_PATH } from "./path";
import pkgJson from "../package.json";

const getInputs = async (glob = 'src/**/*.ts') => {
    return await fastGlob(glob, {
        cwd: ROOT_PATH,
        absolute: true,
        onlyFiles: true,
        ignore: ['node_modules'],
    })
}

export const buildModules = async () => {
    const input = await getInputs()

    const bundle = await rollup({
        input,
        plugins: [rollupTypescript({ filterRoot: ROOT_PATH }), nodeResolve(), commonjs()],
        external: Object.keys(pkgJson.dependencies),
    })

    await Promise.all([
        bundle.write({
            format: 'esm',
            dir: resolve(ROOT_PATH, 'es'),
            sourcemap: false,
        }),
        bundle.write({
            format: 'cjs',
            dir: resolve(ROOT_PATH, 'lib'),
            sourcemap: false,
        }),
    ])
}

export const buildTypes = async () => {
    const input = await getInputs()

    const bundle = await rollup({
        input,
        plugins: [dts()],
    })

    await bundle.write({
        dir: resolve(ROOT_PATH, 'types'),
    })
}

export const copyDts = async () => {
    return src("types/**/*.d.ts", {
        cwd: ROOT_PATH,
    })
        .pipe(dest(resolve(ROOT_PATH, "es")))
        .pipe(dest(resolve(ROOT_PATH, "lib")))
}

export const startBuild = series(
    parallel(buildModules, buildTypes),
    copyDts
)
