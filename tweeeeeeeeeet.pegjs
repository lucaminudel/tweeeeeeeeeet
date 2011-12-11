{
      var shortener = (function() {
     
				var tweet = '';
		
				function findMatchIgnoringCase(source, searchString, subString) {
					var lowerSource = source.toLowerCase(source);
					var lowerSearchString = searchString.toLowerCase(searchString);
					var indexBegin = lowerSource.indexOf(lowerSearchString);
					var indexEnd = indexBegin + searchString.length;
					var match = source.substring(indexBegin, indexEnd);
					
					var previousChar = ' ';
					if (indexBegin > 0) {
						previousChar = source[indexBegin -1];
					}
					var successorChar = ' ';
					if (indexEnd < source.length) {
						successorChar = source[indexEnd];
					}
					
					if (subString === false && (!previousChar.match(/\s/) || !successorChar.match(/\s/))) {
						indexBegin = -1;
					}
					
					if (subString === true && previousChar.match(/\s/) && successorChar.match(/\s/)) {
						indexBegin = -1;
					}

					return {
						index: indexBegin,
						value: match
					};
				}
				
				function copyCase(from, to) {
					if (to !== to.toLowerCase()) {
						return to;
					}

					if (from === from.toLowerCase()) {
						return to.toLowerCase();
					}
					
					if (from === from.toUpperCase()) {
						return to.toUpperCase();
					}
					
					if (from === capitalize(from)) {
						return capitalize(to);
					}
					
					return to;
				}
				
				function capitalize(source) {
					return source.charAt(0).toUpperCase() + source.slice(1);
				}

				function tweetWithShortenedUrlsLength(tweet) {
					var urlRegExp = /(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([\-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?/;
					var length = tweet.length;
					var shortUrlsLength = 0;
					
					var match;
					for (match = tweet.match(urlRegExp); match; match = tweet.match(urlRegExp)) {							
						tweet = tweet.replace(urlRegExp, 'x');
						length = tweet.length;
						shortUrlsLength += 19;

						if (match.indexOf('s') > 0) {
							shortUrlsLength += 1;
						}						
					}
					
					return (length + shortUrlsLength);
				}

				function tweetFits(tweet) {					
					return tweetWithShortenedUrlsLength(tweet) <= 140;
				}
				
				return {
				
					shortenTweet: function(str) { tweet = str; },

					replaceUntilFit: function(replaceMaps) {

						var i;
						for(i = 0; i < replaceMaps.length; ++i) {   
							var subString = replaceMaps[i][0];
							var from = replaceMaps[i][1];
							var to = replaceMaps[i][2];
							var match = findMatchIgnoringCase(tweet, from, subString);
							while (match.index >= 0)  {						

								if (tweetFits(tweet)) {
									return tweet;
								}

								tweet = tweet.replace(match.value, copyCase(match.value, to));						
								match = findMatchIgnoringCase(tweet, from, subString);													
							}      
						}	
		  
						return tweet;
		  
					}
      
				};
      }());
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