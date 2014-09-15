var frisby = require('frisby');

// These tests are for testing paymill create API
var serverDetails = {
"url": "https://api.paymill.com/v2.1/clients/",
"firstTestemail":"test@1.com",


};
//Please paste your Basic \u003CYOUR-BASE64-ENCODED-PRIVATE-API-KEY-WITH-TRAILING-COLON\u003E below 
frisby.globalSetup({ 
  request: {
    headers: { 'Authorization': 'Basic \u003CYOUR-BASE64-ENCODED-PRIVATE-API-KEY-WITH-TRAILING-COLON\u003E' }
  }
});
frisby.create("This is a clean up operation")
        .get("https://api.paymill.com/v2.1/clients/")
        
        .afterJSON(function(response){
        var x =response.data_count;
        console.log(x)
        for(var i =0;i<x;i++){
            frisby.create("This is a clean up operation")
                    
                  .delete(serverDetails.url+response.data[i].id)
        .toss()
        }
        }).toss();
        
        
        
        
        


        