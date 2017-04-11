function click(e) {
	if (e.target.id == 'byUpvote'){	
		chrome.tabs.executeScript(null,
			{file:"upvotes.js"});
	} else if (e.target.id == 'byComment'){
		chrome.tabs.executeScript(null,
			{file:"comments.js"});		
	} else if (e.target.id=='byView'){
		chrome.tabs.executeScript(null,
			{file:"views.js"});
	}
	window.close();
}
document.addEventListener('DOMContentLoaded', function () {
	var buttons = document.querySelectorAll('button');
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener('click', click);
	}
});