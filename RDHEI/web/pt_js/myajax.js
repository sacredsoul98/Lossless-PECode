/* 
 * creates a new XMLHttpRequest object which is the backbone of AJAX  
 * or returns false if the browser doesn't support it 
 */  
function getXMLHttpRequest() {  
    var xmlHttpReq;  
    // to create XMLHttpRequest object in non-Microsoft browsers  
    if (window.XMLHttpRequest) {  
        xmlHttpReq = new XMLHttpRequest();  
    }
    else if (window.ActiveXObject) {  
        try {  
            //to create XMLHttpRequest object in later versions of Internet Explorer  
            xmlHttpReq = new ActiveXObject("Msxml2.XMLHTTP");  
        } catch (exp1) {  
            try {  
                //to create XMLHttpRequest object in later versions of Internet Explorer  
                xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");  
            } catch (exp2) {  
                //xmlHttpReq = false;  
                alert("Exception in getXMLHttpRequest()!");  
            }  
        }  
    }  
    return xmlHttpReq;  
}  
  
/* 
 * AJAX call starts with this function 
 */  
function makeRequest(pid,title,x,y,w,h) {    
    //alert(pid+")"+title);
    var xmlHttpRequest = getXMLHttpRequest();    
    xmlHttpRequest.onreadystatechange = getReadyStateHandler(xmlHttpRequest);  
    xmlHttpRequest.open("GET", "SaveTaggedInformation?pid="+pid+"&title="+title+"&x="+x+"&y="+y+"&w="+w+"&h="+h+"", true);    
    xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");    
    xmlHttpRequest.send(null);  
    
}  

/* 
 * Returns a function that waits for the state change in XMLHttpRequest 
 */  
function getReadyStateHandler(xmlHttpRequest) {  
    // an anonynous function returned  
    // it listens to the XMLHttpRequest instance  
    return function() {  
        if (xmlHttpRequest.readyState == 4) {  
            if (xmlHttpRequest.status == 200) {  
                document.getElementById("response").innerHTML = xmlHttpRequest.responseText;  
            } else {  
                alert("Http error " + xmlHttpRequest.status + ":" + xmlHttpRequest.statusText);  
            }  
        }  
    };  
}    