$(function(){
  $("#search").click(function(e){
	e.preventDefault();
 	var userkeyword = $('input#keyword').val();

	$.get("/tweets", 
		{ keyword: userkeyword }, 
		function(data){
			var contentDiv = $('div#content')
			contentDiv.empty();
			var tweetArray = data.tweets;
			for(var idx in tweetArray) {
				contentDiv.append("<div class='result-tweet'>" + tweetArray[idx] + "</div>");
			}
		},
		"json"
	);
  })
});


