/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
    testEnvironment: "node",
    transform: {
      "\\.lua$": "<rootDir>/tests/transformers/luaTransformer.cjs",
      "^.+\\.tsx?$": ["ts-jest", {}],
    },
};