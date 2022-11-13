(function ($) {
	
	var bbcom = window.bbcom || (window.bbcom = {});
	if (!bbcom.desktop) {
		bbcom.desktop = {};
	}
	if (!bbcom.desktop.smartphones) {
		bbcom.desktop.smartphones = {};
	}
	if (!bbcom.desktop.smartphones.pinnedNavigation) {
		bbcom.desktop.smartphones.pinnedNavigation = {};
	}
	bbcom.desktop.smartphones.pinnedNavigation.a = function(root, params) {
		if (params.isEditMode || params.nonJsMode) return;
		var me = this;
		this.root = root;
		this.pageSections = $(params.pageSectionSelector);
		this.originalTopPosition =120;
	    this.isFixedPosition = false;
	    this.top = this.root.find(".top");
	    this.topOffset = this.root.offset().top - parseInt(this.root.css("top"));
	    this.root.css({"top": "72px", "opacity": "0"});
	    $("a.anchor-top").hide();
	    $(window).on("scroll", $.proxy(this.onscroll_window, this));
	    $(window).on("resize", $.proxy(this.onresize_window, this));
	    $("a.descend").on("click", $.proxy(this.onclick_descend, this));
	    this.root.find(".go-top").on("click", $.proxy(this.onclick_goTop, this));
	    this.root.find(".navigation a").on("click", $.proxy(this.onclick_navigation, this))
	    	.add(".links .buy a", this.root)
		    .each(function(i, el){
		    	var linkName = i > 0 ? $(el).text().replace(/\W/g, '').toLowerCase() : "intro";
		    	$(el).data("linkName", linkName);
		    })
		    .click($.proxy(this.trackLinks,this));
	    this.updateTop(window);
	    setTimeout(function(){
            me.init();
        }, 1000);
	};
	bbcom.desktop.smartphones.pinnedNavigation.a.prototype = {
		isScrolling: false,
		isAnimating: false,
		onclick_goTop: function(e) {
			e.preventDefault();
	    	this.scrollToTop();
		},
		onclick_navigation: function(e) {
			e.preventDefault();
	    	var $link = $(e.currentTarget).closest("li");
	    	this.scrollToSection($("#" + $link.attr("aria-controls")));
		},
		onclick_descend: function(e) {
			e.preventDefault();
	    	var currentPageSection = $(e.currentTarget).closest(".page-section"); 
	    	var href = $(e.currentTarget).attr("href");
	    	if (href && href.charAt(0) === "#" && $(href).length > 0){
	    		this.scrollToSection($(href));
	    	} 
	    	else if (currentPageSection.length > 0) {
	    		this.scrollToSection(currentPageSection.next());
	    	}
	    	else {
	    		this.scrollToSection(this.pageSections.first());
	    	}
		},
		onresize_window: function(e) {
			this.updateTop(e.currentTarget);
		},
		onscroll_window: function(e) {
			var $window = $(e.currentTarget),
				me = this;
			if ($window.scrollTop() > this.topOffset && !this.isFixedPosition ) {
                if (!this.isAnimating) {
                	this.transformToFixed();
                }
            }
            else if ($window.scrollTop() <= me.topOffset && me.isFixedPosition  ) {
            	if (!this.isAnimating) {
	                this.transformToNormal();
	                this.clearLinks();
            	}
            }
            this.pageSections.each(function(i, pageSection) {
                if (!me.isScrolling) {
                	me.updateSelectedLink(pageSection);
                }
            });
		},
		init: function() {
			var me = this;
			this.root.animate({"top": "96px", "opacity": "1" }, 500, "easeInOutExpo", function() {
				me.initSelectors();
			});
		},
		initSelectors: function() {
			var urlArray = document.location.href.split("/"),
				pageName = urlArray[urlArray.length - 1],
				selectorArray = pageName.split("."),
				sectionName,
				subSectionName;
			if (selectorArray.length > 2) {
				sectionName = selectorArray[1];
				if (selectorArray.length > 3) {
					subSectionName = selectorArray[2];
				}
			}
			if (sectionName && subSectionName) {
				this.scrollToSection($(".page-section.section-" + sectionName).first(), subSectionName);
			}
			else if (sectionName) {
				this.scrollToSection($(".page-section.section-" + sectionName).first(), "viaSelector");
			}
		},
		updateTop: function(window) {
			var $window = $(window);
			if (this.isFixedPosition) {
				if (this.top.hasClass("hidden") && $window.width() > 1079) {
					this.top.removeClass("hidden")
						.css("display", "block");
				}
				else {
					if ($window.width() <= 1079) {
						this.top.addClass("hidden")
							.css("display", "none");
					}
				}
			}
		},
		updateSelectedLink: function(pageSection) {
			var me = this, 
				$pageSection = $(pageSection),
				$link = $("li[id='" + $pageSection.attr("aria-labeledby") + "']", me.root);
		    if (me.sectionInView(window, $pageSection.offset().top, $pageSection.height())) {
		        if (!$link.hasClass("selected")) {
		            me.clearLinks();
		            $link.addClass("selected");
		        }
		    }
		},
		sectionInView: function(window, pageSectionYOffset, pageSectionHeight) {
			if ($(window).scrollTop() > pageSectionYOffset  - (pageSectionHeight / 2) && $(window).scrollTop() < (pageSectionYOffset + pageSectionHeight)) {
	            return true;
	        }
			else {
	            return false;
	        }
		},
		scrollToTop: function() {
			var me = this;
			this.isScrolling = true;
			$("html, body").animate({scrollTop: 0}, 1500, "easeInOutExpo")
				.promise().done(function() {
					me.isScrolling = false;
					me.clearLinks();
				});
		},
		scrollToSection: function(pageSection, pageSubSection) {
			if (pageSection && pageSection.offset()) {
				var me = this;
				this.isScrolling = true;
				$("html, body").animate({scrollTop: pageSection.offset().top - 56}, 1500, "easeInOutExpo")
					.promise().done(function() {
						me.isScrolling = false;
						me.updateSelectedLink(pageSection);
						if (pageSubSection) {
							if (pageSubSection == "viaSelector") {
								if (pageSection.hasClass("section-gallery")) {
									pageSection.find(".launch-gallery").first().click();
								}
							}
							else {
								pageSection.find(".launch-modal." + pageSubSection).click();
							}
						}
					});
			}
		},
		clearLinks: function(){
	        $('.navigation > li', this.root).removeClass('selected');
	    },
		transformToFixed: function(){
	    	this.isFixedPosition = true;
	    	this.isAnimating = true;
	        var me = this;
	        $(".compare", this.root).css("display", "none");
	        if ($(window).width() > 1079) {
	        	$(".top", this.root).css("display", "block");
	        }
	        this.root.css("position", "fixed");
	        $(".static-bg", this.root).fadeOut(100)
            $(".fixed-bg", this.root).fadeIn(300, function() {
            	me.root.addClass("open");
            	me.isAnimating = false;
            });
		},
		transformToNormal: function(){
			this.isFixedPosition = false;
			this.isAnimating = true;
	        var me = this;
	        this.root
	        	.css("position", "absolute")
	        	.removeClass("open");
	        $(".static-bg", this.root).fadeIn(100);
	        $(".fixed-bg", this.root).fadeOut(300, function() {
	        	me.isAnimating = false;
	        });
    		$(".compare", this.root).css("display", "block");
	        $(".top", this.root).css("display", "none");
	    },
	    linkNames: {
	    	introduction: "intro",
	    	apps: "appsmedia"	    	
	    },
	    trackLinks: function(e){
	    	var link = $(e.currentTarget),
	    		linkNameAttr = link.attr("data-link-name") || $.trim(link.text()).replace(/ /g, "-").toLowerCase(),
	    		linkName = this.linkNames.hasOwnProperty(linkNameAttr) ? this.linkNames[linkNameAttr] : linkNameAttr,
	    		evar27 = [],
	    		params = {};
	    	evar27.push(_pageName);
	    	evar27.push("-");
	    	evar27.push(linkName);
	    	params.eVar27 = evar27.join("");
	    	bbcom.core.analytics.track(params, e.currentTarget, "submenuLink");
	    }
	};
})(jQuery);