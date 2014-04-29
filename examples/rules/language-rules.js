jQA.addQA({
	"empty paragraphs":{
		"selector":"body p",
		"filter": function(index,obj){
			// In addition to jQuery ':empty', this rule will detect tags containing whitespace only
			if($(obj).is(':empty') ||  ($(obj).children().length == 0 && $(obj).text().match(/^[\s]*$/) ) ){
				return true;
			}
			return false;
		},
		"each":function(obj){
			$(obj).css("color","red");
			$(obj).html(" (empty paragraph) ");
		},
		"severity": 2,
		"message": "Language: Page contains empty paragraphs"
	}
});
jQA.addQA({
	"and or":{
		"selector":"body *",
		"filter": function(index,obj){
			patt = /\b(and|or)(\\|\/)(and|or)\b/;
			//this clone nonsense is about getting the text, without getting the content of child elements
			if(patt.test($(obj).clone().children().remove().end().text())){
				return true;
			}
			return false;
		},
		"each": borderRed,
		"severity": 2,
		"message": "Language: Avoid the use of \"and\\or\", or is not exclusive."
	}
});
jQA.addQA({
	"end in s":{
		"selector":"body *",
		"filter": function(index,obj){
			patt=/[a-zA-Z]\/s\b|[a-zA-Z]\\s\b|[a-zA-Z]\(s\)/;
			if(patt.test($(obj).clone().children().remove().end().text())){
				return true;
			}
			return false;
		},
		"each": borderRed,
		"severity": 1,
		"message":"Language: Avoid words ending with \"\\s\" or \"(s)\". If in doubt use the plural."
	}
});
jQA.addQA({
	"end in ren":{
		"selector":"body *",
		"filter": function(index,obj){
			patt=/[a-zA-Z]\/ren\b|[a-zA-Z]\\ren\b|[a-zA-Z]\(ren\)|[a-zA-Z]\/es\b|[a-zA-Z]\\es\b|[a-zA-Z]\(es\)/;
			if(patt.test($(obj).clone().children().remove().end().text())){
				return true;
			}
			return false;
		},
		"each": borderRed,
		"severity": 1,
		"message":"Language: Avoid words ending with \"\\ren\" or \"(ren)\" E.g. \"child\\ren\". If in doubt use the plural."
	}
});
jQA.addQA({
	"under construction or coming soon":{
		"selector":"body *",
		"filter": function(index,obj){
			patt=/under construction|coming soon/;
			if(patt.test($(obj).clone().children().remove().end().text())){
				return true;
			}
			return false;
		},
		"each": borderRed,
		"severity": 2,
		"message":"Language: Avoid placeholder and teaser content \"under construction\" and \"coming soon\" messages are not helpful."
	}
});
jQA.addQA({
	"non-descriptive links":{
		"selector":"body a",
		"filter": function(index,obj){
			var a = $.trim($(obj).text()).toLowerCase();
			var b = ['read more','click here','here','more','email','intranet','website','webpage','web page','web site', 'this', 'page', 'link', 'url'];
			if($.inArray(a, b) != -1){
				return true;
			}
			return false;
		},
		"each": borderRed,
		"message": function(links){
			var badLinks =[];
			$.each(links,function(i, link){
				var linkText = $(link).text();
				if($.inArray(linkText, badLinks) == -1){
					badLinks.push(linkText);
				}
			});
			return "Language: Link text should be descriptive. Avoid link text such as: " + badLinks.join(',') + "."
		},
		"severity": 1
	}
});