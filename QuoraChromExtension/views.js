function removeK(num){
	if (num.includes("k")){
		return parseFloat(num.replace("k",""))*1000;
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
var objDiv = document.getElementsByClassName("PagedListMoreButton")[0];
objDiv.scrollTop = objDiv.scrollHeight;
var answerList = document.getElementsByClassName('AnswerPagedList')[0];
var moreAnsButton = answerList.getElementsByClassName('PagedListMoreButton')[0].parentNode;
moreAnsButton.parentNode.removeChild(moreAnsButton);

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
	sortedListByViews[i].setAttribute('class', 'pagedlist_item');
	sortedListByViews[i].removeAttribute('style');
	answerList.appendChild(sortedListByViews[i]);
}

answerList.appendChild(moreAnsButton);

window.scrollTo(0,0);
