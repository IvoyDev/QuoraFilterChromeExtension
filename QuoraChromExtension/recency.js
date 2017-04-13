function parseDate(date){
	var monthMap = {
		'Jan':0,
		'Feb':1,
		'Mar':2,
		'Apr':3,
		'May':4,
		'Jun':5,
		'Jul':6,
		'Aug':7,
		'Sep':8,
		'Oct':9,
		'Nov':10,
		'Dec':11	
	}
	var weekMap = {
		'Mon':0,
		'Tue':1,
		'Wed':2,
		'Thu':3,
		'Fri':4,
		'Sat':5,
		'Sun':6
	}
	var d;
	date = date.replace("Updated ","");
	date = date.replace("Written ","");
	
	if (date.includes("ago")){
		date = date.replace(" ago","");
		d = new Date();
		if (date.includes("h")){
			d.setHours(d.getHours() - parseInt(date.replace("h","")));
		} else if (date.includes("m")){
			d.setMinutes(d.getMinutes() - parseInt(date.replace("m","")));
		} else if (date.includes("s")){
			d.setSeconds(d.getSeconds() - parseInt(date.replace("s","")));
		}		
	} else if (date.includes(",")){
		date.replace(",","");
		var tempD = date.split(" ");
		d = new Date(parseInt(tempD[2]),parseInt(monthMap[tempD[0]]),parseInt(tempD[1]));	
	} else if (date.includes(" ")){
		var tempD = date.split(" ");
		var month =  parseInt(monthMap[tempD[0]]);
		var dt = new Date();
		if (dt.getMonth() < month){
			d = new Date(dt.getFullYear()-1, month,parseInt(tempD[1]));
		} else {
			d = new Date(dt.getFullYear(), month,parseInt(tempD[1]));
		}
	} else {
		d = new Date();
		var weekDay = parseInt(weekMap[date]);
		if (d.getDay() < weekDay){
			d.setDate(d.getDate() - (d.getDay()+6-weekDay));
		} else {
			d.setDate(d.getDate()- (d.getDay() - weekDay));
		}
	}	
	return d;
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
var sortedListByRecency = answers.sort(function(a,b){
	if (a.getElementsByClassName('answer_permalink')[0] != null && b.getElementsByClassName('answer_permalink')[0] != null&& (parseDate(a.getElementsByClassName('answer_permalink')[0].innerHTML) > parseDate(b.getElementsByClassName('answer_permalink')[0].innerHTML))){
		return -1;
	} else {
		return 1;
	}	
});

answerList.innerHTML = "";

//by comments
for (var i=0;i<sortedListByRecency.length;i++){
	if (i>7){
		sortedListByRecency[i].setAttribute('class', 'pagedlist_item pagedlist_hidden');
		sortedListByRecency[i].style.display='none';
	} else {
		sortedListByRecency[i].setAttribute('class', 'pagedlist_item');
		sortedListByRecency[i].removeAttribute('style');
	}
	answerList.appendChild(sortedListByRecency[i]);
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

document.getElementsByClassName('QuestionPageAnswerHeader')[0].scrollIntoView( true );
window.scrollBy(0,-62);
