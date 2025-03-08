const { getDefaultConfig } = require("expo/metro-config");

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  config.resolver.extraNodeModules = {
    "@utils": "./app/utils",
    "@store": "./app/store",
  };

  return config;
})();
