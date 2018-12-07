#!/usr/bin/env node
'use strict'
 // 定义脚手架的文件路径
process.env.NODE_PATH = __dirname + '/../node_modules/';

const program = require('commander');

 // 定义当前版本
program
    .version(require('../package').version, '-v, --version');

// 定义使用方法
program
    .usage('<command>');

// 初始化
program
    .command('init <name>')
    .description('创建一个新项目')
    .alias('i')
    .action((name) => {
        require('../command/init')(name);
    });
// // 添加模板
// program
//     .command('add')
//     .description('创建一个新模板')
//     .alias('a')
//     .action(() => {
//         require('../command/add')();
//     });
// // 查看模板列表
// program
//     .command('list')
//     .description('查看模板列表')
//     .alias('l')
//     .action(() => {
//         require('../command/list')();
//     });
// // 删除模板
// program
//     .command('delete')
//     .description('删除一个模板')
//     .alias('l')
//     .action(() => {
//         require('../command/delete')();
//     });

program.parse(process.argv);

if(!program.args.length){
  program.help();
};