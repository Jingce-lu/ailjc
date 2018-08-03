#!/usr/bin/env node --harmony

var program = require('commander');

program
    .version(require('../package').version)
    // .usage('[command] [options]')  //在help中告诉用户如何使用
    .usage('<command> [options]')
    // .command('page [pageName]')  //定义命令行指令
    // .alias('pa')                 //重命名，定义一个更短的指令
    .command('list', 'list available official templates')
    .command('init', 'init templates')
    .command('in', 'inquirer 交互')
    .command('readline', 'readline 交互测试')
    .command('rename', 'fs module测试')
    .description('this is my test')      //描述
    // .option('-p, --no-peppers', 'Add peppers')
    // .option('-P, --pineapple', 'Add pineapple')
    // .option('-n, --name [name]', 'Add bbq sauce')
    // .action((pageName) => {
    //    console.log(pageName);
    // })

 // 自定义帮助信息
   .on('--help', function () {
        console.log('  Examples:');
        console.log('');
        console.log('    $ ljc list ');
        console.log('    $ ljc pa index');
        console.log();
});
// console.log(process.argv)
program.parse(process.argv);  //解析命令行
