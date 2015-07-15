
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

Parse.Cloud.define('userWines', function(request, response) {
	var wines = new Parse.Query('Wine').descending('createdAt')
		results = wines.equalTo('createdBy', request.user)
	results.find({
    success: function(results) {
      response.success(results);
    },
    error: function() {
      response.error("movie lookup failed");
    }
  })
})