if (!fs.existsSync(name)) {
    const answers = await promptHandler(name)
    const spinner = ora('正在下载模板...')
    spinner.start()
    download(
      'http://192.168.2.27:10080:web/Vue-Template#dev', // 仓库地址,注意端口号后面的 '/' 在参数中要写成 ':'
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
  } else {
    // 错误提示项目已存在，避免覆盖原有项目
    console.log(symbols.error, chalk.red('项目已存在'))
  }

