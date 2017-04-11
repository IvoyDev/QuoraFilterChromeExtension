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
			console.log(removePlus(a.getElementsByClassName('count')[1].innerHTML));
			console.log(removePlus(b.getElementsByClassName('count')[1].innerHTML));
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
	sortedListByComments[i].setAttribute('class', 'pagedlist_item');
	sortedListByComments[i].removeAttribute('style');
	answerList.appendChild(sortedListByComments[i]);
}

answerList.appendChild(moreAnsButton);

window.scrollTo(0,0);
