# tweeeeeeeeeet

1. download the latest version
1. extract the files
1. open the htlm page locally in your browser
1. type your tweet and click the button to shorten it
1. copy your shortened tweet and tweet it

### notes
- you can change the Tweeeeeeeeeet instructions as much as you like, to save the changes you need to edit the html page and change the textarea
- the syntax should be pretty intuitive, if that was true I should not need to add the next two points
- shortening instructions are evaluated following their order starting from the first one, until the tweet fit the 140 character limit
- when the shortened string on the right is not lower case, its case is preserved otherwise the original string case (upper, lower or capital) is used instead

### implementation details
- PEG.js http://pegjs.majda.cz/ is used to create the parser of the Tweeeeeeeeeet instructions
- this is still a beta version, now you know
- todo: add automatic JSLint check script, add integration tests between parser and the interpreter, add a button to save chages to the Tweeeeeeeeeet instructions locally with one click.

### libraries used, thanks to
- http://pivotal.github.com/jasmine/ for the tests in the spec folder
- https://github.com/mojombo/clippy/ for the copy to clipboard flash library