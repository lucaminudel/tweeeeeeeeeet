describe("Tweet Shortener", function() {
		
	describe("TweetAbbreviation", function() {
	
		var target;
		var tweet, originalString, abbreviation, matchSubstring;

		describe("factory", function() {
			it("when the originalString is an empty string then throw an exception", function() {
				tweet = ' anything here ';
				originalString = '';
				abbreviation = ' anything here ';
				matchSubstring = false;
				
				var expectedException = new RangeError('originalString must be a non empty string.');
				var action = function() { tweeeeeeeeeet.createTweetAbbreviationObject(tweet, originalString, abbreviation, matchSubstring); };
				
				expect(action).toThrow(expectedException);
			});	
		});	
		
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
	});
	
	describe("TweeeeeeeeeetInstructionsInterpreter", function() {
	});
	
});