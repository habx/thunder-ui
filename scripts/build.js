const fs = require('fs')

const duplicatePackageJSON = () => {
  const packageJSON = require('../package.json')

  fs.writeFileSync('./lib/package.json', JSON.stringify(packageJSON, null, 2))
  console.log('package.json duplicated')
}

duplicatePackageJSON()
