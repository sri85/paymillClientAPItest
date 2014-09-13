var frisby = require('frisby');

// Tests for get Client details api, 
var serverDetails = {
"url": "https://api.paymill.com/v2.1/clients/",
"email":"test@test.com",
"description":"Test description",
"invalidClientId":"client_2f3d3b5c967d567ce",
"badUrl":"https://api.paymill.com/v2.3/clients/"

};



//This set global setup which is used in all the requests 

frisby.globalSetup({ 
  request: {
    headers: { 'Authorization': 'Basic ZjlmYjkzZTYwOWQ0ZDhlNmRiMDRiZmQ0MDBiYjM2MTU6Og==' }
  }
});


//STEP1: We create a post request , this is to set the data up so that we can get() this in the later step.
frisby.create("")
.post(serverDetails.url,{
            email:serverDetails.email,
            
      })
      .afterJSON(function(response){
 //STEP2: This is the step where we get the details of the client where which we had created in the previous state.
      frisby.create("Check whether get client details API returns a 200 when proper client details are passed ")
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
      })
      .toss();
      
      
frisby.create("Check whether get client details API returns a 404(Not Found Error) when invalid client details are passed ")
      .get(serverDetails.url+serverDetails.invalidClientId)
      .expectStatus(404)
      .toss();
      
frisby.create("Check whether get client details API returns a 401(Not Found Error) when the authorization headers are not passed ")
      .get(serverDetails.url+serverDetails.clientId)
      .addHeader('Authorization', '')
      .expectStatus(401)
      .toss();


      
//STEP1: We create a post request , this is to set the data up so that we can get() this in the later step.
frisby.create("Create a dummy client")
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
      })
      .toss();
      
frisby.create("Check whether get client details API returns a 401(Not Found Error) when the authorization headers are not passed ")
      .get(serverDetails.url+serverDetails.clientId)
      .addHeader('Authorization', '')
      .expectStatus(401)
      .toss();
