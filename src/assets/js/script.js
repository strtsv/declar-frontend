/**
 * Global variables
 */
"use strict";

var userAgent = navigator.userAgent.toLowerCase(),
		initialDate = new Date(),

		$document = $(document),
		$window = $(window),
		$html = $("html"),
		$body = $("body"),


		isRtl = $html.attr("dir") === "rtl",
		isDesktop = $html.hasClass("desktop"),
		isIE = userAgent.indexOf("msie") !== -1 ? parseInt(userAgent.split("msie")[1], 10) : userAgent.indexOf("trident") !== -1 ? 11 : userAgent.indexOf("edge") !== -1 ? 12 : false,
		isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
		windowReady = false,
		isNoviBuilder = false,
		livedemo = false,

		plugins = {
			pointerEvents: isIE < 11 ? "js/pointer-events.min.js" : false,
			bootstrapTooltip: $("[data-toggle='tooltip']"),
			bootstrapTabs: $(".tabs"),
			bootstrapAccordions: $(".accordion"),
			rdNavbar: $(".rd-navbar"),
			mfp: $('[data-lightbox]').not('[data-lightbox="gallery"] [data-lightbox]'),
			mfpGallery: $('[data-lightbox^="gallery"]'),
			wow: $(".wow"),
			owl: $(".owl-carousel"),
			swiper: $(".swiper-slider"),
			counter: $(".counter"),
			twitterfeed: $(".twitter"),
			progressBar: $(".progress-bar-js"),
			isotope: $(".isotope"),
			countDown: $(".countdown"),
			slick: $('.slick-slider'),
			viewAnimate: $('.view-animate'),
			selectFilter: $("select"),
			bootstrapDateTimePicker: $("[data-time-picker]"),
			customWaypoints: $('[data-custom-scroll-to]'),
			lightGallery: $("[data-lightgallery='group']"),
			lightGalleryItem: $("[data-lightgallery='item']"),
			lightDynamicGalleryItem: $("[data-lightgallery='dynamic']"),
			stepper: $("input[type='number']"),
			radio: $("input[type='radio']"),
			checkbox: $("input[type='checkbox']"),
			customToggle: $("[data-custom-toggle]"),
			search: $(".rd-search"),
			searchResults: $('.rd-search-results'),
			pageTitles: $('.page-title'),
			copyrightYear: $(".copyright-year"),
			materialParallax: $(".parallax-container"),
			maps: $(".google-map-container"),
			dateCountdown: $('.DateCountdown'),
			preloader: $(".preloader"),
			rdMailForm: $('.rd-mailform'),
			rdInputLabel: $('.form-label'),
			regula: $('[data-constraints]'),
			captcha: $('.recaptcha'),
			campaignMonitor: $('.campaign-mailform'),
			mailchimp: $('.mailchimp-mailform'),
		};


/**
 * @desc Check the element was been scrolled into the view
 * @param {object} elem - jQuery object
 * @return {boolean}
 */
function isScrolledIntoView ( elem ) {
	if ( isNoviBuilder ) return true;
	return elem.offset().top + elem.outerHeight() >= $window.scrollTop() && elem.offset().top <= $window.scrollTop() + $window.height();
}

/**
 * @desc Calls a function when element has been scrolled into the view
 * @param {object} element - jQuery object
 * @param {function} func - init function
 */
function lazyInit( element, func ) {
	var scrollHandler = function () {
		if ( ( !element.hasClass( 'lazy-loaded' ) && ( isScrolledIntoView( element ) ) ) ) {
			func.call();
			element.addClass( 'lazy-loaded' );
		}
	};

	scrollHandler();
	$window.on( 'scroll', scrollHandler );
}

/**
 * Page loader
 * @description Enables Page loader
 */
if (plugins.preloader.length) {
	$window.on("load", function () {
		setTimeout(function () {
			plugins.preloader.addClass("loaded");
		}, 50);
	});
}

/**
 * Initialize All Scripts
 */
$(function () {
	var isNoviBuilder = window.xMode;

	/**
	 * @desc Attach form validation to elements
	 * @param {object} elements - jQuery object
	 */
	function attachFormValidator(elements) {
		// Custom validator - phone number
		regula.custom({
			name: 'PhoneNumber',
			defaultMessage: 'Invalid phone number format',
			validator: function() {
				if ( this.value === '' ) return true;
				else return /^(\+\d)?[0-9\-\(\) ]{5,}$/i.test( this.value );
			}
		});

		for (var i = 0; i < elements.length; i++) {
			var o = $(elements[i]), v;
			o.addClass("form-control-has-validation").after("<span class='form-validation'></span>");
			v = o.parent().find(".form-validation");
			if (v.is(":last-child")) o.addClass("form-control-last-child");
		}

		elements.on('input change propertychange blur', function (e) {
			var $this = $(this), results;

			if (e.type !== "blur") if (!$this.parent().hasClass("has-error")) return;
			if ($this.parents('.rd-mailform').hasClass('success')) return;

			if (( results = $this.regula('validate') ).length) {
				for (i = 0; i < results.length; i++) {
					$this.siblings(".form-validation").text(results[i].message).parent().addClass("has-error");
				}
			} else {
				$this.siblings(".form-validation").text("").parent().removeClass("has-error")
			}
		}).regula('bind');

		var regularConstraintsMessages = [
			{	type: regula.Constraint.Required,	newMessage: "Обязательное текстовое поле."},{	type: regula.Constraint.Email,	newMessage: "Электронная почта задана некорректно."},{	type: regula.Constraint.Numeric,	newMessage: "Допустимо только цифры"},{	type: regula.Constraint.Selected,	newMessage: "Пожалуйста, выберите опцию."}
		];


		for (var i = 0; i < regularConstraintsMessages.length; i++) {
			var regularConstraint = regularConstraintsMessages[i];

			regula.override({
				constraintType: regularConstraint.type,
				defaultMessage: regularConstraint.newMessage
			});
		}
	}

	/**
	 * @desc Check if all elements pass validation
	 * @param {object} elements - object of items for validation
	 * @param {object} captcha - captcha object for validation
	 * @return {boolean}
	 */
	function isValidated(elements, captcha) {
		var results, errors = 0;

		if (elements.length) {
			for (var j = 0; j < elements.length; j++) {

				var $input = $(elements[j]);
				if ((results = $input.regula('validate')).length) {
					for (k = 0; k < results.length; k++) {
						errors++;
						$input.siblings(".form-validation").text(results[k].message).parent().addClass("has-error");
					}
				} else {
					$input.siblings(".form-validation").text("").parent().removeClass("has-error")
				}
			}

			if (captcha) {
				if (captcha.length) {
					return validateReCaptcha(captcha) && errors === 0
				}
			}

			return errors === 0;
		}
		return true;
	}

	/**
	 * @desc Validate google reCaptcha
	 * @param {object} captcha - captcha object for validation
	 * @return {boolean}
	 */
	function validateReCaptcha(captcha) {
		var captchaToken = captcha.find('.g-recaptcha-response').val();

		if (captchaToken.length === 0) {
			captcha
			.siblings('.form-validation')
			.html('Please, prove that you are not robot.')
			.addClass('active');
			captcha
			.closest('.form-wrap')
			.addClass('has-error');

			captcha.on('propertychange', function () {
				var $this = $(this),
						captchaToken = $this.find('.g-recaptcha-response').val();

				if (captchaToken.length > 0) {
					$this
					.closest('.form-wrap')
					.removeClass('has-error');
					$this
					.siblings('.form-validation')
					.removeClass('active')
					.html('');
					$this.off('propertychange');
				}
			});

			return false;
		}

		return true;
	}

	/**
	 * @desc Initialize Google reCaptcha
	 */
	window.onloadCaptchaCallback = function () {
		for (var i = 0; i < plugins.captcha.length; i++) {
			var $capthcaItem = $(plugins.captcha[i]);

			grecaptcha.render(
					$capthcaItem.attr('id'),
					{
						sitekey: $capthcaItem.attr('data-sitekey'),
						size: $capthcaItem.attr('data-size') ? $capthcaItem.attr('data-size') : 'normal',
						theme: $capthcaItem.attr('data-theme') ? $capthcaItem.attr('data-theme') : 'light',
						callback: function (e) {
							$('.recaptcha').trigger('propertychange');
						}
					}
			);
			$capthcaItem.after("<span class='form-validation'></span>");
		}
	};

	/**
	 * @desc Google map function for getting latitude and longitude
	 */
	function getLatLngObject(str, marker, map, callback) {
		var coordinates = {};
		try {
			coordinates = JSON.parse(str);
			callback(new google.maps.LatLng(
					coordinates.lat,
					coordinates.lng
			), marker, map)
		} catch (e) {
			map.geocoder.geocode({'address': str}, function (results, status) {
				if (status === google.maps.GeocoderStatus.OK) {
					var latitude = results[0].geometry.location.lat();
					var longitude = results[0].geometry.location.lng();

					callback(new google.maps.LatLng(
							parseFloat(latitude),
							parseFloat(longitude)
					), marker, map)
				}
			})
		}
	}

	/**
	 * @desc Initialize Google maps
	 */
	function initMaps() {
		var maps = document.querySelectorAll(".google-map-container");
		var key;

		for ( var i = 0; i < maps.length; i++ ) {
			if (maps[i].hasAttribute( "data-key" ) ) {
				key = maps[i].getAttribute( "data-key" );
				break;
			}
		}

		$.getScript('//maps.google.com/maps/api/js?'+ ( key ? 'key='+ key + '&' : '' ) +'sensor=false&libraries=geometry,places&v=quarterly', function () {
			var head = document.getElementsByTagName('head')[0],
					insertBefore = head.insertBefore;

			head.insertBefore = function (newElement, referenceElement) {
				if (newElement.href && newElement.href.indexOf('//fonts.googleapis.com/css?family=Roboto') !== -1 || newElement.innerHTML.indexOf('gm-style') !== -1) {
					return;
				}
				insertBefore.call(head, newElement, referenceElement);
			};

			var geocoder = new google.maps.Geocoder;
			for (var i = 0; i < maps.length; i++) {
				var zoom = parseInt(maps[i].getAttribute("data-zoom")) || 11;
				var styles;
				if (maps[i].hasAttribute('data-styles')){
					try {
						styles = JSON.parse(maps[i].getAttribute("data-styles"));
					}
					catch (error){
						styles = [];
					}
				}
				var center = maps[i].getAttribute("data-center");

				// Initialize map
				var map = new google.maps.Map(maps[i].querySelectorAll(".google-map")[0], {
					zoom: zoom,
					styles: styles,
					scrollwheel: false,
					center: {lat: 0, lng: 0}
				});
				// Add map object to map node
				maps[i].map = map;
				maps[i].geocoder = geocoder;
				maps[i].keySupported = true;
				maps[i].google = google;

				// Get Center coordinates from attribute
				getLatLngObject(center, null, maps[i], function (location, markerElement, mapElement) {
					mapElement.map.setCenter(location);
				})

				// Add markers from google-map-markers array
				var markerItems = maps[i].querySelectorAll(".google-map-markers li");
				if (markerItems.length){
					var markers = [];
					for (var j = 0; j < markerItems.length; j++){
						var markerElement = markerItems[j];
						getLatLngObject(markerElement.getAttribute("data-location"), markerElement, maps[i], function(location, markerElement, mapElement){
							var icon = markerElement.getAttribute("data-icon") || mapElement.getAttribute("data-icon");
							var activeIcon = markerElement.getAttribute("data-icon-active") || mapElement.getAttribute("data-icon-active");
							var info = markerElement.getAttribute("data-description") || "";
							var infoWindow = new google.maps.InfoWindow({
								content: info
							});
							markerElement.infoWindow = infoWindow;
							var markerData = {
								position: location,
								map: mapElement.map
							}
							if (icon){
								markerData.icon = icon;
							}
							var marker = new google.maps.Marker(markerData);
							markerElement.gmarker = marker;
							markers.push({markerElement: markerElement, infoWindow: infoWindow});
							marker.isActive = false;
							// Handle infoWindow close click
							google.maps.event.addListener(infoWindow,'closeclick',(function(markerElement, mapElement){
								var markerIcon;
								markerElement.gmarker.isActive = false
								if (markerIcon = markerElement.getAttribute("data-icon") || mapElement.getAttribute("data-icon")){
									markerElement.gmarker.setIcon(markerIcon);
								}
							}).bind(this, markerElement, mapElement));


							// Set marker active on Click and open infoWindow
							google.maps.event.addListener(marker, 'click', (function(markerElement, mapElement) {
								if (markerElement.infoWindow.getContent().length === 0) return;
								var gMarker, currentMarker = markerElement.gmarker, currentInfoWindow;
								for (var k =0; k < markers.length; k++){
									var markerIcon;
									if (markers[k].markerElement === markerElement){
										currentInfoWindow = markers[k].infoWindow;
									}
									gMarker = markers[k].markerElement.gmarker;
									if (gMarker.isActive && markers[k].markerElement !== markerElement){
										gMarker.isActive = false;
										if (markerIcon = markers[k].markerElement.getAttribute("data-icon") || mapElement.getAttribute("data-icon")){
											gMarker.setIcon(markerIcon);
										}
										markers[k].infoWindow.close();
									}
								}

								currentMarker.isActive = !currentMarker.isActive;
								if (currentMarker.isActive) {
									if (markerIcon = markerElement.getAttribute("data-icon-active") || mapElement.getAttribute("data-icon-active")){
										currentMarker.setIcon(markerIcon);
									}

									currentInfoWindow.open(map, marker);
								}else{
									if (markerIcon = markerElement.getAttribute("data-icon") || mapElement.getAttribute("data-icon")){
										currentMarker.setIcon(markerIcon);
									}
									currentInfoWindow.close();
								}
							}).bind(this, markerElement, mapElement))
						})
					}
				}
			}
		});
	}

	/**
	 * Is Mac os
	 * @description  add additional class on html if mac os.
	 */
	if (navigator.platform.match(/(Mac)/i)) $html.addClass("mac");

	/**
	 * getSwiperHeight
	 * @description  calculate the height of swiper slider basing on data attr
	 */
	function getSwiperHeight(object, attr) {
		var val = object.attr("data-" + attr),
				dim;

		if (!val) {
			return undefined;
		}

		dim = val.match(/(px)|(%)|(vh)|(vw)$/i);

		if (dim.length) {
			switch (dim[0]) {
				case "px":
					return parseFloat(val);
				case "vh":
					return $window.height() * (parseFloat(val) / 100);
				case "vw":
					return $window.width() * (parseFloat(val) / 100);
				case "%":
					return object.width() * (parseFloat(val) / 100);
			}
		} else {
			return undefined;
		}
	}

	/**
	 * toggleSwiperInnerVideos
	 * @description  toggle swiper videos on active slides
	 */
	function toggleSwiperInnerVideos(swiper) {
		var prevSlide = $(swiper.slides[swiper.previousIndex]),
				nextSlide = $(swiper.slides[swiper.activeIndex]),
				videos;

		prevSlide.find("video").each(function () {
			this.pause();
		});

		videos = nextSlide.find("video");
		if (videos.length) {
			videos.get(0).play();
		}
	}

	/**
	 * toggleSwiperCaptionAnimation
	 * @description  toggle swiper animations on active slides
	 */
	function toggleSwiperCaptionAnimation(swiper) {
		var prevSlide = $(swiper.container).find("[data-caption-animate]"),
				nextSlide = $(swiper.slides[swiper.activeIndex]).find("[data-caption-animate]"),
				delay,
				duration,
				nextSlideItem,
				prevSlideItem;

		for (var i = 0; i < prevSlide.length; i++) {
			prevSlideItem = $(prevSlide[i]);

			prevSlideItem.removeClass("animated")
			.removeClass(prevSlideItem.attr("data-caption-animate"))
			.addClass("not-animated");
		}


		var tempFunction = function (nextSlideItem, duration) {
			return function () {
				nextSlideItem
				.removeClass("not-animated")
				.addClass(nextSlideItem.attr("data-caption-animate"))
				.addClass("animated");
				if (duration) {
					nextSlideItem.css('animation-duration', duration + 'ms');
				}
			};
		};

		for (var i = 0; i < nextSlide.length; i++) {
			nextSlideItem = $(nextSlide[i]);
			delay = nextSlideItem.attr("data-caption-delay");
			duration = nextSlideItem.attr('data-caption-duration');
			if (delay) {
				setTimeout(tempFunction(nextSlideItem, duration), parseInt(delay, 10));
			} else {
				tempFunction(nextSlideItem, duration);
			}
		}
	}

	/**
	 * initOwlCarousel
	 * @description  Init owl carousel plugin
	 */
	function initOwlCarousel(c) {
		var aliaces = ["-", "-sm-", "-md-", "-lg-", "-xl-", "-xxl-"],
				values = [0, 576, 768, 992, 1200, 1600],
				responsive = {};

		for (var j = 0; j < values.length; j++) {
			responsive[values[j]] = {};
			for (var k = j; k >= -1; k--) {
				if (!responsive[values[j]]["items"] && c.attr("data" + aliaces[k] + "items")) {
					responsive[values[j]]["items"] = k < 0 ? 1 : parseInt(c.attr("data" + aliaces[k] + "items"), 10);
				}
				if (!responsive[values[j]]["stagePadding"] && responsive[values[j]]["stagePadding"] !== 0 && c.attr("data" + aliaces[k] + "stage-padding")) {
					responsive[values[j]]["stagePadding"] = k < 0 ? 0 : parseInt(c.attr("data" + aliaces[k] + "stage-padding"), 10);
				}
				if (!responsive[values[j]]["margin"] && responsive[values[j]]["margin"] !== 0 && c.attr("data" + aliaces[k] + "margin")) {
					responsive[values[j]]["margin"] = k < 0 ? 30 : parseInt(c.attr("data" + aliaces[k] + "margin"), 10);
				}
			}
		}

		// Create custom Pagination
		if (c.attr('data-dots-custom')) {
			c.on("initialized.owl.carousel", function (event) {
				var carousel = $(event.currentTarget),
						customPag = $(carousel.attr("data-dots-custom")),
						active = 0;

				if (carousel.attr('data-active')) {
					active = parseInt(carousel.attr('data-active'));
				}

				carousel.trigger('to.owl.carousel', [active, 300, true]);
				customPag.find("[data-owl-item='" + active + "']").addClass("active");

				customPag.find("[data-owl-item]").on('click', function (e) {
					e.preventDefault();
					carousel.trigger('to.owl.carousel', [parseInt(this.getAttribute("data-owl-item")), 300, true]);
				});

				carousel.on("translate.owl.carousel", function (event) {
					customPag.find(".active").removeClass("active");
					customPag.find("[data-owl-item='" + event.item.index + "']").addClass("active")
				});
			});
		}

		// Create custom Numbering
		if (typeof(c.attr("data-numbering")) !== 'undefined') {
			var numberingObject = $(c.attr("data-numbering"));

			c.on('initialized.owl.carousel changed.owl.carousel', function (numberingObject) {
				return function (e) {
					if (!e.namespace) return;
					numberingObject.find('.numbering-current').text(e.item.index + 1);
					numberingObject.find('.numbering-count').text(e.item.count);
				};
			}(numberingObject));
		}

		c.owlCarousel({
			autoplay: isNoviBuilder ? false : c.attr("data-autoplay") === "true",
			loop: isNoviBuilder ? false : c.attr("data-loop") !== "false",
			items: 1,
			rtl: isRtl,
			center: c.attr("data-center") === "true",
			dotsContainer: c.attr("data-pagination-class") || false,
			navContainer: c.attr("data-navigation-class") || false,
			mouseDrag: isNoviBuilder ? false : c.attr("data-mouse-drag") !== "false",
			nav: c.attr("data-nav") === "true",
			dots: c.attr("data-dots") === "true",
			dotsEach: c.attr("data-dots-each") ? parseInt(c.attr("data-dots-each"), 10) : false,
			animateIn: c.attr('data-animation-in') ? c.attr('data-animation-in') : false,
			animateOut: c.attr('data-animation-out') ? c.attr('data-animation-out') : false,
			responsive: responsive,
			navText: function () {
				try {
					return JSON.parse(c.attr("data-nav-text"));
				} catch (e) {
					return [];
				}
			}(),
			navClass: function () {
				try {
					return JSON.parse(c.attr("data-nav-class"));
				} catch (e) {
					return ['owl-prev', 'owl-next'];
				}
			}()
		});
	}

	/**
	 * lightGallery functions
	 * */
	function initLightGallery(itemsToInit, addClass) {
		if (!isNoviBuilder) {
			$(itemsToInit).lightGallery({
				thumbnail: $(itemsToInit).attr("data-lg-thumbnail") !== "false",
				selector: "[data-lightgallery='item']",
				autoplay: $(itemsToInit).attr("data-lg-autoplay") === "true",
				pause: parseInt($(itemsToInit).attr("data-lg-autoplay-delay")) || 5000,
				addClass: addClass,
				mode: $(itemsToInit).attr("data-lg-animation") || "lg-slide",
				loop: $(itemsToInit).attr("data-lg-loop") !== "false"
			});
		}
	}

	function initDynamicLightGallery(itemsToInit, addClass) {
		if (!isNoviBuilder) {
			$(itemsToInit).on("click", function () {
				$(itemsToInit).lightGallery({
					thumbnail: $(itemsToInit).attr("data-lg-thumbnail") !== "false",
					selector: "[data-lightgallery='item']",
					autoplay: $(itemsToInit).attr("data-lg-autoplay") === "true",
					pause: parseInt($(itemsToInit).attr("data-lg-autoplay-delay")) || 5000,
					addClass: addClass,
					mode: $(itemsToInit).attr("data-lg-animation") || "lg-slide",
					loop: $(itemsToInit).attr("data-lg-loop") !== "false",
					dynamic: true,
					dynamicEl:
					JSON.parse($(itemsToInit).attr("data-lg-dynamic-elements")) || []
				});
			});
		}
	}

	function initLightGalleryItem(itemToInit, addClass) {
		if (!isNoviBuilder) {
			$(itemToInit).lightGallery({
				selector: "this",
				addClass: addClass,
				counter: false,
				youtubePlayerParams: {
					modestbranding: 1,
					showinfo: 0,
					rel: 0,
					controls: 0
				},
				vimeoPlayerParams: {
					byline: 0,
					portrait: 0
				}
			});
		}
	}

	/**
	 * Live Search
	 * @description  create live search results
	 */
	function liveSearch(options) {
		$('#' + options.live).removeClass('cleared').html();
		options.current++;
		options.spin.addClass('loading');
		$.get(handler, {
			s: decodeURI(options.term),
			liveSearch: options.live,
			dataType: "html",
			liveCount: options.liveCount,
			filter: options.filter,
			template: options.template
		}, function (data) {
			options.processed++;
			var live = $('#' + options.live);
			if (options.processed == options.current && !live.hasClass('cleared')) {
				live.find('> #search-results').removeClass('active');
				live.html(data);
				setTimeout(function () {
					live.find('> #search-results').addClass('active');
				}, 50);
			}
			options.spin.parents('.rd-search').find('.input-group-addon').removeClass('loading');
		})
	}

	/**
	 * Init Bootstrap tooltip
	 * @description  calls a function when need to init bootstrap tooltips
	 */
	function initBootstrapTooltip(tooltipPlacement) {
		if (window.innerWidth < 576) {
			plugins.bootstrapTooltip.tooltip('dispose');
			plugins.bootstrapTooltip.tooltip({
				placement: 'bottom'
			});
		} else {
			plugins.bootstrapTooltip.tooltip('dispose');
			plugins.bootstrapTooltip.tooltip({
				placement: tooltipPlacement
			});
		}
	}

	/**
	 * Copyright Year
	 * @description  Evaluates correct copyright year
	 */
	if (plugins.copyrightYear.length) {
		plugins.copyrightYear.text(initialDate.getFullYear());
	}

	/**
	 * IE Polyfills
	 * @description  Adds some loosing functionality to IE browsers
	 */
	if (isIE) {
		if (isIE < 10) {
			$html.addClass("lt-ie-10");
		}

		if (isIE < 11) {
			if (plugins.pointerEvents) {
				$.getScript(plugins.pointerEvents)
				.done(function () {
					$html.addClass("ie-10");
					PointerEventsPolyfill.initialize({});
				});
			}
		}

		if (isIE === 11) {
			$("html").addClass("ie-11");
		}

		if (isIE === 12) {
			$("html").addClass("ie-edge");
		}
	}

	/**
	 * Bootstrap Tooltips
	 * @description Activate Bootstrap Tooltips
	 */
	if (plugins.bootstrapTooltip.length) {
		var tooltipPlacement = plugins.bootstrapTooltip.attr('data-placement');
		initBootstrapTooltip(tooltipPlacement);

		$window.on('resize orientationchange', function () {
			initBootstrapTooltip(tooltipPlacement);
		});
	}

	/**
	 * @module       Magnific Popup
	 * @author       Dmitry Semenov
	 * @see          https://dimsemenov.com/plugins/magnific-popup/
	 * @version      v1.0.0
	 */
	if (!isNoviBuilder && (plugins.mfp.length || plugins.mfpGallery.length)) {
		if (plugins.mfp.length) {
			for (var i = 0; i < plugins.mfp.length; i++) {
				var mfpItem = plugins.mfp[i];

				$(mfpItem).magnificPopup({
					type: mfpItem.getAttribute("data-lightbox")
				});
			}
		}
		if (plugins.mfpGallery.length) {
			for (var i = 0; i < plugins.mfpGallery.length; i++) {
				var mfpGalleryItem = $(plugins.mfpGallery[i]).find('[data-lightbox]');

				for (var c = 0; c < mfpGalleryItem.length; c++) {
					$(mfpGalleryItem).addClass("mfp-" + $(mfpGalleryItem).attr("data-lightbox"));
				}

				mfpGalleryItem.end()
				.magnificPopup({
					delegate: '[data-lightbox]',
					type: "image",
					gallery: {
						enabled: true
					}
				});
			}
		}
	}

	/**
	 * Bootstrap Date time picker
	 */
	if (!isNoviBuilder && plugins.bootstrapDateTimePicker.length) {
		for (var i = 0; i < plugins.bootstrapDateTimePicker.length; i++) {
			var $dateTimePicker = $(plugins.bootstrapDateTimePicker[i]);
			var options = {};

			options['format'] = 'dddd DD MMMM YYYY - HH:mm';
			if ($dateTimePicker.attr("data-time-picker") == "date") {
				options['format'] = 'dddd DD MMMM YYYY';
				options['minDate'] = new Date();
			} else if ($dateTimePicker.attr("data-time-picker") == "time") {
				options['format'] = 'HH:mm';
			}

			options["time"] = ($dateTimePicker.attr("data-time-picker") != "date");
			options["date"] = ($dateTimePicker.attr("data-time-picker") != "time");
			options["shortTime"] = true;

			$dateTimePicker.bootstrapMaterialDatePicker(options);
		}
	}

	/**
	 * RD Twitter Feed
	 * @description Enables RD Twitter Feed plugin
	 */
	if (plugins.twitterfeed.length > 0) {
		var i;
		for (i = 0; i < plugins.twitterfeed.length; i++) {
			var twitterfeedItem = plugins.twitterfeed[i];
			$(twitterfeedItem).RDTwitter({});
		}
	}

	/**
	 * Select2
	 * @description Enables select2 plugin
	 */
	if (plugins.selectFilter.length) {
		for (var i = 0; i < plugins.selectFilter.length; i++) {
			var select = $(plugins.selectFilter[i]);

			select.select2({
				theme: select.attr('data-custom-theme') ? select.attr('data-custom-theme') : "bootstrap"
			}).next().addClass(select.attr("class").match(/(input-sm)|(input-lg)|($)/i).toString().replace(new RegExp(",", 'g'), " "));
		}
	}

	/**
	 * Stepper
	 * @description Enables Stepper Plugin
	 */
	if (plugins.stepper.length) {
		plugins.stepper.stepper({
			labels: {
				up: "",
				down: ""
			}
		});
	}

	/**
	 * Radio
	 * @description Add custom styling options for input[type="radio"]
	 */
	if (plugins.radio.length) {
		for (var i = 0; i < plugins.radio.length; i++) {
			$(plugins.radio[i]).addClass("radio-custom").after("<span class='radio-custom-dummy'></span>")
		}
	}

	/**
	 * Checkbox
	 * @description Add custom styling options for input[type="checkbox"]
	 */
	if (plugins.checkbox.length) {
		for (var i = 0; i < plugins.checkbox.length; i++) {
			$(plugins.checkbox[i]).addClass("checkbox-custom").after("<span class='checkbox-custom-dummy'></span>")
		}
	}

	/**
	 * jQuery Countdown
	 * @description  Enable countdown plugin
	 */
	if (plugins.countDown.length) {
		var i;
		for (i = 0; i < plugins.countDown.length; i++) {
			var countDownItem = plugins.countDown[i],
					d = new Date(),
					type = countDownItem.getAttribute('data-type'),
					time = countDownItem.getAttribute('data-time'),
					format = countDownItem.getAttribute('data-format'),
					settings = [];

			d.setTime(Date.parse(time)).toLocaleString();
			settings[type] = d;
			settings['format'] = format;
			$(countDownItem).countdown(settings);
		}
	}


	/**
	 * Progress bar
	 * @description  Enable progress bar
	 */
	if (plugins.progressBar.length) {
		var i,
				bar,
				type;

		for (i = 0; i < plugins.progressBar.length; i++) {
			var progressItem = plugins.progressBar[i];
			bar = null;

			if (progressItem.className.indexOf("progress-bar-horizontal") > -1) {
				type = 'Line';
			}

			if (progressItem.className.indexOf("progress-bar-radial") > -1) {
				type = 'Circle';
			}

			if (progressItem.getAttribute("data-stroke") && progressItem.getAttribute("data-value") && type) {
				bar = new ProgressBar[type](progressItem, {
					strokeWidth: Math.round(parseFloat(progressItem.getAttribute("data-stroke")) / progressItem.offsetWidth * 100),
					trailWidth: progressItem.getAttribute("data-trail") ? Math.round(parseFloat(progressItem.getAttribute("data-trail")) / progressItem.offsetWidth * 100) : 0,
					text: {
						value: progressItem.getAttribute("data-counter") === "true" ? '0' : null,
						className: 'progress-bar__body',
						style: null
					}
				});
				bar.svg.setAttribute('preserveAspectRatio', "none meet");
				if (type === 'Line') {
					bar.svg.setAttributeNS(null, "height", progressItem.getAttribute("data-stroke"));
				}

				bar.path.removeAttribute("stroke");
				bar.path.className.baseVal = "progress-bar__stroke";
				if (bar.trail) {
					bar.trail.removeAttribute("stroke");
					bar.trail.className.baseVal = "progress-bar__trail";
				}

				if (progressItem.getAttribute("data-easing") && !isIE) {
					$(document)
					.on("scroll", {"barItem": bar}, $.proxy(function (event) {
						var bar = event.data.barItem;
						var $this = $(this);

						if (isScrolledIntoView($this) && this.className.indexOf("progress-bar--animated") === -1) {
							this.className += " progress-bar--animated";
							bar.animate(parseInt($this.attr("data-value")) / 100.0, {
								easing: $this.attr("data-easing"),
								duration: $this.attr("data-duration") ? parseInt($this.attr("data-duration")) : 800,
								step: function (state, b) {
									if (b._container.className.indexOf("progress-bar-horizontal") > -1 ||
											b._container.className.indexOf("progress-bar-vertical") > -1) {
										b.text.style.width = Math.abs(b.value() * 100).toFixed(0) + "%"
									}
									b.setText(Math.abs(b.value() * 100).toFixed(0));
								}
							});
						}
					}, progressItem))
					.trigger("scroll");
				} else {
					bar.set(parseInt($(progressItem).attr("data-value")) / 100.0);
					bar.setText($(progressItem).attr("data-value"));
					if (type === 'Line') {
						bar.text.style.width = parseInt($(progressItem).attr("data-value")) + "%";
					}
				}
			} else {
				console.error(progressItem.className + ": progress bar type is not defined");
			}
		}
	}

	// Material Parallax
	if (plugins.materialParallax.length) {
		if (!isNoviBuilder && !isIE && !isMobile) {
			plugins.materialParallax.parallax();

			// heavy pages fix
			$window.on('load', function () {
				setTimeout(function () {
					$window.scroll();
				}, 500);
			});
		} else {
			for (var i = 0; i < plugins.materialParallax.length; i++) {
				var parallax = $(plugins.materialParallax[i]),
						imgPath = parallax.data("parallax-img");

				parallax.css({
					"background-image": 'url(' + imgPath + ')',
					"background-size": "cover"
				});
			}
		}
	}

	/**
	 * UI To Top
	 * @description Enables ToTop Button
	 */
	if (isDesktop && !isNoviBuilder) {
		$().UItoTop({
			easingType: 'easeOutQuart',
			containerClass: 'ui-to-top fa fa-angle-up'
		});
	}

	/**
	 * RD Navbar
	 * @description Enables RD Navbar plugin
	 */
	if (plugins.rdNavbar.length) {
		var aliaces, i, j, len, value, values, responsiveNavbar;

		aliaces = ["-", "-sm-", "-md-", "-lg-", "-xl-", "-xxl-"];
		values = [0, 576, 768, 992, 1200, 1600];
		responsiveNavbar = {};

		for (i = j = 0, len = values.length; j < len; i = ++j) {
			value = values[i];
			if (!responsiveNavbar[values[i]]) {
				responsiveNavbar[values[i]] = {};
			}
			if (plugins.rdNavbar.attr('data' + aliaces[i] + 'layout')) {
				responsiveNavbar[values[i]].layout = plugins.rdNavbar.attr('data' + aliaces[i] + 'layout');
			}
			if (plugins.rdNavbar.attr('data' + aliaces[i] + 'device-layout')) {
				responsiveNavbar[values[i]]['deviceLayout'] = plugins.rdNavbar.attr('data' + aliaces[i] + 'device-layout');
			}
			if (plugins.rdNavbar.attr('data' + aliaces[i] + 'hover-on')) {
				responsiveNavbar[values[i]]['focusOnHover'] = plugins.rdNavbar.attr('data' + aliaces[i] + 'hover-on') === 'true';
			}
			if (plugins.rdNavbar.attr('data' + aliaces[i] + 'auto-height')) {
				responsiveNavbar[values[i]]['autoHeight'] = plugins.rdNavbar.attr('data' + aliaces[i] + 'auto-height') === 'true';
			}
			if (plugins.rdNavbar.attr('data' + aliaces[i] + 'stick-up')) {
				responsiveNavbar[values[i]]['stickUp'] = isNoviBuilder ? false : (plugins.rdNavbar.attr('data' + aliaces[i] + 'stick-up') === 'true');
			}
			if (plugins.rdNavbar.attr('data' + aliaces[i] + 'stick-up-offset')) {
				responsiveNavbar[values[i]]['stickUpOffset'] = plugins.rdNavbar.attr('data' + aliaces[i] + 'stick-up-offset');
			}
		}


		plugins.rdNavbar.RDNavbar({
			anchorNav: !isNoviBuilder,
			stickUpClone: (plugins.rdNavbar.attr("data-stick-up-clone") && !isNoviBuilder) ? plugins.rdNavbar.attr("data-stick-up-clone") === 'true' : false,
			responsive: responsiveNavbar,
			callbacks: {
				onStuck: function () {
					var navbarSearch = this.$element.find('.rd-search input');

					if (navbarSearch) {
						navbarSearch.val('').trigger('propertychange');
					}
				},
				onDropdownOver: function () {
					return !isNoviBuilder;
				},
				onUnstuck: function () {
					if (this.$clone === null)
						return;

					var navbarSearch = this.$clone.find('.rd-search input');

					if (navbarSearch) {
						navbarSearch.val('').trigger('propertychange');
						navbarSearch.trigger('blur');
					}

				}
			}
		});


		if (plugins.rdNavbar.attr("data-body-class")) {
			document.body.className += ' ' + plugins.rdNavbar.attr("data-body-class");
		}
	}

	/**
	 * ViewPort Universal
	 * @description Add class in viewport
	 */
	if (plugins.viewAnimate.length) {
		var i;
		for (i = 0; i < plugins.viewAnimate.length; i++) {
			var $view = $(plugins.viewAnimate[i]).not('.active');
			$document.on("scroll", $.proxy(function () {
				if (isScrolledIntoView(this)) {
					this.addClass("active");
				}
			}, $view))
			.trigger("scroll");
		}
	}

	/**
	 * Swiper
	 * @description  Enable Swiper Slider
	 */
	if (plugins.swiper.length) {
		for (var i = 0; i < plugins.swiper.length; i++) {
			var s = $(plugins.swiper[i]);
			var pag = s.find(".swiper-pagination"),
					next = s.find(".swiper-button-next"),
					prev = s.find(".swiper-button-prev"),
					bar = s.find(".swiper-scrollbar"),
					swiperSlide = s.find(".swiper-slide"),
					autoplay = false;

			for (var j = 0; j < swiperSlide.length; j++) {
				var $this = $(swiperSlide[j]),
						url;

				if (url = $this.attr("data-slide-bg")) {
					$this.css({
						"background-image": "url(" + url + ")",
						"background-size": "cover"
					})
				}
			}

			swiperSlide.end()
			.find("[data-caption-animate]")
			.addClass("not-animated")
			.end();

			s.swiper({
				autoplay: s.attr('data-autoplay') ? s.attr('data-autoplay') === "false" ? undefined : s.attr('data-autoplay') : 5000,
				direction: s.attr('data-direction') ? s.attr('data-direction') : "horizontal",
				effect: s.attr('data-slide-effect') ? s.attr('data-slide-effect') : "slide",
				speed: s.attr('data-slide-speed') ? s.attr('data-slide-speed') : 600,
				keyboardControl: s.attr('data-keyboard') === "true",
				mousewheelControl: s.attr('data-mousewheel') === "true",
				mousewheelReleaseOnEdges: s.attr('data-mousewheel-release') === "true",
				nextButton: next.length ? next.get(0) : null,
				prevButton: prev.length ? prev.get(0) : null,
				pagination: pag.length ? pag.get(0) : null,
				paginationClickable: pag.length ? pag.attr("data-clickable") !== "false" : false,
				paginationBulletRender: pag.length ? pag.attr("data-index-bullet") === "true" ? function (swiper, index, className) {
					return '<span class="' + className + '">' + (index + 1) + '</span>';
				} : null : null,
				scrollbar: bar.length ? bar.get(0) : null,
				scrollbarDraggable: bar.length ? bar.attr("data-draggable") !== "false" : true,
				scrollbarHide: bar.length ? bar.attr("data-draggable") === "false" : false,
				loop: isNoviBuilder ? false : s.attr('data-loop') !== "false",
				simulateTouch: s.attr('data-simulate-touch') && !isNoviBuilder ? s.attr('data-simulate-touch') === "true" : false,
				onTransitionStart: function (swiper) {
					toggleSwiperInnerVideos(swiper);
				},
				onTransitionEnd: function (swiper) {
					toggleSwiperCaptionAnimation(swiper);
				},
				onInit: function (swiper) {
					toggleSwiperInnerVideos(swiper);
					toggleSwiperCaptionAnimation(swiper);

					if (!isRtl) {
						$window.on('resize', function () {
							swiper.update(true);
						});
					}
				}
			});

			$window.on("resize", (function (s) {
				return function () {
					var mh = getSwiperHeight(s, "min-height"),
							h = getSwiperHeight(s, "height");
					if (h) {
						s.css("height", mh ? mh > h ? mh : h : h);
					}
				}
			})(s)).trigger("resize");
		}
	}

	/**
	 * RD Search
	 * @description Enables search
	 */
	if (plugins.search.length || plugins.searchResults) {
		var handler = "bat/rd-search.php";
		var defaultTemplate = '<h6 class="search_title"><a target="_top" href="#{href}" class="search_link">#{title}</a></h6>' +
				'<p>...#{token}...</p>' +
				'<p class="match"><em>Terms matched: #{count} - URL: #{href}</em></p>';
		var defaultFilter = '*.html';

		if (plugins.search.length) {

			for (i = 0; i < plugins.search.length; i++) {
				var searchItem = $(plugins.search[i]),
						options = {
							element: searchItem,
							filter: (searchItem.attr('data-search-filter')) ? searchItem.attr('data-search-filter') : defaultFilter,
							template: (searchItem.attr('data-search-template')) ? searchItem.attr('data-search-template') : defaultTemplate,
							live: (searchItem.attr('data-search-live')) ? searchItem.attr('data-search-live') : false,
							liveCount: (searchItem.attr('data-search-live-count')) ? parseInt(searchItem.attr('data-search-live-count')) : 4,
							current: 0, processed: 0, timer: {}
						};

				if ($('.rd-navbar-search-toggle').length) {
					var toggle = $('.rd-navbar-search-toggle');
					toggle.on('click', function () {
						if (!($(this).hasClass('active'))) {
							searchItem.find('input').val('').trigger('propertychange');
						}
					});
				}

				if (options.live) {
					var clearHandler = false;

					searchItem.find('input').on("keyup input propertychange", $.proxy(function () {
						this.term = this.element.find('input').val().trim();
						this.spin = this.element.find('.input-group-addon');

						clearTimeout(this.timer);

						if (this.term.length > 2) {
							this.timer = setTimeout(liveSearch(this), 200);

							if (clearHandler == false) {
								clearHandler = true;

								$("body").on("click", function (e) {
									if ($(e.toElement).parents('.rd-search').length == 0) {
										$('#rd-search-results-live').addClass('cleared').html('');
									}
								})
							}

						} else if (this.term.length == 0) {
							$('#' + this.live).addClass('cleared').html('');
						}
					}, options, this));
				}

				searchItem.submit($.proxy(function () {
					$('<input />').attr('type', 'hidden')
					.attr('name', "filter")
					.attr('value', this.filter)
					.appendTo(this.element);
					return true;
				}, options, this))
			}
		}

		if (plugins.searchResults.length) {
			var regExp = /\?.*s=([^&]+)\&filter=([^&]+)/g;
			var match = regExp.exec(location.search);

			if (match != null) {
				$.get(handler, {
					s: decodeURI(match[1]),
					dataType: "html",
					filter: match[2],
					template: defaultTemplate,
					live: ''
				}, function (data) {
					plugins.searchResults.html(data);
				})
			}
		}
	}

	/**
	 * Slick carousel
	 * @description  Enable Slick carousel plugin
	 */
	if (plugins.slick.length) {
		for (var i = 0; i < plugins.slick.length; i++) {
			var $slickItem = $(plugins.slick[i]);
			$slickItem.slick({
				slidesToScroll: parseInt($slickItem.attr('data-slide-to-scroll'), 10) || 1,
				asNavFor: $slickItem.attr('data-for') || false,
				dots: $slickItem.attr("data-dots") === "true",
				infinite: isNoviBuilder ? false : $slickItem.attr("data-loop") === "true",
				focusOnSelect: true,
				arrows: $slickItem.attr("data-arrows") === "true",
				swipe: $slickItem.attr("data-swipe") === "true",
				autoplay: $slickItem.attr("data-autoplay") === "true",
				vertical: $slickItem.attr("data-vertical") === "true",
				centerMode: $slickItem.attr("data-center-mode") === "true",
				centerPadding: $slickItem.attr("data-center-padding") ? $slickItem.attr("data-center-padding") : '0.50',
				mobileFirst: true,
				rtl: isRtl,
				responsive: [
					{
						breakpoint: 0,
						settings: {
							slidesToShow: parseInt($slickItem.attr('data-items'), 10) || 1
						}
					},
					{
						breakpoint: 575,
						settings: {
							slidesToShow: parseInt($slickItem.attr('data-sm-items'), 10) || 1
						}
					},
					{
						breakpoint: 767,
						settings: {
							slidesToShow: parseInt($slickItem.attr('data-md-items'), 10) || 1
						}
					},
					{
						breakpoint: 991,
						settings: {
							slidesToShow: parseInt($slickItem.attr('data-lg-items'), 10) || 1
						}
					},
					{
						breakpoint: 1199,
						settings: {
							slidesToShow: parseInt($slickItem.attr('data-xl-items'), 10) || 1
						}
					},
					{
						breakpoint: 1599,
						settings: {
							slidesToShow: parseInt($slickItem.attr('data-xxl-items'), 10) || 1
						}
					}
				]
			})
			.on('afterChange', function (event, slick, currentSlide, nextSlide) {
				var $this = $(this),
						childCarousel = $this.attr('data-child');
				if (childCarousel) {
					$(childCarousel + ' .slick-slide').removeClass('slick-current');
					$(childCarousel + ' .slick-slide').eq(currentSlide).addClass('slick-current');
				}
			});
		}
	}

	/**
	 * Owl carousel
	 * @description Enables Owl carousel plugin
	 */
	if (plugins.owl.length) {
		for (var i = 0; i < plugins.owl.length; i++) {
			var c = $(plugins.owl[i]);
			plugins.owl[i] = c;

			initOwlCarousel(c);
		}
	}


	/**
	 * jQuery Count To
	 * @description Enables Count To plugin
	 */
	if (plugins.counter.length) {
		var i;

		for (i = 0; i < plugins.counter.length; i++) {
			var $counterNotAnimated = $(plugins.counter[i]).not('.animated');
			$document
			.on("scroll", $.proxy(function () {
				var $this = this;

				if ((!$this.hasClass("animated")) && (isScrolledIntoView($this))) {
					$this.countTo({
						refreshInterval: 40,
						from: 0,
						to: parseInt($this.text(), 10),
						speed: $this.attr("data-speed") || 1000,
						formatter: function (value, options) {
							value = value.toFixed(options.decimals);
							if (value < 10) {
								return '0' + value;
							}
							return value;
						}
					});
					$this.addClass('animated');
				}
			}, $counterNotAnimated))
			.trigger("scroll");
		}
	}

	/**
	 * Isotope
	 * @description Enables Isotope plugin
	 */
	if (plugins.isotope.length) {
		var isogroup = [];
		for (var i = 0; i < plugins.isotope.length; i++) {
			var isotopeItem = plugins.isotope[i],
					isotopeInitAttrs = {
						itemSelector: '.isotope-item',
						layoutMode: isotopeItem.getAttribute('data-isotope-layout') ? isotopeItem.getAttribute('data-isotope-layout') : 'masonry',
						filter: '*'
					};

			if (isotopeItem.getAttribute('data-column-width')) {
				isotopeInitAttrs.masonry = {
					columnWidth: parseFloat(isotopeItem.getAttribute('data-column-width'))
				};
			} else if (isotopeItem.getAttribute('data-column-class')) {
				isotopeInitAttrs.masonry = {
					columnWidth: isotopeItem.getAttribute('data-column-class')
				};
			}

			var iso = new Isotope(isotopeItem, isotopeInitAttrs);
			isogroup.push(iso);
		}


		setTimeout(function () {
			for (var i = 0; i < isogroup.length; i++) {
				isogroup[i].element.className += " isotope--loaded";
				isogroup[i].layout();
			}
		}, 200);

		var resizeTimout;

		$("[data-isotope-filter]").on("click", function (e) {
			e.preventDefault();
			var filter = $(this);
			clearTimeout(resizeTimout);
			filter.parents(".isotope-filters").find('.active').removeClass("active");
			filter.addClass("active");
			var iso = $('.isotope[data-isotope-group="' + this.getAttribute("data-isotope-group") + '"]'),
					isotopeAttrs = {
						itemSelector: '.isotope-item',
						layoutMode: iso.attr('data-isotope-layout') ? iso.attr('data-isotope-layout') : 'masonry',
						filter: this.getAttribute("data-isotope-filter") === '*' ? '*' : '[data-filter*="' + this.getAttribute("data-isotope-filter") + '"]'
					};
			if (iso.attr('data-column-width')) {
				isotopeAttrs.masonry = {
					columnWidth: parseFloat(iso.attr('data-column-width'))
				};
			} else if (iso.attr('data-column-class')) {
				isotopeAttrs.masonry = {
					columnWidth: iso.attr('data-column-class')
				};

			}
			iso.isotope(isotopeAttrs);
		}).eq(0).trigger("click")
	}

	/**
	 * WOW
	 * @description Enables Wow animation plugin
	 */
	if ($html.hasClass("wow-animation") && plugins.wow.length && !isNoviBuilder && isDesktop) {
		new WOW().init();
	}

	/**
	 * Lightgallery init
	 * */
	if (plugins.lightGallery.length) {
		for (var i = 0; i < plugins.lightGallery.length; i++) {
			initLightGallery(plugins.lightGallery[i]);
		}
	}

	if (plugins.lightGalleryItem.length) {
		for (var i = 0; i < plugins.lightGalleryItem.length; i++) {
			initLightGalleryItem(plugins.lightGalleryItem[i]);
		}
	}

	if (plugins.lightDynamicGalleryItem.length) {
		for (var i = 0; i < plugins.lightDynamicGalleryItem.length; i++) {
			initDynamicLightGallery(plugins.lightDynamicGalleryItem[i]);
		}
	}

	/**
	 * Custom Toggles
	 */
	if (plugins.customToggle.length) {
		for (var i = 0; i < plugins.customToggle.length; i++) {
			var $this = $(plugins.customToggle[i]);

			$this.on('click', $.proxy(function (event) {
				event.preventDefault();

				var $ctx = $(this);
				$($ctx.attr('data-custom-toggle')).add(this).toggleClass('active');
			}, $this));

			if ($this.attr("data-custom-toggle-hide-on-blur") === "true") {
				$body.on("click", $this, function (e) {
					if (e.target !== e.data[0]
							&& $(e.data.attr('data-custom-toggle')).find($(e.target)).length
							&& e.data.find($(e.target)).length === 0) {
						$(e.data.attr('data-custom-toggle')).add(e.data[0]).removeClass('active');
					}
				})
			}

			if ($this.attr("data-custom-toggle-disable-on-blur") === "true") {
				$body.on("click", $this, function (e) {
					if (e.target !== e.data[0] && $(e.data.attr('data-custom-toggle')).find($(e.target)).length === 0 && e.data.find($(e.target)).length === 0) {
						$(e.data.attr('data-custom-toggle')).add(e.data[0]).removeClass('active');
					}
				})
			}
		}
	}

	/**
	 * Custom Waypoints
	 */
	if (plugins.customWaypoints.length && !isNoviBuilder) {
		for (var i = 0; i < plugins.customWaypoints.length; i++) {
			var $this = $(plugins.customWaypoints[i]);

			$this.on('click', function (e) {
				e.preventDefault();
				$("body, html").stop().animate({
					scrollTop: $("#" + $(this).attr('data-custom-scroll-to')).offset().top
				}, 1000, function () {
					$window.trigger("resize");
				});
			});
		}
	}

	/**
	 * Page title
	 * @description Enables page-title plugin
	 */
	if (plugins.pageTitles.length && !isNoviBuilder) {
		var varCount = 30;

		for (var i = 0; i < plugins.pageTitles.length; i++) {
			var pageTitle = $(plugins.pageTitles[i]);

			var header = pageTitle.children()[0];
			var wrapper = $(document.createElement('div'));
			wrapper.addClass('page-title-inner');

			var pageTitleLeft = $(document.createElement('div')),
					pageTitleCenter = $(document.createElement('div')),
					pageTitleRight = $(document.createElement('div'));

			pageTitleLeft.addClass('page-title-left');
			pageTitleCenter.addClass('page-title-center');
			pageTitleRight.addClass('page-title-right');

			for (var j = 0; j < varCount; j++) {
				pageTitleLeft.append(header.cloneNode(true));
				pageTitleRight.append(header.cloneNode(true));
			}

			pageTitleCenter.append(header.cloneNode(true));
			pageTitle.children(0).remove();

			wrapper.append(pageTitleLeft);
			wrapper.append(pageTitleCenter);
			wrapper.append(pageTitleRight);

			pageTitle.append(wrapper);
		}
	}

	/**
	 * Material Parallax
	 * @description Enables Material Parallax plugin
	 */
	if (plugins.materialParallax.length) {
		if (!isNoviBuilder && !isIE && !isMobile) {
			plugins.materialParallax.parallax();
		} else {
			for (var i = 0; i < plugins.materialParallax.length; i++) {
				var parallax = $(plugins.materialParallax[i]),
						imgPath = parallax.data("parallax-img");

				parallax.css({
					"background-image": 'url(' + imgPath + ')',
					"background-attachment": "fixed",
					"background-size": "cover"
				});
			}
		}
	}

	/**
	 * TimeCircles
	 * @description  Enable TimeCircles plugin
	 */
	if (plugins.dateCountdown.length) {
		for ( var i = 0; i < plugins.dateCountdown.length; i++ ) {
			var
					dateCountdownItem = $( plugins.dateCountdown[ i ] ),
					countdownRender = function () {
						dateCountdownItem.TimeCircles( {
							time: { Seconds: { show: !( window.innerWidth < 768 ), } }
						} ).rebuild();
					};

			dateCountdownItem.TimeCircles( {
				color: dateCountdownItem.attr( "data-color" ) ? dateCountdownItem.attr( "data-color" ) : "rgba(247, 247, 247, 1)",
				animation: "smooth",
				bg_width: dateCountdownItem.attr( "data-bg-width" ) ? dateCountdownItem.attr( "data-bg-width" ) : 0.6,
				circle_bg_color: dateCountdownItem.attr( "data-bg" ) ? dateCountdownItem.attr( "data-bg" ) : "rgba(0, 0, 0, 1)",
				fg_width: dateCountdownItem.attr( "data-width" ) ? dateCountdownItem.attr( "data-width" ) : 0.03,
				time: {
					Days: {
						text: "Дней",
						show: true,
						color: dateCountdownItem.attr( "data-color" ) ? dateCountdownItem.attr( "data-color" ) : "#f9f9f9"
					},
					Hours: {
						text: "Часов",
						show: true,
						color: dateCountdownItem.attr( "data-color" ) ? dateCountdownItem.attr( "data-color" ) : "#f9f9f9"
					},
					Minutes: {
						text: "Минут",
						show: true,
						color: dateCountdownItem.attr( "data-color" ) ? dateCountdownItem.attr( "data-color" ) : "#f9f9f9"
					},
					Seconds: {
						text: "Секунд",
						show: false,
						color: dateCountdownItem.attr( "data-color" ) ? dateCountdownItem.attr( "data-color" ) : "#f9f9f9"
					}
				}
			} );

			countdownRender();
			window.addEventListener( 'resize', countdownRender );
		}
	}

	// Google maps
	if( plugins.maps.length ) {
		lazyInit( plugins.maps, initMaps );
	}

	// Google ReCaptcha
	if (plugins.captcha.length) {
		$.getScript("//www.google.com/recaptcha/api.js?onload=onloadCaptchaCallback&render=explicit&hl=en");
	}

	// RD Input Label
	if (plugins.rdInputLabel.length) {
		plugins.rdInputLabel.RDInputLabel();
	}

	// Regula
	if (plugins.regula.length) {
		attachFormValidator(plugins.regula);
	}

	// MailChimp Ajax subscription
	if (plugins.mailchimp.length) {
		for (i = 0; i < plugins.mailchimp.length; i++) {
			var $mailchimpItem = $(plugins.mailchimp[i]),
					$email = $mailchimpItem.find('input[type="email"]');

			// Required by MailChimp
			$mailchimpItem.attr('novalidate', 'true');
			$email.attr('name', 'EMAIL');

			$mailchimpItem.on('submit', $.proxy( function ( $email, event ) {
				event.preventDefault();

				var $this = this;

				var data = {},
						url = $this.attr('action').replace('/post?', '/post-json?').concat('&c=?'),
						dataArray = $this.serializeArray(),
						$output = $("#" + $this.attr("data-form-output"));

				for (i = 0; i < dataArray.length; i++) {
					data[dataArray[i].name] = dataArray[i].value;
				}

				$.ajax({
					data: data,
					url: url,
					dataType: 'jsonp',
					error: function (resp, text) {
						$output.html('Server error: ' + text);

						setTimeout(function () {
							$output.removeClass("active");
						}, 4000);
					},
					success: function (resp) {
						$output.html(resp.msg).addClass('active');
						$email[0].value = '';
						var $label = $('[for="'+ $email.attr( 'id' ) +'"]');
						if ( $label.length ) $label.removeClass( 'focus not-empty' );

						setTimeout(function () {
							$output.removeClass("active");
						}, 6000);
					},
					beforeSend: function (data) {
						var isNoviBuilder = window.xMode;

						var isValidated = (function () {
							var results, errors = 0;
							var elements = $this.find('[data-constraints]');
							var captcha = null;
							if (elements.length) {
								for (var j = 0; j < elements.length; j++) {

									var $input = $(elements[j]);
									if ((results = $input.regula('validate')).length) {
										for (var k = 0; k < results.length; k++) {
											errors++;
											$input.siblings(".form-validation").text(results[k].message).parent().addClass("has-error");
										}
									} else {
										$input.siblings(".form-validation").text("").parent().removeClass("has-error")
									}
								}

								if (captcha) {
									if (captcha.length) {
										return validateReCaptcha(captcha) && errors === 0
									}
								}

								return errors === 0;
							}
							return true;
						})();

						// Stop request if builder or inputs are invalide
						if (isNoviBuilder || !isValidated)
							return false;

						$output.html('Submitting...').addClass('active');
					}
				});

				return false;
			}, $mailchimpItem, $email ));
		}
	}

	// Campaign Monitor ajax subscription
	if (plugins.campaignMonitor.length) {
		for (i = 0; i < plugins.campaignMonitor.length; i++) {
			var $campaignItem = $(plugins.campaignMonitor[i]);

			$campaignItem.on('submit', $.proxy(function (e) {
				var data = {},
						url = this.attr('action'),
						dataArray = this.serializeArray(),
						$output = $("#" + plugins.campaignMonitor.attr("data-form-output")),
						$this = $(this);

				for (i = 0; i < dataArray.length; i++) {
					data[dataArray[i].name] = dataArray[i].value;
				}

				$.ajax({
					data: data,
					url: url,
					dataType: 'jsonp',
					error: function (resp, text) {
						$output.html('Server error: ' + text);

						setTimeout(function () {
							$output.removeClass("active");
						}, 4000);
					},
					success: function (resp) {
						$output.html(resp.Message).addClass('active');

						setTimeout(function () {
							$output.removeClass("active");
						}, 6000);
					},
					beforeSend: function (data) {
						// Stop request if builder or inputs are invalide
						if (isNoviBuilder || !isValidated($this.find('[data-constraints]')))
							return false;

						$output.html('Submitting...').addClass('active');
					}
				});

				// Clear inputs after submit
				var inputs = $this[0].getElementsByTagName('input');
				for (var i = 0; i < inputs.length; i++) {
					inputs[i].value = '';
					var label = document.querySelector( '[for="'+ inputs[i].getAttribute( 'id' ) +'"]' );
					if( label ) label.classList.remove( 'focus', 'not-empty' );
				}

				return false;
			}, $campaignItem));
		}
	}

	// RD Mailform
	if (plugins.rdMailForm.length) {
		var i, j, k,
				msg = {	'MF000': 'Успешно отправлено!',	'MF001': 'Получатели не установлены!',	'MF002': 'Форма не будет работать локально!',	'MF003': 'Укажите поле электронной почты в своей форме!',	'MF004': 'Укажите тип своей формы!',	'MF254': 'Что-то пошло не так с PHPMailer!',	'MF255': 'Вот блин! Что-то пошло не так.'};

		for (i = 0; i < plugins.rdMailForm.length; i++) {
			var $form = $(plugins.rdMailForm[i]),
					formHasCaptcha = false;

			$form.attr('novalidate', 'novalidate').ajaxForm({
				data: {
					"form-type": $form.attr("data-form-type") || "contact",
					"counter": i
				},
				beforeSubmit: function (arr, $form, options) {
					if (isNoviBuilder)
						return;

					var form = $(plugins.rdMailForm[this.extraData.counter]),
							inputs = form.find("[data-constraints]"),
							output = $("#" + form.attr("data-form-output")),
							captcha = form.find('.recaptcha'),
							captchaFlag = true;

					output.removeClass("active error success");

					if (isValidated(inputs, captcha)) {

						// veify reCaptcha
						if (captcha.length) {
							var captchaToken = captcha.find('.g-recaptcha-response').val(),
									captchaMsg = {	'CPT001': 'Пожалуйста, настройте «ключ сайта» и «секретный ключ» reCaptcha',	'CPT002': 'Что-то не так с google reCaptcha'};

							formHasCaptcha = true;

							$.ajax({
								method: "POST",
								url: "bat/reCaptcha.php",
								data: {'g-recaptcha-response': captchaToken},
								async: false
							})
							.done(function (responceCode) {
								if (responceCode !== 'CPT000') {
									if (output.hasClass("snackbars")) {
										output.html('<p><span class="icon text-middle mdi mdi-check icon-xxs"></span><span>' + captchaMsg[responceCode] + '</span></p>')

										setTimeout(function () {
											output.removeClass("active");
										}, 3500);

										captchaFlag = false;
									} else {
										output.html(captchaMsg[responceCode]);
									}

									output.addClass("active");
								}
							});
						}

						if (!captchaFlag) {
							return false;
						}

						form.addClass('form-in-process');

						if (output.hasClass("snackbars")) {
							output.html('<p><span class="icon text-middle fa fa-circle-o-notch fa-spin icon-xxs"></span><span>Sending</span></p>');
							output.addClass("active");
						}
					} else {
						return false;
					}
				},
				error: function (result) {
					if (isNoviBuilder)
						return;

					var output = $("#" + $(plugins.rdMailForm[this.extraData.counter]).attr("data-form-output")),
							form = $(plugins.rdMailForm[this.extraData.counter]);

					output.text(msg[result]);
					form.removeClass('form-in-process');

					if (formHasCaptcha) {
						grecaptcha.reset();
					}
				},
				success: function (result) {
					if (isNoviBuilder)
						return;

					var form = $(plugins.rdMailForm[this.extraData.counter]),
							output = $("#" + form.attr("data-form-output")),
							select = form.find('select');

					form
					.addClass('success')
					.removeClass('form-in-process');

					if (formHasCaptcha) {
						grecaptcha.reset();
					}

					result = result.length === 5 ? result : 'MF255';
					output.text(msg[result]);

					if (result === "MF000") {
						if (output.hasClass("snackbars")) {
							output.html('<p><span class="icon text-middle mdi mdi-check icon-xxs"></span><span>' + msg[result] + '</span></p>');
						} else {
							output.addClass("active success");
						}
					} else {
						if (output.hasClass("snackbars")) {
							output.html(' <p class="snackbars-left"><span class="icon icon-xxs mdi mdi-alert-outline text-middle"></span><span>' + msg[result] + '</span></p>');
						} else {
							output.addClass("active error");
						}
					}

					form.clearForm();

					if (select.length) {
						select.select2("val", "");
					}

					form.find('input, textarea').trigger('blur');

					setTimeout(function () {
						output.removeClass("active error success");
						form.removeClass('success');
					}, 3500);
				}
			});
		}
	}

});

