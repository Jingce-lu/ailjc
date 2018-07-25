var inquirer = require('inquirer');
const chalk = require('chalk')
var questions = [
  {
    type: 'checkbox',
    name: 'selection',
    message: 'select fruits',
    choices: [
      {
        name: 'apple'
      },
      {
        name: 'banana'
      },
      {
        name: 'melon'
      }
    ]
  },
  {
    type: 'input',    // input, confirm, list, rawlist, expand, checkbox, password, editor
    name: 'selection',     //可以在answer用这个值获取输入的值
    message: '这个页面是做什么的？',   //命令行中询问用户
    default: false,  //设置默认值，一般来说，会出现在选择中
  }
];

inquirer.prompt(questions, function(answers) {
    // console.log(chalk.yellow(answers.selection));
    console.log(chalk.green(answers));
    // console.log(chalk.green('123'))
})

console.log(chalk.red('123'))