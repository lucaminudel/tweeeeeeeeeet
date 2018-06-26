# tweeeeeeeeeet
try it [on-line] (http://www.luca.minudel.it/tweeeeeeeeeet/) or:

1. download the [latest version] (https://github.com/lucaminudel/tweeeeeeeeeet/downloads)
1. extract the files
1. open the htlm page locally in your browser
1. type your tweet and click the button to shorten it
1. copy your shortened tweet and tweet it

### usage notes
- you can change the Tweeeeeeeeeet instructions as much as you like, to save the changes you need to edit the html page and change the textarea
- the syntax should be pretty intuitive, if that was true I should not need to add the next two points
- shortening instructions are evaluated following their order starting from the first one, until the tweet fit the 140 character limit
- when the shortened string on the right is not lower case, its case is preserved otherwise the original string case (upper, lower or capital) is used instead

### implementation notes
- this is still a beta version, send your feedback [here] (https://github.com/lucaminudel/tweeeeeeeeeet/issues) and [here] (https://twitter.com/lukadotnet)
- when the user edit and then save the  Tweeeeeeeeeet instructions, a copy of the changed instructions are stored in the server
- todo: add automatic JSLint check script.

### libraries used, thanks to
- http://pegjs.majda.cz/ PEG.js used to create the parser of the Tweeeeeeeeeet instructions
- https://jasmine.github.io/ for the tests in the spec folder
- https://github.com/mojombo/clippy/ for the copy to clipboard flash library
- http://www.jslint.com/ for the check of the JavaScript code quality
