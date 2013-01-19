$(function(){
  $("#search").click(function(e){
	e.preventDefault();
 	var userkeyword = $('input#keyword').val();

	$.get("/tweets", 
		{keyword: userkeyword}, 
		function(data){
			$('div#content').text(JSON.stringify(data));
		},
		"json"
	);
  });
});
