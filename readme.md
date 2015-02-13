Placeholder Polyfill
====================

A jQuery plugin deal with browser that don't support placeholder

Polfill use span
---------------------------

###placeholder.js
Download [placeholder.js](https://raw.github.com/lvjs/placeholder/master/src/placeholder.js)
Download [html demo](https://raw.github.com/lvjs/placeholder/master/src/placeholder)


The `placeholder.js` polyfill works by insert a span which has same size with the input elem right after the input elem, and then use negative margin to position it right over the input elem. Here's how to use it:


```
//import placeholder.js to your html like this:
<script src="js/simple.js"></script>

//add placeholder for input elems when domReady
$('input').addPlaceholder("placeholderText");

//or you have just added attribute on inputs, add following code in domready function
if(!$.supportPlaceholder) {
    $('input').each(function(n) {
        if(this.placeholder) {
            $(this).addPlaceholder(this.placeholder);
        }
    })
}

//remove placeholder
$('input').removePlaceholder();
```

####Notes
The polyfill will disabled itself when the browser support placeholder.You can turn this function off by set `supportPH` to *false*. And then pass a classname param when adding placeholder to coustom your placeholder into a diffrent style in all browsers.

```
//css
.colorfulPlaceholder {
    color: #abc;
    font-family: helvetica;
}

//code
$('input').addPlaceholder("placeholderText", "colorfulPlaceholder");
```

Polfill use clone
---------------------------

###placeholder2.js

Download [placeholder2.js](https://raw.github.com/lvjs/placeholder/master/src/placeholder.js)
Download [html demo](https://raw.github.com/lvjs/placeholder/master/src/placeholder1)

Placeholder2.js is a little diffrent with the fist one, it use the input's clone to cover over the input itself. And there may have a little problem when you have styles hook on name, because I set the clone obj's name to empty for it may causes mistakes. You can refer the demo to learn how to use.


###Author
[lvjs](https://github.com/lvjs)