$(document).ready(function(){


	// hide clear btn when no faves


	// vars
	var arrCookie = [],
		$window = $(window),
		$faves = $('.faves'),
		strBorderCol = "border-color",
		$calcOutput = $('.calc__output'),
		calcOutputVal = '.calc__output--val',
		$inputFrom = $('[data-calc="from"]'),
		$inputTo = $('[data-calc="to"]'),
		$inputImport = $('.faves__import'),
		strColorFrom = $inputFrom.val(),
		strColorTo = $inputTo.val(),
		strValReplace = "",
		strVarReplace = ""



	// functions
	function checkVals( callback ){

		$('input').each(function(e){
			//vars
			var $this = $(this),
				strDataType = $this.attr('data-type'),
				strDataVar = $this.attr('data-var'),
				strDataCalcType,
				strVal = $this.val().replace(/\;/g, "").replace(/\s/g, ""),
				strPrefix = "#",
				strPrefixCheck = /\#/
			// if var field, change the prefix
			if (strDataType == "var") {
				strPrefix = "$"
				strPrefixCheck = /\$/
			}
			// if input is not empty or null, prepend the correct prefix
			if ((strVal !== "") && (strVal.match( strPrefixCheck ) == null)){
				strVal = strPrefix + strVal
				// set new val
				updateInput( $this, strVal )
			}
			// if main 'from' input,
			if ( $('[data-calc]') ){
				strDataCalcType = $(this).attr('data-calc')
			}
			if ( strDataCalcType == "from" ){
				$this.css( "border-color", strVal )
				setCookie( "scfc-from", strVal )
				// if 'from' field matches any of values in faves, get var and add to calculation
				$('.faves__itm *[data-type="col"]').each(function(){
					if ( $(this).val() === $inputFrom.val() ){
						strValReplace = $(this).val()
						strVarReplace = $(this).siblings('[data-type="var"]').val()
						return false
					} else {
						strValReplace = ""
						strVarReplace = ""
					}
				})
			// if main 'to' input
			} else if ( strDataCalcType == "to" ){
				$this.css( "border-color", strVal )
				setCookie( "scfc-to", strVal )
			//  else if colour field, set the border color
			} else if ( strDataType == "col" ){
				$this.parent(".border").css( "border-color", strVal )
				var strVar = $this.siblings("[data-type='var']").val()
				if ((strVal !== "")){
					arrCookie.push( [strVar,strVal] )
				}
			}
		})
		callback( arrCookie )
		strColorFrom = $inputFrom.val()
		strColorTo = $inputTo.val()
		runCalc( strValReplace, strVarReplace )

		if ($('.faves__itm').length){
			$faves.addClass('full')
		} else {
			$faves.removeClass('full')
		}
	}
	function getData( callback ){
		var strCookieFaves = getCookie( "scfc-faves" )
		if (strCookieFaves){
			strCookieFaves = JSON.parse( strCookieFaves )
			for (var i = 0; i < strCookieFaves.length; i++) {
				addFave(strCookieFaves[i][0], strCookieFaves[i][1])
			}
		}
		var scfcFrom = getCookie( "scfc-from" )
		var scfcTo = getCookie( "scfc-to" )
		scfcFrom == "" && (scfcFrom = "#FF0000")
		scfcTo == "" && (scfcTo = "#AA0000")
		$('[data-calc="from"]').val( scfcFrom )
		$('[data-calc="to"]').val( scfcTo )
		callback()
	}
	function getCookie( name ) {
	    var value = "; " + document.cookie, parts = value.split("; " + name + "=")
	    return parts.pop().split(";").shift()
	}
	function setCookie( cname, cvalue ) {
	    var d = new Date(), expires
	    d.setTime(d.getTime() + (2 * 24 * 60 * 60 * 10000))
	    document.cookie = cname+"="+cvalue+";path=/;expires=" + d.toUTCString()
	}
	function addFave( strVar, strCol ){
		$('.faves__form').append("<div class='faves__itm border input__group'><input data-type='col' data-var='' value='" + strCol + "' tabindex='1'><input data-type='var' value='" + strVar + "' tabindex='1'><button class='calc__faves__btn btn calc__faves--apply'><svg><use xlink:href='#icon_arrow' x='0' y='0'></use></svg></button></div>")
		$('.faves__itm').last().children('input').first().focus()
	}
	function updateInput( strEl, strVal ){
		strEl.css(strBorderCol, strVal ).val( strVal )
	}
	function stripVal( strText, intDecimal ){
		return strText.toFixed( intDecimal ).replace(/\.0/g,'')
	}
	function hexToHSL( hex ){
		var c;
		if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
			c= hex.substring(1).split('')
			if(c.length== 3){
				c= [c[0], c[0], c[1], c[1], c[2], c[2]]
			}
			c= '0x'+c.join('');
			var r = ((c>>16)&255),
				g = (c>>8)&255,
				b = c&255

			r = r /= 255, g = g /= 255, b = b /= 255

			var max = Math.max(r, g, b), min = Math.min(r, g, b)
			var h, s, l = (max + min) / 2

			if (max == min) {
				h = s = 0 // achromatic
			} else {
				var d = max - min
				s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

				switch (max) {
					case r: h = (g - b) / d + (g < b ? 6 : 0); break
					case g: h = (b - r) / d + 2; break
					case b: h = (r - g) / d + 4; break
				}
				h /= 6
			}
			return [h*360, s*100, l*100]
		}
	}
	function runCalc( strVal, strVar ){
		if ( (strColorFrom !== "") && (strColorTo !== "") ){
			var colorFromHSL = hexToHSL( strColorFrom ),
				colorToHSL = hexToHSL( strColorTo )

			if ( (colorFromHSL !== undefined) && (colorToHSL !== undefined) ){
				var arrColors = [ hexToHSL( strColorFrom ), hexToHSL( strColorTo )]

				var h0 = arrColors[0][0],
					h1 = arrColors[1][0],
					s0 = arrColors[0][1],
					s1 = arrColors[1][1],
					l0 = arrColors[0][2],
					l1 = arrColors[1][2],
					sType, lType,
					hDiff = h1-h0,
					sDiff = s1-s0,
					lDiff = l1-l0

				strOutput = strColorFrom.toUpperCase()
				var hDiffStrip =  parseInt(stripVal(h0-h1))
				if ((hDiffStrip !== 0) || (hDiffStrip !== -0)){
					if (h1 < h0){
						hDiff = 360-(h0-h1)
					}
					hDiff = stripVal(hDiff , 1)
					if (hDiff !== "360"){
						strOutput = "adjust-hue(" + strOutput + ", " + hDiff + ")"
					}
				}
				if (sDiff !== 0){
					if (s1 > s0){
						sType = "saturate"
					} else {
						sDiff = s0-s1
						sType = "desaturate"
					}
					strOutput = sType + "(" + strOutput + ", " + stripVal( sDiff, 1 ) + ")"
				}
				if (lDiff !== 0){
					if (l1 > l0){
						lType = "lighten"
					} else {
						lDiff = l0-l1
						lType = "darken"
					}
					strOutput = lType + "(" + strOutput + ", " + stripVal( lDiff, 1 ) + ")"
				}
			} else {
				strOutput = ""
			}
			if (strVar){
				strOutput = strOutput.replace(strVal.toUpperCase(), strVar)
			}
			$(calcOutputVal).text( strOutput )
		}
	}



	// events
	// window load
	$window.on('load', function(){
		getData( function(){
			checkVals( function(){
				$window.addClass('loaded')
			})
		})
	})
	// on input blur
	$('.main__form input').on('focus', function(){
		$faves.addClass('closed')
	})
	// toggle faves
	$('.calc__faves--expand').on('click', function(){
		$faves.toggleClass('closed').removeClass('confirm').removeClass('import')
		$('html').removeClass('view-changelog')
	})
	// add fave
	$('.calc__faves--add').on('click', function(){
		addFave("", "")
		$faves.removeClass('import confirm')
		$('html').removeClass('view-changelog')
	})
	$('.calc__faves--import').on('click', function(){
		$faves.toggleClass('import')
		$faves.removeClass('confirm')
		$('html').removeClass('view-changelog')
	})
	$('.calc__faves--clear').on('click', function(){
		$faves.addClass('confirm')
	})
	$('.calc__faves--confirm .btn').on('click', function(){
		$('.faves__itm').remove()
		setTimeout(function() {
			checkVals( function(){
				setCookie( "scfc-faves", "" )
			})
			$faves.removeClass('confirm')
		}, 10);
	})
	$('.changelog__btn').on('click', function(){
		$('html').toggleClass('view-changelog')
	})
	// run animation
	$calcOutput.on('click', function(){
		if ( $(calcOutputVal).text() !== "" ){
			$(this).addClass('active')
			//$faves.addClass('closed');
		}
	})
	// check animation end
	$(document).on('webkitAnimationEnd oanimationend msAnimationEnd animationend', '.calc__output--success', function(e) {
	    $calcOutput.removeClass('active');
	})
	// apply click to main
	$(document).on('click', '.calc__faves--apply', function(e){
		e.preventDefault()
		updateInput( $('[data-calc="from"]'), $(this).siblings('[data-var]').val() )
		$('[data-calc="from"]').attr('data-var', $(this).siblings('[data-type="var"]').val() )
		checkVals( function(){})
	})
	// on field change
	$(document).on('change paste keypress blur', 'input:not(.faves__import)', function() {
		setTimeout(function() {
			arrCookie = []
			checkVals( function(){
				setCookie( "scfc-faves", JSON.stringify( arrCookie ) )
			})
		}, 0)
	})



	// import
	var blnImportFocus = false
	$inputImport.focus(function(){
		blnImportFocus = true
	})
	$inputImport.blur(function(){
		blnImportFocus = false
	})

	$(document).keypress(function(e) {
	    if ((e.which == 13) && blnImportFocus ){
	    	e.preventDefault()

	    	var strImport = $inputImport.val()
	    	strImport = strImport.replace(/\#/g, ":#")
	    	strImport = strImport.replace(/\$/g, ";$")
	    	strImport = strImport.replace(/\;/g, ";$")
	    	strImport = strImport.toString()
	    	strImport = strImport.replace(/\s/g, "")
	    	strImport = strImport.replace(/([\/]).*?([/])/g, "")

	    	var arrImportSplit = strImport.split(";")
	    	for (i=0; i<arrImportSplit.length; i++){
	    		var thisEntry = arrImportSplit[i]
	    		if (thisEntry != ""){
		    		thisEntry = thisEntry.replace("$$", "$")
		    		thisEntry = thisEntry.replace("::", ":")
		    		thisEntry = thisEntry.replace("mason-hex-", "")
		    		if (thisEntry != "$"){
			    		var arrEntry = thisEntry.split(":")
			    		addFave( arrEntry[0], arrEntry[1])
		    		}
	    		}
	    	}
	    	$faves.removeClass('import')
	    	setTimeout(function() {
	    		$inputImport.val("")
	    	}, 300);
	    }
	});




	// copy link to clipboard
	$(document).on("click", calcOutputVal, function(e) {
		e.preventDefault()

	    var targetId = "_hiddenCopyText_"
        // must use a temporary form element for the selection and copy
        var target = document.createElement("textarea")
        target.style.position = "absolute"
        target.style.left = "-9999px"
        target.style.top = "0"
        target.id = targetId
        document.body.appendChild(target)
        target.textContent = $(this).text()

	    // select the content
	    var currentFocus = document.activeElement,
	    	winPosX = window.scrollX,
	    	winPosY = window.scrollY
	    target.focus()
	    // set window scroll position to stop focus moving position
	    window.scrollTo(winPosX, winPosY)
	    target.setSelectionRange(0, target.value.length)

	    // copy the selection
	    var succeed;
	    try {
	    	succeed = document.execCommand("copy")
	    	//console.log('copied to clipboard')
	    } catch(e) {
	        succeed = false
	    }
	    // restore original focus
	    if (currentFocus && typeof currentFocus.focus === "function") {
	        currentFocus.focus()
	    }

        target.remove()
	    return succeed
	});


});