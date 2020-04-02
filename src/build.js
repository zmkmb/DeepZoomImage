const fs = require('fs');
const sharp = require('sharp');
const DEFAULT_TILE_SIZE = 512;
const OUTPUT_DIR = "output/";
const INPUT_DIR = "input/"
const OUTPUT_FILE_NAME = "output.zip";
const unzip = require('unzip');

let imgArr = fs.readdirSync(INPUT_DIR);

//console.log(imgArr);
//process.exit();
//Convert buffered Image to DZI -------
for(let i=0;i<imgArr.length;i++){
    toDzi(__dirname + '/' + INPUT_DIR + imgArr[i],imgArr[i]);
}

function toDzi(imgData,imgName){
    let fileName = new Date().valueOf();
    console.time();
    sharp(imgData,{limitInputPixels: Math.pow(0x5FFF, 2)})
    .png()
    .tile({
        size: DEFAULT_TILE_SIZE
    })
    .toFile(__dirname + '/' + OUTPUT_DIR  + fileName + '.zip', function(err, info) {
        if(err){
            return console.log(err);
        }

        fs.createReadStream(__dirname + '/'  + OUTPUT_DIR + fileName + '.zip')
        .pipe(unzip.Extract({path:__dirname + '/' + 'output/dzi/' + fileName}))
        .on('finish',function(){
            //删除压缩文件
            fs.unlink('./' + OUTPUT_DIR + fileName + '.zip', (err) => {
                if (err) console.log(err);
            });
            sharp(imgData).resize({width:300}).png().toFile(__dirname + '/' + 'output/dzi/' + fileName + '/' + fileName + '.png',function(err, info){
                console.log(imgName + ' is ok!');
                console.timeEnd('times:')
            });
        })
    });
}
