//@author Jose Luis Checa Exposito jose.exposito@veinteractive.com
// popup.js

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
 	chrome.tabs.query({active: true, currentWindow: true}, function(tab){
			chrome.tabs.sendMessage(tab[0].id, {secret:"veCaptureApp",msg:"OpenWidget"}, function(response) {});//for send message to browser
			 // console.info(tab);
    // 		 chrome.tabs.insertCSS(tab[0].id, { file: "bower_components/bootstrap/dist/css/bootstrap.css" });
		});
  })