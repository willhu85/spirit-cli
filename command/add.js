'use strict'
const co = require('co');
const prompt = require('co-prompt');
const config = require('../templates.json');
const chalk = require('chalk');
const fs = require('fs');

module.export = () => {
    co(function *() {
        // 接收参数
        let tplName = yield prompt('模板名称:');
        let gitUrl = yield prompt('Git https link:');
        let branch = yield prompt("Branch:");
    })

    // 去重
    if (!config.tpl[tplName]) {
        config.tpl[tplName] = {};
        // 过滤 unicode字符
        config.tpl[tplName]['url'] = gitUrl.replace(/[\u0000-\u0019]/g, '');
        config.tpl[tplName]['branch'] = branch;
    } else {
        console.log(chalk.red('模板已经存在了'));
        process.exit();
    }

    // 模板信息注入 templates.json
    fs.writeFile(
        __dirname + '/../templates.json',
        JSON.stringify(config), 'utf-8',
        (err) => {
            if (err) {
                console.log(err);
            }
            console.log(chalk.green('新模板添加成功！\n'));
            console.log(chalk.grey('最新模板列表: \n'));
            console.log(config);
            console.log('\n')
            process.exit()
        }
    )
}