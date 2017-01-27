/**
 * Initializes the tabs. Tabs are identified by class.
 */
init_tabs = function(_event) {
	// Don't do anything for the blackberry
	if ( navigator.userAgent.toLowerCase().search('blackberry') > -1) {
		return;
	}

	//----------------------------------------------------------------------
	// Add the "-active" to the ID of each of the content divs this prevents
	// scrolling to a hash since the hash will not exist.
	//----------------------------------------------------------------------
	$('.tab-nav li a').each(function() {
		var id = $(this).attr('href').replace('#', '');
		$('#'+id).attr('id', id+'-active');
	});

	//----------------------------------------------------------------------
	// Hide all tab-content that is  not currently selected
	//----------------------------------------------------------------------
	$('.tab-content').each(function() {
		if ( ! $(this).hasClass('selected') ) {
			$(this).addClass('hidden');
		}
	});

	//----------------------------------------------------------------------
	// Add a click handler to all tab-nav controls to toggle content
	//----------------------------------------------------------------------
	$('.tab-nav li a').click(function(_event) {
		return toggle_tab($(this).attr('href').replace('#', ''));
	});

	// Modify classes to "activate" the tabs
	$('.tab-nav').removeClass('tab-nav').addClass('tab-nav-active');
	$('.tab-content')
		.removeClass('tab-content')
		.addClass('tab-content-active');
	$('.tab-content-wrapper')
		.removeClass('tab-content-wrapper')
		.addClass('tab-content-wrapper-active');

	//----------------------------------------------------------------------
	// Modify tab display properties based on hash value if available
	//----------------------------------------------------------------------
	var hash = window.location.hash.replace('#', '');
	if ( hash != '' ) { toggle_tab(hash); }

};

/**
 * Toggles the tabs. There may be multiple tab objects on a single page, but
 * this method will only toggle the object containing the given _hash
 * controller and content (id).
 */
toggle_tab = function(_hash) {
	// Find the navigation list containing this control
	var hash_controlled_tabs = 
		$('[href$="' + _hash + '"]').parent('li').parent('ul');
	// Find the content-wrapper containing this control's content
	var hash_controlled_content = 
		$('#' + $(hash_controlled_tabs).attr('id') + '-content');

	// Remove the selected class from all the controllers in the
	// hash-controlld navigation list
	$('li', $(hash_controlled_tabs)).removeClass('selected');

	// Add the selected class to the control li containing the current hash
	$('[href$="' + _hash + '"]', $(hash_controlled_tabs)).parent('li')
		.addClass('selected');

	// Hide all content divs controlled by the hash-controlled list
	$('.tab-content-active', $(hash_controlled_content))
		.removeClass('selected')
		.addClass('hidden');

	// Display the content div indicated by the hash.
	$('#' + _hash + '-active').removeClass('hidden').addClass('selected');

	// Keep history clean so 'back' goes to previous page
	if(typeof location.replace != 'undefined' && 
		!(/OmniWeb/.exec(navigator.userAgent))) {
		location.replace('#'+_hash);
	}


	return false;
};

// Automagically tabify all tab objects when the page loads.
$(document).ready(init_tabs);
