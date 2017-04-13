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

//remove promotions
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

//sorted by comments
var sortedListByComments = answers.sort(function(a,b){
	if (a.getElementsByClassName('count')[0] != null && b.getElementsByClassName('count')[0] != null){
		if (typeof(a.getElementsByClassName('count')[1])=='undefined'){
			return 1;
		}
		if (typeof(b.getElementsByClassName('count')[1])=='undefined'){
			return -1;
		}
		if (removePlus(a.getElementsByClassName('count')[1].innerHTML) > removePlus(b.getElementsByClassName('count')[1].innerHTML)){
			return -1;
		} else {
			return 1;
		}
	} else {
		return 1;
	}	
});

answerList.innerHTML = "";

//by comments
for (var i=0;i<sortedListByComments.length;i++){
	if (i>7 && i>sortedListByComments.length-7){
		sortedListByComments[i].setAttribute('class', 'pagedlist_item pagedlist_hidden');
		sortedListByComments[i].style.display='none';
	} else {
		sortedListByComments[i].setAttribute('class', 'pagedlist_item');
		sortedListByComments[i].removeAttribute('style');
	}
	answerList.appendChild(sortedListByComments[i]);
}

//add promotions back
for (var i =0; i<promotionList.length;i++){
	var promotion = promotionList[i].parentNode.parentNode;
	answerList.appendChild(promotion);
}

if (collapsedList!=null){
	answerList.appendChild(collapsedList);
}
answerList.appendChild(moreAnsButton);

window.scrollTo(0,0);
