module.exports = {
  presets: [
    "@babel/preset-env",
    "@babel/preset-react"
  ],
  plugins: [
    [
      "styled-components",
      {
        "displayName": process.env.NODE_ENV === 'development',
      }
    ]
  ]
};
