
(function ( $, window, undefined) {
	var jQA = function(){
		var defaults = {
			"severity":5
		}
		var rules = {};
		this.messages = [];
		/*Public Methods*/
		this.settings = function(options){
			$.extend(defaults, options);
		}
		this.addQA = function(rule){
			$.extend(rules, rule);
		}
		this.doQA = function(done, severity){
			var messages = [];
			if (typeof severity === "undefined") {
				severity = 999;
			}
			$.each(rules, function(index,obj){
				if (obj.severity === undefined) {
					obj.severity = defaults.severity;
				}
				if (obj.severity <= severity) {
					var objects = $(obj.selector).filter(function(i,obj){
						return ($(obj).closest('.no-qa').length === 0);
					});
					if (typeof obj.filter === 'function') {
						objects = $(objects).filter(obj.filter);
					}

					if (typeof obj.each === 'function') {
						$(objects).each(function(){
							obj.each($(this));
						});
					}
					if(objects.length){
						if (typeof obj.message === 'function') {
							messages.push({"message":obj.message(objects),"severity":obj.severity});
						} else {
							messages.push({"message":obj.message,"severity":obj.severity});
						}
					}
					$(objects).each(function(index, object){
						$(object).addClass("jQA-fail");
						$(object).addClass("jQA-severity-"+obj.severity);
						if($(object).data("jQAMsg")){
							$(object).data("jQAMsg", $(object).data("jQA-msg")+','+messages[messages.length-1]['message']);
						}else{
							$(object).data("jQAMsg", messages[messages.length-1]['message']);
						}
					});
				}
			});
			if(typeof done !== "undefined"){ done(messages); }
			this.messages = messages;
		}
	}
	//Fin
	window.jQA = new jQA;
})( jQuery, window );
