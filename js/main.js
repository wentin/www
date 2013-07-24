var homeAnimationTime = 700;
var homeScroll, contentScroll;


/*function updatePosition () {
	console.log(this.x);
	var scrollLeft = -this.x;
	var per = 100 - scrollLeft/2056*100;
	$('#homeView').css('background-position-x', per+'%');
}*/

function loaded () {
	homeScroll = new IScroll('#homeScroll', {
		scrollX: true, 
		scrollY: false,
		mouseWheel: true,
		indicators: [{
			el: document.getElementById('background'),
			resize: false,
			ignoreBoundaries: true,
			speedRatioY: 0.5
		}]
	});
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);


$(function(){
	
	loaded();
	
	var postData = {
        "program" : 'bfa-integrated-design-curriculum',
    };
	$.ajax({
		type: "POST",
		url: "http://wentin.co/parsons-web/curriculum.php",
		data: postData, 
		datatype: "html",
		success: function(data, textStatus, xhr){
			$('.left .curriculumWrapper').html(data);
		},
		// Alert status code and error if fail
		error: function (xhr, ajaxOptions, thrownError){
			alert(xhr.status);
			alert(thrownError);
		}
	});
	/*$('#homeView').scroll(function() {
		console.log($('#homeView').scrollLeft());
		var scrollLeft = $('#homeView').scrollLeft();
		var per = 100 - scrollLeft/2056*100;
		$('#homeView').css('background-position-x', per+'%');
	}); */
	
	
	$('table a').live('tap', function(e) {
			
		e.stopPropagation();
		e.preventDefault();
		var href = $(this).attr('href');
		var courseUrl = {
			"url" : href,
		};
		$.ajax({
			type: "POST",
			url: "http://wentin.co/parsons-web/course.php",
			data: courseUrl, 
			datatype: "html",
			success: function(data, textStatus, xhr){
				$('.right .curriculumWrapper').html(data);
			},
			// Alert status code and error if fail
			error: function (xhr, ajaxOptions, thrownError){
				alert(xhr.status);
				alert(thrownError);
			}
		});
	} )
	
	$('.homeTile').on( "tap", function( event ) {
		/*$('.homeTile').animate({
		opacity : 0.1,
		height  : 900, // You desired height.
		width   : 900
		});	*/
		//$('.homeTile').effect("scale",{ percent: 300 }, 1000);
		
		secondViewEnter('#AMTView');
	} )


	$('.mainMenu').click(function(){
		secondViewExit();
	});
	
})

function secondViewEnter(program) {
	var program = program;
	var i=1;
	
	$('ul.menu li').css('left', '-270px');
	var $thisRightCol = $(program).find('.rightCol');
	//$thisRightCol.css('left', '724px');
	
	var $thisMainMenu = $(program).find('.mainMenu');
	$thisMainMenu.css('top', '-50px');
	
	var $thisSschoolName = $(program).find('.schoolName');
	$thisSschoolName.css('left', '-270px');
	
	$('.homeTile').removeClass('homeTileNormal');
	$('.homeTile').addClass('homeTileLarge');
	$('.logo').animate({
		left: -250	
	}, homeAnimationTime, 'easeInOutQuad');
	window.setTimeout(  
		function() {  
			$('.wrapper').removeClass('active');
			$('#AMTView').addClass('active');
			
			contentScrollcontentScroll = new IScroll('.scrollWrapper', { mouseWheel: true });
			/*$thisRightCol.animate({
				left: 0	
			}, 700, 'easeInOutQuad', function(){
				contentScroll = new IScroll('.scrollWrapper', { mouseWheel: true });
				});*/
				
			$thisMainMenu.delay(400).animate({
				top: 0	
			}, 300, 'easeInOutQuad');
			
			$thisSschoolName.animate({
				left: 0	
			}, 500, 'easeInOutQuad');
			
			$(program).find('li').each(function(){
				$(this).delay(100*i).animate({
					left: 0	
				}, 500, 'easeInOutQuad');
				i++
			})
		},  
		homeAnimationTime
	);
	
	
	
}


function secondViewExit() {
	$('.wrapper').removeClass('active');
	$('#homeView').addClass('active');
	
	$('.logo').css('left', '-250px');
	window.setTimeout(  
		function() {  
			$('.logo').animate({
				left: 70	
			}, homeAnimationTime, 'easeInOutQuad');
			$('.homeTile').removeClass('homeTileLarge');
			$('.homeTile').addClass('homeTileNormal');
			window.setTimeout(  
				function() {  
				//$('.homeTile').removeClass('homeTileNormal').removeClass('homeTileLarge');
				},  
				homeAnimationTime
			);
		
		},  
		20
	);
	
}