const fnVal = (a) => { return Number(a.substring(0,a.search(/\D/))); }

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
				fnv_iframeURL = prompt("URL:", "about:blank");

				fnv_div = document.createElement("div");
				fnv_div.className = "Device";
				fnv_iframe = document.createElement("iframe");
				fnv_iframe.className = "SubDevice";
				//fnv_iframe.onclick = function() { fnDeviceMenu(); };
				fnv_div.appendChild(fnv_iframe);
				fnv_div.addEventListener("mousemove", fnMoveDevice, false);
				fnv_div.addEventListener("touchmove", fnMoveDevice, false);
				fnv_Device = document.body.appendChild(fnv_div);
				
				if (fnv_iframeURL != null)
					{
						fnv_Device.src = fnv_iframeURL;
					}
				return fnv_Device;
			}
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
				targetBorderTopWidth : compStyles.getPropertyValue("border-top-width"),
				targetBorderBottomWidth : compStyles.getPropertyValue("border-bottom-width"),
				targetBorderLeftWidth : compStyles.getPropertyValue("border-left-width"),
				targetBorderRightWidth : compStyles.getPropertyValue("border-right-width"),
			}
		if (fnv_e.type == "touchmove" && x_pt.identifier == event.touches[0].identifier)
			{
				fnv_e.movementX = fnv_e.clientX-x_pt.clientX;
				fnv_e.movementY = fnv_e.clientY-x_pt.clientY;
				fnv_e.offsetY = fnv_e.clientY-event.target.offsetTop-fnVal(fnv_e.targetBorderTopWidth);
				fnv_e.offsetX = fnv_e.clientX-event.target.offsetLeft-fnVal(fnv_e.targetBorderLeftWidth);
			}
		
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
					  +"fnv_e.targetWidth:"+fnv_e.targetWidth+"\n"
					  +"fnv_e.targetHeight:"+fnv_e.targetHeight+"\n"
					  +"fnv_e.targetBorderTopWidth:"+fnv_e.targetBorderTopWidth+"\n"
					  +"fnv_e.targetBorderBottomWidth:"+fnv_e.targetBorderBottomWidth+"\n"
					  +"fnv_e.targetBorderLeftWidth:"+fnv_e.targetBorderLeftWidth+"\n"
					  +"fnv_e.targetBorderRightWidth:"+fnv_e.targetBorderRightWidth+"\n"
					  +"event.target.offsetLeft:"+event.target.offsetLeft+"\n"
					  +"event.target.offsetTop:"+event.target.offsetTop+"\n"
					  +"event.target.offsetWidth:"+event.target.offsetWidth+"\n"
					  +"event.target.offsetHeight:"+event.target.offsetHeight+"\n"
					  +"event.target.src:"+event.target.src+"\n"
					  +"event.target.className:"+event.target.className+"\n"
					  +"event.target.style.left:"+event.target.style.getPropertyValue('left')+"\n"
					  +"fnVal(fnv_e.targetHeight):"+fnVal(fnv_e.targetHeight)+"\n"
					  +"fnVal(fnv_e.targetWidth):"+fnVal(fnv_e.targetWidth)+"\n"
					  +"left: "+compStyles.getPropertyValue("left")+"\n"
					  +"top: "+compStyles.getPropertyValue("top")+"\n"
					  +"height: "+compStyles.getPropertyValue("height")+"\n"
					  +"width: "+compStyles.getPropertyValue("width")+"\n";
		//document.getElementById("debug_msg").innerText = fnv_message;

		if (event.buttons == 1 || (fnv_e.type == "touchmove" && x_pt.identifier == event.touches[0].identifier))
			{
				if (fnv_e.offsetY < 0)
					{ // move window
						event.target.style.left = "" + (event.target.offsetLeft + fnv_e.movementX) + "px";
						event.target.style.top = "" + (event.target.offsetTop + fnv_e.movementY) + "px";
					}
				else if (fnv_e.offsetY > 0 && fnv_e.offsetX < 0)
					{ //resize window from left side
						event.target.style.left = "" + (event.target.offsetLeft + fnv_e.movementX) + "px";
						event.target.style.width = "" + (fnv_e.movementX < 0 ? (fnVal(fnv_e.targetWidth) + Math.abs(fnv_e.movementX)) : (fnVal(fnv_e.targetWidth) - fnv_e.movementX))  + "px";
					}
				else if (fnv_e.offsetY > 0 && fnv_e.offsetY < fnVal(fnv_e.targetHeight) && fnv_e.offsetX > 0)
					{ //resize window from right side
						event.target.style.width = "" + (fnVal(fnv_e.targetWidth) + fnv_e.movementX)  + "px";
					}
				else if (fnv_e.offsetY > fnVal(fnv_e.targetHeight) && fnv_e.offsetX > 0 && fnv_e.offsetX < fnVal(fnv_e.targetWidth))
					{ //resize window from bottom
						event.target.style.height = "" + (fnVal(fnv_e.targetHeight) + fnv_e.movementY)  + "px";
					}
				event.preventDefault();
			}

		if (fnv_e.type == "touchmove")
			{
				x_pt.identifier = event.touches[0].identifier;
				x_pt.clientX = fnv_e.clientX;
				x_pt.clientY = fnv_e.clientY;
			}
	}

