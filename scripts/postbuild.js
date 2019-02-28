const fs = require('fs')
const path = require('path')
const omit = require('lodash/omit')
const pick = require('lodash/pick')

const PEER_DEPENDENCIES = ['react', 'react-dom', 'styled-components']

const transfomPackageJSON = packageJSON => ({
  ...omit(packageJSON, ['scripts', 'devDependencies', 'jest']),
  peerDependencies: pick(packageJSON.dependencies, PEER_DEPENDENCIES),
  dependencies: omit(packageJSON.dependencies, PEER_DEPENDENCIES)
})

const duplicatePackageJSON = () => {
  const packageJSON = require('../package.json')

  const value = process.env.IS_PUBLISHING
    ? transfomPackageJSON(packageJSON)
    : packageJSON

  fs.writeFileSync('./lib/package.json', JSON.stringify(value, null, 2))
  console.log(`package.json duplicated (${process.env.IS_PUBLISHING ? 'publish mode' : 'dev mode'})`)
}

const duplicateReadme = () => {
  fs.copyFileSync(path.resolve(__dirname,'../README.md'), path.resolve(__dirname,'../lib/README.md'));
  console.log('README.md duplicated')
}

const postBuild = () => {
  duplicatePackageJSON()
  duplicateReadme()
}
postBuild()
