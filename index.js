var sentiment = require('sentiment');
var sentiword = require('sentiword'); 
var emotional = require("emotional");
var _ = require('lodash');
var async=require('async');
 


var sent={
    emotional: function (string,parsed,callback){

        emotional.load(function () {
          
          var obj= emotional.get(string);

          parsed={
            valence:obj.polarity+parsed.valence,
            subjectivity:obj.subjectivity+parsed.subjectivity,
            objectivity:parsed.objectivity
          }

          callback(null,string,parsed)  
          
        });   

    },
    sentiword: function (string,parsed,callback){
        var obj = sentiword(string);

        parsed={
            valence:(obj.avgSentiment)? obj.avgSentiment+parsed.sentiment : parsed.valence,
            subjectivity:parsed.subjectivity,
            objectivity:obj.objective+parsed.objectivity
        }

        callback(null,string,parsed) 
    }
    ,
    sentiment: function (string,parsed,callback){
        var obj = sentiment(string);

        parsed={
            valence:obj.comparative+parsed.valence,
            subjectivity:parsed.subjectivity,
            objectivity:parsed.objectivity
        }

        callback(null,string,parsed) 
    }

}


function parse(string,callback){

    var parsed={
        valence:0,
        subjectivity:0,
        objectivity:0
    };

    async.waterfall([
        //start waterfall
        function(callback){
            callback(null,string,parsed)
        },
       
        sent.emotional,
        sent.sentiword,
        sent.sentiment

    ],function (err,text, parsed) {
        // result now equals 'done'
        //use sentiment if greater than 1
        parsed.valence=(Math.abs(parsed.valence)> 0.5) ? _.round(parsed.valence,3) : 0;
        parsed.subjectivity=_.round(parsed.subjectivity,3);
        parsed.objectivity=_.round(parsed.objectivity,3);

        var obj={
            sentiment:{
                valence:parsed.valence
            },
            objectivity:{
                subjectivity:parsed.subjectivity,
                objectivity:parsed.objectivity
            }
        }

        if(parsed.valence===0){ obj.sentiment.polarity='neu'; }
        else if(parsed.valence>0){ obj.sentiment.polarity='pos'; }
        else{ obj.sentiment.polarity='neg'; }

        //
        callback(obj);        
    });

}

module.exports=parse;

/*
var strings=[
                "wtf are you doing over there Jill said, I hate Bill.",
                'Mary hoped her presentation would go well.',
                'Sentiment expressions are a type of subjective expression.  Specifically, they are expressions of positive and negative emotions, judgments, evaluations, and stances. In the examples above, "hate" is a negative sentiment expression and "hope" is a positive sentiment expression.',
                'I failed my exams and now I dont know what to do'
            ]

strings.forEach(function(string){

   parse(string,function(parsed){
        if(typeof string !=='string' || string.trim().length ==0 ){
            return ;
        }

        console.log(string)
        console.log(JSON.stringify(parsed,0,4))
    });
 
})

*/












