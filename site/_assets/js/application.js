/* ----------------------------------------- */
/*	        Main Nav Functionality           */ 
/* ----------------------------------------- */
//You need an anonymous function to wrap around your function to avoid conflict
(function($){

	//Attach this new method to jQuery
 	$.fn.extend({ 
 		
 		//This is where you write your plugin's name
 		mainNav: function() {
			// CONFIG
			var c = {
				'speed'		: 400,
				'ease'		: 'easeOutExpo',
				'navMain'	: this,
				'navMainH'	: $(this).children('ul').height(),
				'navSub'	: '.navSub',
				'header'	: $('header'),
				'headerH'	: $('header').height()	
			};
			c.navMainItems = c.navMain.children('ul').children('li');
			

			//Iterate over the current set of matched elements
    		return this.each(function() {
				// SETUP
				// 1. Store heights of sub nav for later. Set id's to reference these heights
				c.navSubHeights = []
				var i = 0;
				c.navMainItems.each( function() {
					var h  = $(this).children(c.navSub).height();
					$(this).attr('id', 'nM_'+i);
					if (h) c.navSubHeights.push(h);
					else   c.navSubHeights.push(0);	
					i++;
				})
				
				// METHODS
				// 1. Toggle Sub Nav Visibility
				var toggleSubNav = function()	{
					var thisNavSub   = $('#'+clickedId).children(c.navSub);	
					
					if (thisNavSub.length)	{
						$(c.navSub).animate({'opacity' : 0}, c.speed, c.ease);							
						thisNavSub.stop().animate({'opacity' : 1}, c.speed, c.ease);
						return false;
					}	
					return true;
				}
				
				// 2. Toggle Main Nav Active State 
				var toggleMainNavActiveState = function()	{
					activeId = $('#'+clickedId);
					c.navMainItems.removeClass('active');
					activeId.addClass('active');
					
				}
				
				// 3. Toggle Main Nav Height 
				var toggleHeaderHeight = function(h, timer, speed)	{
					
					if ( !speed ) var speed = c.speed*2
					
					// Fire
					if ( timer ) {
						clearTimeout(timer);
						timer = null;
					} else {
						animateHeader();
					}	
			
					// Methods
					function animateHeader() { 
						c.header.stop().animate({'height' : parseInt(h)}, speed, c.ease);
					}
					timer = setTimeout(function() {
						if ( canCollapseHeader ) animateHeader();
	                }, speed);
				}
				
				
				
				
				// FIRE
				var canCollapseHeader = true;
				toggleHeaderHeight(c.navMainH, true, 0);
				
				
				
				// EVENTS 
				// 1. Click
				c.navMainItems.click(function()	{
					// variables are used throughout the pluggin
					clickedId	 =	$(this).attr('id');
					thisNavSubH  =  c.navSubHeights[clickedId.split('_')[1]];
					
					// fire
					toggleMainNavActiveState();					
					toggleHeaderHeight(parseInt(thisNavSubH+c.headerH));
					return toggleSubNav();

				})
				
				// 2. Header: HoverOut - Wait c.time, if user has not Hovered back in close the header
				c.header.hover( function() {
					canCollapseHeader = false;
				}, function() {
					canCollapseHeader = true;
					toggleHeaderHeight(c.navMainH, true);
					
				})
			
    		});
    	}
	}
);
	
//pass jQuery to the function, 
//So that we will able to use any valid Javascript variable name 
//to replace "$" SIGN. But, we'll stick to $ (I like dollar sign: ) )		
})(jQuery);















/* ----------------------------------------- */
/*    FIRE EVERYTHING (Star Treck Style)     */ 
/* ----------------------------------------- */

$(document).ready( function()	{
	$('body').addClass('hasJs');
	$('#navMain').mainNav(jQuery);

	
		
})