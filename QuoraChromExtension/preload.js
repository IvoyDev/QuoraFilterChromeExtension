var self = this;

function loading (loaded, total){
	if (loaded>=total){
		return 99
	} else {
		return Math.floor((loaded / total) * 100);
	}	
}

self.GetAnswerBoxes = function()
{
	var answerBoxHolder = $(".AnswerPagedList");
	return answerBoxHolder.children().filter(function() { return $(this).find(".Answer:not(.ActionBar)").length >= 1; }).get();
};

self.ShowAllAnswers = function()
{	
	var totalAnswersTxt = $(".answer_count").text();
	console.log(totalAnswersTxt);
	var totalAnswers = parseInt($(".answer_count").text());
	console.log(totalAnswers);
	var answerBoxHolder = $(".AnswerPagedList");
	var loaderBar = answerBoxHolder.children(":not(.pagedlist_item)");
	var loaderDiv = $(".pager_sentinel");
	var tempHolder = $("<div style='position: fixed; left: 0; top: 0; opacity: 0;'></div>").appendTo("body");
	loaderDiv.appendTo(tempHolder);
	var prevShownCount = 0;
	var stopCheck = 50;
	var prevLoaded =0;
	var loadingComplete = function()
	{
		$(".answer_count").html(totalAnswersTxt);
		return;
	};
	var nextCheck = function()
	{
		$(document).scrollTop($(document).scrollTop() + 1);
		$(document).scrollTop($(document).scrollTop() - 1);
		var shownCount = self.GetAnswerBoxes().length;
		var loaded = loading(shownCount, totalAnswers);
		if (loaded < prevLoaded){
			loaded = prevLoaded;
		}
		console.log(totalAnswers);
		prevLoaded = loaded;
		$(".answer_count").html(totalAnswersTxt + " "+ loaded.toFixed(1) +"% Loaded...");
		
		if (prevShownCount==shownCount){
			//console.log(prevShownCount+" "+shownCount+" "+totalAnswers+" "+stopCheck);
			stopCheck--;
		} else {
			stopCheck=50;
		}
		
		if (shownCount < totalAnswers*0.8) {
			prevShownCount = shownCount;
			setTimeout(nextCheck, 100);
		} else if (stopCheck>0){
			if (shownCount>totalAnswers*0.9){
				totalAnswers = totalAnswers+shownCount-prevShownCount;
			}
			prevShownCount = shownCount;
			setTimeout(nextCheck, 100);
		}else
		{	
			setTimeout(loadingComplete, 1000);
			$(".answer_count").html(totalAnswersTxt + " 100% Loaded...");
			loaderDiv.appendTo(loaderBar);
			tempHolder.remove();
			return;
		}
	};
	nextCheck();
	totalAnswers = parseInt($(".answer_count").text());
	return;
};
window.scrollTo(0,0);
self.ShowAllAnswers();
