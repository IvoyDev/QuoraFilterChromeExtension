document.addEventListener('DOMContentLoaded', function () {
	var buttons = document.querySelectorAll('button');
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener('click', click);
	}
});

function click(e) {
	chrome.tabs.executeScript(null,
		{file:"JQuery1.9.1.js"});
	if (e.target.id == 'byUpvote'){	
		chrome.tabs.executeScript(null,
			{file:"upvotes.js"});
	} else if (e.target.id == 'byComment'){
		chrome.tabs.executeScript(null,
			{file:"comments.js"});		
	} else if (e.target.id=='byView'){
		chrome.tabs.executeScript(null,
			{file:"views.js"});
	} else if (e.target.id=='byRecency'){
		chrome.tabs.executeScript(null,
			{file:"recency.js"});		
	} else if (e.target.id=='preload'){
		chrome.tabs.executeScript(null,
			{file:"preload.js"});		
	}
	window.close();
}
