//@author Jose Luis Checa Exposito jose.exposito@veinteractive.com
// popup.js
  
//   var nScripts = document.getElementsByTagName("script");
//   document.addEventListener("mouseover",function(){

//   });
// document.querySelector("body").addEventListener("click", function(){
//     console.log("Working");
//     chrome.runtime.sendMessage({secret:"veCaptureApp",msg:"test"});//use for send information to the extension
// })


var listNewFormMappings=[];
var veTag = "";

function clearFields(data){


    document.getElementById("mappingName").value = "";
    document.getElementById("mappingSelector").value = "";
    document.getElementById("mappingDataType").value ="";
    document.getElementById("htmlType").value = "";
    document.getElementById("htmlAttribute").value = "";
    document.getElementById("fieldType").value = "";
    document.getElementById("eventType").value = "";

  if(data=="formSaved")
  {
    document.getElementById("formName").value = "";
    document.getElementById("formType").value = "";
  }

}

function removeItem(){
  var nodeToRemove="";
  console.log(event.target.parentNode.parentNode);
  nodeToRemove =  event.target.parentNode.textContent;

  for(var i=0;i<listNewFormMappings.length;i++)
  {
    if(listNewFormMappings[i].mappingName == nodeToRemove)
    {
      listNewFormMappings.splice(i,1);
    }
  }
  event.target.parentNode.parentNode.remove();

}

function saveFormMapping(){

var newOne = {
      mappingName: document.getElementById("mappingName").value,
      mappingSelector: document.getElementById("mappingSelector").value,
      mappingDataType: document.getElementById("mappingDataType").value,
      htmlType: document.getElementById("htmlType").value,
      htmlAttribute: document.getElementById("htmlAttribute").value,
      fieldType: document.getElementById("fieldType").value,
      eventType: document.getElementById("eventType").value
    };

  if(newOne.mappingName!="" && newOne.mappingSelector!="" && newOne.mappingDataType!="" && newOne.htmlType!="" && newOne.htmlAttribute!="" && newOne.fieldType!="" && newOne.eventType!="")
  {
    listNewFormMappings.push(newOne);

    var newDiv = document.createElement("div");
    newDiv.className="listNewFormMappings";   
    var newSpan = document.createElement("span");
    newSpan.className="newObjectMapping";
    var removeSpan = document.createElement("span");
    removeSpan.className="removeNewObject";       
    var newName = document.createTextNode(newOne.mappingName); 
    newSpan.appendChild(newName);
    newSpan.appendChild(removeSpan);   
    newDiv.appendChild(newSpan);
                      

    var list = document.querySelector("#formMappings .newMappingsList");    
    list.insertBefore(newDiv, list.childNodes[0]);
    list.childNodes[0].addEventListener("click",removeItem);

    clearFields("mappingSaved");
    

  }
  else{
    alert("Dont Forget all data");
  }

}


function saveForm(){
  var controlIfExist = "no";
  if(listNewFormMappings.length<=0 || vetag == "" || document.getElementById("formName").value == "" || document.getElementById("formType").value =="")
  {
    if(vetag == "")
    {
      alert("The tag is not in the page");
    }
    else if(listNewFormMappings.length<=0)
    {
      alert("Please insert any form mapping");
    }
    else
    {
      alert("Please insert the Form name");
    }
  }
  else
  {
    var ve_client=
      {
      journeyId: "",
      form:[
        {
          formName:"",
          formType:"",
          formURL:"",
          listMappings: listNewFormMappings
        }]
      };
      ve_client.form[0].formName = document.getElementById("formName").value;
      ve_client.form[0].formType =document.getElementById("formType").value;
      ve_client.form[0].formURL = document.getElementById("wholeUrl").value;
      ve_client.journeyId = vetag.match(/\b[A-Z0-9/]{2,}\b/)[0];
      ve_client.journeyId = ve_client.journeyId.replace(/^\//,"");
      ve_client.journeyId = ve_client.journeyId.replace(/\/$/,"");
      ve_client.journeyId = ve_client.journeyId.replace(/\//g,"-");
      console.log(ve_client.journeyId);
      if(!window.localStorage.getItem("ve_widget"))
      {
        window.localStorage.setItem("ve_widget",JSON.stringify(ve_client));
      }
      else
      {
        var currentObject = JSON.parse(window.localStorage.getItem("ve_widget"));
        
        if(ve_client.journeyId == currentObject.journeyId)
        {
          for(var i=0;i<currentObject.form.length;i++)
          {
            if(currentObject.form[i].formName == ve_client.form[0].formName)
            {
              controlIfExist = i;
            }
          }
          if(controlIfExist != "no")
          {
            currentObject.form[controlIfExist] = ve_client.form[0];
            window.localStorage.setItem("ve_widget",JSON.stringify(currentObject));
            alert("Form named>> "+ve_client.form[0].formName+" replaced");

          }
          else
          {
            currentObject.form.push(ve_client.form[0]);
            window.localStorage.setItem("ve_widget",JSON.stringify(currentObject));
            alert("Form named>> "+cve_client.form[0].formName+" added");
          }
          
        }
        else
        {
          alert("The client with JourneyId>> "+currentObject.journeyId+" is on your localStorage");
        }
      }
      
  }
}

function stopAlloldEvents(event)
{
  event.stopPropagation();
  event.preventDefault();
}

/********************
  Dont act over the widget
*******************/

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

/********************
  Remove all the functionalities when widget closed
*******************/

function stopFunctionalities(){
  document.removeEventListener("click",getSelector);
  document.removeEventListener("mouseover",remarkTarget);
  document.removeEventListener("mouseout",remarkTarget);
  document.removeEventListener("click",stopAlloldEvents);

  document.querySelector(".veCaptureWidget").style.display = "none";
}

/********************
  Bold the border
*******************/

function remarkTarget(event)
{
  var procced = checkifElementFromWidget();

  if(procced == 1)
    {
      return false;
    }

  event.target.style.border = "solid 2px #feff04";
}
/********************
  UnRemark the border
*******************/

function unremarkTarget(event)
{
  var procced = checkifElementFromWidget();
  
  if(procced == 1)
    {
      return false;
    }

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

        if(nodeClass.match(/{{.+}}/))//remove the moustache elements 
        {
          nodeClass =  nodeClass.replace(nodeClass.match(/{{.+}}/)[0],"").trim();
        }
        nodeClass = nodeClass.replace(/  /g," ");
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
      if(event.target.nodeName.toLowerCase() == "img")
      {
         for(var i=0;i<getDeep.length;i++)
         {
           if(getDeep[i].src == event.target.src)
           {
            if(!finalSelector.match(/eq/g))//No repeat eq for same pictures displayed
            {
              finalSelector = finalSelector+":eq("+i+")";
            }
           }  
         }
      }
      else
      {
         for(var i=0;i<getDeep.length;i++)
         {
           if(getDeep[i].textContent == event.target.textContent)
           {
            if(!finalSelector.match(/eq/g))
            {
              finalSelector = finalSelector+":eq("+i+")";
            }
           }  
         }
      }
    
    }

    document.getElementById("mappingSelector").value = finalSelector;
    
}

/********************
  check the vetag
*******************/

function checkveTag(){
   var nScripts= document.getElementsByTagName("script");
    for(var i=0;i<nScripts.length;i++)
    {
      if(nScripts[i].src.match(/interactive\.com\/tags/))
      {
        console.log("VETAG>>>>>> "+nScripts[i].src);
        vetag = nScripts[i].src;
        document.querySelector("#vetag .iconOk").style.background = "url('https://s25.postimg.org/vbbn1j7wf/ok.png')";/*Loading the image from the extension URL*/
        document.removeEventListener("DOMNodeInserted",checkveTag);
      }
    }
}
/********************
  Check veCapture
*******************/

function checkveCapture()
{

      if(document.getElementById("veConnect"))
      {
          console.log("VECapture>>>>>> "+document.getElementById("veConnect").src);
          document.querySelector("#vecapture .iconOk").style.background = "url('https://s25.postimg.org/vbbn1j7wf/ok.png')";/*Loading the image from the extension URL*/

      }

}

function calculateHeightofFormSection(){
  var topSection = document.getElementById("tagSelector").clientHeight;
  var widgetHeight = document.getElementsByClassName("veCaptureWidget")[0].clientHeight

  document.getElementById("editableWidget").style.height = widgetHeight - topSection + 2 +"px";
}

function getWholeURl(){
  var wholeURL="";
  wholeURL = window.location.hostname + window.location.pathname;
  document.getElementById("wholeUrl").value = wholeURL.replace(/^www./g,"");
}
/********************
  Receive information from extension
*******************/

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
          document.querySelector(".veCaptureWidget").style.height = window.innerHeight+"px";
          setTimeout(function(){ document.querySelector(".veCaptureWidget").style.display = "block"; }, 50);
          document.querySelector(".iconClose").addEventListener("click",stopFunctionalities);
          document.querySelector("span.leftMoveIcon").addEventListener("click",moveLeftWidget);
          document.querySelector("span.rightMoveIcon").addEventListener("click",moveRightWidget);
          document.querySelector("#saveMapping").addEventListener("click",saveFormMapping);
          document.querySelector("#saveForm").addEventListener("click",saveForm);
          checkveTag();
          checkveCapture();
          calculateHeightofFormSection();
          getWholeURl();
        }
      })

    }
    else
    {
      //Everytime I open the widget check the tag
      document.querySelector(".veCaptureWidget").style.display = "block";
    }

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

