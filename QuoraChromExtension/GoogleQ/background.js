// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  console.log('Filtering ' + tab.url + ' by upvotes.');
  // chrome.tabs.executeScript(
    // null, 
	// {file:"thirdParty/jquery-2.0.3.js"}
  // );
  chrome.tabs.executeScript(
    null, 
	{file:"content_script.js"}
  );
});