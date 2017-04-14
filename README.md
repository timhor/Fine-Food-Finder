# Fine-Food-Finder
[SENG2011 Project](https://webcms3.cse.unsw.edu.au/SENG2011/17s1/resources/6277)

## Formatting commit messages
- To keep commit messages consistent, use:
  1. Present tense
  2. Sentence case (only capitalise first letter of first word)
- Example: `git commit -m "Update foo() function"`

## How to run the web-app
- Run `grunt serve` for preview
- Run `json-server --watch app\database.json` to start a JSON server which simulates a REST API
- Note: both commands need to be running simultaneously

## Development & testing
- Run `grunt` for building
- Run `grunt test` to run the unit tests with karma
- Generated with [yo angular generator](https://github.com/yeoman/generator-angular) version 0.16.0