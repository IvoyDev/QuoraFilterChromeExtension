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

//sorted by upvotes
var sortedList = answers.sort(function(a,b){
	if (a.getElementsByClassName('count')[0] != null && b.getElementsByClassName('count')[0] != null&& (removeK(a.getElementsByClassName('count')[0].innerHTML) > removeK(b.getElementsByClassName('count')[0].innerHTML))){
		return -1;
	} else {
		return 1;
	}	
});

answerList.innerHTML = "";

//by upvotes
for (var i=0;i<sortedList.length;i++){
	if (i>7 && i>sortedList.length-7){
		sortedList[i].setAttribute('class', 'pagedlist_item pagedlist_hidden');
		sortedList[i].style.display='none';
	} else {
		sortedList[i].setAttribute('class', 'pagedlist_item');
		sortedList[i].removeAttribute('style');		
	}
	answerList.appendChild(sortedList[i]);
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