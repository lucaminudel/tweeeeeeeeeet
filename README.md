# tweeeeeeeeeet

- download the latest version.
- extract the files.
- open the htlm page locally in your browser.
- type your tweet and click the button to shorten it.
- copy your shortened tweet and tweet it.

## notes
- you can change the Tweeeeeeeeeet instructions as much as you like, to save the changes you need to edit the html page and change the textarea.
- the syntax should be pretty intuitive.
- shortening instructions are evaluated following their order starting from the first one, until the tweet fit the 140 character limit.
- when the shortened string is not lower case, its case is preserved otherwise the original string case is used.

## implementation details
- PEG.js http://pegjs.majda.cz/ is used to create the parser of the Tweeeeeeeeeet instructions.
- this is still a pre-pre-alfa version.
- todo: add unit tests and JSLint, enable to save chages to the Tweeeeeeeeeet instructions locally with one click.