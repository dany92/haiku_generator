var fs = require('fs');
var cmudictFile = fs.readFileSync('./cmudict.txt');

function readCmudictFile(file){
	return fs.readFileSync(file).toString();
}

function formatData(data){    
   var lines = data.toString().split("\n");
   lines.forEach(function(line, index, arr){    
   	lineSplit = line.split("  ");
   	arr[index] = lineSplit;
  });
  return lines;   
}

function findSyllable(syl){
	var reg = /\d+\b/g;
	var count = (syl.match(reg))? syl.match(reg).length : 1;
	return count;
}

function buildDictionary(lines){
	var dict = {};
	lines.forEach(function(line){
		if(!(line[1] === undefined)){
			var numSyl = findSyllable(line[1]);
			if(dict[numSyl] === undefined){
				dict[numSyl] = [line[0]];
			}else{
				dict[numSyl].push(line[0]); 
			}
		}
	});
	return dict;
}

function buildHaiku(dic, structure){
	var haiku = "";
	var reg = /\(\d+\)/;
	var sylCount = 0;
	structure.forEach(function(limit){
		sylCount += limit;
		var pick = Math.floor(Math.random()*(dic[limit].length-1));
		//See if there is a number at the end of a word e.g. run(1) and get rid of it
		var test = dic[limit][pick].match(reg);
		var word = (test === null)? dic[limit][pick] : dic[limit][pick].substr(0, test.index);
		haiku = haiku + word + ((sylCount == 5 || sylCount == 12) ? "\n" : " ");
	});
	return haiku;
}

function createHaiku(structure){
	var lines = formatData(cmudictFile);
	var dictionary = buildDictionary(lines);
	var result = buildHaiku(dictionary, structure);
	console.log(result);
	return ""; // to prevent the console from printing out undefined
}

module.exports = {
	createHaiku: createHaiku,
}
