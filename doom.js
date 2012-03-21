// Doom.js - Used to load a DOOM WAD
// sample WAD here: http://www.dosgamers.com/dos/dos-games/doom-heretic-hexen


var WAD = new Object();
WAD.file = "";
//var WAD.fileLoc = 0;
WAD.header = new Object();
WAD.lumps = new Array();
WAD.palette = new Array();
var imageData;

function LoadHeader()
{
console.log('Loading header');
WAD.header.identification = read4ByteCharacters(0);
WAD.header.numlumps = read4ByteNumber(4);
WAD.header.infotableofs = read4ByteNumber(8);



}

function LoadDirectory()
{

var directory = WAD.header.infotableofs;

	for (var i=0; i<WAD.header.numlumps; i++)
	{
	WAD.lumps[i] = new Object();
	WAD.lumps[i].filepos = read4ByteNumber(directory);
	WAD.lumps[i].size = read4ByteNumber(directory+4);
	WAD.lumps[i].name = read8ByteCharacters(directory+8);
	WAD.lumps[i].content = WAD.file.slice(WAD.lumps[i].filepos , WAD.lumps[i].filepos + WAD.lumps[i].size);
	directory = directory + 16;
	
	//WAD.lumps[i].content = window.atob(WAD.lumps[i].content);
	
	
	
	}


}

function parseWAD()
{

	for (var i=0; i<WAD.header.numlumps; i++)
	{
	
	switch (WAD.lumps[i].name)
	{
	case "PLAYPAL\0":
	// player palette
	parseGamePalette(i);
	break;
	
	case "COLORMAP":
	// color maps
	break;
	
	
	// text
	case "ENDOOM\0\0":
	case "ENDTEXT\0": //heretic
	// end text
	document.getElementById('endoom').innerHTML = parseEnDoom(i);
	break;
	//fullscreen images
	case "CREDIT\0\0":
	case "HELP1\0\0\0":
	case "HELP2\0\0\0":
	case "TITLEPIC":
	case "VICTORY2":
	case "PFUB1\0\0\0":
	case "PFUB2\0\0\0":
	
	addOptionToImageSelector(i, 'miscImageSelector');
	break;
	
	case "END0\0\0\0\0":
	case "END1\0\0\0\0":
	case "END2\0\0\0\0":
	case "END3\0\0\0\0":
	case "END4\0\0\0\0":
	case "END5\0\0\0\0":
	case "END6\0\0\0\0":
	
	case "AMMNUM0\0":
	case "AMMNUM1\0":
	case "AMMNUM2\0":
	case "AMMNUM3\0":
	case "AMMNUM4\0":
	case "AMMNUM5\0":
	case "AMMNUM6\0":
	case "AMMNUM7\0":
	case "AMMNUM8\0":
	case "AMMNUM9\0":
	
	
	
	case "STBAR\0\0\0":
	case "STCHAT\0\0":
	
	case "STWEAP0\0":
	case "STWEAP1\0":
	case "STWEAP2\0":
	case "STWEAP3\0":
	case "STWEAP4\0":
	case "STWEAP5\0":
	
	case "STFRAGS\0":
	
	
	case "STGNUM0\0":
	case "STGNUM1\0":
	case "STGNUM2\0":
	case "STGNUM3\0":
	case "STGNUM4\0":
	case "STGNUM5\0":
	case "STGNUM6\0":
	case "STGNUM7\0":
	case "STGNUM8\0":
	case "STGNUM9\0":
	
	case "STTNUM0\0":
	case "STTNUM1\0":
	case "STTNUM2\0":
	case "STTNUM3\0":
	case "STTNUM4\0":
	case "STTNUM5\0":
	case "STTNUM6\0":
	case "STTNUM7\0":
	case "STTNUM8\0":
	case "STTNUM9\0":
	
	
	
	
	case "STTMINUS":
	
	case "STDISK\0\0":
	case "STCDROM\0":
	case "STARMS\0\0":
	
	// doom guy face
	case "STFST00\0":
	case "STFST01\0":
	case "STFST02\0":
	case "STFST10\0":
	case "STFST11\0":
	case "STFST12\0":
	case "STFST20\0":
	case "STFST21\0":
	case "STFST22\0":
	case "STFST30\0":
	case "STFST31\0":
	case "STFST32\0":
	case "STFST40\0":
	case "STFST41\0":
	case "STFST42\0":
	
	case "STFGOD0\0":
	
	addOptionToImageSelector(i, 'uiImageSelector');
	break;
	
	// Enemy frames - pinky demon
	case "SARGA1\0\0":
	case "SARGA2A8":
	case "SARGA3A7":
	case "SARGA4A6":
	case "SARGA5\0\0":
	
	case "SARGB1\0\0":
	case "SARGB2B8":
	case "SARGB3B7":
	case "SARGB4B6":
	case "SARGB5\0\0":
	
	case "SARGC1\0\0":
	case "SARGC2C8":
	case "SARGC3C7":
	case "SARGC4C6":
	case "SARGC5\0\0":
	
	case "SARGD1\0\0":
	case "SARGD2D8":
	case "SARGD3D7":
	case "SARGD4D6":
	case "SARGD5\0\0":
	
	case "SARGE1\0\0":
	case "SARGE2\0\0":
	case "SARGE3\0\0":
	case "SARGE4\0\0":
	case "SARGE5\0\0":
	case "SARGE6\0\0":
	case "SARGE7\0\0":
	case "SARGE8\0\0":
	
	case "SARGF1\0\0":
	case "SARGF2\0\0":
	case "SARGF3\0\0":
	case "SARGF4\0\0":
	case "SARGF5\0\0":
	case "SARGF6\0\0":
	case "SARGF7\0\0":
	case "SARGF8\0\0":
	
	case "SARGG1\0\0":
	case "SARGG2\0\0":
	case "SARGG3\0\0":
	case "SARGG4\0\0":
	case "SARGG5\0\0":
	case "SARGG6\0\0":
	case "SARGG7\0\0":
	case "SARGG8\0\0":
	
	case "SARGH1\0\0":
	case "SARGH2\0\0":
	case "SARGH3\0\0":
	case "SARGH4\0\0":
	case "SARGH5\0\0":
	case "SARGH6\0\0":
	case "SARGH7\0\0":
	case "SARGH8\0\0":
	
	case "SARGI0\0\0":
	case "SARGJ0\0\0":
	case "SARGK0\0\0":
	case "SARGL0\0\0":
	case "SARGM0\0\0":
	case "SARGN0\0\0":
	
	// imp
	case "TROOA1\0\0":
	case "TROOA2A8":
	case "TROOA3A7":
	case "TROOA4A6":
	case "TROOA5\0\0":	
	
	
	addOptionToImageSelector(i, 'enemyImageSelector');
	break;
	
	
		//heretic images
	case "TITLE\0\0\0":
	case "LOADING\0":
	break;
	
	
	case "TEXTURE1":
	case "TEXTURE2":
	// textures
	break;
	
	case "DEMO1\0\0\0":
	case "DEMO2\0\0\0":
	case "DEMO3\0\0\0":
	break; 
	
	
	// level data
	case "THINGS\0\0":
	//things
	break;
	
	case "LINEDEFS":
	break;
	
	case "SIDEDEFS":
	break;
	
	case "VERTEXES":
	break;
	
	case "SEGS\0\0\0\0":
	break;
	
	case "SSECTORS":
	break;
	
	case "NODES\0\0\0":
	break;
	
	case "SECTORS\0":
	break;
	
	case "REJECT\0\0":
	break;
	
	case "BLOCKMAP":
	break;
	
	case "BEHAVIOR":
	break;
	
	
	//sound
	case "GENMIDI\0":
	break;
	
	case "DMXGUS\0\0":
	break;
	
	default:
	console.log(WAD.lumps[i].name);
	break;
	
	
	}
	
	
	}


}

function addOptionToImageSelector(i, element)
{

	var selector = document.getElementById(element);
	var option = document.createElement('option');
	var name = document.createTextNode(WAD.lumps[i].name);
	
	//console.log('adding option '+i+' '+name);
	option.setAttribute('value', i);
	option.appendChild(name);
	selector.appendChild(option);
}

function changeImage(evt)
{
//console.log(evt);

parseImage(evt.target.value);

}

function parseImage(i)
{
	console.log('Loading image');
	var canvas = document.getElementById('imageViewer');
	var ctx = canvas.getContext("2d");

	var image_data = WAD.lumps[i].content;

	var header_width = read2ByteNumberFromContent(i, 0);
	var header_height = read2ByteNumberFromContent(i,2);
	var header_left_offset = read2ByteNumberFromContent(i,4);
	var header_top_offset = read2ByteNumberFromContent(i,6);

	canvas.width = header_width;
	canvas.height = header_height;
	
	var post_offset = 8;
	
	
	ctx.fillStyle = 'black';
	ctx.fillRect(0,0,header_width,header_height);
	
	imageData = ctx.getImageData(0,0,header_width, header_height);
	//console.log(imageData);
	
	//create the columns array
	WAD.lumps[i].columns = new Array();
	
	// for each column, save a record
	
	for (var j=0; j<header_width; j++)
	{
		//console.log('.');
		WAD.lumps[i].columns[j] = new Object();
		WAD.lumps[i].columns[j].offset = read4ByteNumberFromContent(i, post_offset);
		post_offset = post_offset + 4;
		//WAD.lumps[i].columns[j].data = new Array();
	
	}
	
	
	// For each column in the image
	for (var j=0; j<header_width; j++)
	{
	
	// start looking for posts
	
		var column_complete = false;
		var image_offset = WAD.lumps[i].columns[j].offset;
	

		while(column_complete == false)
		{
		
			if (read1ByteNumberFromContent(i, image_offset) == 255)
			{
			//empty column... move to next column
				column_complete = true;
			}
			else
			{
				var row_start = read1ByteNumberFromContent(i, image_offset);
				var row_count = read1ByteNumberFromContent(i, image_offset + 1);
		
				image_offset = image_offset + 3; // row_start + count + not_drawn
		
				// start drawing
			
				for (var k=row_start; k<(row_start + row_count); k++)
				{
		
					var pal = read1ByteNumberFromContent(i, image_offset);
					//console.log(pal);
					setPixel(j, k, WAD.palette[pal].r, WAD.palette[pal].g, WAD.palette[pal].b, 255); 
		
					image_offset++;
		

			
				}
			// increment past the last not drawn byte
			image_offset++;
			}
		}
	}
	/* TODO: Delete if no longer needed - old code
	
	
	// For each column in the image
	
	for (var j=0; j<header_width; j++)
	{
	
		var row_start = read1ByteNumberFromContent(i, WAD.lumps[i].columns[j].offset);
		var row_count = read1ByteNumberFromContent(i, WAD.lumps[i].columns[j].offset + 1);
		
		var image_offset = WAD.lumps[i].columns[j].offset + 2;
		
		// temp fix to row issue
		//var k = row_start;
		//while (read1ByteNumberFromContent(i, image_offset) != 255)
		//{
		
	
		for (var k=row_start; k<row_count; k++)
		{
		
			var pal = read1ByteNumberFromContent(i, image_offset);
			//console.log(pal);
			setPixel(j, k, WAD.palette[pal].r, WAD.palette[pal].g, WAD.palette[pal].b, 255); 
		
			image_offset = image_offset + 1;
		//k++;

			
		}
		
		//console.log('finished first posts');
		
		// last one isnt drawn apparently....
		image_offset = image_offset + 2;
		
		
		//if (read1ByteNumberFromContent(i, image_offset) == 255)
		//{
		
		console.log(row_count+' '+header_height);
		if (row_count == header_height)
		{
		
		// finish column
		//console.log('column finished');
		}
		else
		{

		row_start = read1ByteNumberFromContent(i, image_offset);
		row_count = read1ByteNumberFromContent(i, image_offset + 1);
		image_offset = image_offset + 2;
		
		console.log('starting second post: '+row_start+' '+row_count);
		
		//console.log(row_start+' '+row_count+' '+image_offset+' '+read1ByteNumberFromContent(i, image_offset));
		
		for (var k=row_start; k<row_start + row_count; k++)
			{
				var pal = read1ByteNumberFromContent(i, image_offset);
				console.log(pal);
				setPixel(j, k, WAD.palette[pal].r, WAD.palette[pal].g, WAD.palette[pal].b, 255); 
			
				image_offset = image_offset + 1;

			}
		}
		
		
	}
	*/
		
	ctx.putImageData(imageData, 0,0);

	zoomImage();
	
}

function zoomImage()
{
	var canvas = document.getElementById('imageViewer');
	var ctx = canvas.getContext("2d");
	
	var intermediate = document.getElementById('intermediate');
	var ctx_i = intermediate.getContext("2d");
	
	var zoom = document.getElementById('zoom');
	
	
	intermediate.width = canvas.width * zoom.value;
	intermediate.height = canvas.height * zoom.value;
	ctx_i.drawImage(canvas, 0, 0, canvas.width * zoom.value, canvas.height * zoom.value);
	
	var finalImage = document.getElementById('finalImage');
	finalImage.width = intermediate.width;
	finalImage.height = intermediate.height;
	finalImage.src = intermediate.toDataURL('image/png');
	


}

function parseGamePalette(i)
{

var canvas = document.getElementById('playpal');
canvas.width = 256;
canvas.height = 256;

var ctx = canvas.getContext("2d");

var palettes = WAD.lumps[i].content;

var pal_i = 0;

for (var i=0; i<256; i++)
{
	ctx.fillStyle = 'rgb('+palettes.charCodeAt(pal_i)+','+palettes.charCodeAt(pal_i+1)+','+palettes.charCodeAt(pal_i + 2)+')';
	ctx.fillRect(Math.floor(i/16)*16,i%16*16, 16, 16);

	WAD.palette[i] = new Object();
	WAD.palette[i].r = palettes.charCodeAt(pal_i);
	WAD.palette[i].g = palettes.charCodeAt(pal_i+1);
	WAD.palette[i].b = palettes.charCodeAt(pal_i+2);
	
		pal_i = pal_i + 3;
}


}

function parseEnDoom(i)
{
	var source_text = "";
	var result_text = "";
	
	

		//if (WAD.lumps[i].name != "ENDOOM\0\0")
		//{
		//return 'fail';
		//}
		//else
		//{
			source_text = WAD.lumps[i].content;
		//}


	//console.log(source_text);

	for (var j=0; j<4000; j = j+2)
	{
	
	// forground color
	var f_color, b_color;
	
	switch (parseInt(source_text.charCodeAt(j+1)&0xF))
	{
	case 0:
	f_color = "#000000";
	break;
	case 1:
	f_color = "#0000AA";
	break;
	case 2:
	f_color = "#00AA00";
	break;
	case 3:
	f_color = "#00AAAA";
	break;
	case 4:
	f_color = "#AA0000";
	break;
	case 5:
	f_color = "#AA00AA";
	break;
	case 6:
	f_color = "#AA5500";
	break;
	case 7:
	f_color = "#AAAAAA";
	break;
	case 8:
	f_color = "#555555";
	break;
	case 9:
	f_color = "#5555FF";
	break;
	case 10:
	f_color = "#55FF55";
	break;
	case 11:
	f_color = "#55FFFF";
	break;
	case 12:
	f_color = "#FF5555";
	break;
	case 13:
	f_color = "#FF55FF";
	break;
	case 14:
	f_color = "#FFFF55";
	break;
	case 15:
	f_color = "#FFFFFF";
	break;
	}
	
	// background color
	switch ((source_text.charCodeAt(j+1)&0x70) >> 4)
	{
	case 0:
	b_color = "#000000";
	break;
	case 1:
	b_color = "#0000AA";
	break;
	case 2:
	b_color = "#00AA00";
	break;
	case 3:
	b_color = "#00AAAA";
	break;
	case 4:
	b_color = "#AA0000";
	break;
	case 5:
	b_color = "#AA00AA";
	break;
	case 6:
	b_color = "#AA5500";
	break;
	case 7:
	b_color = "#AAAAAA";
	break;
	case 8:
	b_color = "#555555";
	break;
	case 9:
	b_color = "#5555FF";
	break;
	case 10:
	b_color = "#55FF55";
	break;
	case 11:
	b_color = "#55FFFF";
	break;
	case 12:
	b_color = "#FF5555";
	break;
	case 13:
	b_color = "#FF55FF";
	break;
	case 14:
	b_color = "#FFFF55";
	break;
	case 15:
	b_color = "#FFFFFF";
	break;
	}	
	
	
	//console.log(source_text.charCodeAt(j+1)+" "+parseInt(source_text.charCodeAt(j+1)&0xF)+' '+parseInt(source_text.charCodeAt(j+1)&0x70));
	
		if (j%160 == 0)
	{
	result_text = result_text + "<br>";
	}
	
	var character = source_text[j];
	
	if (character == ' ')
	{
	character = '&nbsp;';
	}
	
	result_text = result_text + "<span style='color:"+f_color+"; background-color:"+b_color+";'>"+character+"</span>";
	
	

	
	//	result_text = result_text + source_text[j];
	
	
	
	}


return result_text;

}


function LoadFile(evt)
{
var reader = new FileReader();
reader.onerror = errorHandler;
reader.onload = completeHandler;
reader.readAsBinaryString(evt.target.files[0]);

}

function errorHandler(evt)
{
    switch(evt.target.error.code) {
      case evt.target.error.NOT_FOUND_ERR:
        alert('File Not Found!');
        break;
      case evt.target.error.NOT_READABLE_ERR:
        alert('File is not readable');
        break;
      case evt.target.error.ABORT_ERR:
        break; // noop
      default:
        alert('An error occurred reading this file.');
    };
}

function completeHandler(evt)
{


WAD.file = evt.target.result;

LoadHeader();
LoadDirectory();

parseWAD();

}

// Utility Functions

function read4ByteCharacters(location)
{
	var output = WAD.file.slice(location, location+4);

	return output;
}

function read8ByteCharacters(location)
{
	var output = WAD.file.slice(location, location+8);

	return output;
}

function read4ByteNumber(location)
{


	var output = WAD.file.charCodeAt(location)*(1) + WAD.file.charCodeAt(location+1)*(256) + WAD.file.charCodeAt(location+2)*(256*256) + WAD.file.charCodeAt(location+3)*(256*256*256);
	return output;
	
}


function read1ByteNumberFromContent(i, location)
{
	return WAD.lumps[i].content.charCodeAt(location);
}


function read2ByteNumberFromContent(i, location)
{
	return WAD.lumps[i].content.charCodeAt(location) + WAD.lumps[i].content.charCodeAt(location + 1)*(256);
}

function read4ByteNumberFromContent(i, location)
{
	return WAD.lumps[i].content.charCodeAt(location) + WAD.lumps[i].content.charCodeAt(location + 1)*(256) + WAD.lumps[i].content.charCodeAt(location + 2)*(256*256) + WAD.lumps[i].content.charCodeAt(location + 3)*(256*256*256);
}

function setPixel(x, y, r, g, b, a) {
    var index = (x + y * imageData.width) * 4;
    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a;
}


function findLump(name)
{
	for (var i=0; i<WAD.header.numlumps; i++)
	{
		if (WAD.lumps[i].name == name)
		{return i;}
	}

return -1;

}

function toggleVis(element)
{

document.getElementById('images').style.visibility= "hidden";
document.getElementById('maps').style.visibility= "hidden";
document.getElementById('sounds').style.visibility= "hidden";
document.getElementById('misc').style.visibility= "hidden";

document.getElementById(element).style.visibility= "visible";


}
