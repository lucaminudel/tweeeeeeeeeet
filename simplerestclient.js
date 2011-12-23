//
// Simple REST client based on XMLHttpRequest
// Based of the following sources:
// - http://rest.elkstein.org/2008/02/using-rest-in-javascript.html
// - http://en.wikipedia.org/wiki/XMLHttpRequest#Support_in_Internet_Explorer_versions_5.2C_5.5_and_6

var tweeeeeeeeeet = (tweeeeeeeeeet === null || typeof tweeeeeeeeeet === 'undefined') ? {} : tweeeeeeeeeet;


tweeeeeeeeeet.createSimpleRestClientObject = function() {
	function createRequest() {
		var xmlhttpRequest = null;
		if (typeof XMLHttpRequest !== 'undefined') {
			// FireFox, Safari, etc.
			xmlhttpRequest = new XMLHttpRequest();
		}
		else  {
			//Provide the XMLHttpRequest constructor for Internet Explorer 5.x-6.x
			try { xmlhttpRequest = new ActiveXObject('Msxml2.XMLHTTP.6.0'); }
			catch (e1) {
				try { xmlhttpRequest = new ActiveXObject('Msxml2.XMLHTTP.3.0'); }
				catch (e2) {
					try { xmlhttpRequest = new ActiveXObject('Microsoft.XMLHTTP'); }
					catch (e3) { throw new Error("This browser does not support XMLHttpRequest."); }
				}
			}		
		 }

		if (typeof xmlhttpRequest.overrideMimeType !== 'undefined') {
			xmlhttpRequest.overrideMimeType('text/plain'); 
		}
		return xmlhttpRequest;

	}
	
	return {
		post: function(url, contentType, body, successCallback, failureCallback) {
			var request = createRequest();
			
			request.onreadystatechange = function() {
				if (request.readyState !== 4) {
					return; 
				}
				if (request.status !== 200) {
					if (typeof failureCallback !== 'undefined' && failureCallback !== null) {
						failureCallback(request);
					}
					return;
				}	

				if (typeof successCallback !== 'undefined' && successCallback !== null) {
					successCallback(request.responseText, request);
				}				
			};
			
			request.open("POST", url, true);
			request.setRequestHeader("Content-Type", contentType);
			request.send(body);
		}
	};
};

