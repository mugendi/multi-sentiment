
var sentiment= require('./index.js')

var strings=[
                "wtf are you doing over there Jill said, I hate Bill.",
                'Mary hoped her presentation would go well.',
                'Sentiment expressions are a type of subjective expression.  Specifically, they are expressions of positive and negative emotions, judgments, evaluations, and stances. In the examples above, "hate" is a negative sentiment expression and "hope" is a positive sentiment expression.',
                'I failed my exams and now I dont know what to do',
                'Is there any sane Kenyan who would knowingly or Unknowingly vote for Kalonzo Musyoka or Moses Wetangula as President??',
                'Yes and there is no offence in that',
                'fuck that bitch'
            ]

strings.forEach(function(string){

   sentiment(string,function(parsed){
        if(typeof string !=='string' || string.trim().length ==0 ){
            return ;
        }

        console.log(string)
        console.log(JSON.stringify(parsed,0,4))
    });
 
})
