var frisby = require('frisby');

// These tests are for testing paymill create API
var serverDetails = {
"url": "https://api.paymill.com/v2.1/clients/",
"firstTestemail":"test@1.com",


};

frisby.globalSetup({ 
  request: {
    headers: { 'Authorization': 'Basic ZjlmYjkzZTYwOWQ0ZDhlNmRiMDRiZmQ0MDBiYjM2MTU6Og==' }
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
        
        
        
        
        


        