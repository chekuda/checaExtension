//@author Jose Luis Checa Exposito jose.exposito@veinteractive.com
// popup.js
chrome.tabs.query({active: false, currentWindow: true}, function(tab){
	chrome.tabs.executeScript(tab[0].id, { code: "console.log('dsff');" }, function(){
	    if (chrome.runtime.lastError) {
	         console.log("ERROR: " + chrome.runtime.lastError.message);
	    }
	});
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	if(message.secret == "veCaptureApp" && message.msg == "test")
	{
		console.log(message.msg);
	}
	else
	{
		console.log("Wrong Father");
	}
    
});
 document.addEventListener("DOMContentLoaded", function() {
	document.getElementById("checkPage").addEventListener("click",function(){
		chrome.tabs.query({active: true, currentWindow: true}, function(tab){
			chrome.tabs.sendMessage(tab[0].id, {secret:"veCaptureApp",msg:"OpenWidget"}, function(response) {});//for send message to browser
			 // console.info(tab);
    // 		 chrome.tabs.insertCSS(tab[0].id, { file: "bower_components/bootstrap/dist/css/bootstrap.css" });
		});
  	});
});
