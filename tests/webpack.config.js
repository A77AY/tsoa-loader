const path = require("path");

module.exports = {
  mode: "development",
  entry: "./tests/entry.js",
  output: {
    path: path.resolve(__dirname, "../tmp"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: {
          configFile: path.join(__dirname, "tsconfig.json")
        }
      }
    ]
  },
  resolveLoader: {
    alias: {
      "tsoa-loader": path.join(__dirname, "../lib/index.js")
    }
  },
  resolve: {
    extensions: [".js", ".json", ".ts"]
  }
};
