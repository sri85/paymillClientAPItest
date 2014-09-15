paymillClientAPItest
====================

This repository contains test suite to test Paymill Client API https://developers.paymill.com/en/reference/api-reference/#clients

Frameworks used: frisbyjs(http://frisbyjs.com/)  and  jasmine-node (https://github.com/mhevery/jasmine-node)

What do you need ?

1. Download and install nodejs .(http://nodejs.org/)
2. Install frisbyjs using the command `npm install -g frisby`
3. Install jasmine node using (npm install -g jasmine-node)

Before running the tests:(Configuration)

1. Download the repository onto your machine.

2. Please sign up for paymill account and get a private API,  append it with a trailing colon 
and encode it with BASE64. Go to individual test files and replace it as shown below 

frisby.globalSetup({ 
  request: {
    headers: { 'Authorization': 'Basic \u003CYOUR-BASE64-ENCODED-PRIVATE-API-KEY-WITH-TRAILING-COLON\u003E' }
  }
});


Running the tests

1. cd into the directory and navigate to cleanupscripts directory and run fcleanallscriptspec.js using the command jasmine-node fcleanallscriptspec.js(This is to make sure 
we have a clean instance before we run the tests)
3. cd into the directory and run jasmine-node .  to run the entire testsuite.
4. To run individual tests run  the command jasmine-node <testfilename> .

