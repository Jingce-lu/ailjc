#!/usr/bin/env node --harmony

const program = require('commander');
const chalk = require('chalk');
const download = require('download-git-repo');
const fs = require('fs');
const handlebars = require('handlebars');
const inquirer = require('inquirer');
const symbols = require('log-symbols'); // 成功,失败图标
const ora = require('ora'); // 加载loading

const pack = require('../package.json');
const templates = {
  "wiki": {
    url: "http://github.com:Jingce-lu/lu-wiki#master",
    downloadUrl: "http://github.com:Jingce-lu/lu-wiki#master",
    description: "lu-wiki template"
  }
};

const questions = [
  {
    type: 'input',
    name: 'description',
    message: '请输入项目描述'
  },
  {
      type: 'input',
      name: 'author',
      message: '请输入作者姓名'
  }
];


program
  .version(pack.version,  '-v --version')
  .usage('<command> [options]')
  .description('this is ailjc-cli')


program
  .command('init <template> <project>')
  .description('init template')
  .action((templateName, projectName) => {
    if (fs.existsSync(projectName)) {
      console.log(symbols.error, chalk('项目已经存在'));
      return;
    }

    const { downloadUrl } = templates[templateName];

    inquirer.prompt(questions).then(answer => {
      const spinner = ora('正在下载模板...');
      spinner.start();

      download(downloadUrl, projectName, {clone: true}, err => {
        if (err) {
          spinner.fail();
          console.log(symbols.error, chalk.red(err));
        } else {
          spinner.succeed();
          const meta = {
            name: projectName,
            author: answer.author,
            description: answer.description
          };
          const packagePath = `${projectName}/package.json`;
          const packageContent = fs.readFileSync(packagePath, 'utf8');
          const packageResult = handlebars.compile(packageContent)(meta);

          fs.writeFileSync(packagePath, packageResult);
          console.log(symbols.success, chalk.green('项目初始化完成'));
        }
      })
    })

  })


program
  .command('list')
  .alias('ls')
  .description('查看所有可用模板')
  .action(() => {
    Object.keys(templates).forEach((repo, i) => {
      console.log(
        '  ' + chalk.yellow('★') +
        '  ' + chalk.blue(repo) +
        ' - ' + templates[repo].description)
    })
  })


program
   .on('--help -h', function () {
        console.log('  Examples:');
        console.log('');
        console.log('    $ ailjc list ');
        console.log('    $ ailjc init wiki projectName');
        console.log();
});


program.parse(process.argv);  //解析命令行

if (program.args.length == 0) {
  program.help();
}