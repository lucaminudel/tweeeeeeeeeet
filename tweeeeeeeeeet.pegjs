{

   var shortener = function() {

            var tweet = '';

            return {
              shortenTweet: function(str) { tweet = str; },
              replaceUntilFit: function(replaceMaps) {
                for(var i = 0; i < replaceMaps.length; ++i) {
                   while(tweet.indexOf(replaceMaps[i][1])>= 0) {
                     tweet = tweet.replace(replaceMaps[i][1], replaceMaps[i][2]);
                   }
                }
                return tweet;
              }
            }
   }();
}

 

start = shortenTweetMethod result:replaceUntilFitMethod? { return result; }


shortenTweetMethod = ws key:shortenTweetKeyword
                     ws arg:string
                     { shortener.shortenTweet(arg); }

replaceUntilFitMethod = ws key:replaceUntilFitKeyword
                        ws arg: replaceArray
                        { return shortener.replaceUntilFit(arg); }

shortenTweetKeyword = first:"shortenTweet" last:[:] { return first + last }

replaceUntilFitKeyword = first:"replaceUntilFit" last:[:] { return first + last }

substringKeyword = first:"substring" last:[:] { return first + last }

replaceArray = ws "(" ws replaceArray:replaceMap+ ws ")" { return replaceArray }

replaceMap = ws sub:substringKeyword?
             ws from:string
             ws "->"
             ws to:string
             { return [sub !== "", from, to] }

string = ['] val:(("''" {return "'"} / [^'])*) ['] { return val.join('') }

ws = [ \t\v\f\u00A0\uFEFF\n\r\u2028\u2029]* { return '' }

/*
keyword = first:identifier last:[:] { return first + last }
identifier = first:[a-z] others:[a-zA-Z0-9]* {return first + others.join("")}
*/