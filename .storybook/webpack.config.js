const path = require('path')

module.exports = (baseConfig, env, config) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      require.resolve('awesome-typescript-loader'),
      ...(env === 'PRODUCTION' && [require.resolve('react-docgen-typescript-loader')])
    ],
  })
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
