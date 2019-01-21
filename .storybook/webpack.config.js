module.exports = (baseConfig, env, config) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      require.resolve('awesome-typescript-loader'),
      env === 'PRODUCTION'
    ],
  })
  config.resolve.extensions.push('.ts', '.tsx')
  return config
}
