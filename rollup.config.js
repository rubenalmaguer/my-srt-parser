import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "dist/main.js", // Your main entry file
  output: {
    file: "dist/main.esm.js", // Output file for the ES module bundle
    format: "esm", // Specify 'esm' for ES module output
  },
  plugins: [
    commonjs(), // Add the CommonJS plugin
  ],
};
