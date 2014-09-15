var frisby = require('frisby');

// These tests are for testing paymill create API https://developers.paymill.com/en/reference/api-reference/index.html#create-client
var serverDetails = {
"url": "https://api.paymill.com/v2.1/clients/",
"email":"test@test.com",
"description":"Test Description",
"nullEmail":null,
"nullDescription":null,
"invalidEmailformat":"test@1.com,test@invalid.com",
"nonEnglishEmail":"伊昭傑@郵件.商務",
"nonEnglishDescription":"伊昭傑"


};

var undefinedEmail;
var undefinedDescription;



//Global setup which will be used for all the requests,,Please paste Basic \u003CYOUR-BASE64-ENCODED-PRIVATE-API-KEY-WITH-TRAILING-COLON\u003E

frisby.globalSetup({ 
  request: {
    headers: { 'Authorization': 'Basic \u003CYOUR-BASE64-ENCODED-PRIVATE-API-KEY-WITH-TRAILING-COLON\u003E' }
  }
});

frisby.create("Check whether it is possible to create client on passing valid email and description")
      .post(serverDetails.url,{
            email:serverDetails.email,
            description:serverDetails.description
      })
      .expectStatus(200)
      .expectHeaderContains('content-type','application/json')
      .afterJSON(function(response){
        expect(response.data.email).toEqual(serverDetails.email);
      })
      .afterJSON(function(response){
        frisby.create("Delete the created entry as a cleanup process")
               .delete(serverDetails.url+response.data.id)
               .toss()
      
      }).toss();
      
      
      
frisby.create("Check whether it is possible to create client on passing undefined as email and  description, expected result is that the client must be created")
       .post(serverDetails.url,{
            email:undefinedEmail,
            description:undefinedDescription
      })
      .expectStatus(200)
      .expectHeaderContains('content-type','application/json')
      .afterJSON(function(response){
        expect(response.data.email).toEqual(undefinedEmail);
      })
      .afterJSON(function(response){
        frisby.create("Delete the created entry as a cleanup process")
               .delete(serverDetails.url+response.data.id)
               .toss()
      
      }).toss();
      
      
frisby.create("Check whether the API will return 400 error when passing email as NaN")
       .post(serverDetails.url,{
            email:Number("foo")
            
      })
      .expectStatus(400)
      .expectHeaderContains('content-type','application/json')
      .expectJSON({
            "error": {
                "messages": {
                    "emailAddressInvalidFormat": "'NaN' is not a valid email address."
                },
                "field": "email"
            }
       }).toss();
      
      

      
frisby.create("Check whether the API will return 400 error when passing an invalid email")
       .post(serverDetails.url,{
            email:serverDetails.invalidEmailformat
      })
      .expectStatus(400)
      .expectHeaderContains('content-type','application/json')
      .expectJSON({
    "error": {
        "messages": {
            "emailAddressInvalidFormat": "'test@1.com,test@invalid.com' is not a valid email address."
        },
        "field": "email"
    }
}).toss();
      
      
      
frisby.create("Check whether it is possible to create client on passing valid in a language other than English(In this case Chinese)")
      .post(serverDetails.url,{
            email:serverDetails.nonEnglishEmail,
            description:serverDetails.nonEnglishDescription
      })
      .expectStatus(200)
      .afterJSON(function(response){
        expect(response.data.email).toEqual(serverDetails.nonEnglishEmail)
        expect(response.data.description).toEqual(serverDetails.nonEnglishDescription)
      })
      .afterJSON(function(response){
        frisby.create("Delete the created entry as a cleanup process")
               .delete(serverDetails.url+response.data.id)
               .toss()
      
      }).toss();
      
      
 frisby.create("Check that API returns a 400 error on passing invalid parameter(i.e passing EMAIL instaed of email) ")
      .post(serverDetails.url,{
            EMAIL:"test",
      })
      .expectStatus(400)
      .expectHeaderContains('content-type','application/json')
      .expectJSON({
                    "exception": "Api_Exception_InvalidParameter",
                     "error": "EMAIL"
      }).toss();
       
      
     
frisby.create("Check that API returns a 400 error on passing invalid parameter")
      .post(serverDetails.url,{
        email:""
      })
      .afterJSON(function(response){
        frisby.create("")
        .get(serverDetails.url+response.data.id)
        .expectJSON("data",{
        email:null
        })
        .toss()
      }).toss();
      


frisby.create("Check whether the API will return 400 error when passing email as quotes")
       .post(serverDetails.url,{
            email:'""'
      })
       .expectStatus(400)
      
      .expectJSON({
            "error": {
                        "messages": {
                                        "emailAddressInvalidFormat": "'\"\"' is not a valid email address."
                                    },
                        "field": "email"
                     }
      }).toss();
      
         

frisby.create("")
.post(serverDetails.url,{
            email:serverDetails.firstEmail,
            
      })
.addHeader("Authorization","")
.expectStatus(401)
.expectJSON({"error":"Access Denied","exception":"InvalidAuthentication"
      }).toss();
      
      
      


frisby.create("")
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