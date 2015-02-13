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

	//传入 className 设置placeholder的颜色，字体大小等(需关注选择器权重问题)，或采用默认设置（推荐）
	function _addPlaceholder($elem, placeholderText, className) {
		
		//处理原生支持placeholder或者已经添加过placeholder的情况
		if(supportPH) {
			$elem.attr('placeholder', placeholderText);
			return;
		} else if($elem.attr('_addedPlaceHolder')) {
			if($elem.attr('_addedPlaceHolder') !== placeholderText) {
				$elem.attr('_addedPlaceHolder', placeholderText);
				$elem.next().val( placeholderText );
				$elem.blur();
			}
			return;
		}
		
		//不支持placeholder，并且未添加过
		var elemWidth = $elem.css('width').match(rNum),
			elemMRight = $elem.css('margin-right').match(rNum),
			elemBoxSizing = $elem.css('box-sizing');

		elemWidth = elemWidth ? parseFloat(elemWidth[0]) : 0;
		elemMRight = elemMRight ? parseFloat(elemMRight[0]) : 0;
		var placeholderElem = $.clone($elem[0]),
			$placeholderElem = $(placeholderElem);

		//placeholderElem.id = "";
		//为了避免引起提交问题，将name置空，如果有跟name挂钩的样式，有可能出现显示问题
		placeholderElem.name = "";
		var marginLeft = elemBoxSizing === 'border-box' ? 
			elemWidth + elemMRight: 
			$elem.outerWidth() + elemMRight;
		$placeholderElem.css('margin-left', -marginLeft + 'px');

		//定义事件
		$elem.on('blur', function(e) {
			if(this.value == '' || this.value == undefined) {
				$placeholderElem.val(placeholderText).show();
			} else {
				$placeholderElem.hide();
			}
		}).blur();
		$placeholderElem.on('focus click', function() {
			$(this).hide();
			$elem.show().focus();
		});
		
		//设置placeholder的 颜色等, 支持传入class自定义
		if( typeof className === 'string' && $.trim( className ) !== '') {
			placeholderElem.className = className;
		} else {
			$placeholderElem.css({color: "#ccc"});
		}

		//将placeholder插入dom
		$placeholderElem.insertAfter($elem);

		//对添加过placeholder进行标记
		$elem.attr('_addedPlaceHolder', placeholderText);
	}

	$.extend({
		addPlaceholder: function(el, text, className) {
			switch($.type(el)) {
				case 'object':
					if(el.tagName === 'input' || el.tagName === 'textarea') {
						_addPlaceholder($(el), text, className);
					} else if(el instanceof jQuery) {
						for(var i = 0, elem; (elem = el[i]) != null; i++) {
							if($.type(elem) === 'object' && (elem.tagName.toLowerCase() === 'input' || elem.tagName.toLowerCase() === 'textarea')) {
								_addPlaceholder($(elem), text, className);
							}
						}
					}
					break;
				case 'string':
					var $elem = $('#el');
					if($elem[0] && ($elem[0].tagName.toLowerCase() === 'input' || $elem[0].tagName.toLowerCase() === 'textarea')) {
						_addPlaceholder($elem, text, className);
					}
					break;
				default:
					break;
				return el;
			}
		}
	});
}());

