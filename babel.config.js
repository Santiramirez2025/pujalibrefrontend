const { getDefaultConfig } = require("expo/metro-config");

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@/components": "./components",  // 🔥 Agregado
            "@store": "./app/store",
            "@utils": "./app/utils"
          },
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      ],
    ],
  };
};
