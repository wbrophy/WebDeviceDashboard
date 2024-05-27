function myFunction(event) {
  var x = event.touches[0].clientX;
  var y = event.touches[0].clientY;
  document.getElementById("demo").innerHTML = x + ", " + y;
}

x_pt =
	{
		identifier : null,
		clientX : 0,
		clientY : 0
	}

x_Dashboard = 
	{
		AddDevice : function()	
						{
							fnv_iframe = document.createElement("iframe");
							fnv_iframe.className = "Device";
							//fnv_iframe.onclick = function() { fnDeviceMenu(); };
							//fnv_iframe.onmousemove = function() { fnMoveDevice(); };
							fnv_iframe.addEventListener("mousemove", fnMoveDevice, false);
							//fnv_iframe.onmousedown = function() { fnDeviceMenu(); };
							//fnv_iframe.ontouchstart = function() { fnDeviceMenu(); };
							//fnv_iframe.addEventListener("touchstart", fnDeviceMenu, false);
							fnv_iframe.ontouchmove = function() { myFunction(event); };
							//fnv_iframe.addEventListener("touchmove", fnDeviceMenu, false);
							fnv_Device = document.body.appendChild(fnv_iframe);
							
							fnv_iframeURL = prompt("URL:", "about:blank");
							if (fnv_iframeURL != null)
								{
									fnv_Device.src = fnv_iframeURL;
								}
							return fnv_Device;
						}
	}
			

function fnDeviceMenu()
	{
		fnv_message = "event.type:"+event.type+"\n"
					  +"X:"+event.offsetX+"\n"
					  +"Y:"+event.offsetY+"\n"
					  +"button:"+event.button+"\n"
					  +"event.target.src:"+event.target.src+"\n"; alert(fnv_message);
	}


function fnMoveDevice()
	{
		compStyles = window.getComputedStyle(event.target);

		fnv_e = 
			{
				type : event.type,
				buttons : event.buttons,
				touches : (event.type == "touchmove" ? event.touches.length : 0),
				clientX : (event.type == "touchmove" ? event.touches[0].clientX : event.clientX),
				clientY : (event.type == "touchmove" ? event.touches[0].clientY : event.clientY),
				offsetX : (event.type == "touchmove" ? event.touches[0].offsetX : event.offsetX),
				offsetY : (event.type == "touchmove" ? event.touches[0].offsetY : event.offsetY),
				screenX : (event.type == "touchmove" ? event.touches[0].screenX : event.screenX),
				screenY : (event.type == "touchmove" ? event.touches[0].screenY : event.screenY),
				movementX : (event.type == "touchmove" ? 0 : event.movementX),
				movementY : (event.type == "touchmove" ? 0 : event.movementY),
				targetWidth : compStyles.getPropertyValue("width"),
				targetHeight : compStyles.getPropertyValue("height"),
				translate : compStyles.getPropertyValue("-webkit-transform")
			}
		fnv_e.movementX = (fnv_e.type == "touchmove" ? (x_pt.identifier == event.touches[0].identifier ? (fnv_e.clientX-x_pt.clientX):0) : event.movementX);
		fnv_e.movementY = (fnv_e.type == "touchmove" ? (x_pt.identifier == event.touches[0].identifier ? (fnv_e.clientY-x_pt.clientY):0) : event.movementY);
		
		fnv_width = Number(fnv_e.targetWidth.substring(0,fnv_e.targetWidth.search(/\D/)));
		fnv_height = Number(fnv_e.targetHeight.substring(0,fnv_e.targetHeight.search(/\D/)));
		fnv_border_width = (((event.target.offsetWidth-fnv_width)/2)/2)+fnv_width; //***Fix to accomodate independant border widths
		fnv_translate = fnv_e.translate;
		fnv_matrix = fnv_translate.replace("matrix","");
		fnv_matrix = fnv_matrix.replace("(","");
		fnv_matrix = fnv_matrix.replace(")","");
		fnv_matrix = fnv_matrix.replace(" ","");
		fnv_matrix1 = fnv_matrix.split(",");
		fnv_transformX = fnv_matrix1[4];
		fnv_transformY = fnv_matrix1[5];
		fnv_message = "fnv_e.type:"+fnv_e.type+"\n"
					  +"fnv_e.buttons:"+fnv_e.buttons+"\n"
					  +"fnv_e.touches:"+fnv_e.touches+"\n"
					  +"fnv_e.clientX:"+fnv_e.clientX+"\n"
					  +"fnv_e.clientY:"+fnv_e.clientY+"\n"
					  +"fnv_e.offsetX:"+fnv_e.offsetX+"\n"
					  +"fnv_e.offsetY:"+fnv_e.offsetY+"\n"
					  +"fnv_e.screenX:"+fnv_e.screenX+"\n"
					  +"fnv_e.screenY:"+fnv_e.screenY+"\n"
					  +"fnv_e.movementX:"+fnv_e.movementX+"\n"
					  +"fnv_e.movementY:"+fnv_e.movementY+"\n"
					  +"fnv_translate:"+fnv_translate+"\n"
					  +"fnv_matrix:"+fnv_matrix+"\n"
					  +"fnv_matrix1:"+fnv_matrix1+"\n"
					  +"fnv_transformX:"+fnv_transformX+"\n"
					  +"fnv_transformY:"+fnv_transformY+"\n"
					  +"event.target.offsetLeft:"+event.target.offsetLeft+"\n"
					  +"event.target.offsetTop:"+event.target.offsetTop+"\n"
					  +"event.target.offsetWidth:"+event.target.offsetWidth+"\n"
					  +"event.target.offsetHeight:"+event.target.offsetHeight+"\n"
					  +"event.target.src:"+event.target.src+"\n"
					  +"event.target.className:"+event.target.className+"\n"
					  +"event.target.style.left:"+event.target.style.getPropertyValue('left')+"\n"
					  +"fnv_height:"+fnv_height+"\n"
					  +"fnv_width:"+fnv_width+"\n"
					  +"left: "+compStyles.getPropertyValue("left")+"\n"
					  +"top: "+compStyles.getPropertyValue("top")+"\n"
					  +"height: "+compStyles.getPropertyValue("height")+"\n"
					  +"width: "+compStyles.getPropertyValue("width")+"\n";
		document.getElementById("debug_msg").innerText = fnv_message;

		if (event.buttons == 1)
			{

				if (event.offsetY < 0)
					{ // move window
						event.target.style.left = "" + (event.target.offsetLeft + event.movementX) + "px";
						event.target.style.top = "" + (event.target.offsetTop + event.movementY) + "px";
						event.target.style['-webkit-transform'] = 'translate('+(event.movementX)+'px,'+event.movementY+'px)';
					}
				else if (event.offsetY > 0 && event.offsetX < 0)
					{ //resize window from left side
						fnv_widthvalue = compStyles.getPropertyValue("width");
						fnv_index = compStyles.getPropertyValue("width").search(/\D/);
						fnv_width = Number(fnv_widthvalue.substring(0,fnv_index));
						fnv_move = event.movementX;
						event.target.style.left = "" + (event.target.offsetLeft + fnv_move) + "px";
						event.target.style.width = "" + (fnv_move < 0 ? (fnv_width + Math.abs(fnv_move)) : (fnv_width - fnv_move))  + "px";
					}
				else if (event.offsetY > 0 && event.offsetY < fnv_height && event.offsetX > 0)
					{ //resize window from right side
						fnv_move = event.movementX;
						event.target.style.width = "" + (fnv_width + fnv_move)  + "px";
					}
				else if (event.offsetY > fnv_height && event.offsetX > 0 && event.offsetX < fnv_width)
					{ //resize window from bottom
						fnv_move = event.movementY;
						event.target.style.height = "" + (fnv_height + fnv_move)  + "px";
					}
				event.preventDefault();
			}
/*		else
			{
				fnv_message = "event.type:"+event.type+"\n"
							+"X:"+event.offsetX+"\n"
							+"Y:"+event.offsetY+"\n"
							+"button:"+event.button+"\n"
							+"event.target.src:"+event.target.src+"\n";
							document.getElementById("debug_msg").innerText = fnv_message;
		  }*/

		if (fnv_e.type == "touchmove")
			{
				x_pt.identifier = event.touches[0].identifier;
				x_pt.clientX = fnv_e.clientX;
				x_pt.clientY = fnv_e.clientY;
			}
	}

