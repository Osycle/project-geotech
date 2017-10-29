'use strict';

(function(){
$(function(){






	WOW
	new WOW({
		offset: 30
	}).init();

	$(".p-animated p").map(function(i, el){
		$(el).attr({
					"data-aos": "fade-up",
					"data-aos-duration": 600,
					"data-aos-delay": 100*i});
		$(el).addClass("invisible");
		setTimeout(function(){$(el).removeClass("invisible")}, 600);
		setTimeout(function(){$(el).removeClass("aos-animate")}, 100);
	});
	$(".p-animated ul li").map(function(i, el){
		$(el).attr({
					"data-aos": "fade-up",
					"data-aos-duration": 600,
					"data-aos-delay": 100*i});
		$(el).addClass("invisible");
		setTimeout(function(){$(el).removeClass("invisible")}, 600);
		setTimeout(function(){$(el).removeClass("aos-animate")}, 100);
	});

	
	// AOS
	AOS.init({
	  offset: 0,
	  once: true,
	  duration: 1000,
	  delay: 100
	});
	setTimeout(function(){AOS.refresh()}, 450);





	//--SLIDER
	// SERVICES
	var arrowStyle = { 
		  x0: 10,
		  x1: 60, y1: 50,
		  x2: 60, y2: 45,
		  x3: 15
		}
	var carouselServ = $('.slider-serv .slider-content').flickity({
		arrowShape: arrowStyle,
		percentPosition: true,
		pageDots: false,
		autoPlay: false,
		cellAlign: 'center',
		contain: true,
		initialIndex: 2
	});
	// PHOTO-GALLARY
	$('.gallery-main').flickity({
		prevNextButtons: false,
		draggable:false,
		pageDots: false
	});
	$('.slider-gallery .gallery-nav').flickity({
		arrowShape: arrowStyle,
		asNavFor: '.gallery-main',
	  contain: true,
	  pageDots: false
	});
	// FANCYBOX
	if( $(".fancybox").length != 0 )
	$(".fancybox").fancybox({});

	// MAP-LOCATION
	var carouselLocation = $('.slider-location .slider-content').flickity({
		initialIndex: 3,
		prevNextButtons: false,
		draggable: !(checkView(992))
	});
	$('.button-group').on( 'click', '.btn-city', function() {
	  var index = $(this).index();
	  carouselLocation.flickity( 'select', index );
	});
	// PARTNERS
	var carouselPartners = $('.slider-partners .slider-content').flickity({
		autoPlay: 2000,
		arrowShape: arrowStyle,
		imagesLoaded: true,
		//prevNextButtons: false,
		pageDots: false,
		wrapAround: true,
		selectedAttraction: 0.2,
		friction: 0.8,
		percentPosition: true,
		//rightToLeft: true,
		cellAlign: 'center'
	});







	$(".carousel-services").on("mousemove", function(e){
		$(this).css("background-position-x", (-220 + (-e.pageX/50)))
					 .css("background-position-y", (-400 + (-e.pageY/10)));
	});


$("#header").before('<div class="header-hidden"></div>');
$(".nav-menu").initMenu({
	"menuToggleBtn": ".menu-toggle",
	"subMenu": ".sub-menu-1",
	"modalMenu": "#menu-modal",
	menuHoverIn: function(){console.log('sadsd')}
})

$(".btn-city").hover(
	function(){
		$(this).click();
}, function(){

});


function phoneDap(){
	if ( checkView(992) )
		return;
	$(".footer-menu")
		.before	( $(".footer-info") )
		.after	( $(".footer-logo") )
}
phoneDap();

//RESIZE
$( window ).on("resize", function(e){

	// body

});



var header_status = false;
//SCROLL
$( window ).on("scroll", function(){
	if($(window).scrollTop() > 300 && header_status == false){

		$("#header").addClass("navbar-scroll");
		
		header_status = true; 

	}else if($(window).scrollTop() < 300 && header_status == true){

		$("#header").removeClass("navbar-scroll");
		
		header_status = false;

	}

});









	});//$
}) (jQuery);



window.$.fn.initMenu = function(option){

	var options = $.extend({
		"menuToggleBtn"					: false, 		// Кнопка бара
		"subMenu"								: false, 		// Класс подменю
		"modalMenu"							: false, 		// Модальное меню

		"menuToggle"						: Function, 	// Переключение
		"menuHoverIn"						: Function,
		"menuHoverOut"					: Function,
		"subHoverIn"						: Function,
		"subHoverOut"						: Function,
		"modalMenuShow"					: Function, 	// Открытие меню
		"modalMenuShown"				: Function,		// Меню раскрыт
		"modalMenuHide"					: Function, 	// Раскрытие Меню
		"modalMenuHidden"				: Function 		// Меню скрыт


	}, option );
	var menu = new Menu(this, options);

	return menu;

}

function Menu( menu, options ){

	var self = this;
	menu = $( menu );

	//ПОЛЯ
	this.menuClass						= menu[0].className;
	this.menuToggleBtn 				= $( $(options.menuToggleBtn) ) ;
	this.menuToggleBtnParent  = $(this.menuToggleBtn).parent();
	this.subMenu 							= $( menu.find(options.subMenu) );
	this.modalMenu  					= $( $(options.modalMenu) );
	this.modalMenuStatus 		 	= false; 

	//МЕТОДЫ
	this.menuToggle					= function(){
		$( this.menuToggleBtn ).trigger("click");
		return this.modalMenuStatus = !this.modalMenuStatus;
	}


	menu.find("[class|='sub']").closest("li").addClass("sub-parent");
	$(".min-navbar").append( menu.clone() ).find( "."+this.menuClass ).addClass("min");

	this.modalMenu.on('show.bs.modal', function (e) {
		if (self.modalMenu.length === 0) return;

		options.modalMenuShow();

	})
	this.modalMenu.on('shown.bs.modal', function (e) {
		if (self.modalMenu.length === 0) return;

		options.modalMenuShown();
		
	})
	this.modalMenu.on('hide.bs.modal', function (e) {
		if (self.modalMenu.length === 0) return;
		options.modalMenuHidden();

	})
	this.modalMenu.on('hidden.bs.modal', function (e) {
		if (self.modalMenu.length === 0) return;
		self.menuToggleBtn.addClass("collapsed");
		options.modalMenuHidden();

	})

	//HOVER MENU
	menu.find("li").hover(
		function(){
			options.menuHoverIn();
	},function(){
			options.menuHoverOut();
	});



	//HOVER SUB-MENU
	this.subMenu.hover(
		function(){
			adposmenu(this);
			options.subHoverIn();
		},
		function(){
			options.subHoverOut();
		});




	this.menuToggleBtn.on("click", function(){
		if(this.modalMenuStatus)
			$(this).addClass("collapsed");
		else
			$(this).removeClass("collapsed");

		options.menuToggle();
	});
	

	//	FUNCITON


function adposmenu(subMenu){
		//Адаптация положение подменю в зависимости от размера экрана
		var el = $(subMenu).find("li ul");
		if (el.length === 0) return;
		if ( $( window ).width() < el.width() + el.offset().left ) 
			el.addClass("left");
	}

}

function checkView( width ){
	return ($( document ).width() > width);
}

function sendForm(th){

	this.onsubmit = function(e){ e.preventDefault();}
	var require = $(th).serialize();
	send(require+"&to="+to);

	$(th).find("input").val("");
}

function ajPost(u, d, s, c){
	$.ajax({
		type: 		"POST",
		url: 			u,
		data: 		d,
		success: 	s,
		statusCode: {
			404: function(){alert("Страница не найдена");}
		},
		complete: c
	});
}
 $.fn.fadeToggleBool = function( dura ){
 	var dura = 290;
 	var self = $( $(this) ),
 		 bool = self.css("display") == "none";

	self.fadeToggle({

		duration: dura,
		easing: "linear"

	});

	return bool;
 }

function modalShadow( el ){

	if( $(modal_shadow).length == 0 && el.jquery) 
		return;

	if( modal_shadow.fadeToggleBool() ){
		modal_shadow.on("click", function(){
			if(el.length != 0)
				el.trigger("click");
			});
	}else
		modal_shadow.off("click");
}

function scrolledDiv(el) {
	try{
	  var docViewTop = $(window).scrollTop(),
		docViewBottom = docViewTop + $(window).height(),
		elTop = $(el).offset().top,
		elBottom = elTop + $(el).height()/1.8;
	}catch(err){console.error();}

  	return ((elBottom <= docViewBottom) && (elTop >= docViewTop));
}