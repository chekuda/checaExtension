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

function shoMappingsFromLocalStorage()
{
  //first I have to remove the old formMappings
  var allFormMappingDiv = document.querySelectorAll(".listNewFormMappings");
  for(var j=0;j<allFormMappingDiv.length;j++)
  {
    allFormMappingDiv[j].remove();
  }
  for(var i=0;i<listNewFormMappings.length;i++)
  {
      var newDiv = document.createElement("div");
      newDiv.className="listNewFormMappings";   
      var newSpan = document.createElement("span");
      newSpan.className="newObjectMapping";
      var removeSpan = document.createElement("span");
      removeSpan.className="removeNewObject";       
      var newName = document.createTextNode(listNewFormMappings[i].mappingName); 
      newSpan.appendChild(newName);
      newSpan.appendChild(removeSpan);   
      newDiv.appendChild(newSpan);
                        

      var list = document.querySelector("#formMappings .newMappingsList");    
      list.insertBefore(newDiv, list.childNodes[0]);
      document.querySelector(".removeNewObject").addEventListener("mousedown",removeItem);
      document.querySelector(".newObjectMapping").addEventListener("mousedown",checkObjectClicked);
  }
}

function openListForm()
{
  var currentForms = JSON.parse(window.localStorage.getItem("ve_widget"));
  var totalH = 30 * currentForms.form.length;
  if(document.getElementById("listForms").style.visibility == "hidden")
  {
    document.getElementById("listForms").style.visibility = "visible";
    document.getElementById("listForms").style.height = totalH+"px";
  }
  else
  {
    document.getElementById("listForms").style.visibility = "hidden";
    document.getElementById("listForms").style.height = "0px";
    
  }
}

function loadListForm()
{
  var currentForms = JSON.parse(window.localStorage.getItem("ve_widget"));
  for(var i = 0;i<currentForms.form.length; i++)
  {
      var newDiv = document.createElement("div");
      newDiv.className="listoldForm";   
      var newSpan = document.createElement("span");
      newSpan.className="newobjectForm";
      var removeSpan = document.createElement("span");
      removeSpan.className="removeNewObjectForm";   
      var newName = document.createTextNode(currentForms.form[i].formName); 
      newSpan.appendChild(newName);
      newSpan.appendChild(removeSpan);  
      newDiv.appendChild(newSpan);

      var list = document.querySelector("#listForms");    
      list.insertBefore(newDiv, list.childNodes[0]);
      document.querySelector(".removeNewObjectForm").addEventListener("mousedown",removeItem);
      document.querySelector(".newobjectForm").addEventListener("mousedown",checkObjectClicked);
  }

}

function clearFields(){


    document.getElementById("mappingName").value = "";
    document.getElementById("mappingSelector").value = "";
    document.getElementById("mappingDataType").value ="";
    document.getElementById("htmlType").value = "";
    document.getElementById("htmlAttribute").value = "";
    document.getElementById("fieldType").value = "";
    document.getElementById("eventType").value = "";


}

function removeItem(){
  var currentForms = JSON.parse(window.localStorage.getItem("ve_widget"));
  var nodeToRemove="";
  console.log(event.target.parentNode.parentNode);
  nodeToRemove =  event.target.parentNode.textContent;

if(event.target.parentNode.parentNode.className == "listNewFormMappings")
{
  for(var i=0;i<listNewFormMappings.length;i++)
  {
    if(listNewFormMappings[i].mappingName == nodeToRemove)
    {
      listNewFormMappings.splice(i,1);
    }
  }
}
else
{
  for(var j=0;j<currentForms.form.length;j++)
  {
    if(currentForms.form[j].formName == nodeToRemove)
    {
      currentForms.form.splice(j,1);
    }
  }
  window.localStorage.setItem("ve_widget",JSON.stringify(currentForms));
}
  
  event.target.parentNode.parentNode.remove();

}

function checkObjectClicked(event){

  var currentForms = JSON.parse(window.localStorage.getItem("ve_widget"));

  var nameM = event.target.textContent;

  if(event.target.parentNode.parentNode.className == "newMappingsList")
  {
    for(var i=0;i<listNewFormMappings.length;i++)
    {
      if(listNewFormMappings[i].mappingName == event.target.textContent)
      {
        document.getElementById("mappingName").value = listNewFormMappings[i].mappingName;
        document.getElementById("mappingSelector").value = listNewFormMappings[i].mappingSelector;
        document.getElementById("mappingDataType").value =listNewFormMappings[i].mappingDataType;
        document.getElementById("htmlType").value = listNewFormMappings[i].htmlType;
        document.getElementById("htmlAttribute").value = listNewFormMappings[i].htmlAttribute;
        document.getElementById("fieldType").value = listNewFormMappings[i].fieldType;
        document.getElementById("eventType").value = listNewFormMappings[i].eventType;
      }
    }
  }
  else
  {
    for(var j=0;j<currentForms.form.length;j++)
    {
      if(currentForms.form[j].formName == nameM)
      {
        document.getElementById("formName").value = currentForms.form[j].formName;
        document.getElementById("formType").value = currentForms.form[j].formType;
        document.getElementById("wholeUrl").value = currentForms.form[j].formURL;
        listNewFormMappings = currentForms.form[j].listMappings;
        shoMappingsFromLocalStorage();
      }
    }
  }
  
}

function saveFormMapping(){
var controlIfExist= "no";
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
    for(var i=0;i<listNewFormMappings.length;i++)
    {
      if(listNewFormMappings[i].mappingName == newOne.mappingName)
      {
        controlIfExist = i;
      }
    }
    if(controlIfExist != "no")
    {

        listNewFormMappings[controlIfExist] = newOne;
        console.log("FormMapping named>> "+newOne.mappingName+" replaced");
    }
    else
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
      document.querySelector(".removeNewObject").addEventListener("mousedown",removeItem);
      document.querySelector(".newObjectMapping").addEventListener("mousedown",checkObjectClicked);

    }
          clearFields();

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
          parameters:[{
            parameter:"",
            pvalue:""
          }],
          listMappings: listNewFormMappings
        }]
      };
      ve_client.form[0].formName = document.getElementById("formName").value;
      ve_client.form[0].formType =document.getElementById("formType").value;
      ve_client.form[0].formURL = document.getElementById("wholeUrl").value;
      ve_client.form[0].parameters[0].parameter = document.getElementById("parameter").value;
      ve_client.form[0].parameters[0].pvalue = document.getElementById("pvalue").value;
      ve_client.journeyId = vetag.match(/\b[A-Z0-9/]{2,}\b/)[0];
      ve_client.journeyId = ve_client.journeyId.replace(/^\//,"");//remove the first /
      ve_client.journeyId = ve_client.journeyId.replace(/\/$/,"");//remove the last /
      ve_client.journeyId = ve_client.journeyId.replace(/\//g,"-");//Replace / for -
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
            alert("Form named>> "+ve_client.form[0].formName+" added");
          }
          
        }
        else
        {
          alert("The client with JourneyId>> "+currentObject.journeyId+" is on your localStorage");
        }
      }
      clearFields();
      
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
  document.removeEventListener("mousedown",getSelector);
  document.removeEventListener("mouseover",remarkTarget);
  document.removeEventListener("mouseout",remarkTarget);
  document.removeEventListener("click",stopAlloldEvents,true);

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

// function displayTheForm(formfounded)
// {
//   document.getElementById("formName").value = formfounded.formName;
//   document.getElementById("formType").value = formfounded.formType;
//   document.getElementById("wholeUrl").value = formfounded.formURL;

//   listNewFormMappings = formfounded.listMappings;

//   addNewMappingNode("onload");

// }

// /********************
//   load the form is already URL set up
// *******************/
// function checkURLandForm(wholeURL)
// {
//   var formfounded = "";
//   var urls="";
//   var currentForms = JSON.parse(window.localStorage.getItem("ve_widget"));
//   var currentUrl= wholeURL.replace(/^www./,"");
//   for(var i=0;i<currentForms.form.length;i++)
//   {
//     urls = currentForms.form[i].formURL.split(",");
//     for(var j=0;j<urls.length;j++)
//     {
//       if(urls[j] == currentUrl)
//       {
//         formfounded = currentForms.form[i];
//       }
//       else
//       {

//       }
//     }
//   }

//   if (formfounded != "") 
//   {
//     displayTheForm(formfounded);
//   }

// }

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

function getWholeURL(){
  var wholeURL="";
  wholeURL = window.location.hostname + window.location.pathname;
  document.getElementById("wholeUrl").value = wholeURL.replace(/^www./g,"");
  // checkURLandForm(wholeURL);
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
          document.querySelector(".iconClose").addEventListener("mousedown",stopFunctionalities);
          document.querySelector("span.leftMoveIcon").addEventListener("mousedown",moveLeftWidget);
          document.querySelector("span.rightMoveIcon").addEventListener("mousedown",moveRightWidget);
          document.querySelector("#saveMapping").addEventListener("mousedown",saveFormMapping);
          document.querySelector("#saveForm").addEventListener("mousedown",saveForm);
          if(window.localStorage.getItem("ve_widget"))
          {
            document.querySelector(".menuBottomWidget").style.display="inline-block";
            document.querySelector(".menuBottomWidget").addEventListener("mousedown",openListForm);
            loadListForm();
          }
          checkveTag();
          checkveCapture();
          calculateHeightofFormSection();
          getWholeURL();
          
        }
      })

    }
    else
    {
      //Everytime I open the widget check the tag
      document.querySelector(".veCaptureWidget").style.display = "block";
    }


    document.addEventListener("click",stopAlloldEvents,true);
      // checkveGDM(nScripts);
    document.addEventListener("mousedown",getSelector);

    document.addEventListener("mouseover",remarkTarget);

    document.addEventListener("mouseout",unremarkTarget);



  }
  else
  {
    console.log("we did something wrong");
  }
});

