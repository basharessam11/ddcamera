(function ($) {
	$.fn.loadScrollData = function (start, options) {
		var settings = $.extend({
			limit: 100,
			listingId: '',
			loadMsgId: '',
			ajaxUrl: '',
			loadingMsg: '<div style:"text-align:center;">Please Wait...!</div>',
			loadingSpeed: 1

		}, options);

		action = "inactive";

		$.ajax({
			method: "POST",
			data: {
				'getData': 'ok',
				'limit': settings.limit,
				'start': start
			},
			url: settings.ajaxUrl,
			success: function (data) {
				$(settings.listingId).append(data);
				if (data == '') {
					$(settings.loadMsgId).html('');
					action = 'active';
				} else {
					$(settings.loadMsgId).html(settings.loadingMsg);
					action = "inactive";
				}
			}
		});

		if (action == 'inactive') {
			action = 'active';
		}

		$(window).scroll(function () {
			if ($(window).scrollTop() + $(window).height() > $(settings.listingId).height() && action == 'inactive') {
				action = 'active';
				start = parseInt(start) + parseInt(settings.limit);
				setTimeout(function () {
					$.fn.loadScrollData(start, options);
				}, settings.loadingSpeed);
			}
		});

	};
}(jQuery));
