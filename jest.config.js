module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  transformIgnorePatterns: [
    "/node_modules/(?!axios)",
    "/node_modules/(?!vue3-storage)",
  ],
};
