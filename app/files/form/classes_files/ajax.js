function formData2QueryString(formName) {
	var docForm = document.forms[formName];
	var strSubmitContent = '';
	var formElem;
	var strLastElemName = '';
	
	for (i = 0; i < docForm.elements.length; i++) {
		
		formElem = docForm.elements[i];
		switch (formElem.type) {
			// Text fields, hidden form elements
			case 'text':
			case 'hidden':
			case 'password':
			case 'textarea':
			case 'select-one':
				strSubmitContent += formElem.name + '=' + encodeURIComponent(formElem.value) + '&'
				break;
				
			// Radio buttons
			case 'radio':
				if (formElem.checked) {
					strSubmitContent += formElem.name + '=' + encodeURIComponent(formElem.value) + '&'
				}
				break;
				
			// Checkboxes
			case 'checkbox':
				if (formElem.checked) {
					// Continuing multiple, same-name checkboxes
					if (formElem.name == strLastElemName) {
						// Strip of end ampersand if there is one
						if (strSubmitContent.lastIndexOf('&') == strSubmitContent.length-1) {
							strSubmitContent = strSubmitContent.substr(0, strSubmitContent.length - 1);
						}
						// Append value as comma-delimited string
						strSubmitContent += ',' + encodeURIComponent(formElem.value);
					}
					else {
						strSubmitContent += formElem.name + '=' + encodeURIComponent(formElem.value);
					}
					strSubmitContent += '&';
					strLastElemName = formElem.name;
				}
				break;
				
		}
	}
	
	// Remove trailing separator
	strSubmitContent = strSubmitContent.substr(0, strSubmitContent.length - 1);
	return strSubmitContent;
}

function xmlhttpPost(strURL, strSubmit, strResultFunc, idToUpdate) {

        var xmlHttpReq = false;
        
        // Mozilla/Safari
        if (window.XMLHttpRequest) {
                xmlHttpReq = new XMLHttpRequest();
//                xmlHttpReq.overrideMimeType('text/xml');
        }
        // IE
        else if (window.ActiveXObject) {
                xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
        }

     xmlHttpReq.open('POST', strURL, true);
        xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xmlHttpReq.onreadystatechange = function() {
                if (xmlHttpReq.readyState == 4) {
                        eval(strResultFunc + '(xmlHttpReq.responseText, idToUpdate);');
                }
        }
     xmlHttpReq.send(strSubmit);
}

function xmlhttpGet(strURL, strResultFunc, idToUpdate) {

        var xmlHttpReq = false;
        
        // Mozilla/Safari
        if (window.XMLHttpRequest) {
                xmlHttpReq = new XMLHttpRequest();
//                xmlHttpReq.overrideMimeType('text/xml');
        }
        // IE
        else if (window.ActiveXObject) {
                xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
        }

     xmlHttpReq.open('GET', strURL, true);
        xmlHttpReq.onreadystatechange = function() {
                if (xmlHttpReq.readyState == 4) {
                        eval(strResultFunc + '(xmlHttpReq.responseText, idToUpdate);');
                }
        }
     xmlHttpReq.send(null);
}

function xmlhttpGetFromGrid(strURL) {

        var xmlHttpReq = false;
        
        // Mozilla/Safari
        if (window.XMLHttpRequest) {
                xmlHttpReq = new XMLHttpRequest();
//                xmlHttpReq.overrideMimeType('text/xml');
        }
        // IE
        else if (window.ActiveXObject) {
                xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
        }

     xmlHttpReq.open('GET', strURL, true);
     xmlHttpReq.send(null);
	 ColdFusion.Grid.refresh('thisGrid', true)
}

function displayResult(strIn, idToUpdate) {
//	document.getElementById(idToUpdate).innerHTML = strIn;
	
	// execute all javascripts within the updated div
	var div = document.getElementById(idToUpdate);
	div.innerHTML = strIn;
	var x = div.getElementsByTagName("script");
	for(var i=0;i<x.length;i++)	{
		eval(x[i].text);
	}

}

// /sr/js/ajax.js