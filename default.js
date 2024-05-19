
x_Dashboard = 
	{
		AddDevice : function()	{
									fnv_iframe = document.createElement("iframe");
									fnv_iframe.className = "Device";
									fnv_iframe.onclick = function() { fnDeviceMenu(); };
									fnv_iframe.onmousemove = function() { fnMoveDevice(); };
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
		fnv_message = "X:"+event.offsetX+"\n"
					  +"Y:"+event.offsetY+"\n"
					  +"button:"+event.button+"\n"
					  +"event.target.src:"+event.target.src+"\n";
		//alert(fnv_message);
	}

function fnMoveDevice()
	{
		if (event.buttons == 1)
			{
				compStyles = window.getComputedStyle(event.target);
				fnv_widthvalue = compStyles.getPropertyValue("width");
				fnv_width_index = compStyles.getPropertyValue("width").search(/\D/);
				fnv_width = Number(fnv_widthvalue.substring(0,fnv_width_index));
				fnv_heightvalue = compStyles.getPropertyValue("height");
				fnv_height_index = compStyles.getPropertyValue("height").search(/\D/);
				fnv_height = Number(fnv_heightvalue.substring(0,fnv_height_index));
				fnv_border_width = (((event.target.offsetWidth-fnv_width)/2)/2)+fnv_width; //***Fix to accomodate independant border widths
/*
				fnv_message = "event.clientX:"+event.clientX+"\n"
							  +"event.clientY:"+event.clientY+"\n"
							  +"event.offsetX:"+event.offsetX+"\n"
							  +"event.offsetY:"+event.offsetY+"\n"
							  +"event.buttons:"+event.buttons+"\n"
							  +"event.target.offsetLeft:"+event.target.offsetLeft+"\n"
							  +"event.target.offsetTop:"+event.target.offsetTop+"\n"
							  +"event.target.offsetWidth:"+event.target.offsetWidth+"\n"
							  +"event.target.offsetHeight:"+event.target.offsetHeight+"\n"
							  +"fnv_height:"+fnv_height+"\n"
							  +"fnv_width:"+fnv_width+"\n"
							  +"event.screenX:"+event.screenX+"\n"
							  +"event.screenY:"+event.screenY+"\n"
							  +"event.movementX:"+event.movementX+"\n"
							  +"event.movementY:"+event.movementY+"\n"
							  +"event.target.src:"+event.target.src+"\n"
							  +"event.target.className:"+event.target.className+"\n"
							  +"event.target.style.left:"+event.target.style.getPropertyValue('left')+"\n"
							  +"height: "+compStyles.getPropertyValue("height")+"\n"
							  +"width: "+compStyles.getPropertyValue("width")+"\n";
				document.getElementById("debug_msg").innerText = fnv_message;
*/
				if (event.offsetY < 0)
					{ // move window
						event.target.style.left = "" + (event.target.offsetLeft + event.movementX) + "px";
						event.target.style.top = "" + (event.target.offsetTop + event.movementY) + "px";
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
			}
	}


