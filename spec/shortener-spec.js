/*jsl:import ../tweeeeeeeeeetParser.js */
/*jsl:import ../tweeeeeeeeeetInterpreter.js */

describe("Tweet Shortener", function() {

	it("Run-time environment info", function() {
		jasmine.log(navigator.userAgent); 
	});
	
	describe("TweetAbbreviation", function() {
	
		var target;
		var tweet, originalString, abbreviation, matchSubstring;
		
		describe("findNextMatch()", function() {
			
			beforeEach(function () {
			  originalString = 'with';
			  abbreviation = 'w/';
			});
			

			it("when the tweet is an empty string then return false", function() {
				tweet = '';
				var matchSubstring = false;
				target = tweeeeeeeeeet.createTweetAbbreviationObject(tweet, originalString, abbreviation, matchSubstring);
				
				var matchResult = target.findNextMatch();
				
				expect(matchResult).toBeFalsy();
			});	

			it("when the originalString is an empty string then return false", function() {
				tweet = ' anything here ';
				originalString = '';
				matchSubstring = false;
				target = tweeeeeeeeeet.createTweetAbbreviationObject(tweet, originalString, abbreviation, matchSubstring);
				
				var matchResult = target.findNextMatch();
				
				expect(matchResult).toBeFalsy();
			});	


			describe("when matchSubstring is false ", function() {
				
				var matchSubstring = false;

				it("does not match a substring", function() {
					tweet = 'or without you';
					target = tweeeeeeeeeet.createTweetAbbreviationObject(tweet, originalString, abbreviation, matchSubstring);
					
					var matchResult = target.findNextMatch();
					
					expect(matchResult).toBeFalsy();
				});	

				it("does match a complete string", function() {
					tweet = 'be with you';
					target = tweeeeeeeeeet.createTweetAbbreviationObject(tweet, originalString, abbreviation, matchSubstring);
					
					var matchResult = target.findNextMatch();
					
					expect(matchResult).toBeTruthy();
				});	
				
				it("does match a complete string at the beginning of the string", function() {
					tweet = 'with you';
					target = tweeeeeeeeeet.createTweetAbbreviationObject(tweet, originalString, abbreviation, matchSubstring);
					
					var matchResult = target.findNextMatch();
					
					expect(matchResult).toBeTruthy();
				});	

				it("does match a complete string at the end of the string", function() {
					tweet = 'be with';
					target = tweeeeeeeeeet.createTweetAbbreviationObject(tweet, originalString, abbreviation, matchSubstring);
					
					var matchResult = target.findNextMatch();
					
					expect(matchResult).toBeTruthy();
				});	

				it("does match also a sentence with two words", function() {
					originalString = 'for example';
					abbreviation = 'e.g.';
					tweet = 'for example I would say yes';
					target = tweeeeeeeeeet.createTweetAbbreviationObject(tweet, originalString, abbreviation, matchSubstring);
					
					var matchResult = target.findNextMatch();
					
					expect(matchResult).toBeTruthy();
				});					
				
			});
			
			
			describe("when matchSubstring is true ", function() {

			var matchSubstring = true;
					
				it("does not match a full string", function() {
					tweet = 'or with you';
					target = tweeeeeeeeeet.createTweetAbbreviationObject(tweet, originalString, abbreviation, matchSubstring);
					
					var matchResult = target.findNextMatch();
					
					expect(matchResult).toBeFalsy();
				});	

				it("does match a substring", function() {
					tweet = 'or without you';
					target = tweeeeeeeeeet.createTweetAbbreviationObject(tweet, originalString, abbreviation, matchSubstring);
					
					var matchResult = target.findNextMatch();
					
					expect(matchResult).toBeTruthy();
				});	
				
				it("does match a substring at the beginning of the string", function() {
					tweet = 'without you';
					target = tweeeeeeeeeet.createTweetAbbreviationObject(tweet, originalString, abbreviation, matchSubstring);
					
					var matchResult = target.findNextMatch();
					
					expect(matchResult).toBeTruthy();
				});	

				it("does match a substring at the end of the string", function() {
					tweet = 'go forthwith';
					target = tweeeeeeeeeet.createTweetAbbreviationObject(tweet, originalString, abbreviation, matchSubstring);
					
					var matchResult = target.findNextMatch();
					
					expect(matchResult).toBeTruthy();
				});	
				
			});
			
		});
	});

	describe("TweetSize", function() {
		
		var target;
		var tweet;
		
		describe("lengthWithShortenedUrls()", function() {
		
			it("when the tweet doesn't contains urls should return the original length of the tweet", function() {
				tweet = ' a tweet without urls.';
				target = tweeeeeeeeeet.createTweetSizeObject(tweet);
				
				var length = target.lengthWithShortenedUrls();
				
				expect(length).toEqual(tweet.length);
			});
			
			it("when the tweet contains 1 url should count 20 for the length of the url", function() {
				tweet = '0123456789 http://one-url-with-a-length-of-38.com 0123456789';
				target = tweeeeeeeeeet.createTweetSizeObject(tweet);

				var length = target.lengthWithShortenedUrls();
				
				expect(length).toEqual(22 + 20);
			});

			it("when the tweet contains 1 url should count 20 for the length of the url at the beginning of the tweet", function() {
				tweet = 'http://one-url-with-a-length-of-38.com 0123456789 0123456789';
				target = tweeeeeeeeeet.createTweetSizeObject(tweet);

				var length = target.lengthWithShortenedUrls();
				
				expect(length).toEqual(22 + 20);
			});

			it("when the tweet contains 1 url should count 20 for the length of the url at the end of the tweet", function() {
				tweet = '0123456789 0123456789 http://one-url-with-a-length-of-38.com';
				target = tweeeeeeeeeet.createTweetSizeObject(tweet);

				var length = target.lengthWithShortenedUrls();
				
				expect(length).toEqual(22 + 20);
			});

			it("when the tweet contains 2 url should count 20 for the length of each url", function() {
				tweet = '0123456789 http://one-url-with-a-length-of-38.com 0123456789 http://one-url-with-a-length-of-38.com 0123456789';
				target = tweeeeeeeeeet.createTweetSizeObject(tweet);

				var length = target.lengthWithShortenedUrls();
				
				expect(length).toEqual(34 + 20 + 20);
			});
			
			it("when the tweet contains 1 https url should count 21 for the length of the url", function() {
				tweet = '0123456789 https://one-url-with-a-length-of-39.com 0123456789';
				target = tweeeeeeeeeet.createTweetSizeObject(tweet);

				var length = target.lengthWithShortenedUrls();
				
				expect(length).toEqual(22 + 21);
			});
			
			it("when the tweet contains 1 url with a query string should count 20 for the length of the url", function() {
				tweet = '0123456789 http://www.neverworkintheory.org/Default.aspx?p=177 0123456789';
				target = tweeeeeeeeeet.createTweetSizeObject(tweet);

				var length = target.lengthWithShortenedUrls();
				
				expect(length).toEqual(22 + 20);
			});

		});

		describe("fits()", function() {
			
			var size;
			
			it("when tweet lenght is 10 and max size is 10 then return true", function() {
				tweet = '0123456789';
				size = 10;
				target = tweeeeeeeeeet.createTweetSizeObject(tweet, size);
				
				var fits = target.fits();
				
				expect(fits).toBeTruthy();
			});	
		
			it("when tweet lenght is 10 and max size is 9 then return false", function() {
				tweet = '0123456789';
				size = 9;
				target = tweeeeeeeeeet.createTweetSizeObject(tweet, size);
				
				var fits = target.fits();
				
				expect(fits).toBeFalsy();
			});	
			
			it("when tweet lenght after url shortening is 42 and max size is 42 then return true", function() {
				tweet = '0123456789 http://one-url-with-a-length-of-38.com 0123456789';
				size = 22 + 20;
				target = tweeeeeeeeeet.createTweetSizeObject(tweet, size);
				
				var fits = target.fits();
				
				expect(fits).toBeTruthy();
			});	
			
		});
		
	});
	
	describe("TweeeeeeeeeetInstructionsInterpreter", function() {
		var target;
		var tweet;
		var maxSize;
		var replaceMaps;
		var shortenedTweet;
		
		it("when the tweet already fit the max size should not change it", function() {
			replaceMaps = [ [false, '0123456789', '0-9'] ];
			maxSize = 10;
			tweet = '0123456789';
			target = tweeeeeeeeeet.createTweeeeeeeeeetInterpreterObject();
			
			target.shortenTweet(tweet);
			shortenedTweet = target.replaceUntilFit(replaceMaps, maxSize);
						
			expect(shortenedTweet).toEqual(tweet);
		});			

		it("when the tweet don't fit the max size should shorten it until it fit", function() {
			replaceMaps = [ [false, 'aa', 'a'], [false, 'bb', 'b'], [false, 'cc', 'c'] ];
			maxSize = 6;
			tweet = 'aa bb cc ';
			var tweetThatFits = 'a b c ';
			target = tweeeeeeeeeet.createTweeeeeeeeeetInterpreterObject();
			
			target.shortenTweet(tweet);
			shortenedTweet = target.replaceUntilFit(replaceMaps, maxSize);
						
			expect(shortenedTweet).toEqual(tweetThatFits);
		});			
		
		it("when the tweet don't fit the max size should apply the replacement maps starting with the first of the array and following in order", function() {
			replaceMaps = [ [false, 'aa', 'a'], [false, 'bb', 'b'], [false, 'cc', 'c'] ];
			maxSize = 7;
			tweet = 'aa bb cc ';
			var tweetThatFits = 'a b cc ';
			target = tweeeeeeeeeet.createTweeeeeeeeeetInterpreterObject();
			
			target.shortenTweet(tweet);
			shortenedTweet = target.replaceUntilFit(replaceMaps, maxSize);
						
			expect(shortenedTweet).toEqual(tweetThatFits);
		});			
		
		it("when the tweet don't fit the max size then a replacement map is applied for all the occurrences in the tweet even if the tweet would fit with few replacements", function() {
			replaceMaps = [ [false, 'aa', 'a'] ];
			maxSize = 8;
			tweet = 'aa aa aa ';
			var tweetThatFits = 'a a a ';
			target = tweeeeeeeeeet.createTweeeeeeeeeetInterpreterObject();
			
			target.shortenTweet(tweet);
			shortenedTweet = target.replaceUntilFit(replaceMaps, maxSize);
						
			expect(shortenedTweet).toEqual(tweetThatFits);
		});					
		
		it("when the shortened string in the replacement map is lower-case should preserve the case of the original string", function() {
			replaceMaps = [ [false, 'aaa', 'xx'] ];
			maxSize = 0;
			tweet = 'AAA Aaa aaa ';
			var tweetThatFits = 'XX Xx xx ';
			target = tweeeeeeeeeet.createTweeeeeeeeeetInterpreterObject();
			
			target.shortenTweet(tweet);
			shortenedTweet = target.replaceUntilFit(replaceMaps, maxSize);
						
			expect(shortenedTweet).toEqual(tweetThatFits);
		});
		
		it("when the shortened string in the replacement map is not lower-case should preserve the case of the shortened string", function() {
			replaceMaps = [ [false, 'aaa', 'Xx'], [false, 'bbb', 'yY'], [false, 'ccc', 'ZZ']  ];
			maxSize = 0;
			tweet = 'AAA Bbb ccc ';
			var tweetThatFits = 'Xx yY ZZ ';
			target = tweeeeeeeeeet.createTweeeeeeeeeetInterpreterObject();
			
			target.shortenTweet(tweet);
			shortenedTweet = target.replaceUntilFit(replaceMaps, maxSize);
						
			expect(shortenedTweet).toEqual(tweetThatFits);
		});
		
		it("when the replacement map specify a substring should replace substrings", function() {
			replaceMaps = [ [true, 'to', '2'] ];
			maxSize = 0;
			tweet = 'today tonight acclamatory';
			var tweetThatFits = '2day 2night acclama2ry';
			target = tweeeeeeeeeet.createTweeeeeeeeeetInterpreterObject();
			
			target.shortenTweet(tweet);
			shortenedTweet = target.replaceUntilFit(replaceMaps, maxSize);
						
			expect(shortenedTweet).toEqual(tweetThatFits);			
		});

		it("when the replacement map specify a full string and the tweet contains both a substring and then a complete string should replace the complete string", function() {
			replaceMaps = [ [false, 'to', '2'] ];
			maxSize = 0;
			tweet = 'today to me';
			var tweetThatFits = 'today 2 me';
			target = tweeeeeeeeeet.createTweeeeeeeeeetInterpreterObject();
			
			target.shortenTweet(tweet);
			shortenedTweet = target.replaceUntilFit(replaceMaps, maxSize);
						
			expect(shortenedTweet).toEqual(tweetThatFits);			
		});
		
	});
	
});

describe("Integration tests", function() {
	describe("Parser with interpreter", function() {	
		var program;
		var tweet;
		var shortenedTweet;
		
		it("when the program is valid should return the shortened tweet", function() {
			
			tweet = ' aaaa aa one ';			
			program = "shortenTweet: '" + tweet + "' " 
					+ "replaceUntilFitsInto: 1 "
					+ "withAbbreviations: ("
					+ "substring: 'aa' -> 'a' " 
					+ "'one' -> '1'"
					+ ")";
			
			shortenedTweet = parser.parse(program);
			
			expect(shortenedTweet).toEqual(' aa aa 1 ');
		});
		
		it("when the program is valid should throw and exception with error info", function() {
			
			tweet = ' aaaa aa one ';			
			program = "shortenTweet: '" + tweet + "' \n" 
					+ "replaceUntilRain: "
					+ "withAbbreviations: ("
					+ "substring: 'aa' -> 'a' " 
					+ "'one' -> '1'"
					+ ")";
			
			try {
				shortenedTweet = parser.parse(program);				
			}
			catch(e) {
				expect(e.line).toEqual(2);
				expect(e.column).toEqual(1);				
				expect(e.message).toBeGreaterThan('');
				return;
			}
			
			expect(false).toBeTruthy();
		});
		
	});
});

