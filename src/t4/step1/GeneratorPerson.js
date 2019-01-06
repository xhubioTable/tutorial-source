const DataGeneratorBase = require('@xhubiotable/data-generator')
  .DataGeneratorBase
class GeneratorPerson extends DataGeneratorBase {
  // eslint-disable-next-line no-unused-vars
  async generate(instanceId, testcase, todoGenerator) {
    const param = todoGenerator.config

    if (instanceId && this.instanceData.has(instanceId)) {
      const valObj = this.instanceData.get(instanceId)
      return valObj[param]
    }

    const genData = await this._doGenerate(instanceId, testcase, todoGenerator)
    if (genData !== undefined && instanceId) {
      this.instanceData.set(instanceId, genData)
    }
    return genData[param]
  }

  // eslint-disable-next-line no-unused-vars
  async _doGenerate(instanceId, testcase, todoGenerator) {
    const firstName =
      FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)]
    const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)]
    const domain = FREE_MAILER[Math.floor(Math.random() * FREE_MAILER.length)]
    const email = this.makeUnique(firstName, lastName, domain)
    return {
      firstName,
      lastName,
      email,
    }
  }

  // ensure that the email is unique
  makeUnique(firstName, lastName, domain) {
    let email = `${firstName}.${lastName}@${domain}`
    let counter = 1
    while (this.uniqueSet.has(email)) {
      email = `${firstName}.${lastName}-${counter}@${domain}`
      counter++
    }
    return email
  }
}

module.exports.GeneratorPerson = GeneratorPerson

const FIRST_NAMES = [
  'Aaron',
  'Hugo',
  'Hussein',
  'Ian',
  'Said',
  'Salih',
  'Anabel',
  'Anastasia',
  'Andrea',
  'Angela',
  'Celine',
  'Ceyda',
  'Ceylin',
  'Cosima',
]
const LAST_NAMES = [
  'Kramer',
  'Krauel',
  'Kraus',
  'Krause',
  'Liebold',
  'Lufft',
  'Lukoschek',
  'Lutje',
  'Mai',
  'Meloni',
  'Melzer',
  'Morhelfer',
]

const FREE_MAILER = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'gum.org',
  'foo.bar',
]
