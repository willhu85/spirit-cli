'use strict'
const fs = require('fs');
const inquirer = require('inquirer');
const download = require('download-git-repo');
const handlebars = require('handlebars');
const ora = require('ora');
const chalk = require('chalk');
const symbols = require('log-symbols');

module.exports = (name) => {
    const spinner = ora('正在下载模板...');
    spinner.start();
    download(
        'https://github.com:willhu85@gmail.com/qrcode.git#master', // 仓库地址,注意端口号后面的 '/' 在参数中要写成 ':'
        name, // 路径，此处直接在当前路径下创建一个 name 的文件夹存放模板
        {clone: true},
        err => {
        if (err) {
          spinner.fail()
          console.log(symbols.error, chalk.red(err))
        } else {
          spinner.succeed()
          const fileName = `${name}/package.json`
          const meta = {
            name,
            description: answers.description,
            author: answers.author
          }
          if (fs.existsSync(fileName)) {
            const content = fs.readFileSync(fileName).toString()
            const result = handlebars.compile(content)(meta)
            fs.writeFileSync(fileName, result)
          }
          console.log(symbols.success, chalk.green('项目初始化完成'))
        }
        }
      )
    // if (!fs.existsSync(name)) {
    //     inquirer.prompt([
    //         {
    //             name: 'description',
    //             message: '请输入项目描述',
    //         },
    //         {
    //             name: 'author',
    //             message: '请输入作者名称',
    //         }
    //     ]).then((answers) => {
    //         const spinner = ora('正在下载模板...');
    //         spinner.start();
    //         download('https://github.com/willhu85/zxx.lib.css.git#master', name, {clone: true}, (err) => {
    //             if (err) {
    //                 spinner.fail();
    //                 console.log(symbols.error, chalk.red(err));
    //             } else {
    //                 spinner.succeed();
    //                 const fileName = `${name}/package.json`;
    //                 const meta = {
    //                     name,
    //                     description: answers.description,
    //                     author: answers.author,
    //                 }
    //                 if (fs.existsSync(fileName)) {
    //                     const content = fs.readFileSync(fileName).toString();
    //                     const result = handlebars.compile(content)(meta);
    //                     fs.writeFileSync(fileName, result);
    //                 }
    //                 console.log(symbols.success, chalk.green('项目初始化完成！'));
    //             }
    //         })
    //     })
    // } else {
    //     console.log(symbols.error, chalk.red('项目已存在！'))
    // }
}