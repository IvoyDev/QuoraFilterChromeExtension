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
	sortedList[i].setAttribute('class', 'pagedlist_item');
	sortedList[i].removeAttribute('style');
	answerList.appendChild(sortedList[i]);
}

answerList.appendChild(moreAnsButton);

window.scrollTo(0,0);