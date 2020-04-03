const express = require('express')
const app = express()
const fs = require('fs')
const {exec} = require("child_process");
const OUTPUT_DIR = "output/dzi/";
let port = 3000;
console.log(__dirname)
app.use(express.static(__dirname));
app.get('/getList',function(req,res){
    let dirArr = fs.readdirSync(__dirname +'/'+ OUTPUT_DIR);
    if(dirArr.length){
        let list = [];
        let imgSrc = '';
        dirArr.forEach(function(fileName){
            var stat = fs.statSync(__dirname +'/'+ OUTPUT_DIR + fileName);
            if(stat.isDirectory()){
                imgSrc = '/' + OUTPUT_DIR + fileName + '/' + fileName +'.png'
            }
            list.push({imgSrc:imgSrc,dziPath: '/' + OUTPUT_DIR + fileName + '/'+ fileName + '/' + fileName + '.dzi'});
        })
        res.end(JSON.stringify(list));
    }
})

app.listen(port,function(err){
  if(err){
      console.log(err);
  }else{
      console.log('ok');
      let url = 'http://localhost:' + port + '/public/list.html'
      //打开浏览器
      switch (process.platform) {
          //mac系统使用 一下命令打开url在浏览器
          case "darwin":
              exec(`open ${url}`);
          //win系统使用 一下命令打开url在浏览器
          case "win32":
              exec(`start ${url}`);
              // 默认mac系统
          default:
              exec(`open ${url}`);
      }
  }
})