import { MetadataGenerator } from "tsoa/dist/metadataGeneration/metadataGenerator";
import { SpecGenerator } from "tsoa/dist/swagger/specGenerator";
import * as path from "path";

const loaderUtils = require("loader-utils");

function getConfig(
  options: { tsoaConfig?: any; tsoaPath?: string } = {},
  resourcePath: string
) {
  const configFilePath =
    options.tsoaPath || path.join(process.cwd(), "tsoa.json");
  let configFile = {};
  try {
    configFile = require(configFilePath);
  } catch (e) {}

  const config = Object.assign({}, configFile, options.tsoaConfig || {});

  if (!config.compilerOptions) {
    config.compilerOptions = {};
  }
  if (!config.swagger) {
    config.swagger = {};
  }
  if (!config.swagger.entryFile) {
    config.swagger.entryFile = resourcePath;
  }

  return config;
}

module.exports = function(content) {
  const defaultOptions = {};

  const swaggerSpecGenerator = config => {
    try {
      const metadata = new MetadataGenerator(
        config.swagger.entryFile,
        config.compilerOptions,
        config.ignore
      ).Generate();
      const spec = new SpecGenerator(metadata, config.swagger).GetSpec();
      const data = JSON.stringify(spec);
      return data;
    } catch (error) {
      this.emitError(error);
      return "{}";
    }
  };

  const options = Object.assign(
    {},
    defaultOptions,
    loaderUtils.getOptions(this)
  );

  const config = getConfig(options, this.resourcePath);

  const resourcePath = config.swagger.entryFile;

  const swaggerJSON = swaggerSpecGenerator(config);

  return `module.exports = ${swaggerJSON};`;
};
