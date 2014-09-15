var frisby = require('frisby');

// Tests for get Client details api, https://developers.paymill.com/en/reference/api-reference/index.html#client-details
var serverDetails = {
"url": "https://api.paymill.com/v2.1/clients/",
"email":"test@test.com",
"description":"Test description",
"invalidClientId":"client_2f3d3b5c967d567ce",
"badUrl":"https://api.paymill.com/v2.3/clients/"

};



 //Global setup which will be used for all the requests,,Please paste Basic \u003CYOUR-BASE64-ENCODED-PRIVATE-API-KEY-WITH-TRAILING-COLON\u003E

frisby.globalSetup({ 
  request: {
    headers: { 'Authorization': '\u003CYOUR-BASE64-ENCODED-PRIVATE-API-KEY-WITH-TRAILING-COLON\u003E' }
  }
});


//STEP1: We create a post request , this is to set the data up so that we can get() this in the later step.
frisby.create("")
.post(serverDetails.url,{
            email:serverDetails.email,
            
      })
      .afterJSON(function(response){
 //STEP2: This is the step where we get the details of the client where which we had created in the previous state.
      frisby.create("Check whether get client details API returns a 200 when proper client details are passed and also the data type returned")
      .get(serverDetails.url+response.data.id)
      .expectStatus(200)
      .expectHeaderContains('content-type','application/json')
      .expectJSONTypes('data',{
            id:String,
            email:String,
            description:null,
            created_at:Number,
            updated_at:Number,
            payment:Object,
            subscription:null
      })
      .toss()
      })
      .afterJSON(function(response){
//Step3: This is the step where we cleanup the data.
      frisby.create("")
      .delete(serverDetails.url+response.data.id)
      .toss()
      }).toss();
      
      
      
frisby.create("Check whether get client details API returns a 404(Not Found Error) when invalid client details are passed ")
      .get(serverDetails.url+serverDetails.invalidClientId)
      .expectStatus(404)
      .expectJSON({
    "exception": "client_not_found",
    "error": "Client not found"
}).toss();
      
      
frisby.create("Check whether get client details API returns a 401(UnAuthorized Error) when the authorization headers are not passed ")
      .get(serverDetails.url+serverDetails.clientId)
      .addHeader('Authorization', '')
      .expectStatus(401)
      .expectJSON({"error":"Access Denied","exception":"InvalidAuthentication"
      }).toss();
      


      
//STEP1: We create a post request , this is to set the data up so that we can get() this in the later step.
frisby.create("Create the test data")
.post(serverDetails.url,{
            email:serverDetails.email,
            description:serverDetails.description
      })
      .afterJSON(function(response){
 //STEP2: This is the step where we get the details of the client where which we had created in the previous state.
      frisby.create("Check whether get client details API returns a 200 when proper client details are passed ")
      .get(serverDetails.url+response.data.id)
      .expectJSON('data',{
            id:response.data.id,
            email:response.data.email,
            description:response.data.description,
            updated_at:response.data.updated_at,
            created_at:response.data.created_at
      })
      .toss()
      })
      .afterJSON(function(response){
//Step3: This is the step where we cleanup the data.
      frisby.create("")
      .delete(serverDetails.url+response.data.id)
      .toss()
      }).toss();
      
      
