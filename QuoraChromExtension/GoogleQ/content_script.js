function removeK(num){
	if (num.includes("k")){
		return parseFloat(num.replace("k",""))*1000;
	} else {
		return parseFloat(num);
	}
	
}

// var lastScrollHeight = 0;

// function autoScroll() {
  // var sh = document.documentElement.scrollHeight;
  // if (sh != lastScrollHeight) {
    // lastScrollHeight = sh;
    // document.documentElement.scrollTop = sh;
  // }
// }
// window.setInterval(autoScroll, 100);	

var objDiv = document.getElementsByClassName("PagedListMoreButton")[0];
objDiv.scrollTop = objDiv.scrollHeight;



var answerList = document.getElementsByClassName('AnswerPagedList')[0];
//answerList.innerHTML = "";
var moreAnsButton = answerList.getElementsByClassName('PagedListMoreButton')[0].parentNode;
moreAnsButton.parentNode.removeChild(moreAnsButton);

var answers = Array.prototype.slice.call(answerList.children,0);


var sortedList = answers.sort(function(a,b){
	if (a.getElementsByClassName('count')[0] != null && b.getElementsByClassName('count')[0] != null&& (removeK(a.getElementsByClassName('count')[0].innerHTML) > removeK(b.getElementsByClassName('count')[0].innerHTML))){
		return -1;
	} else {
		return 1;
	}	
});

answerList.innerHTML = "";

for (var i=0;i<sortedList.length;i++){
	sortedList[i].setAttribute('class', 'pagedlist_item');
	sortedList[i].removeAttribute('style');
	answerList.appendChild(sortedList[i]);
}

window.scrollTo(0,0);

//answers[0].getElementsByClassName('count')[0].innerHTML = removeK(answers[0].getElementsByClassName('count')[0].innerHTML);
