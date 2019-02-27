const fs = require('fs')
const path = require('path')

const duplicatePackageJSON = () => {
  const packageJSON = require('../package.json')

  fs.writeFileSync('./lib/package.json', JSON.stringify(packageJSON, null, 2))
  console.log('package.json duplicated')
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
