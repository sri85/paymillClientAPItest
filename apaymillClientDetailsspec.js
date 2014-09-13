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


      
    
frisby.create("")
        .post(serverDetails.url,{
        email:"test@1.com"
        })
        .toss();

frisby.create("")
        .post(serverDetails.url,{
        email:"test@1.org"
        })
        .toss();
        
frisby.create("")
        .post(serverDetails.url,{
        email:"test@1.pl"
        })
        .toss();
        
frisby.create("")
                   .get(serverDetails.url+"?count=1&offset=0&order=email_asc")
                   .afterJSON(function(response){
                    expect("test@1.com").toEqual(response.data[0].email)
                   }).toss();

                   
 
frisby.create()
        .get("https://api.paymill.com/v2.1/clients/")
        .inspectJSON()
        .afterJSON(function(response){
            frisby.create("")
                  .delete(serverDetails.url+response.data[0].id)
        .toss()
        
        }).toss();

frisby.create()
        .get("https://api.paymill.com/v2.1/clients/")
        .afterJSON(function(response){
            frisby.create("")
                  .delete(serverDetails.url+response.data[1].id)
        .toss()
        
        }).toss();
        
frisby.create()
        .get("https://api.paymill.com/v2.1/clients/")
        .afterJSON(function(response){
            frisby.create("")
                  .delete(serverDetails.url+response.data[2].id)
        .toss()
        
        }).toss();
        
        
frisby.create("")
        .post(serverDetails.url,{
        email:"test@1.com",
        description:'a'
        })
        .toss();
frisby.create("")
        .post(serverDetails.url,{
        email:"test@1.org",
        description:'b'
        })
        .toss();          
frisby.create("")
        .post(serverDetails.url,{
        email:"test@1.pl",
        description:'c'
        })
        .toss();
        
frisby.create("")
                   .get(serverDetails.url+"?offset=2&order=email_desc")
                   .afterJSON(function(response){
                    expect("test@1.org").toEqual(response.data[0].email)
                   })

                   .toss();
 
 frisby.create()
        .get("https://api.paymill.com/v2.1/clients/")
        .inspectJSON()
        .afterJSON(function(response){
            frisby.create("")
                  .delete(serverDetails.url+response.data[0].id)
        .toss()
        
        }).toss();

frisby.create()
        .get("https://api.paymill.com/v2.1/clients/")
        .afterJSON(function(response){
            frisby.create("")
                  .delete(serverDetails.url+response.data[1].id)
        .toss()
        
        }).toss();
        
frisby.create()
        .get("https://api.paymill.com/v2.1/clients/")
        .afterJSON(function(response){
            frisby.create("")
                  .delete(serverDetails.url+response.data[2].id)
        .toss()
        
        }).toss();
frisby.create()
        .get("https://api.paymill.com/v2.1/clients/")
        .afterJSON(function(response){
            frisby.create("")
                  .delete(serverDetails.url+response.data[3].id)
        .toss()
        
        }).toss();
        
frisby.create()
        .get("https://api.paymill.com/v2.1/clients/")
        .afterJSON(function(response){
            frisby.create("")
                  .delete(serverDetails.url+response.data[4].id)
        .toss()
        
        }).toss();
        
frisby.create()
        .get("https://api.paymill.com/v2.1/clients/")
        .afterJSON(function(response){
            frisby.create("")
                  .delete(serverDetails.url+response.data[5].id)
        .toss()
        
        }).toss();
        
frisby.create("")
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

frisby.create("")
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
            email:serverDetails.email,
            
      })
.afterJSON(function(response){
 
frisby.create("")
       .post(serverDetails.url,{
         email:"test@pl.pl"
       
       })

})
      
      .afterJSON(function(response){
 //STEP2: This is the step where we get the details of the client where which we had created in the previous state.
      frisby.create("Check whether get client details API returns a 200 when proper client details are passed ")
      .get(serverDetails.url+"?email='test@pl.pl'")
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