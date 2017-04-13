function removeK(num){
	if (num.includes("k")){
		return parseFloat(num.replace("k",""))*1000;
	} else if (num.includes("m")){
		return parseFloat(num.replace("m",""))*1000000;
	} else {
		return parseFloat(num);
	}	
}

function removePlus(num){
	if (num==null){
		return 0;
	}
	if (num.includes("+")){
		return removeK(num.replace("+",""));
	} else {
		return removeK(num);
	}	
}

var answerList = document.getElementsByClassName('AnswerPagedList')[0];
var moreAnsButton = answerList.getElementsByClassName('PagedListMoreButton')[0].parentNode;
moreAnsButton.parentNode.removeChild(moreAnsButton);

var promotionList = answerList.getElementsByClassName('answer_area_content');

for (var i =0; i<promotionList.length;i++){
	var promotion = promotionList[i].parentNode.parentNode;
	promotion.parentNode.removeChild(promotion);
}

//removed collapsed answers
var collapsedList;
if (typeof(answerList.getElementsByClassName('CollapsedAnswersSectionCollapsed')[0]) != 'undefined')
{
	collapsedList = answerList.getElementsByClassName('CollapsedAnswersSectionCollapsed')[0].parentNode.parentNode.parentNode;
	collapsedList.parentNode.removeChild(collapsedList);
}
//main
var answers = Array.prototype.slice.call(answerList.children,0);

var sortedListByViews = answers.sort(function(a,b){
	if (a.getElementsByClassName('meta_num')[0] != null && b.getElementsByClassName('meta_num')[0] != null&& (removeK(a.getElementsByClassName('meta_num')[0].innerHTML) > removeK(b.getElementsByClassName('meta_num')[0].innerHTML))){
		return -1;
	} else {
		return 1;
	}	
});
answerList.innerHTML = "";

//by views
for (var i=0;i<sortedListByViews.length;i++){
	if (i>7 && i>sortedListByViews.length-7){
		sortedListByViews[i].setAttribute('class', 'pagedlist_item pagedlist_hidden');
		sortedListByViews[i].style.display='none';
	} else {
		sortedListByViews[i].setAttribute('class', 'pagedlist_item');
		sortedListByViews[i].removeAttribute('style');
	}
	answerList.appendChild(sortedListByViews[i]);
}

for (var i =0; i<promotionList.length;i++){
	var promotion = promotionList[i].parentNode.parentNode;
	answerList.appendChild(promotion);
}
if (collapsedList!=null){
	answerList.appendChild(collapsedList);
}
answerList.appendChild(moreAnsButton);
window.scrollTo(0,0);
