(function($) {
	function _evaluate(value, args) {
		if (/^\$\:(\w+\.)+?\w+$/.test(value)) {
			value = bbcom.core.resolve(value.slice(2));
		}
		if (typeof value == "function") {
			value = value.apply(this, args);
		}
		return value;
	}

	var bbcom = window.bbcom || (window.bbcom = {});
	bbcom.core = {
		overflowUtils: {
			widestElem: (function(minWidth){
				var selectors = [".hero-inner"],
					width = null,
					me = this;
				for(var i=0; i<selectors.length; i++){
					$(selectors[i]).each(function(){
						if($(this).outerWidth() > minWidth){
							width = $(this).outerWidth();
						}
					});
				}
				return width;
			}(960)),
			viewportOverflowCheck: function(){
				if(this.widestElem !== null){
					var body = $("body"),
						viewportWidth = $(window).width(),
						//overflowX =  (viewportWidth > 960 && viewportWidth < this.widestElem) ? "hidden" : "",
						bodyMinWidth = this.widestElem > viewportWidth ? this.widestElem : "";
					body.css({/*overflowX: overflowX, */minWidth: bodyMinWidth});
				}
			}
		},
		resolve: function(str, createIfNotExists) {
			if (!str) {
				return null;
			}
			else {
				var basis = window,
					last = basis,
					names = str.split("."),
					name,
					i,
					j;
				for (i = 0, j = names.length; i < j; i++) {
					name = names[i];
					basis = basis[name];
					if (!basis) {
						if (createIfNotExists) {
							basis = last[name] = {};
						}
						else {
							return null;
						}
					}
					last = basis;
				}
			}
			return basis;
		},
		extend: function(supertype, subtype, overrides) {
			var ctor = function() { },
				name;
			ctor.prototype = supertype.prototype;
			subtype.prototype = new ctor();
			for (name in overrides) {
				subtype.prototype[name] = overrides[name];
			}
			subtype.prototype.constructor = supertype;
		},
		component: {
			init: function(componentType, root, params) {
				root = $(root);
				var values = {},
					args = [componentType, root, params],
					param,
					component;
				for (param in params) {
					values[param] = _evaluate(params[param], args);
				}
				component = new componentType(root, values);
				root.data("instance", component);
				return component;
			}
		},
		analytics: {
			reset: function() {
				for (var i = 100; i > 0; i--) {
					if(i == 31|| i == 25 || i == 28)
					{//Donï¿½t delete it
					}
					else{
						delete s["prop" + i];
					}
					if (i != 9) {
						delete s["eVar" + i];
					}
					delete s["c" + i];
					delete s["v" + i];
					delete s.events;
					delete s.linkTrackVars;
					delete s.linkTrackEvents;
					delete s.tlType;
				}
			},
			track: function(params, elem, linkName, linkType) {
				var trackVars = [],
					param;
				bbcom.core.analytics.reset();
				s.dontCalculateFavorable = true ;
				for (param in params) {
					if (param.indexOf("prop") > -1 || param.indexOf("eVar") > -1) {
						trackVars.push(param);
					}
					s[param] = params[param];
				}

				if (params.products) {
					s.products = params.products;
					trackVars.push("products");
				}

				if (params.campaign) {
					s.campaign=params.campaign;
				}

				if (trackVars.length) {		
					if (params.trigger != "impression" && $.inArray("eVar9", trackVars) == -1) {
						trackVars.push("eVar9");
					}
					if (params.events && $.inArray("events", trackVars) == -1 ) {
						trackVars.push("events");
					}
					s.linkTrackVars = trackVars.join(",");
				}
				if (params.events) {
					s.linkTrackEvents = s.events = params.events.toString();
				}
				if (params.h1) {
					s.hier1 = params.h1;
				}
				/* hack to support eVar being set */
				if (!linkName) {
					if(params.eVar11) {
						s.eVar11 = params.eVar11 ;
					}
					if(params.eVar12) {
						s.eVar12 = params.eVar12 ;
					}

					//set the pagetype for the error page on the load event
					if(_section === 'error') {
						s.pageType = 'error';
					}

				}
				try {
					if (elem && linkName) {
						if (linkType == "download") {
							s.tlType = "d";
						}
						else if (linkType == "exit") {
							s.tlType = "e";
						}
						else {
							s.tlType = "o";
						}
						s.tl(elem, s.tlType, linkName);
					}
					else {
						s.t();
					}
				}
				catch (err) {
					if (window.console) {
						window.console.log(err);
					}
				}
			},

		},
		init: function(root) {
			$("script[type='text/x-component']", root).each(function(i, elem) {
					var componentInfo = $.trim(elem.innerHTML).length > 0 ? $.parseJSON(elem.innerHTML) : $.parseJSON(root.data("componentInfo")),
						type = bbcom.core.resolve(componentInfo.type);
					if (!type) {
						bbcom.core.log("ERROR: Unable to initialize type " + componentInfo.type);
					}
					else {
						bbcom.core.component.init(type, $(elem.parentNode), componentInfo.params);
					}
			});
			$("script[type='text/x-analytics-sc']", root).each(function(i, elem) {
					var params = $.parseJSON(elem.innerHTML);
					bbcom.core.analytics.init($(elem.parentNode), params);
			});
			$("script[type='text/x-component-embed']", root).each(function(i, elem) {
				var newScript = document.createElement('script');
				newScript.type = 'text/javascript';
				newScript.text = elem.innerHTML;
				elem.parentNode.insertBefore(newScript, elem);
				$(elem).remove();
			});
			
			bbcom.core.overflowUtils.viewportOverflowCheck();
			$(window).resize(function(){
				bbcom.core.overflowUtils.viewportOverflowCheck();
			});
			
			//this.analytics.setCPIDCookie();
		}
	};
	
	$(window).ready(function() {
		bbcom.core.init(document.body);
	});
	
})(jQuery);S