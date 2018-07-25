#!/usr/bin/env node
let readline = require('readline');
let chalk = require('chalk');
let calculator = readline.createInterface(process.stdin, process.stdout);

let first, second;
console.log(process.argv.slice(1));
calculator.question('what the first number is? \t', function(firstInput) {
    first = firstInput;
    calculator.question('what the second number is? \t', function(secondInput) {
        second = secondInput;
        console.log(chalk.green(first + second));
        calculator.close();
    });
});
