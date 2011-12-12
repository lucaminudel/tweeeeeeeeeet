{
      var shortener = (function() {
     
				var tweet = '';
		
				function findMatchIgnoringCase(startIndex, source, searchString, subString) {
					var lowerSource = source.toLowerCase(source);
					var lowerSearchString = searchString.toLowerCase(searchString);

					var indexBegin;
					var indexEnd;
					var match;
					
					do {
						indexBegin = lowerSource.indexOf(lowerSearchString, startIndex);
						indexEnd = indexBegin + searchString.length;
						
						var previousChar = ' ';
						if (indexBegin > 0) {
							previousChar = source[indexBegin -1];
						}
						var successorChar = ' ';
						if (indexEnd < source.length) {
							successorChar = source[indexEnd];
						}
						
						if (subString === false && (!previousChar.match(/\W/) || !successorChar.match(/\W/))) {
							indexEnd = 0;
						}
						
						if (subString === true && previousChar.match(/\W/) && successorChar.match(/\W/)) {
							indexEnd = 0;
						}

						match = source.substring(indexBegin, indexEnd);
						startIndex = indexBegin +1;
					} while (indexBegin >= 0 && indexEnd === 0);
					
					return {
						index: indexBegin,
						value: match
					};
				}
				
				function replaceMatch(startIndex, source, value, replaceValue) {
					var head = source.substring(0, startIndex);
					var tail = source.substring(startIndex);
					tail = tail.replace(value, replaceValue);
					
					return head + tail;
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

				function tweetFits(tweet, length) {					
					return tweetWithShortenedUrlsLength(tweet) <= length;
				}
				
				return {
				
					shortenTweet: function(str) { tweet = str; },

					replaceUntilFit: function(replaceMaps, length) {

						if (tweetFits(tweet, length)) {
							return tweet;
						}

						var i;
						for(i = 0; i < replaceMaps.length; ++i) {   
							var subString = replaceMaps[i][0];
							var from = replaceMaps[i][1];
							var to = replaceMaps[i][2];
							var startIndex = 0;
							var match = findMatchIgnoringCase(startIndex, tweet, from, subString);
							while (match.index >= 0)  {
								
								tweet = replaceMatch(match.index, tweet, match.value, copyCase(match.value, to));
								if (tweetFits(tweet, length)) {
									return tweet;
								}
								
								startIndex = match.index + to.length;
								match = findMatchIgnoringCase(startIndex, tweet, from, subString);													
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

replaceUntilFitMethod = ws replaceUntilFitKeyword
                        ws length:integer
                        ws withAbbreviationsKeyword
                        ws arg:replaceArray
                        { return shortener.replaceUntilFit(arg, length); }

shortenTweetKeyword "shortenTweet:" = first:"shortenTweet" last:[:] { return first + last }

replaceUntilFitKeyword "replaceUntilFitTo:" = first:"replaceUntilFitTo" last:[:] { return first + last }

withAbbreviationsKeyword = first:"withAbbreviations" last:[:] { return first + last }

substringKeyword "substring:" = first:"substring" last:[:] { return first + last }

replaceArray = ws "(" ws replaceArray:replaceMap+ ws ")" { return replaceArray }

replaceMap "replace map: 'from' -> 'to'" = ws sub:substringKeyword?
             ws from:string
             ws "->"
             ws to:string
             { return [sub !== "", from, to] }

string "string" = ['] val:(("''" {return "'"} / [^'])*) ['] { return val.join('') }

integer "integer" = digits:[0-9]+ { return parseInt(digits.join(""), 10); }

ws  "space" = [ \t\v\f\u00A0\uFEFF\n\r\u2028\u2029]* { return '' }

/*
keyword = first:identifier last:[:] { return first + last }
identifier = first:[a-z] others:[a-zA-Z0-9]* {return first + others.join("")}
*/