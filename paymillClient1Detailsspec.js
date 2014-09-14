var frisby = require('frisby');

// Server Details
var serverDetails = {
"url": "https://api.paymill.com/v2.1/clients/",
"firstTestEmail":"test@1.com",
"secondTestEmail":"test@1.org",
"thirdTestEmail":"test@1.pl"



};
//Globalsetup which will be used for all the requests
frisby.globalSetup({ 
  request: {
    headers: { 'Authorization': 'Basic ZjlmYjkzZTYwOWQ0ZDhlNmRiMDRiZmQ0MDBiYjM2MTU6Og==' }
  }
});


      
//Test Data setup    
frisby.create("Creating test data for first test")
        .post(serverDetails.url,{
        email:serverDetails.firstTestEmail
        })
        .toss();
//Test Data setup
frisby.create("Creating test data for first test")
        .post(serverDetails.url,{
        email:serverDetails.secondTestEmail
        })
        .toss();
//Test Data setup        
frisby.create("Creating test data for first test")
        .post(serverDetails.url,{
        email:"test@1.pl"
        })
        .toss();
//Actual TEST        
frisby.create("Check whether API returns proper data on passing count and order parameters ")
                   .get(serverDetails.url+"?count=1&offset=0&order=email_asc")
                   .afterJSON(function(response){
                    expect(serverDetails.firstTestEmail).toEqual(response.data[0].email)
                   }).toss();

                   
 

        
frisby.create("Cleaning up data")
        .get("https://api.paymill.com/v2.1/clients/")
        
        .afterJSON(function(response){
        var x =response.data_count;
        console.log(x)
        for(var i =0;i<x;i++){
            frisby.create("")
                    
                  .delete(serverDetails.url+response.data[i].id)
        .toss()
        }
        }).toss();
        
        
frisby.create("Creating test data for the second test")
        .post(serverDetails.url,{
        email:serverDetails.firstTestEmail,
        description:'a'
        })
        .toss();
frisby.create("Creating test data for the second test")
        .post(serverDetails.url,{
        email:serverDetails.secondTestEmail,
        description:'b'
        })
        .toss();          
frisby.create("Creating test data for the second test")
        .post(serverDetails.url,{
        email:serverDetails.secondTestEmail,
        description:'c'
        })
        .toss();
        
frisby.create("Check the data returned on passing offset and order")
                   .get(serverDetails.url+"?offset=2&order=email_desc")
                   .afterJSON(function(response){
                    expect(serverDetails.secondTestEmail).toEqual(response.data[0].email)
                   })

                   .toss();
 

        
frisby.create("Cleaning up data ")
        .get("https://api.paymill.com/v2.1/clients/")
        
        .afterJSON(function(response){
        var x =response.data_count;
        console.log(x)
        for(var i =0;i<x;i++){
            frisby.create("")
                    
                  .delete(serverDetails.url+response.data[i].id)
        .toss()
        }
        }).toss();
        
frisby.create("Check whether the API returns 400 error on passing NaN for the offset parameter")
       .get(serverDetails.url+"?offset=NaN")
       .expectStatus(400)
       .expectJSON({
    "error": {
        "messages": {
            "notDigits": "'NaN' must contain only digits"
        },
        "field": "offset"
    }
})
.toss();

frisby.create("Check whether the API returns 400 error on passing an empty string for offset parameter")
       .get(serverDetails.url+"?offset=''")
       .expectStatus(400)
       .expectJSON({
    "error": {
        "messages": {
            "notDigits": "'''' must contain only digits"
        },
        "field": "offset"
    }
})
.toss(); 

frisby.create("Check whether the API throws 401 Error when trying to access the API without credentials.")
       .get(serverDetails.url+"?offset=")
       .addHeader("Authorization","")
       .expectStatus(401)
       .expectJSON({"error":"Access Denied","exception":"InvalidAuthentication"
      })
.toss();

frisby.create("")
.post(serverDetails.url,{
            email:serverDetails.firstTestemail,
            
      })
      
      .afterJSON(function(response){
 //STEP2: This is the step where we get the details of the client where which we had created in the previous state.
      frisby.create("Check whether get client details API returns a 200 when proper client details are passed ")
      .get(serverDetails.url+"?email="+serverDetails.firstTestemail)
      .expectStatus(200)
      .expectHeaderContains('content-type','application/json')
      .afterJSON(function(response){
        expect(response.data.email).toEqual(serverDetails.email);
      })
      
      .toss()
      })
      .afterJSON(function(response) {
        frisby.create("")
        .delete(serverDetails.url+response.data.id)
        .toss()
      
      })
      .toss() 
      
frisby.create("")
.post(serverDetails.url,{
            email:serverDetails.email,
            
      })
      
      .afterJSON(function(response){
 //STEP2: This is the step where we get the details of the client where which we had created in the previous state.
      frisby.create("Check whether get client details API returns a 200 when proper client details are passed ")
      .get(serverDetails.url+"?email='test@1.org'")
      .expectStatus(200)
      .expectHeaderContains('content-type','application/json')
      .expectJSON("data.*",{
        
        data_count:"0"
      })
      
      .toss()
      })
      .afterJSON(function(response) {
        frisby.create("")
        .delete(serverDetails.url+response.data.id)
        .toss()
      
      })
      .toss() 
      
frisby.create("")
.post(serverDetails.url,{
            email:serverDetails.firstTestEmail,
            
      })
.afterJSON(function(response){
 
frisby.create("")
       .post(serverDetails.url,{
         email:serverDetails.secondTestEmail
       
       })

})
      
      .afterJSON(function(response){
 //STEP2: This is the step where we get the details of the client where which we had created in the previous state.
      frisby.create("Check whether get client details API returns a 200 when proper client details are passed ")
      .get(serverDetails.url+"?email='test@1.org'")
      .expectStatus(200)
      .expectHeaderContains('content-type','application/json')
      .expectJSON("data.*",{
        
        data_count:"1"
      })
      
      .toss()
      })
      .afterJSON(function(response) {
        frisby.create("Clean up the data which was created")
        .delete(serverDetails.url+response.data.id)
        .delete(serverDetails.url+response.data.id)
        
        .toss()
      
      })
      .toss() 