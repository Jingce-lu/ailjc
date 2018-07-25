#!/usr/bin/env node 

const program = require('commander')
const chalk = require('chalk')

/**
 * Usage.
 */

program
  .usage('<template-name> [project-name]')
  .option('-c, --clone', 'use git clone')
  .option('--offline', 'use cached template')

/**
 * Help.
 */

program.on('--help', () => {
  console.log('  Examples:')
  console.log()
  console.log(chalk.gray('    # create a new project with an official template'))
  console.log('    $ ljc init test')
  console.log()
  console.log(chalk.red('    # This is my test'))
  console.log()
})

/**
 * Help().
 */

function help () {
  program.parse(process.argv)
  if (program.args.length < 1) return program.help()
}
help()