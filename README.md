jQA
===

JQA is very tiny JQuery plugin to help writing quality assurance tests.

It is not intended for use in a production environment but rather on a test server or preview environment.

To set-up just include a link to the jQA script and separate test cases.

```html
<script type="text/javascript" src="/path/to/jQuery.js"></script>
<script type="text/javascript" src="/path/to/jQA.js"></script>
<script type="text/javascript" src="/path/to/my-test-cases.js"></script>
```

Writing tests cases
-------------------

You can add one or more rules at a time. Remember to give the rule a unique name and at minimum a selector. This is all that is required although without a message this is fairly usless. 

Simple rule:

```
	jQA.addQA({
		"deprecated elements":{
			"selector":"center,font,applet,strike,s,u,menu,dir,isindex,basefont",
			"message": "Do not use depreciated elements"
		});	
```
If you can include a 'filter' function, elements matched by the selector can be further intergrated. The 'each' function allows you to highlight the element on the page (or do anything with it).

A more complicated rule:

```javascript
jQA.addQA({
		"invalid emails":{
			"selector":"[href^='mailto:']",
			"filter":function(index,obj){
				//Crude email verification
				if( /(.+)@(.+){2,}\.(.+){2,}/.test($(obj).attr("href")){
					return true;
				}
				return false;
			},
			"each":function(obj){
				//Highlight error on page
				$(obj).css("border-bottom","dashed 1px red");
			},
			"message": "incorrect email format",
			"severity": 5 //Any number you like will be added to the class on the 
		}
		}
	});
```
The message can also be a function:

```javascript
jQA.addQA({
	"deprecated elements":{
		"selector":"center,font,applet,strike,s,u,menu,dir,isindex,basefont",
		"message": function(obj){
			var elements =[];
			if($(obj).is('center')){
				elements.push('center');
			}
			if($(obj).is('font')){
				elements.push('font');
			}
			if($(obj).is('applet')){
				elements.push('applet');
			}
			if($(obj).is('strike')){
				elements.push('strike');
			}
			if($(obj).is('s')){
				elements.push('s');
			}
			if($(obj).is('u')){
				elements.push('u');
			}
			if($(obj).is('menu')){
				elements.push('menu');
			}
			if($(obj).is('dir')){
				elements.push('dir');
			}
			if($(obj).is('isindex')){
				elements.push('isindex');
			}
			if($(obj).is('basefont')){
				elements.push('basefont');
			}
			return "content contains <a href=\"http://www.w3.org/TR/html4/index/attributes.html\">deprecated elements</a>: "+ elements.join(', ');
		}
	});	
```

Options
-------

Not many settings at the moment. Set a message for the jQA modal and a default severity if you like.

```javascript
jQA.settings({
			"headerMessage":"jQA has detected the following",
			"defaultSeverity":5
	});
```


Initiating QA
-------------

Rules can be added before the DOM has loaded. Once the page is ready, and you have added all the rules simple run `jQA.doQA()` the slient flag will tell jQA to log the errors to the console rather than displaying them.

```javascript
$(document).ready(function(){
	var slient = true;
	jQA.doQA(slient);
});
```