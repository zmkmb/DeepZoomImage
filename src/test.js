const fs = require('fs');
const sharp = require('sharp');
const DEFAULT_TILE_SIZE = 512;
const OUTPUT_DIR = "output/";
const INPUT_DIR = "input/"
const OUTPUT_FILE_NAME = "output.zip";
const unzip = require('unzip');


fs.readFile(__dirname + '/' + INPUT_DIR + 'hind leg muscle1.jpg',function(err,imgData){
    toDzi(imgData);
})

function toDzi(imgData){
    let fileName = new Date().valueOf();
    sharp(__dirname + '/' + INPUT_DIR + 'hind leg muscle.jpg')
    .png()
    .tile({
        size: DEFAULT_TILE_SIZE
    })
    .toFile(__dirname + '/' + OUTPUT_DIR  + fileName + '.zip', function(err, info) {
        if(err){
            return console.log(err);
        }

        // fs.createReadStream(__dirname + '/'  + OUTPUT_DIR + fileName + '.zip')
        // .pipe(unzip.Extract({path:__dirname + '/' + 'output/dzi/' + fileName}))
        // .on('finish',function(){
        //     //删除压缩文件
        //     fs.unlink('./' + OUTPUT_DIR + fileName + '.zip', (err) => {
        //         if (err) console.log(err);
        //     });
        //     sharp(imgData).resize({width:300}).png().toFile(__dirname + '/' + 'output/dzi/' + fileName + '/' + fileName + '.png');
        // })
    });
}
