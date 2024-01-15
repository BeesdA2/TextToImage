const Jimp = require('jimp') ;
 
var file =  process.argv[2];
var kenteken = process.argv[3];
var datumtijd = process.argv[4];
var naw1 = process.argv[5];
var naw2 = process.argv[6];
var naw3 = process.argv[7];

async function startTextToImage(file, kenteken, datumtijd, naw1, naw2, naw3) {
 try{
	 
 // New Image with text  
 let newImage = new Jimp(350, 90, 'orange', (err, image) => {
  if (err) throw err
})
  let newFile = kenteken +'-' + datumtijd + '.jpg'
  const font =  await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
   
   newImage.print(font, 10, 010, 'Kenteken: ' +kenteken + ' , ' + datumtijd)
   newImage.print(font, 10, 030, naw1);
   newImage.print(font, 10, 050, naw2);
   newImage.print(font, 10, 070, naw3);
  
    
   await newImage.write('../../../../../../Volvo/temp/' +newFile) // save
  
   
   
   // Reading image
   console.log('file: ' +file);
   const fir_img = await Jimp.read('../../../../../../Volvo/temp/' + file);
   //const fir_img = await Jimp.read('../../../../../../Volvo/temp/Elin duinen.jpg');
   var w = fir_img.bitmap.width; //  width of the image
    var h = fir_img.bitmap.height; // height of the image
   
    if (w >= 3000 && h >= 2000)
     {
      fir_img.scale( 0.25 );
     }
   
   
   
        const sec_img = await Jimp.read('../../../../../../Volvo/temp/' + newFile );
                    
        fir_img.blit(sec_img, 0, 0);
					//fir_img.write('../../../../../../Volvo/temp/' + file);
			 
			
 
   // Writing image after processing
     await fir_img.writeAsync('../../../../../../Volvo/temp/' + file);
   
 
 } catch (e) {
        console.log('startTextToImage error: '+e);
    } finally {
        console.log('TextToImage cleanup');
		return ({ message: 'TextToImage succesvol uitgevoerd'});
    }
}

startTextToImage(file, kenteken, datumtijd, naw1, naw2, naw3);
//console.log("Image is processed succesfully");

async function handleTextToImageNow(file, kenteken, datumtijd, naw1, naw2, naw3)
{
    try{	
	 
	//console.log('file: ' + file);
	//console.log('kenteken: ' + kenteken);
	//console.log('datumtijd: ' + datumtijd);
	//console.log('naw1: ' + naw1);
	//console.log('naw2: ' + naw2);
	//console.log('naw3:'  + naw3);
	
	
	var resolve = await startTextToImage(file, kenteken, datumtijd, naw1, naw2, naw3);
	 
	console.log("Image is processed succesfully");
	
	return (resolve);
    }
	catch(err) {console.error('handleTextToImageNow error' + err);}
	
}

async function handleResizeImage(file, maxsize) {
 try{
   const fs = require("fs"); //Load the filesystem module
   const stats = fs.statSync('../../../../../../Volvo/temp/' + file);
   const fileSizeInBytes = stats.size;	
   var fileSizeInKB = fileSizeInBytes / Math.pow(1024,1)
    
    //console.log('Size Image : ' + fileSizeInKB.toFixed(2) + ' kb');
    

// only scale if Size is bigger than MaxSize
if (fileSizeInKB > maxsize) {

   var scale = Number(maxsize / fileSizeInKB).toFixed(2);	 
   
   //console.log('Scale Image : ' + scale);
   
   // Reading image
   const image = await Jimp.read('../../../../../../Volvo/temp/' + file);

  // Scale to preferred size   
  // image.scale( Number(scale) );
  //   image.resize(Number(image.width * scale), image.AUTO);
  
  //console.log('Current width: ' + image.bitmap.width);
  //console.log('New width: ' + Math.round(image.bitmap.width * scale));
   
     image.resize(Math.round(image.bitmap.width * scale), Jimp.AUTO);

 // Writing image after processing
   await image.writeAsync('../../../../../../Volvo/temp/' + file);
}
else
{ 
 
// console.log('No resizing needed for file: ' + file); 

 }
 } catch (e) {
        console.error('handleResizeImage error: ' +e);
    } finally {
        console.log('ResizeImage cleanup');
		return ({ message: 'ResizeImage succesvol uitgevoerd'});
    }
}

module.exports = {
  handleTextToImageNow: handleTextToImageNow,
  handleResizeImage: handleResizeImage
  };     