const fs = require('fs');
const request = require('request');
const Parallel= require('async-parallel')



const array=['https://doodleart.redbull.com/assets/managed/entries/processed/sm/367010617181759_36211000.jpg',
'https://www.justcolor.net/wp-content/uploads/sites/1/nggallery/doodle-art-doodling/coloring-page-adults-doodle-art-rachel.jpg',
'https://i.pinimg.com/originals/e5/55/a3/e555a39ca5457a079a9bcce59f61f8d5.jpg','https://i.pinimg.com/originals/ef/4c/91/ef4c91fb73e61e19211a0589187ccaa6.jpg',
'https://static.vecteezy.com/system/resources/previews/000/107/464/non_2x/huge-doodle-vector-pack.jpg','https://i.ytimg.com/vi/O5u1apUkYV0/maxresdefault.jpg',
'https://media.glassdoor.com/l/e9/c1/7a/84/independence-day-celebration.jpg'];

if (!fs.existsSync('folder0.zip')){
    fs.mkdirSync('folder0.zip');
}
let k=0;
let i=0;
(async function(){


    await Parallel.each(array, async item => {

        if((i+1)%5==0){
            k++;
            fs.mkdir('folder'+k+'.zip' , (err)=>{
                if(err)
                    console.log(err)
            })

        }




    imgPath=__dirname+'/folder'+k+'.zip/img'+(i++)+'.png'
    imageUrl=item
    const filePath=fs.createWriteStream(imgPath)
    await request(imageUrl).pipe(filePath);
    filePath.on('finish',(er) => {
            filePath.close();
            console.log(i,'Download Completed');

        })

});

}) ();
