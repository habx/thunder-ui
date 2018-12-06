module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    [
      'styled-components',
      {
        displayName: process.env.NODE_ENV === 'development',
      },
    ],
    'lodash',
  ],
  ignore: process.env.NODE_ENV === 'production' ? ['**/*.stories.js'] : [],
}
