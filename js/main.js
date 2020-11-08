(function($) {
	"use strict";
	// TOP Menu Sticky
	$(window).on('scroll', function() {
		var scroll = $(window).scrollTop();
		if (scroll < 400) {
			$("#sticky-header").removeClass("sticky");
			$('#back-top').fadeIn(500);
		} else {
			$("#sticky-header").addClass("sticky");
			$('#back-top').fadeIn(500);
		}
	});

	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

	// "<div class='post-meta mb-3'>" +
	// "<div><span>" + post_date_disp + "</span></div>" +
	// "<div><span class='author-name'>" + cur_post.author.name + "</span></div></div>" +

	// $.get("https://public-api.wordpress.com/rest/v1.1/sites/subbuswarooptest.wordpress.com/posts", function(response) {
	// 	if (response.posts.length > 0) {
	// 		let htmlcontent = "";
	// 		for (let i = 0; i < response.posts.length; i++) {
	// 			let cur_post = response.posts[i];
	// 			let post_date = new Date(cur_post.date);
	// 			let post_date_disp = months[post_date.getMonth()] + ' ' + post_date.getDate() + ', ' + post_date.getFullYear();
	// 			htmlcontent +=
	// 				"<div class='col-md-3 ftco-animate'>" +
	// 				"<div class='blog-entry'>" +
	// 				"<div class='back-img'>" +
	// 				"<a href='blog-single.html' class='block-20 img' ><img src='" + (cur_post.featured_image ? cur_post.featured_image : "img/blog/single_blog_4.png") + "'/></a></div>" +
	// 				"<div class='blog-text'><h3 class='heading-post'>" +
	// 				"<a href='#'>" + (cur_post.title !== "" ? cur_post.title : "Test title") + "</a></h3>" +
	// 				"<p>" + (cur_post.excerpt ? cur_post.excerpt : "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.") + "</p>" +
	// 				"</div></div></div></div>";
	// 		}
	// 		// console.log(htmlcontent);
	// 		$("#blog-posts").append(htmlcontent);
	// 	}
	// });


	$.get("https://public-api.wordpress.com/rest/v1.1/sites/subbuswarooptest.wordpress.com/posts", function(response) {
		if (response.posts.length > 0) {
			let showdata = response.posts.splice(0, 2);
			let htmlcontent = "";
			for (let i = 0; i < showdata.length; i++) {
				let cur_post = showdata[i];
				let post_date = new Date(cur_post.date);
				let post_date_disp = months[post_date.getMonth()] + ' ' + post_date.getDate() + ', ' + post_date.getFullYear();
				htmlcontent +=
					"<div class='blog-card web' style='background-image: url(" + (cur_post.featured_image ? cur_post.featured_image : "img/blog/single_blog_4.png") + ")'>" +
					"<div class='content-mask'>" +
					"<span class='category'>" + Object.keys(cur_post.categories)[0] + "</span>" +
					"<h1 class='post-title'>" + (cur_post.title !== "" ? cur_post.title : "Test title") + "</h1>" +
					"<p>" + (cur_post.excerpt ? cur_post.excerpt : "") + "</p>" +
					"<div class='post-detail'>" +
					"<span class='icon'></span><span class='date'>" + post_date_disp + "</span>" +
					"</div></div></div>";
			}
			// console.log(htmlcontent);
			$("#blog-posts").append(htmlcontent);
		}
	});

	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function() {
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	filterSelection('web-mob');

	// Categories Nav

	const indicator = document.querySelector('.nav-indicator');
	const items = document.querySelectorAll('.nav-item');

	function handleIndicator(el) {
		console.log(el.tagName);
		items.forEach(item => {
			item.classList.remove('is-active');
			item.removeAttribute('style');
		});

		indicator.style.width = `${el.offsetWidth}px`;
		indicator.style.left = `${el.offsetLeft}px`;
		indicator.style.backgroundColor = el.getAttribute('active-color');

		el.classList.add('is-active');
		el.style.color = el.getAttribute('active-color');
	}


	items.forEach((item, index) => {
		item.addEventListener('click', (e) => { handleIndicator(e.target.tagName == "DIV" ? e.target : e.target.parentNode) });
		item.classList.contains('is-active') && handleIndicator(item);
	});

	//Cat nav ends
	$(document).ready(function() {

		var feedbackSlider = $('.feedback-slider');
		feedbackSlider.owlCarousel({
			items: 1,
			nav: true,
			dots: true,
			autoplay: true,
			loop: true,
			mouseDrag: true,
			touchDrag: true,
			navText: ["<i class='fa fa-long-arrow-left'></i>", "<i class='fa fa-long-arrow-right'></i>"],
			responsive: {

				// breakpoint from 767 up
				767: {
					nav: true,
					dots: false
				}
			}
		});

		feedbackSlider.on("translate.owl.carousel", function() {
			$(".feedback-slider-item h3").removeClass("animated fadeIn").css("opacity", "0");
			$(".feedback-slider-item img, .feedback-slider-thumb img, .customer-rating").removeClass("animated zoomIn").css("opacity", "0");
		});

		feedbackSlider.on("translated.owl.carousel", function() {
			$(".feedback-slider-item h3").addClass("animated fadeIn").css("opacity", "1");
			$(".feedback-slider-item img, .feedback-slider-thumb img, .customer-rating").addClass("animated zoomIn").css("opacity", "1");
		});
		feedbackSlider.on('changed.owl.carousel', function(property) {
			var current = property.item.index;
			var prevThumb = $(property.target).find(".owl-item").eq(current).prev().find("img").attr('src');
			var nextThumb = $(property.target).find(".owl-item").eq(current).next().find("img").attr('src');
			var prevRating = $(property.target).find(".owl-item").eq(current).prev().find('span').attr('data-rating');
			var nextRating = $(property.target).find(".owl-item").eq(current).next().find('span').attr('data-rating');
			$('.thumb-prev').find('img').attr('src', prevThumb);
			$('.thumb-next').find('img').attr('src', nextThumb);
			$('.thumb-prev').find('span').next().html(prevRating + '<i class="fa fa-star"></i>');
			$('.thumb-next').find('span').next().html(nextRating + '<i class="fa fa-star"></i>');
		});
		$('.thumb-next').on('click', function() {
			feedbackSlider.trigger('next.owl.carousel', [300]);
			return false;
		});
		$('.thumb-prev').on('click', function() {
			feedbackSlider.trigger('prev.owl.carousel', [300]);
			return false;
		});

		$('#customers-testimonials').owlCarousel({
			loop: true,
			center: true,
			margin: 0,
			autoplay: false,
			dots: false,
			nav: true,
			navText: [
				'<i class="fa fa-angle-left" aria-hidden="true"></i>',
				'<i class="fa fa-angle-right" aria-hidden="true"></i>'
			],
			responsive: {
				0: {
					items: 1
				},
				768: {
					items: 2
				},
				1170: {
					items: 3
				}
			}
		});

		// wow js
		new WOW().init();

	});

	// $(".filterDiv .item").on('hover', function(event) {
	// 	$(this).children
	// });

	$(document).ready(function($) {
		$('.count-number').counterUp({
			delay: 5,
			time: 500
		});
	});

	$("#scroll-to-top").click(function() {
		$("html, body").animate({ scrollTop: 0 }, "slow");
		return false;
	});

	(() => {
		const form = document.querySelector("#contact-form");
		const formResponse = document.querySelector("#js-form-response");

		form.onsubmit = (e) => {
			e.preventDefault();

			// Prepare data to send
			const data = {};
			const formElements = Array.from(form);
			formElements.map((input) => (data[input.name] = input.value));

			// Log what our lambda function will receive
			// console.log(JSON.stringify(data));

			// Construct an HTTP request
			var xhr = new XMLHttpRequest();
			xhr.open(form.method, form.action, true);
			xhr.setRequestHeader("Accept", "application/json; charset=utf-8");
			xhr.setRequestHeader(
				"Content-Type",
				"application/json; charset=UTF-8"
			);

			// Send the collected data as JSON
			xhr.send(JSON.stringify(data));

			// Callback function
			xhr.onloadend = (response) => {
				if (response.target.status === 200) {
					// The form submission was successful
					form.reset();
					formResponse.innerHTML =
						"Thank you for your interest. We will get back to you shortly.";
				} else {
					// The form submission failed
					formResponse.innerHTML = "Something went wrong. Please try again later.";
					console.error(JSON.parse(response.target.response).message);
				}
			};
		};
	})();

})(jQuery);

function filterSelection(filter) {
	var newActiveFilter = $(".filters ." + filter);
	if (newActiveFilter.hasClass('active')) {
		//do nothing
	} else {
		//update filter
		$('.filters .active').removeClass('active');
		newActiveFilter.addClass('active');

		//apply filter
		if (filter == 'all') {
			$('.filterDivs').children().removeClass('hide');
		} else {
			$('.filterDivs').children("." + filter).removeClass('hide');
			$('.filterDivs').children().not("." + filter).addClass('hide');
		}
	}
}