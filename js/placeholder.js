;(function(){
	var rNum = /\d*\.?\d+/;

	function supportPlaceholder() {
		var el = document.createElement('input'),
			support = false;
		if('placeholder' in el) {
			support = true;
		}
		el = null;
		return support;
	}

	var supportPH = supportPlaceholder();
	if($.supportPlaceholder == null) {
		$.supportPlaceholder = supportPH;
	}

	//传入 className 设置placeholder的 overflow，颜色，字体大小，或采用默认设置（推荐）
	function _addPlaceholder($elem, placeholderText, className) {
		if(supportPH) {
			$elem.attr('placeholder', placeholderText);
			return $elem;
		} else if($elem.attr('_addedPlaceHolder')) {
			if($elem.attr('_addedPlaceHolder') !== placeholderText) {
				$elem.attr('_addedPlaceHolder', placeholderText);
				$elem.next().html( placeholderText );
				$elem.blur();
			}
			return $elem;
		}
		
		var elemWidth = $elem.css('width').match(rNum),
			elemHeight = $elem.css('height').match(rNum),

			elemPTop = $elem.css('padding-top').match(rNum),
			elemPLeft = $elem.css('padding-left').match(rNum),
			elemPBottom = $elem.css('padding-bottom').match(rNum),
			elemPRight = $elem.css('padding-right').match(rNum),
			
			elemMRight = $elem.css('margin-right').match(rNum),

			elemBorderLeft = $elem.css('border-left-width').match(rNum),
			elemBorderRight = $elem.css('border-Right-width').match(rNum),
			elemBorderTop = $elem.css('border-top-width').match(rNum),
			elemBorderBottom = $elem.css('border-bottom-width').match(rNum),

			elemBoxSizing = $elem.css('box-sizing');

			elemWidth = elemWidth ? parseFloat(elemWidth[0]) : 0;
			elemHeight = elemHeight ? parseFloat(elemHeight[0]) : 0;
			elemPTop = elemPTop ? parseFloat(elemPTop[0]) : 0;
			elemPLeft = elemPLeft ? parseFloat(elemPLeft[0]) : 0;
			elemPBottom = elemPBottom ? parseFloat(elemPBottom[0]) : 0;
			elemPRight = elemPRight ? parseFloat(elemPRight[0]) : 0;
			elemMRight = elemMRight ? parseFloat(elemMRight[0]) : 0;
			elemBorderLeft = elemBorderLeft ? parseFloat(elemBorderLeft[0]) : 0;
			elemBorderRight = elemBorderRight ? parseFloat(elemBorderRight[0]) : 0;
			elemBorderTop = elemBorderTop ? parseFloat(elemBorderTop[0]) : 0;
			elemBorderBottom = elemBorderBottom ? parseFloat(elemBorderBottom[0]) : 0;

		var placeholderElem = document.createElement('span'),
			$placeholderElem = $(placeholderElem);
		
		placeholderElem.innerHTML = placeholderText;
		placeholderElem.isPlaceholder = 1;


		//设置placeholder的垂直对齐
		var valign = $elem.css('vertical-align');
		valign = valign == 'baseline' ? 'bottom' : valign;
		$placeholderElem.css('vertical-align', valign);

		//设置placeholder的水平对齐
		//支持border-box 和 content-box检测，（忽略padding-box，因为只有火狐支持，不推荐使用）
		var marginLeft = elemBoxSizing === 'border-box' ? 
			elemWidth + elemMRight : 
			$elem.outerWidth() + elemMRight;
		$placeholderElem.css('margin-left', -marginLeft + 'px');

		//设置placeholder的 显示方式，宽度，上、左、下padding，height, line-height
		placeholderWidth = elemBoxSizing === 'border-box' ? 
			elemWidth - 1 + 'px' :
			elemWidth + elemBorderRight + elemPRight - 1 + 'px';
		$placeholderElem.css({ display: 'inline-block', 
			width: placeholderWidth,
			height: elemHeight - 1 + 'px',
			'line-height': $elem.css('line-height'),
			'padding-top': elemPTop + elemBorderTop + 'px', 
			'padding-left': elemPLeft + elemBorderLeft + 'px', 
			'padding-bottom': elemPBottom + elemBorderBottom + 'px'
		});

		//设置placeholder的 overflow，颜色，字体大小，支持传入class自定义
		if( typeof className === 'string' && $.trim( className ) !== '') {
			placeholderElem.className = className;
		} else {
			$placeholderElem.css({ 'over-flow': 'hidden', 
				color: "#ccc", 
				'font-size': $elem.css('font-size')
			});
		}

		//定义事件
		$elem.on('blur focus keydown keyup', function(e) {
			var keyCode = e.keyCode;
			if(e.type === 'keydown' && keyCode > 31 && keyCode < 127) {
				$placeholderElem.hide();
			}
			if(this.value == '' || this.value == undefined) {
				$placeholderElem.show();
			} else {
				$placeholderElem.hide();
			}
		}).blur();
		$placeholderElem.on('click', function() {
			$elem.focus();
		})

		//将placeholder插入dom
		$placeholderElem.insertAfter($elem);

		//对添加过placeholder进行标记
		$elem.attr('_addedPlaceHolder', placeholderText);
		return $elem;
	}
	function _removePlaceholder($elem) {
		if(supportPH) {
			$elem.removeAttr('placeholder');
		} else if($elem.attr('_addedPlaceHolder')) {
			if($elem.attr('_addedPlaceHolder')) {
				$elem.removeAttr('_addedPlaceHolder');
				if($elem.next().attr('isPlaceholder')) {
					$elem.next().remove();
				}
			}
		}
		return $elem;
	}

	$.fn.extend({
		addPlaceholder: function(text, className) {
			for(var i = 0, el; (el = this[i]) != null; i++) {
				if($.type(el) === 'object' && (el.tagName.toLowerCase() === 'input' || el.tagName.toLowerCase() === 'textarea')) {
					_addPlaceholder($(el), text, className);
				}
			}
			return this;
		},
		removePlaceholder: function() {
			for(var i = 0, el; (el = this[i]) != null; i++) {
				if($.type(el) === 'object' && (el.tagName.toLowerCase() === 'input' || el.tagName.toLowerCase() === 'textarea')) {
					_removePlaceholder(this);
				}
			}
			return this;
		}
	});
}());


