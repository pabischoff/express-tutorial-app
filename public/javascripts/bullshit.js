var nano = require('nano')('http://localhost:5984');

var bullshit_db = nano.db.use('bullshit_db');
var bsphrase = "";


//list all database docs
module.exports = function generate(callback){
	//tests if the script has already run
	bullshit_db.list(extract); 

	//extract doc IDs from each doc and add to list
	function extract(err, body){
		var docids = [];	
		if (!err) {
		    body.rows.forEach(function(doc) {   		
				docids.push(doc.id);
	    	    });
	  	}
		verbnoun(docids);
	}

	//cycle through each doc according to doc id and add words to list by type
	function verbnoun(array){
		var verbs = [];
		var adjectives = [];
		var nouns = [];
		var examples = [];

		var responses = 0;

		// Schedule the calls
		for (var i = 0; i < array.length; i++) {

			bullshit_db.get(array[i], function(err, doc) {
				if (!err){
					if (doc.type == "verb"){
						verbs.push(doc.word);
					}
					else if (doc.type == "adjective"){
						adjectives.push(doc.word);
					}
					else if (doc.type == "noun"){
						nouns.push(doc.word);
					}
					else if (doc.type == "example"){
						examples.push(doc.word);
					}
				}
	
				if (++responses == array.length) {
					return callback(verbs, adjectives, nouns, examples);
			   	}
			});
		}
	}
}
/*
	//choose a random word from each list and concat them together
	function makebullshit(array1, array2, array3){
		var randverb = array1[Math.floor(Math.random() * array1.length)];
		var randadj = array2[Math.floor(Math.random() * array2.length)];
		var randnoun = array3[Math.floor(Math.random() * array3.length)];
		bsphrase = randverb.concat(" ",randadj," ",randnoun);
		return callback(bsphrase);
	}
}



*/




