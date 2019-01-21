const path = require('path')

module.exports = (baseConfig, env, config) => {
  if (env === 'PRODUCTION') {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        require.resolve('awesome-typescript-loader'),
        require.resolve('react-docgen-typescript-loader'),
      ],
    })
  } else {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        require.resolve('awesome-typescript-loader'),
      ],
    })
  }
  config.resolve.extensions.push('.ts', '.tsx')

  config.module.rules.push({
    test: /\.stories\.tsx?$/,
    loaders: [
      {
        loader: require.resolve('@storybook/addon-storysource/loader'),
        options: { parser: 'typescript' },
      }
    ],
    enforce: 'pre',
  });

  return config
}
