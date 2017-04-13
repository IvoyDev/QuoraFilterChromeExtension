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
	var totalAnswersTxt = $(".answer_count").contents().filter(function() {
							return this.nodeType == 3;
						}).text();
	var totalAnswers = parseInt($(".answer_count").contents().filter(function() {
							return this.nodeType == 3;
						}).text());
	if (totalAnswersTxt.includes("+")){
		totalAnswers = totalAnswers*2;
	}
	var answerBoxHolder = $(".AnswerPagedList");
	var loaderBar = answerBoxHolder.children(":not(.pagedlist_item)");
	var loaderDiv = $(".pager_sentinel");
	var tempHolder = $("<div style='position: fixed; left: 0; top: 0; opacity: 0;'></div>").appendTo("body");
	loaderDiv.appendTo(tempHolder);
	var prevShownCount = 0;
	var stopCheck = 100;
	var prevLoaded =0;
	var dot = 1;
	var dotMap = {
		0:"\u00A0\u00A0\u00A0",
		1:".\u00A0\u00A0",
		2:".\u00A0\u00A0",
		3:".\u00A0\u00A0",
		4:"..\u00A0",
		5:"..\u00A0",
		6:"..\u00A0",
		7:"...",
		8:"...",
		9:"...",		
	}
	var loadingComplete = function()
	{
		$(".answer_count").contents().filter(function() {
            return this.nodeType == 3;
        }).replaceWith(totalAnswersTxt);
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
		prevLoaded = loaded;
		dot = (dot+1)%10;
		$(".answer_count").contents().filter(function() {
            return this.nodeType == 3;
        }).replaceWith(totalAnswersTxt + " "+ loaded.toFixed(1) +"% Loaded"+dotMap[dot]);
		
		if (prevShownCount==shownCount){
			stopCheck--;
		} else {
			stopCheck=100;
		}
		
		if (shownCount < totalAnswers*0.8 && (shownCount<totalAnswers*0.4||!totalAnswersTxt.includes("+"))) {
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
			$(".answer_count").contents().filter(function() {
				return this.nodeType == 3;
			}).replaceWith(totalAnswersTxt + " 100% Loaded");
			
			loaderDiv.appendTo(loaderBar);
			tempHolder.remove();
			return;
		}
	};
	nextCheck();
	totalAnswers = parseInt($(".answer_count").contents().filter(function() {
				return this.nodeType == 3;
			}).text());
	if (totalAnswersTxt.includes("+")){
		totalAnswers = totalAnswers*2;
	}
	return;
};
document.getElementsByClassName('QuestionPageAnswerHeader')[0].scrollIntoView( true );
window.scrollBy(0,-62);
self.ShowAllAnswers();
