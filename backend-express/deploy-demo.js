const fs = require('fs')
const tar = require('tar')
const {NodeSSH} = require('node-ssh')
const ssh = new NodeSSH()

/* global variables */
const host = '***'
const username = '***'
const password = '***'
const path = '***'

/* functions */
function formatDate(time, format = 'YY-MM-DD hh:mm:ss') {
  var date = new Date(time)

  var year = date.getFullYear(),
    month = date.getMonth() + 1, //月份是从0开始的
    day = date.getDate(),
    hour = date.getHours(),
    min = date.getMinutes(),
    sec = date.getSeconds()
  var preArr = Array.apply(null, Array(10)).map(function(elem, index) {
    return '0' + index
  }) ////开个长度为10的数组 格式为 00 01 02 03

  var newTime = format
    .replace(/YY/g, year)
    .replace(/MM/g, preArr[month] || month)
    .replace(/DD/g, preArr[day] || day)
    .replace(/hh/g, preArr[hour] || hour)
    .replace(/mm/g, preArr[min] || min)
    .replace(/ss/g, preArr[sec] || sec)

  return newTime
}

/* main flow */

/* 清理 */
fs.readdirSync('.', { withFileTypes: true })
  .filter(
    dirent =>
      dirent.isFile &&
      (dirent.name.endsWith('.tar') || dirent.name.endsWith('.tgz'))
  )
  .forEach(dirent => {
    fs.unlink(dirent.name, error => {
      if (error) {
        console.error(`Failed to cleanup ${dirent.name}:`, error)
        process.exit(1)
      } else {
        console.log(`Cleanup ${dirent.name} done.`)
      }
    })
  })

/* 打包 */
const dist = `mp-weixin-web-${formatDate(new Date(), 'YYMMDDhhmmss')}.tgz`

console.info('Preparing artifact ...')
tar
  .c(
    {
      gzip: true,
      file: dist
    },
    ['app','server.js','package.json']
  )
  .then(() => {
    console.log('Prepare artifact done.')
  })
  .catch(err => {
    console.error('Preparing artifact error: ', err)
    process.exit(1)
  })

/* 部署 */
ssh
  .connect({
    host,
    username,
    password,
    tryKeyboard: true,
    /*
    In some cases you have to enable keyboard-interactive user authentication.
    Otherwise you will get an All configured authentication methods failed error.
    For further information see: https://github.com/mscdex/ssh2/issues/604
  */
    onKeyboardInteractive: (
      name,
      instructions,
      instructionsLang,
      prompts,
      finish
    ) => {
      if (
        prompts.length > 0 &&
        prompts[0].prompt.toLowerCase().includes('password')
      ) {
        finish([password])
      }
    }
  })
  .then(() => {
    console.log(`Login server[${host}] succeed.`)
    console.log(`uploading ${dist} to ${host}:${path} ...`)
    return ssh.putFile(dist, `${path}${dist}`)
  })
  .then(() => {
    console.log(`upload done.`)
    console.log('updating current deployment ...')
    return ssh.execCommand(
      `tar -xvf ${dist} && yarn && pm2 restart server.js && rm -f *.tgz`,
      { cwd: path }
    )
  })
  .then(res => {
    if (res.stderr) throw new Error(res.stderr)
    fs.unlink(dist,err => {
      if(err){
        console.log('err',err)
      }
    })
    console.log('update current deployment done.')
    console.log(
      'visit "https://finance.ybdev.top." to check the update.'
    )
  })
  .catch(err => {
    console.error('Exception on deployment: ', err)
  })
  .finally(() => {
    ssh.dispose()
  })

