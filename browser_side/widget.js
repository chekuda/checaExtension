//@author Jose Luis Checa Exposito jose.exposito@veinteractive.com
// popup.js
  
//   var nScripts = document.getElementsByTagName("script");
//   document.addEventListener("mouseover",function(){

//   });
// document.querySelector("body").addEventListener("click", function(){
//     console.log("Working");
//     chrome.runtime.sendMessage({secret:"veCaptureApp",msg:"test"});//use for send information to the extension
// })

function stopAlloldEvents(event)
{
  event.stopPropagation();
  event.preventDefault();
}

function checkifElementFromWidget(){

  var control = 0;
   for(var i=0; i<document.querySelectorAll(".veCaptureWidget *").length;i++)
  {
    if(event.target == document.querySelectorAll(".veCaptureWidget *")[i])
    {
      control = 1;
    }
  }
  return control;
}

function moveLeftWidget(){
  document.querySelector(".veCaptureWidget").style.left = "0";
  document.querySelector(".veCaptureWidget").style.right = "inherit";
}

function moveRightWidget(){
  document.querySelector(".veCaptureWidget").style.right = "0";
  document.querySelector(".veCaptureWidget").style.left = "inherit";
}

function stopFunctionalities(){
  document.removeEventListener("click",getSelector);
  document.removeEventListener("mouseover",remarkTarget);
  document.removeEventListener("mouseout",remarkTarget);
  document.removeEventListener("click",stopAlloldEvents);

  document.querySelector(".veCaptureWidget").style.opacity = "0";
}


function remarkTarget(event)
{
  event.target.style.border = "solid 2px #feff04";
}
function unremarkTarget(event)
{
  event.target.style.border = "none";
}
/********************
  Get the selector
*******************/
function getSelector(event){

    var procced = checkifElementFromWidget();

    if(procced == 1)
    {
      return false;
    }

    var finalSelector="";
    var nodeClass="";
    var parentNodeId="";
    var parentNodeName="";
    var nodeId="";
    var getDeep="";

    if(event.toElement.className != "")
    {
        nodeClass = event.toElement.className;

        if(nodeClass.match(/{{.+}}/))
        {
          nodeClass =  nodeClass.replace(nodeClass.match(/{{.+}}/)[0],"").trim();
        }
        nodeClass = "."+nodeClass.replace(/ /g,".");
    }
    if(event.toElement.parentNode.id != "")
    {
        parentNodeId = "#"+event.toElement.parentNode.id;
    }
    if(event.target.id != "")
    {
        nodeId = "#"+event.target.id;
    }

    finalSelector = event.toElement.parentNode.nodeName.toLowerCase()+""+parentNodeId+" "+event.target.nodeName.toLowerCase()+""+nodeClass+""+nodeId;

    getDeep = document.querySelectorAll(finalSelector);
    
    if(getDeep.length >1)
    {
     for(var i=0;i<getDeep.length;i++)
     {
       if(getDeep[i].textContent == event.target.textContent)
       {
        finalSelector = finalSelector+":eq("+i+")";
       }  
     }
    }

    document.querySelector(".mapping textarea").innerHTML = finalSelector;
    
}
/********************
  check the vetag
*******************/

function checkveTag(nScripts){
   
    for(var i=0;i<nScripts.length;i++){
      if(nScripts[i].src.match(/interactive\.com\/tags/)){
        console.log("VETAG>>>>>> "+nScripts[i].src);
        document.querySelector("#vetag .iconOk").style.background = "url('chrome-extension://ojdefephjmdebknhoojenbpemafoeoga/assets/ok.png')";/*Loading the image from the extension URL*/
        }
      }
}
/********************
  Check veCapture
*******************/

function checkveCapture(nScripts){
    for(var i=0;i<nScripts.length;i++){
      if(document.getElementById("veConnect")){
          console.log("VECapture>>>>>> "+document.getElementById("veConnect").src);
          document.querySelector("#vecapture .iconOk").style.background = "url('chrome-extension://ojdefephjmdebknhoojenbpemafoeoga/assets/ok.png')";/*Loading the image from the extension URL*/
        }
      }
}





chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if(message.secret == "veCaptureApp" && message.msg == "OpenWidget")
  {
    if(!document.querySelector(".veCaptureWidget"))
    {
       $.ajax({
        type: 'GET',
        url: chrome.extension.getURL("browser_side/widget.html"),
        success: function ( res ) 
        {
          $(res).appendTo("body");
          document.querySelector(".veCaptureWidget").style.height = screen.height+"px";
          setTimeout(function(){ document.querySelector(".veCaptureWidget").style.opacity = "0.8"; }, 50);
          document.querySelector(".iconClose").addEventListener("click",stopFunctionalities);
          document.querySelector("span.leftMoveIcon").addEventListener("click",moveLeftWidget);
          document.querySelector("span.rightMoveIcon").addEventListener("click",moveRightWidget);
        }
      })

    }
    else
    {
      //Everytime I open the widget check the tag
      document.querySelector(".veCaptureWidget").style.opacity = "0.8";
    }
    checkveTag(document.getElementsByTagName("script"));

    checkveCapture(document.getElementsByTagName("script"));

    document.addEventListener("click",stopAlloldEvents);
      // checkveGDM(nScripts);
    document.addEventListener("click",getSelector);

    document.addEventListener("mouseover",remarkTarget);

    document.addEventListener("mouseout",unremarkTarget);



  }
  else
  {
    console.log("we did something wrong");
  }
});

