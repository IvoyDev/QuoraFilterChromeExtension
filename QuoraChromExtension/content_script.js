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

//sorted by upvotes
//var sortedList = answers.sort(function(a,b){
//	if (a.getElementsByClassName('count')[0] != null && b.getElementsByClassName('count')[0] != null&& (removeK(a.getElementsByClassName('count')[0].innerHTML) > removeK(b.getElementsByClassName('count')[0].innerHTML))){
//		return -1;
//	} else {
//		return 1;
//	}	
//});

//sorted by comments
// var sortedListByComments = answers.sort(function(a,b){
	// if (a.getElementsByClassName('count')[0] != null && b.getElementsByClassName('count')[0] != null){
		// if (typeof(a.getElementsByClassName('count')[1])=='undefined'){
			// return 1;
		// }
		// if (typeof(b.getElementsByClassName('count')[1])=='undefined'){
			// return -1;
		// }
		// if (removePlus(a.getElementsByClassName('count')[1].innerHTML) > removePlus(b.getElementsByClassName('count')[1].innerHTML)){
			// console.log(removePlus(a.getElementsByClassName('count')[1].innerHTML));
			// console.log(removePlus(b.getElementsByClassName('count')[1].innerHTML));
			// return -1;
		// } else {
			// return 1;
		// }
	// } else {
		// return 1;
	// }	
// });

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

//by comments
// for (var i=0;i<sortedListByComments.length;i++){
	// sortedListByComments[i].setAttribute('class', 'pagedlist_item');
	// sortedListByComments[i].removeAttribute('style');
	// answerList.appendChild(sortedListByComments[i]);
// }

//by upvotes
//for (var i=0;i<sortedList.length;i++){
//	sortedList[i].setAttribute('class', 'pagedlist_item');
//	sortedList[i].removeAttribute('style');
//	answerList.appendChild(sortedList[i]);
//}

answerList.appendChild(moreAnsButton);

window.scrollTo(0,0);

//answers[0].getElementsByClassName('count')[0].innerHTML = removeK(answers[0].getElementsByClassName('count')[0].innerHTML);
