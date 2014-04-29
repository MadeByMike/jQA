jQA.addQA({
	"no alt":{
		"selector":"body img:not([alt])",
		"each": borderRed,
		"message": "Images should have alt text",
		"severity": 2
	}
});

jQA.addQA({
	"deprecated elements":{
		"selector":"center,acronym,font,applet,strike,s,menu,dir,isindex,basefont,xmp,plaintext,bgsound,frame,frameset,noframes,layer,listing,nextid,rb,big,blink,marquee,multicol,nobr,spacer,tt",
		"each": borderRed,
		"message": function(obj){
			var elements =[];
			$.each(obj,function(i, obj){
				var tagName = $(obj).prop("tagName");
				if($.inArray(tagName, elements) == -1){
					elements.push(tagName);
				}
			});
			return "content contains <a href=\"http://www.w3.org/TR/html4/index/attributes.html\">deprecated elements</a>: "+ elements.join(', ');
		},
		"severity": 1
	}
});
var deprecated_attributes = [
	"[align]",
	"[alink]",
	"[axis]",
	"[background]",
	"[bgcolor]",
	"[border]",
	"[cellpadding]",
	"[cellspacing]",
	"[charset]",
	"[clear]",
	"[color]",
	"[compact]",
	"[coords]",
	"[face]",
	"[frame]",
	"[height]",
	"[hspace]",
	"[language]",
	"[link]",
	"[noshade]",
	"[nowrap]",
	"[rev]",
	"[rules]",
	"[scrolling]",
	"[shape]",
	"[size]",
	"[start]",
	"[text]",
	"[version]",
	"[vlink]",
	"[vspace]",
	"[width]",
	"link[rev]",
	"link[charset]",
	"link [target]",
	"a[rev]",
	"a[charset]",
	"a[shape]",
	"a[coords]",
	"a[name]",
	"a[target='blank']",
	"a[target='_blank']",
	"img[longdesc]",
	"iframe[longdesc]",
	"area[nohref]",
	"head[profile]",
	"html[version]",
	"img[name]",
	"meta[scheme]",
	"object[archive]",
	"object[classid]",
	"object[codebase]",
	"object[codetype]",
	"object[declare]",
	"object[standby]",
	"param[type]",
	"param[valuetype]",
	"table[summary]",
	"th[axis]",
	"td[axis]",
	"th[abbr]",
	"td[scope]"
];
	
jQA.addQA({
	"deprecated attribute":{
		"selector": deprecated_attributes.join(','),
		"each": borderRed,
		"message": function(obj){
			var attributes =[];
			$.each(deprecated_attributes, function(i, selector){
				if($(obj).is(selector)){
					if($.inArray(selector, attributes) == -1){
						attributes.push(selector);
					}
				}
			});
			return "Content contains <a href=\"http://www.whatwg.org/specs/web-apps/current-work/multipage/obsolete.html\">deprecated attributes</a>: "+ attributes.join(', ');
		},
		"severity": 1
	}
});
	
jQA.addQA({
	"bad anchor":{
		"selector": "a[href^='#']",
		"filter": function(i,obj){
			if($($(obj).attr('href')).length == 0){
				return true;
			}
			return false;
		},
		"each": borderRed,
		"message": "Anchor link is misssing a matching ID",
		"severity": 2
	}
});
jQA.addQA({
	"bold links":{
		"selector":"body a>b, body a>strong,body b>a, body strong>a",
		"each": borderRed,
		"message":"Link text should not be bold",
		"severity": 3
	}
});
jQA.addQA({
	"bold headings":{
		"selector":"body h1 b, body h2 b, body h3 b, body h4 b, body h5 b, body h6 b, body h1 strong, body h2 strong, body h3 strong, body h4 strong, body h5 strong, body h6 strong",
		"each": borderRed,
		"message":"Headings should not be bold",
		"severity": 3
	}
});
jQA.addQA({
	"table no th":{
		"selector":"body table:not(:has('th,thead'))",
		"each": borderRed,
		"message": "Table is missing header elements",
		"severity": 3
	}
});
jQA.addQA({
	"underline":{
		"selector":"body u",
		"each": borderRed,
		"message": "Underlined text will be confused with links",
		"severity": 3
	}
});
jQA.addQA({
	"empty tags":{
		"selector":"body *",
		"filter": function(index,obj){
			if($(obj).is(':empty') || $(obj).children().length == 0 && $(obj).text().match(/^[\s]*$/) ){
				return true;
			}
			return false;
		},
		"each":function(obj){
			$(obj).css("color","red");
			$(obj).html(" (empty tag) ");
		},
		"message": "Page contains empty tags",
		"severity": 3
	}
});
jQA.addQA({
	"email":{
		"selector":"[href^='mailto:']",
		"filter":function(index,obj){
			if($(obj).attr("href").indexOf('@') == -1){
				return true;
			}
			return false;
		},
		"each": borderRed,
		"message": "Emails must follow the format name@domain.com",
		"severity": 2
	}
});	
