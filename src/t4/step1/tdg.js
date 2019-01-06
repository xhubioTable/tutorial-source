const path = require('path')
const p = require('@xhubiotable/processor')
const LoggerMemory = require('@xhubiotable/logger').LoggerMemory
const GeneratorPerson = require('./GeneratorPerson').GeneratorPerson
const CsvWriter = require('./CsvWriter').CsvWriter

async function doIt() {
  const logger = new LoggerMemory()
  logger.writeConsole = true

  const fileProcessor = await p.createDefaultFileProcessor(logger)

  const csvWriter = new CsvWriter({ logger })
  const defaultWriter = p.createDefaultWriter(logger)[0]

  const processor = new p.Processor({
    logger,
    generatorRegistry: p.createDefaultGeneratorRegistry(),
    writer: [defaultWriter, csvWriter],
  })

  const genPerson = new GeneratorPerson({ logger })
  processor.generatorRegistry.registerGenerator('generatorPerson', genPerson)

  await fileProcessor.load(path.join('resources', 'demo.xlsx'))
  processor.tables = fileProcessor.tables

  await processor.process()
}

doIt()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Finish')
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.log(err)
  })
