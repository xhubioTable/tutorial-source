const fs = require('fs')
const util = require('util')
const path = require('path')
const InterfaceWriter = require('@xhubiotable/processor').InterfaceWriter

const writeFile = util.promisify(fs.writeFile)
const DELIMITER = ','

class CsvWriter extends InterfaceWriter {
  async write(testcaseData) {
    const fileName = await this.createFileName(testcaseData)

    const sheetName = testcaseData.tableName
    const res = []

    for (const instId of Object.keys(testcaseData.data[sheetName])) {
      const dat = testcaseData.data[sheetName][instId]
      const friend = dat['friend email'] ? dat['friend email'] : ''
      const row = [dat['first name'], dat['last name'], dat.email, friend]
      res.push(row.join(DELIMITER))
    }

    return writeFile(fileName, res.join('\n'))
  }

  /**
   * Creates the file name to write the testcaseData object
   * @param testcaseData {object} The testcaseData object
   * @return fileName {string} The file name to write the object
   */
  async createFileName(testcaseData) {
    const tcName = testcaseData.name
    const targetDir = path.join('tdg', tcName)
    return path.join(targetDir, 'person.csv')
  }
}

module.exports.CsvWriter = CsvWriter
