var tweeeeeeeeeet = (tweeeeeeeeeet === null || typeof tweeeeeeeeeet === 'undefined') ? {} : tweeeeeeeeeet;



tweeeeeeeeeet.createTweetAbbreviationObject = function (tweet, originalString, abbreviation, isSubstring) {
	
	var _tweet = tweet;
	var _originalString = originalString;
	var _abbreviation = abbreviation;
	var _isSubstring = isSubstring;
	
	var _startIndex = 0;
	var _match = null;

	function _capitalize(source) {
		return source.charAt(0).toUpperCase() + source.slice(1);
	}
	
	function _copyCase(from, to) {
		if (to !== to.toLowerCase()) {
			return to;
		}

		if (from === from.toLowerCase()) {
			return to.toLowerCase();
		}
		
		if (from === from.toUpperCase()) {
			return to.toUpperCase();
		}
		
		if (from === _capitalize(from)) {
			return _capitalize(to);
		}
		
		return to;
	}
	
	return {
		findNextMatch: function() {
			var startIndex = _startIndex;			
			var lowerSource = _tweet.toLowerCase();
			var lowerSearchString = _originalString.toLowerCase();

			var indexBegin;
			var indexEnd;
			var match;
			
			if (_originalString === null || typeof _originalString === 'undefined' || _originalString === '') {
				return false;
			}

			do {
				indexBegin = lowerSource.indexOf(lowerSearchString, startIndex);
				indexEnd = indexBegin + _originalString.length;
				
				var previousChar = ' ';
				if (indexBegin > 0) {
					previousChar = _tweet.charAt(indexBegin -1);
				}
				
				var successorChar = ' ';
				if (indexEnd < _tweet.length) {
					successorChar = _tweet.charAt(indexEnd);
				}
				
				if (_isSubstring === false && (!previousChar.match(/\W/) || !successorChar.match(/\W/))) {
					indexEnd = 0;
				}
				
				if (_isSubstring === true && previousChar.match(/\W/) && successorChar.match(/\W/)) {
					indexEnd = 0;
				}

				match = _tweet.substring(indexBegin, indexEnd);
				startIndex = indexBegin +1;
			} while (indexBegin >= 0 && indexEnd === 0);
			
			_match = {
				index: indexBegin,
				value: match
			};
			
			var found = (indexBegin >= 0);
			return found;
		},
		
		replaceMatch: function() {
			var head = _tweet.substring(0, _match.index);
			var tail = _tweet.substring(_match.index);
			tail = tail.replace(_match.value, _copyCase(_match.value, _abbreviation));
			
			_tweet = head + tail;
			_startIndex = _match.index + _abbreviation.length;
			
			return _tweet;
		}
	};
};



tweeeeeeeeeet.createTweetSizeObject = function (tweet, maxSize) {
		
	var _tweet = tweet;
	var _maxSize =  ( typeof maxSize !== 'undefined' ? maxSize : 0 );

	
	return {		
		lengthWithShortenedUrls: function() {
			var urlRegExp = /(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([\-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?/;
			var length = _tweet.length;
			var shortUrlsLength = 0;
			var tweet = _tweet;
			
			var match;
			for (match = tweet.match(urlRegExp); match; match = tweet.match(urlRegExp)) {							
				tweet = tweet.replace(urlRegExp, 'x');
				length = tweet.length;
				shortUrlsLength += 19;

				if (match[0].indexOf('s') > 0) {
					shortUrlsLength += 1;
				}						
			}
			
			return (length + shortUrlsLength);
		},
		
		fits: function() {					
			return this.lengthWithShortenedUrls() <= _maxSize;
		}		
		
	};
};


tweeeeeeeeeet.createTweeeeeeeeeetInterpreterObject = function () {
	var _tweet = '';
		
	return {
	
		shortenTweet: function(str) { _tweet = str; },

		replaceUntilFit: function(replaceMaps, length) {
			
			var i;
			for(i = 0; i < replaceMaps.length; ++i) {   

				var tweetSize = tweeeeeeeeeet.createTweetSizeObject(_tweet, length) ;
				if (tweetSize.fits()) {
					return _tweet;
				}
				
				var isSubStringReplace = replaceMaps[i][0];
				var replaceFrom = replaceMaps[i][1];
				var replaceTo = replaceMaps[i][2];

				var tweetAbbreviationObject = tweeeeeeeeeet.createTweetAbbreviationObject(_tweet, replaceFrom, replaceTo, isSubStringReplace);
				while (tweetAbbreviationObject.findNextMatch())  {					
					_tweet = tweetAbbreviationObject.replaceMatch();										
				}      
			}	

			return _tweet;		  
		}
	};
};


tweeeeeeeeeet.interpreter = tweeeeeeeeeet.createTweeeeeeeeeetInterpreterObject();

