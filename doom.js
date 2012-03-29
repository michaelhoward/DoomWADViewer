// Doom.js - Used to load a DOOM WAD
// sample WAD here: http://www.dosgamers.com/dos/dos-games/doom-heretic-hexen


var WAD = new Object();
WAD.file = "";
//var WAD.fileLoc = 0;
WAD.header = new Object();
WAD.lumps = new Array();
WAD.palette = new Array();
var imageData;
WAD.textures = new Array();
WAD.pnames = new Array();
WAD.patches = new Array();
WAD.maps = new Array();


WAD.context = new webkitAudioContext();
//WAD.source = WAD.context.createBufferSource();


function LoadHeader()
{
	console.log('Loading WAD header:');
	WAD.header.identification = read4ByteCharacters(0);
	WAD.header.numlumps = read4ByteNumber(4);
	WAD.header.infotableofs = read4ByteNumber(8);
	console.log('Header complete');
}

function LoadDirectory()
{

	console.log('Loading Lump Directory');
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
	console.log('Lump Directory Complete');
}

function parseWAD()
{

	console.log('Parsing WAD lumps:');

	var flats = false;
	var patches = false;
	var sprites = false;
	var map = false;
	
	
	for (var i=0; i<WAD.header.numlumps; i++)
	{
	console.log('LUMP: '+i+' '+WAD.lumps[i].name);
	
		if (flats == true)
		{
		// we're parsing flats, if its the end flag, stop parsing flats
	
		if (WAD.lumps[i].name == 'F_END\0\0\0')
		{
			flats = false;	
		}
		
		else
		{
			addOptionToFlatSelector(i);
		}
	}
	else if (patches == true)
	{
	// we're parsing patches
	
		if (WAD.lumps[i].name == 'P_END\0\0\0')
		{
			patches = false;	
		}
		
		else
		{
			// now process the patch
	
			//ignore P1_START, P1_END, P2_START, P2_END
			
			// add all else
			addToPatchLibrary(i);
		}
	}
	
	else if (sprites == true)
	{
	// we're parsing sprites
	if (WAD.lumps[i].name == 'S_END\0\0\0')
		{
			sprites = false;	
		}
		
		else
		{
			// now process the patch
	
			//ignore P1_START, P1_END, P2_START, P2_END
			
			// add all else
			addOptionToImageSelector(i, 'enemyImageSelector');
		}
	
	}
	else
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
	case "AUTOPAGE":	
	
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
	
	
	case "STYSNUM0":
	case "STYSNUM1":
	case "STYSNUM2":
	case "STYSNUM3":
	case "STYSNUM4":
	case "STYSNUM5":
	case "STYSNUM6":
	case "STYSNUM7":
	case "STYSNUM8":
	case "STYSNUM9":
	
	
	case "STTMINUS":
	case "STTPRCNT":
	case "STKEYS0\0":
	case "STKEYS1\0":
	case "STKEYS2\0":
	case "STKEYS3\0":
	case "STKEYS4\0":
	case "STKEYS5\0":

	case "STCFN033":
	case "STCFN034":
	case "STCFN035":
	case "STCFN036":
	case "STCFN037":
	case "STCFN038":
	case "STCFN039":
	case "STCFN040":
	case "STCFN041":
	case "STCFN042":
	case "STCFN043":
	case "STCFN044":
	case "STCFN045":
	case "STCFN046":
	case "STCFN047":
	case "STCFN048":
	case "STCFN049":
	case "STCFN050":
	case "STCFN051":
	case "STCFN052":
	case "STCFN053":
	case "STCFN054":
	case "STCFN055":
	case "STCFN056":
	case "STCFN057":
	case "STCFN058":
	case "STCFN059":
	case "STCFN060":
	case "STCFN061":
	case "STCFN062":
	case "STCFN063":
	case "STCFN064":
	case "STCFN065":
	case "STCFN066":
	case "STCFN067":
	case "STCFN068":
	case "STCFN069":
	case "STCFN070":
	case "STCFN071":
	case "STCFN072":
	case "STCFN073":
	case "STCFN074":
	case "STCFN075":
	case "STCFN076":
	case "STCFN077":
	case "STCFN078":
	case "STCFN079":
	case "STCFN080":
	case "STCFN081":
	case "STCFN082":
	case "STCFN083":
	case "STCFN084":
	case "STCFN085":
	case "STCFN086":
	case "STCFN087":
	case "STCFN088":
	case "STCFN089":
	case "STCFN090":
	case "STCFN091":
	case "STCFN092":
	case "STCFN093":
	case "STCFN094":
	case "STCFN095":
	case "STCFN121":
	

	
	case "STDISK\0\0":
	case "STCDROM\0":
	case "STARMS\0\0":
	
	addOptionToImageSelector(i, 'uiImageSelector');
	break;
	 
	 case "S_START\0":
	 sprites = true;
	 break;
	
	
		//heretic images
	case "TITLE\0\0\0":
	case "LOADING\0":
	case "ORDER\0\0\0":
	
	break;
	
	
	case "TEXTURE1":
	case "TEXTURE2":
	// texture directories
	parseTextureDirectory(i);
	break;
	
	//flats - floor/ceiling textures
	case "F_START\0":
	// flat starts
	flats = true;
	break;
	
	case "P_START\0":
	patches = true;
	break;
	
	
	case "PNAMES\0\0":
	parsePNAMES(i);
	break;
	
	case "F_END\0\0\0":
	break;
	
	
	//demos
	case "DEMO1\0\0\0":
	case "DEMO2\0\0\0":
	case "DEMO3\0\0\0":
	break; 
	
	
	// level data
	
	case "E1M1\0\0\0\0":
	case "E1M2\0\0\0\0":
	case "E1M3\0\0\0\0":
	case "E1M4\0\0\0\0":
	case "E1M5\0\0\0\0":
	case "E1M6\0\0\0\0":
	case "E1M7\0\0\0\0":
	case "E1M8\0\0\0\0":
	case "E1M9\0\0\0\0":
	case "E2M1\0\0\0\0":
	case "E2M2\0\0\0\0":
	case "E2M3\0\0\0\0":
	case "E2M4\0\0\0\0":
	case "E2M5\0\0\0\0":
	case "E2M6\0\0\0\0":
	case "E2M7\0\0\0\0":
	case "E2M8\0\0\0\0":
	case "E2M9\0\0\0\0":
	case "E3M1\0\0\0\0":
	case "E3M2\0\0\0\0":
	case "E3M3\0\0\0\0":
	case "E3M4\0\0\0\0":
	case "E3M5\0\0\0\0":
	case "E3M6\0\0\0\0":
	case "E3M7\0\0\0\0":
	case "E3M8\0\0\0\0":
	case "E3M9\0\0\0\0":
	//console.log(i);
	addMap(i);
	
	
	break;
	case "THINGS\0\0":
	//things
	parseThings(i);
	break;
	
	case "LINEDEFS":
	 parseLineDefs(i);
	break;
	
	case "SIDEDEFS":
	break;
	
	case "VERTEXES":
	parseVertices(i);
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
	
	//sound data
	case "GENMIDI\0":
	break;
	
	case "DMXGUS\0\0":
	break;
	
	//heretic sfx - can't auto-load these like doom
	case "CHAT\0\0\0\0":
	case "ARTIUSE\0":
	case "GFRAG\0\0\0":
	case "GLDHIT\0\0":
	case "GNTFUL\0\0":
	case "GNTHIT\0\0":
	case "GNTPOW\0\0":
	case "GNTACT\0\0":
	case "GNTUSE\0\0":
	case "BOWSHT\0\0":
	case "HRNHIT\0\0":
	case "STFHIT\0\0":
	case "STFPOW\0\0":
	case "STFCRK\0\0":
	case "BLSSHT\0\0":
	case "BLSHIT\0\0":
	case "PHOHIT\0\0":
	case "IMPSIT\0\0":
	case "IMPAT1\0\0":
	case "IMPAT2\0\0":
	case "IMPDTH\0\0":
	case "IMPPAI\0\0":
	case "MUMSIT\0\0":
	case "MUMAT1\0\0":
	case "MUMAT2\0\0":
	case "MUMDTH\0\0":
	case "MUMPAI\0\0":
	case "KGTSIT\0\0":
	case "KGTATK\0\0":
	case "KGTAT2\0\0":
	case "KGTDTH\0\0":
	case "KGTPAI\0\0":
	case "WIZSIT\0\0":
	case "WIZATK\0\0":
	case "WIZDTH\0\0":
	case "WIZACT\0\0":
	case "WIZPAI\0\0":
	case "HEDSIT\0\0":
	case "HEDAT1\0\0":
	case "HEDAT2\0\0":
	case "HEDAT3\0\0":
	case "HEDDTH\0\0":
	case "HEDACT\0\0":
	case "HEDPAI\0\0":
	case "PLROOF\0\0":
	
	
	case "CHICPAI\0":
	addOptionToSFXSelector(i);
	break;
	
	default:
	
	if (WAD.lumps[i].name.slice(0,2) == "D_")
	{ // MUSIC
	
		break;
	
	}
	
	if (WAD.lumps[i].name.slice(0,4) == "MUS_")
	{ // MUSIC
	
		break;
	
	}
	
	
	
	if (WAD.lumps[i].name.slice(0,2) == "DS")
	{ // sfx
	addOptionToSFXSelector(i);
	break;
	
	}
	
	if (WAD.lumps[i].name.slice(0,2) == "DP")
	{ // sfx
	break;
	
	}
	
	if (WAD.lumps[i].name.slice(0,3) == "STF")
	{ // UI
	
	addOptionToImageSelector(i, 'uiImageSelector');
	
	break;
	
	}
	
		if (WAD.lumps[i].name.slice(0,2) == "M_")
	{ // UI
	
	addOptionToImageSelector(i, 'uiImageSelector');
	
	break;
	
	}
	
	
	
	console.log('Unknown Lump: '+WAD.lumps[i].name+' at '+i);
	addOptionToImageSelector(i, 'uiImageSelector');
	break;
	
	
			}
		}
	}
}


function addOptionToSFXSelector(i)
{
	
	var selector = document.getElementById('sfxSelector');
	var option = document.createElement('option');
	var name = document.createTextNode(WAD.lumps[i].name);
	
	option.setAttribute('value', i);
	option.appendChild(name);
	selector.appendChild(option);
	
}

function changeSFX(evt)
{
//console.log(evt);
	parseSFX(evt.target.value);
}


function parseSFX(i)
{
	var sfxOffset = 0;
	
	var start = read2ByteNumberFromContent(i, sfxOffset);
	sfxOffset = sfxOffset + 2;
	
	var sampleRate = read2ByteNumberFromContent(i, sfxOffset);
	sfxOffset = sfxOffset + 2;
	
	var samples = read2ByteNumberFromContent(i, sfxOffset);
	sfxOffset = sfxOffset + 2;
	
	var end = read2ByteNumberFromContent(i, sfxOffset);
	sfxOffset = sfxOffset + 2;
	
	console.log(start+' '+sampleRate+' '+samples+' '+end);
	
	WAD.buffer = WAD.context.createBuffer(1, samples, sampleRate*2);
	
	var buf = WAD.buffer.getChannelData(0);
	
	for (var j=0; j<samples*2; j = j+2)
	{
	var sample = read1ByteNumberFromContent(i, sfxOffset);
		buf[j] = sample/255;
		buf[j+1] = sample/255;
		//buf[j+2] = sample/255;
		//buf[j+3] = sample/255;
		
		sfxOffset++;
		
	}
	
	playSFX();
}

function playSFX()
{
	//console.log('playing current effect');
	
	WAD.source = WAD.context.createBufferSource(0);
	WAD.source.buffer = WAD.buffer;
	WAD.source.connect(WAD.context.destination);
	WAD.source.noteOn( WAD.context.currentTime);
	
	
}



function addMap(i)
{
	var map_num = WAD.maps.length;
	WAD.maps[map_num] = new Object();
	
	
	var selector = document.getElementById('mapSelector');
	var option = document.createElement('option');
	var name = document.createTextNode(WAD.lumps[i].name);
	
	option.setAttribute('value', map_num);
	option.appendChild(name);
	selector.appendChild(option);


	
}

function parseThings(i)
{
	var currentMap = WAD.maps.length - 1;
	
	WAD.maps[currentMap].things = new Array();
	
	var thingCount = WAD.lumps[i].content.length / 10;

	console.log('Parse Things for map: '+currentMap+' Thingcount: '+thingCount);
	var thingOffset =0;

	for (var j=0; j<thingCount; j++)
	{
		
	WAD.maps[currentMap].things[j] = new Object();
		WAD.maps[currentMap].things[j].xPos = read2ByteNumberFromContent(i, thingOffset);
		thingOffset = thingOffset + 2;
		
		if (WAD.maps[currentMap].things[j].xPos > 32767)
		{
		WAD.maps[currentMap].things[j].xPos = parseInt(WAD.maps[currentMap].things[j].xPos) - 65536;
		}
		
		
		
		WAD.maps[currentMap].things[j].yPos = read2ByteNumberFromContent(i, thingOffset);
		thingOffset = thingOffset + 2;
		
		if (WAD.maps[currentMap].things[j].yPos > 32767)
		{
		WAD.maps[currentMap].things[j].yPos = parseInt(WAD.maps[currentMap].things[j].yPos) - 65536;
		}
		
		
		WAD.maps[currentMap].things[j].angle = read2ByteNumberFromContent(i, thingOffset);
		thingOffset = thingOffset + 2;
		
		WAD.maps[currentMap].things[j].type = read2ByteNumberFromContent(i, thingOffset);
		thingOffset = thingOffset + 2;
		
		WAD.maps[currentMap].things[j].options = read2ByteNumberFromContent(i, thingOffset);
		thingOffset = thingOffset + 2;
		
		
		
		
		
	}

}


function parseVertices(i)
{

	

	var currentMap = WAD.maps.length - 1;
	WAD.maps[currentMap].vertices = new Array();
	var vertexCount = WAD.lumps[i].content.length / 4;
	var vertexOffset =0;

	console.log('Parse Vertices for map: '+currentMap+' Vertex Count: '+vertexCount+' Lump: '+i);
	



	for (var j=0; j<vertexCount; j++)
	{
		WAD.maps[currentMap].vertices[j] = new Object();
	
		WAD.maps[currentMap].vertices[j].xPos = read2ByteNumberFromContent(i, vertexOffset);
		
		if (WAD.maps[currentMap].vertices[j].xPos > 32767)
		{
		WAD.maps[currentMap].vertices[j].xPos = parseInt(WAD.maps[currentMap].vertices[j].xPos) - 65536;
		}
		
		vertexOffset = vertexOffset + 2;
	
		WAD.maps[currentMap].vertices[j].yPos = read2ByteNumberFromContent(i, vertexOffset);
		
		if (WAD.maps[currentMap].vertices[j].yPos > 32767)
		{
		WAD.maps[currentMap].vertices[j].yPos = parseInt(WAD.maps[currentMap].vertices[j].yPos) - 65536;
		}
		
		vertexOffset = vertexOffset + 2;
		
		
		if (j==0)
		{
		WAD.maps[currentMap].minX = 	WAD.maps[currentMap].vertices[j].xPos;
		WAD.maps[currentMap].maxX = 	WAD.maps[currentMap].vertices[j].xPos;
		
		WAD.maps[currentMap].minY = 	WAD.maps[currentMap].vertices[j].yPos;
		WAD.maps[currentMap].maxY = 	WAD.maps[currentMap].vertices[j].yPos;
		
		
		}
		else
		{
			if (WAD.maps[currentMap].vertices[j].xPos > WAD.maps[currentMap].maxX)
			{
				WAD.maps[currentMap].maxX = WAD.maps[currentMap].vertices[j].xPos;
		
			}
			
			if (WAD.maps[currentMap].vertices[j].xPos < WAD.maps[currentMap].minX)
			{
				WAD.maps[currentMap].minX = WAD.maps[currentMap].vertices[j].xPos;
		
			}
			if (WAD.maps[currentMap].vertices[j].yPos > WAD.maps[currentMap].maxY)
			{
				WAD.maps[currentMap].maxY = WAD.maps[currentMap].vertices[j].yPos;
		
			}
			
			if (WAD.maps[currentMap].vertices[j].yPos < WAD.maps[currentMap].minY)
			{
				WAD.maps[currentMap].minY= WAD.maps[currentMap].vertices[j].yPos;
		
			}			
			
		}
		
	}
}


function parseLineDefs(i)
{
	var currentMap = WAD.maps.length - 1;
	
	WAD.maps[currentMap].linedefs = new Array();
	
	var lineCount = WAD.lumps[i].content.length / 14;

	console.log('Parse Linedefs for map: '+currentMap+' Linecount: '+lineCount);
	var lineOffset =0;

	for (var j=0; j<lineCount; j++)
	{
		
		WAD.maps[currentMap].linedefs[j] = new Object();
		
		WAD.maps[currentMap].linedefs[j].startVertex = read2ByteNumberFromContent(i, lineOffset);
		lineOffset = lineOffset + 2;
		
		WAD.maps[currentMap].linedefs[j].endVertex = read2ByteNumberFromContent(i, lineOffset);
		lineOffset = lineOffset + 2;
		
		WAD.maps[currentMap].linedefs[j].flags = read2ByteNumberFromContent(i, lineOffset);
		lineOffset = lineOffset + 2;
		
		WAD.maps[currentMap].linedefs[j].type = read2ByteNumberFromContent(i, lineOffset);
		lineOffset = lineOffset + 2;
		
		WAD.maps[currentMap].linedefs[j].trigger = read2ByteNumberFromContent(i, lineOffset);
		lineOffset = lineOffset + 2;
		
		WAD.maps[currentMap].linedefs[j].rightSideDef = read2ByteNumberFromContent(i, lineOffset);
		lineOffset = lineOffset + 2;
		
		WAD.maps[currentMap].linedefs[j].leftSideDef = read2ByteNumberFromContent(i, lineOffset);
		lineOffset = lineOffset + 2;
		
	}


}


function changeMap(evt)
{
//console.log(evt);
	drawMap(evt.target.value);
}

function drawMap(i)
{
	var canvas = document.getElementById('mapViewer');

	canvas.width=WAD.maps[i].maxX - WAD.maps[i].minX;
	canvas.height=WAD.maps[i].maxY - WAD.maps[i].minY;
	
	
	//var mapDiv = 64;
	//canvas.width=1024;
	//canvas.height=1024;
	
	var ctx = canvas.getContext("2d");
	
	ctx.fillStyle = 'black';
	ctx.fillRect(0,0,canvas.width,canvas.height);
	
	
	var xOffset = 0 - WAD.maps[i].minX;
	var yOffset = 0 - WAD.maps[i].minY;
	
	
	//draw vertexes
	ctx.fillStyle = 'yellow';
	for (var j=0; j<WAD.maps[i].vertices.length; j++)
	{
	
	 WAD.maps[i].vertices[j].calcxPos = Math.floor(WAD.maps[i].vertices[j].xPos + xOffset);
	WAD.maps[i].vertices[j].calcyPos = Math.floor(WAD.maps[i].vertices[j].yPos + yOffset);
	
	
	//flip the map
	WAD.maps[i].vertices[j].calcyPos = canvas.height - WAD.maps[i].vertices[j].calcyPos;
	
	ctx.fillRect(WAD.maps[i].vertices[j].calcxPos-2, WAD.maps[i].vertices[j].calcyPos-2, 5, 5);
	
	}
	
	//draw linedefs
	
	for (var j=0; j<WAD.maps[i].linedefs.length; j++)
	{
		
		var start = WAD.maps[i].linedefs[j].startVertex;
		var end = WAD.maps[i].linedefs[j].endVertex;
		

		
	
		ctx.strokeStyle='red';
		
			//if two sided, draw in grey
		if ((WAD.maps[i].linedefs[j].flags & 0x4) == 0x4)
		{
			ctx.strokeStyle='grey';
		}
		
		
		//if secret, draw in blue
		if ((WAD.maps[i].linedefs[j].flags & 0x20) == 0x20)
		{
			ctx.strokeStyle='blue';
		}

		ctx.lineWidth=4;
		ctx.beginPath();
		ctx.moveTo( WAD.maps[i].vertices[start].calcxPos, WAD.maps[i].vertices[start].calcyPos);
		ctx.lineTo( WAD.maps[i].vertices[end].calcxPos, WAD.maps[i].vertices[end].calcyPos);
		ctx.stroke();
	
	}
	
	// draw the things
	
	for (var j=0; j<WAD.maps[i].things.length; j++)
	{
	
	
		switch(WAD.maps[i].things[j].type)
		{
		// player spawns
		case 1:
		case 2:
		case 3:
		case 4:
		case 11:
		case 14:
		ctx.fillStyle = 'white';
		break;
		
		
		//enemies
		case 3004:
		case 84:
		case 9:
		case 65:
		case 3001:
		case 3002:
		case 58:
		case 3006:
		case 3005:
		case 69:
		case 3003:
		case 68:
		case 71:
		case 66:
		case 67:
		case 64:
		case 7:
		case 16:
		case 88:
		case 89:
		case 87:
		ctx.fillStyle = 'purple';
		break;
		
		case 2005:
		case 2001:
		case 82:
		case 2002:
		case 2003:
		case 2004:
		case 2005:
		case 2006:
		ctx.fillStyle = 'lightyellow';
		
		break;
		
		
		case 2007:
		case 2008:
		case 2010:
		case 2047:
		case 2048:
		case 2049:
		case 2046:
		case 17:
		case 8:
		ctx.fillStyle = 'darkyellow';
		break;
		
		
		case 2011:
		case 2012:
		case 2014:
		case 2015:
		case 2018:
		case 2019:
		case 83:
		case 2013:
		case 2022:
		case 2023:
		case 2024:
		case 2025:
		case 2026:
		case 2045:
		case 5:
		case 40:
		case 13:
		case 38:
		case 6:
		case 39:
		ctx.fillStyle = 'orange';
		break;
		
		
		default:
		ctx.fillStyle = 'green';
		break;
		
		}
		
		WAD.maps[i].things[j].calcxPos = Math.floor(WAD.maps[i].things[j].xPos + xOffset);
		WAD.maps[i].things[j].calcyPos = Math.floor(WAD.maps[i].things[j].yPos + yOffset);
	
	
		//flip the y pos
		WAD.maps[i].things[j].calcyPos = canvas.height - WAD.maps[i].things[j].calcyPos;
	
		ctx.fillRect(WAD.maps[i].things[j].calcxPos-3, WAD.maps[i].things[j].calcyPos-3, 7, 7);
	
	}
	
zoomMap();
}

function zoomMap()
{
	var canvas = document.getElementById('mapViewer');
	var ctx = canvas.getContext("2d");
	
	var intermediate = document.getElementById('intermediateMap');
	var ctx_i = intermediate.getContext("2d");
	

	
	intermediate.width = canvas.width /4;
	intermediate.height = canvas.height /4;
	ctx_i.drawImage(canvas, 0, 0, canvas.width /4, canvas.height /4);
	
	var finalImage = document.getElementById('finalMap');
	finalImage.width = intermediate.width;
	finalImage.height = intermediate.height;
	finalImage.src = intermediate.toDataURL('image/png');


}


function changeFlat(evt)
{
//console.log(evt);

parseFlat(evt.target.value);

}

function changeTexture(evt)
{
//console.log(evt);
	parseTexture(evt.target.value);
}


function parseFlat(i)
{
	var canvas = document.getElementById('flatViewer');
	var ctx = canvas.getContext("2d");

	//var flat_data = WAD.lumps[i].content;
	var flat_offset = 0;
	
	canvas.width = 64;
	canvas.height = 64;
	
	ctx.fillStyle = 'black';
	ctx.fillRect(0,0,64,64);
	
	imageData = ctx.getImageData(0,0,64, 64);
	
	console.log('parsing flat '+i);
	
	for (var j=0; j<64; j++)
	{
		for (var k=0; k<64; k++)
		{
		var pal = read1ByteNumberFromContent(i, flat_offset);
		//console.log(j+' '+k+' '+flat_offset+' '+pal);
		setPixel(k, j, WAD.palette[pal].r, WAD.palette[pal].g, WAD.palette[pal].b, 255); 
		flat_offset++;
		
		
		}
	}
	
	ctx.putImageData(imageData, 0,0);

	tileFlat();
}

function tileFlat()
{
	var canvas = document.getElementById('flatViewer');
	var ctx = canvas.getContext("2d");
	
	var intermediate = document.getElementById('intermediateFlat');
	var ctx_i = intermediate.getContext("2d");
	
	var tiled = document.getElementById('finalFlats');
	
	
	intermediate.width = canvas.width * 4;
	intermediate.height = canvas.height * 4;
	
	
	for (var i=0; i<4; i++)
	{
		for (var j=0; j<4; j++)
		{
			ctx_i.drawImage(canvas, 0, 0, 64, 64, i*64, j*64, 64, 64);
		}
	}
	
	var finalFlat = document.getElementById('finalFlats');
	finalFlat.width = intermediate.width;
	finalFlat.height = intermediate.height;
	finalFlat.src = intermediate.toDataURL('image/png');
}


function addOptionToFlatSelector(i)
{
	var selector = document.getElementById('flatSelector');
	var option = document.createElement('option');
	var name = document.createTextNode(WAD.lumps[i].name);
	
	//console.log('adding option '+i+' '+name);
	option.setAttribute('value', i);
	option.appendChild(name);
	selector.appendChild(option);
	
	
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

function addOptionToTextureSelector(j)
{

	var selector = document.getElementById('textureSelector');
	var option = document.createElement('option');
	var name = document.createTextNode(WAD.textures[j].name);
	
	//console.log('adding option '+i+' '+name);
	option.setAttribute('value', j);
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
	console.log('Loading Image: '+i);
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
	
	//create the columns array
	WAD.lumps[i].columns = new Array();
	
	// for each column, save a record
	for (var j=0; j<header_width; j++)
	{
		WAD.lumps[i].columns[j] = new Object();
		WAD.lumps[i].columns[j].offset = read4ByteNumberFromContent(i, post_offset);
		post_offset = post_offset + 4;
	
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
	
	source_text = WAD.lumps[i].content;

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
	
	
	}


return result_text;

}





function addToPatchLibrary(i)
{
	WAD.patches[i] = new Object();
	WAD.patches[i].id = i;
}

function parsePNAMES(i)
{
	console.log('Parsing PNAMES');
	var pnameOffset = 0;
	
	var pnameCount = read4ByteNumberFromContent(i, pnameOffset);
	pnameOffset = pnameOffset + 4;

	for (var j=0; j<pnameCount; j++)
	{
		WAD.pnames[j] = new Object();
		WAD.pnames[j].name = read8ByteCharactersFromContent(i, pnameOffset);
		pnameOffset = pnameOffset + 8;
	}

	console.log('Parsing PNAMES complete');
}




function parseTexture(i)
{
	console.log('Parsing texture = '+i+' '+WAD.textures[i].name);
	
	var canvas = document.getElementById('textureViewer');
	var ctx = canvas.getContext("2d");
	
	canvas.width = WAD.textures[i].width;
	canvas.height = WAD.textures[i].height;
	
	imageData = ctx.getImageData(0,0,canvas.width, canvas.height);
	//console.log(imageData);
	
	
	for (var j=0; j<WAD.textures[i].patchCount; j++)
	{
	// for each patch, apply them to the canvas
	drawPatch(findLump(WAD.pnames[WAD.textures[i].patches[j].pNum].name),WAD.textures[i].patches[j].xOffset, WAD.textures[i].patches[j].yOffset );
	
	}


 	ctx.putImageData(imageData, 0,0);
	zoomTexture();
}


function zoomTexture()
{
	var canvas = document.getElementById('textureViewer');
	var ctx = canvas.getContext("2d");
	
	var intermediate = document.getElementById('intermediateTexture');
	var ctx_i = intermediate.getContext("2d");
	
	var zoom = document.getElementById('zoomTexture');
	
	
	intermediate.width = canvas.width * zoom.value;
	intermediate.height = canvas.height * zoom.value;
	ctx_i.drawImage(canvas, 0, 0, canvas.width * zoom.value, canvas.height * zoom.value);
	
	var finalImage = document.getElementById('finalTexture');
	finalImage.width = intermediate.width;
	finalImage.height = intermediate.height;
	finalImage.src = intermediate.toDataURL('image/png');
	


}

function drawPatch(i, xOffset, yOffset)
{
	
	if (i == -1)
	{
	console.log('Invalid Patch');
	return false;
	}

	var canvas = document.getElementById('textureViewer');
	var ctx = canvas.getContext("2d");

	var header_width = read2ByteNumberFromContent(i, 0);
	var header_height = read2ByteNumberFromContent(i,2);
	var header_left_offset = read2ByteNumberFromContent(i,4);
	var header_top_offset = read2ByteNumberFromContent(i,6);

	//canvas.width = header_width;
	//canvas.height = header_height;
	
	var post_offset = 8;
	
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
					setPixel(j+xOffset, k+yOffset, WAD.palette[pal].r, WAD.palette[pal].g, WAD.palette[pal].b, 255); 
		
					image_offset++;
				
				}
			// increment past the last not drawn byte
			image_offset++;
			}
		}
	}	
}



function parseTextureDirectory(i)
{
	console.log('Parsing Texture Directory - '+i);
	var textureDir = WAD.lumps[i];


	var textureOffset = 0;
	var numTextures = read4ByteNumberFromContent(i, textureOffset);
	
	textureOffset = textureOffset + 4;
	
	//texture directory
	for (var j=0; j<numTextures; j++)
	{
	WAD.textures[j] = new Object();
	WAD.textures[j].offset = read4ByteNumberFromContent(i, textureOffset);
	
	textureOffset= textureOffset + 4;
	
	}
	// texture definitions
	for (var j=0; j<numTextures; j++)
	{
		WAD.textures[j].name = read8ByteCharactersFromContent(i, textureOffset);
		textureOffset = textureOffset + 8;
		//console.log(WAD.textures[j].name);
	
		// there are 2x2 byte fields of 0 we should skip
		textureOffset = textureOffset + 4;
		
		WAD.textures[j].width = read2ByteNumberFromContent(i, textureOffset);
		textureOffset = textureOffset + 2;
		WAD.textures[j].height = read2ByteNumberFromContent(i, textureOffset);
		textureOffset = textureOffset + 2;
		
		// there are 2x2 byte fields of 0 we should skip
		textureOffset = textureOffset + 4;
		
		WAD.textures[j].patchCount = read2ByteNumberFromContent(i, textureOffset);
		textureOffset = textureOffset + 2;
		
		addOptionToTextureSelector(j);
		
		
		WAD.textures[j].patches = new Array();
		
		for (var k=0; k<WAD.textures[j].patchCount; k++)
		{
		
			WAD.textures[j].patches[k] = new Object();
			WAD.textures[j].patches[k].xOffset = read2ByteNumberFromContent(i, textureOffset);
			textureOffset = textureOffset + 2;
		
			WAD.textures[j].patches[k].yOffset = read2ByteNumberFromContent(i, textureOffset);
			textureOffset = textureOffset + 2;
		
			WAD.textures[j].patches[k].pNum = read2ByteNumberFromContent(i, textureOffset);
			textureOffset = textureOffset + 2;
			
			WAD.textures[j].patches[k].stepDir = read2ByteNumberFromContent(i, textureOffset);
			textureOffset = textureOffset + 2;
		
			WAD.textures[j].patches[k].colorMap = read2ByteNumberFromContent(i, textureOffset);
			textureOffset = textureOffset + 2;
		
		}	
	}

console.log('Parsing Texture Directory Complete');
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

function read8ByteCharactersFromContent(i,location)
{
	var output = WAD.lumps[i].content.slice(location, location+8);
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
document.getElementById('flats').style.visibility= "hidden";
document.getElementById('images').style.visibility= "hidden";
document.getElementById('maps').style.visibility= "hidden";
document.getElementById('sounds').style.visibility= "hidden";
document.getElementById('misc').style.visibility= "hidden";
document.getElementById('textures').style.visibility= "hidden";
document.getElementById(element).style.visibility= "visible";


}
