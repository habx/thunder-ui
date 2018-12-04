module.exports = {
  presets: [
    '@babel/preset-env',
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
  ],
  ignore: ['**/*.stories.js'],
}
