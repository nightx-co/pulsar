import { plugin } from "bun";

console.log("LUA PLUGIN LOADED");

plugin({
    name: "lua-as-text",
    setup(build) {
        build.onLoad({ filter: /\.lua$/ }, async (args) => {
            const lua = await Bun.file(args.path).text();

            return {
                contents: `export default ${JSON.stringify(lua)};`,
                loader: "js",
            }
        })
    },
})