var frisby = require('frisby');

// These tests are for testing paymill create API
var serverDetails = {
"url": "https://api.paymill.com/v2.1/clients/",
"email":"test@test.com",


};
//Global setup which will be used for all the requests,,Please paste Basic \u003CYOUR-BASE64-ENCODED-PRIVATE-API-KEY-WITH-TRAILING-COLON\u003E

frisby.globalSetup({ 
  request: {
    headers: { 'Authorization': '\u003CYOUR-BASE64-ENCODED-PRIVATE-API-KEY-WITH-TRAILING-COLON\u003E' }
  }
});

frisby.create("Check whether the API returns a 200 when updating a client and the client details are properly updated.")
      .post(serverDetails.url,{
            email:'test@test.com',
            description:"Test Description"
      })
      .expectStatus(200)
      .afterJSON(function(response){
        frisby.create("")
        .put(serverDetails.url+response.data.id,{
        email:"test@1.com",
        description:"Updated Description"
      })
      .expectJSON('data',{
        email: "test@1.com",
        description:"Updated Description"
      })
      .expectStatus(200)
      
      .toss()
      
      
      })
    .afterJSON(function(response){
//Step3: This is the step where we cleanup the data.
      frisby.create("")
      .delete(serverDetails.url+response.data.id)
      .toss()
    })
.toss()

frisby.create("Check that update API returns 404 error when trying to update a non existing client")
      .post(serverDetails.url,{
            email:'test@test.com'
      })
      
      .afterJSON(function(response){
        frisby.create("")
        .delete(serverDetails.url+response.data.id)
      .expectStatus(200)
      
      .toss()
      
      
      })
    .afterJSON(function(response){
//Step3: This is the step where we cleanup the data.
      frisby.create("")
      
      .put(serverDetails.url+response.data.id,{
        email:"test@1.com"
      })
      .expectStatus(404)
      .toss()
    })
.toss()

frisby.create("Check that the API returns a 400 error when trying to update with invalid  email")
      .post(serverDetails.url,{
            email:'test@test.com'
      })
      
      .afterJSON(function(response){
        frisby.create("")
        .put(serverDetails.url+response.data.id,{
        email:"''"
      })
      .expectJSON({
    "error": {
        "messages": {
            "emailAddressInvalidFormat": "'''' is not a valid email address."
        },
        "field": "email"
    }
})
      .expectStatus(400)
      
      .toss()
      
      
      })
    .afterJSON(function(response){
//Step3: This is the step where we cleanup the data.
      frisby.create("")
      .delete(serverDetails.url+response.data.id)
      .toss()
    })
.toss()

frisby.create("create a dummy client")
      .post(serverDetails.url,{
            email:'test@test.com'
      })
      
      .afterJSON(function(response){
        frisby.create("Check that the API returns a 400 error when trying to update with invalid  parameter in this ")
        .put(serverDetails.url+response.data.id,{
        test:"Invalid API parameter"
      })
      .expectJSON({
        "exception": "Api_Exception_InvalidParameter",
        "error": "test"
        })
      .expectStatus(400)
      
      .toss()
      
      
      })
    .afterJSON(function(response){
//Step3: This is the step where we cleanup the data.
      frisby.create("")
      .delete(serverDetails.url+response.data.id)
      .toss()
    })
.toss()

frisby.create("Check that the API returns a 401 error when trying to update without Authentication.")
      .post(serverDetails.url,{
            email:'test@test.com'
      })
      
      .afterJSON(function(response){
        frisby.create("")
        .put(serverDetails.url+response.data.id,{
        description:"Invalid API parameter"
      })
      .addHeader('Authorization', '')
      
      .expectStatus(401)
      .expectJSON({"error":"Access Denied","exception":"InvalidAuthentication"
      })
      .toss()
      
      
      })
    .afterJSON(function(response){
//Step3: This is the step where we cleanup the data.
      frisby.create("")
      .delete(serverDetails.url+response.data.id)
      .toss()
    })
.toss() 

frisby.create("Check that the API returns a 400 error when trying to update with invalid  email")
      .post(serverDetails.url,{
            email:'test@test.com'
      })
      
      .afterJSON(function(response){
        frisby.create("")
        .put(serverDetails.url+response.data.id,{
        email:Number("foo")
      })
      .expectJSON({
    "error": {
        "messages": {
            "emailAddressInvalidFormat": "'NaN' is not a valid email address."
        },
        "field": "email"
    }
})
      .expectStatus(400)
      
      .toss()
      
      
      })
    .afterJSON(function(response){
//Step3: This is the step where we cleanup the data.
      frisby.create("")
      .delete(serverDetails.url+response.data.id)
      .toss()
    })
.toss() 



frisby.create("Create a dummy client")
      .post(serverDetails.url,{
            email:'test@test.com',
            
      })
      
      .afterJSON(function(response){
        frisby.create("Check whether the API returns a 412 error when calling the Update client method without passing the client id(which is mandatory)")
        .put(serverDetails.url,{
      })
      .expectJSON({
    "error": {
        "messages": {
            "required": "Parameter is mandatory"
        },
        "field": "Identifier"
    }
})
      .expectStatus(412)
      
      
      .toss()
      
      
      })
    .afterJSON(function(response){
//Step3: This is the step where we cleanup the data.
      frisby.create("Cleanup the data once the test has finished running.")
      .delete(serverDetails.url+response.data.id)
      .toss()
    })
.toss()



        

      
