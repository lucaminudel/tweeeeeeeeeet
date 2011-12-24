start = shortenTweetMethod result:replaceUntilFitMethod? { return result; }


shortenTweetMethod = ws key:shortenTweetKeyword
                     ws arg:string
                     { tweeeeeeeeeet.shortener.shortenTweet(arg); }

replaceUntilFitMethod = ws replaceUntilFitKeyword
                        ws length:integer
                        ws withAbbreviationsKeyword
                        ws arg:replaceArray
                        { return tweeeeeeeeeet.shortener.replaceUntilFit(arg, length); }

shortenTweetKeyword "shortenTweet:" = first:"shortenTweet" last:[:] { return first + last }

replaceUntilFitKeyword "replaceUntilFitsInto:" = first:"replaceUntilFitsInto" last:[:] { return first + last }

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