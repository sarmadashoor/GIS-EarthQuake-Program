/**
 * This file contains the source code for the ContactForm Javascript object.
 * This object requests the contact form via AJAX and displays the form to the
 * user using a modal-style dialog box. The form is subsequently validated using
 * the ContactValidator class and upon successful validation, is submitted over
 * AJAX.
 *
 * A single instance of this class can handle links to multiple contact forms on
 * a single page. However the look and feel of the modal display will be
 * consistent.
 *
 * The modal dialog is opened in the function returned by the
 * "getOpenContactCallback". The method itself is a wrapping "getter" method
 * around a window click-event. The returned method should be bound to a contact
 * link <a> tag. The form will be fetched from the "href" attribute of that
 * anchor.
 *
 * When submitting the form, it will be submitted to the "action" attribute of
 * the form that is returned. The target of the "action" parameter should return
 * markup with a single root element suitable for display in a subsequent modal
 * dialog.
 *
 * All AJAX requests made by this class include the "ajax=true" query string
 * parameter. Server-side pages can test for this parameter to check if the
 * request should be wrapped in the template (i.e. "ajax" query string parameter
 * is not set), or not.
 *
 * @author emartinez
 * @date   2010/09/20
 * @see ContactValidator.js
 * @see FAQFilter.js
 *
 *
 * -- Dependencies --
 * Note: Update this if you ever re-package this into the site JS library.
 *
 * @import /contactus/js/ContactValidator.js
 * @import /contactus/js/FAQFilter.js
 * @widget ui
 *
 *
 * -- Changelog --
 * Revision 1: Updated the autocomplete to trigger the FAQFilter update when the
 * user clicks an option from the autocomplete overlay.
 */



/**
 * Constructore for the ContactForm object.
 *
 * @param options {Object} OPTIONAL - Options to customize the behavior of the
 *  contact form. These are taken directly from the jQuery UI Dialog object
 *
 * @see http://jqueryui.com/demos/dialog/
 */
ContactForm = function(options) {
	this._options = {
		/** Defaults **/
		"dialog": {
			"autoOpen": true,
			"draggable": true,
			"resizable": true,
			"modal": true,
			"title": "Contact Us",
			"close": this.getCloseContactCallback(),
			// -- Computed at window load time based on window size. -- //
			"width": Math.min(850, $('body').width()-50),
			"height": Math.min(540, $('body').height()-50),
			"zIndex": 10001
		}
	};
	for (var o in options) { this._options[o] = options[o]; }
	this._dialog = null;
	this._validator = new ContactValidator(this);
	this._faqfilter = null;
};

/**
 * Renders the FAQ
 *
 * There are three levels of FAQs "Earthquake" sits as the parent category, 
 * with two levels of subcategories below the "Earthquake" category. 
 */

ContactForm.prototype.renderFAQ = function() {
	
	$.ajax({
		url: 'http://www.usgs.gov/faq/services/getCategoryQuestions.php?category=113',
		jsonpCallback: 'earthquake',
		dataType: 'jsonp',
		success: function(data) {
			var c =	'<h4 class="search">' + data.categoryName + '</h4><ul>';
			for (var i = 0; i < data.categoryFaqs.length; i++) {
				c += '<li class="search"><a href="' + data.categoryFaqs[i].url + '" target="_blank">' + data.categoryFaqs[i].question + '</a></li>';
			}
			c += '</ul>';
			
			for (var i = 0; i < data.subCategories.length; i++) {
				if (typeof(data.subCategories[i]) == 'object'){
					// Title for the first level of subcategories unders the main "Earthquake" category
					c += '<h4 class="search">' + data.subCategories[i].categoryName + '</h4><ul>';
					
					// FAQs for the first level of subcategories unders of the main "Earthquake" category
					for (var x = 0; x < data.subCategories[i].categoryFaqs.length; x++) {			
						c += '<li class="search"><a href="' + data.subCategories[i].categoryFaqs[x].url + 
								'" target="_blank">' + data.subCategories[i].categoryFaqs[x].question + '</a></li>';
					}
					
					for (var x = 0; x < data.subCategories[i].subCategories.length; x++) {
						if (typeof(data.subCategories[i].subCategories[x]) == 'object'){
							// Title for the second level of subcategories under the main "Earthquake" category
							c += '<li class="search"><strong class="subcategory">' + data.subCategories[i].subCategories[x].categoryName + '</strong><ul>'; 
							
							// FAQs for the second level of subcategories under the main "Earthquake" category
							for (var z = 0; z < data.subCategories[i].subCategories[x].categoryFaqs.length; z++) {
								c += '<li class="search"><a href="' + data.subCategories[i].subCategories[x].categoryFaqs[z].url + 
										'" target="_blank">' + data.subCategories[i].subCategories[x].categoryFaqs[z].question + '</a></li>';
							}
							c += '</ul></li>';
						}	
					}
					c += '</li></ul>';
				}
			}
			//c += '</ul>';
			$('#contactform_faq_questions').html(c);
		}
	});
};


/**
 * Returns a callback method to be called when the user clicks on a "contact"
 * form link in the page. We must wrap the method in a "getter" method in order
 * to expose the "ContactForm" JS object via "me"
 *
 * @return A callback function. See inner documentation for details.
 */
ContactForm.prototype.getOpenContactCallback = function() {
	var me = this;
	/**
	 * The returned function is the click handler for when the user clicks on a
	 * "contact" form link. The scope of "this" within the function refers to
	 * the clicked anchor link. To reference the "ContactForm" JS object use
	 * "me".
	 *
	 * @param event - The click event that triggered this method.
	 */
	return function(event) {
		me._appendCss();
		me.renderFAQ();
		
		$.ajax({
			"url": $(this).attr('href'),
			"method": "GET",
			"cache": false,
			"data": {"ajax": "true"},
			"success": me.getCreateDialog(),
			"error": me.handleAjaxError
		});
		return false;
	};
};

ContactForm.prototype._appendCss = function() {
	if ($('#contactformcss').length == 0) {
		$('head').append(
			'<link id="contactformcss" rel="stylesheet" media="all" ' +
				'href="/contactus/css/contactform.css"/>'
		);
	}
};

ContactForm.prototype.getCloseContactCallback = function() {
	var me = this;
	/**
	 * The returned function is called when the dialog is closed. It fully
	 * destroys the dialog object and removes all traces of it from the DOM.
	 * This is important so subsequent contact forms (which may be different
	 * from each other) all properly bind their handlers.
	 *
	 * Within this returned function the "this" keyword refers to the contact
	 * form DOM element. To references the ContactForm JS object use "me".
	 */
	return function() {
		try {
			$(me._dialog).dialog("destroy");
			$(this).remove(); // "this" refers to the #contactform
		} catch (e) { /* Oh well. :( */ }
		me._dialog = null;
	};
};


/**
 * Returns a callback method to be called when the AJAX request for modal-style
 * content returns.
 */
ContactForm.prototype.getCreateDialog = function() {
	var me = this;
	/**
	 * The returned function is a callback from an XMLHttpRequest "success"
	 * callback using jQuery.ajax. The returned data contains the form markup.
	 * This method ensures all previously created dialogs are closed, destroyed,
	 * and removed from the DOM, then creates and displays a new dialog with the
	 * incoming data.
	 *
	 * Within this function one should not refer to "this". Rather use "me" to
	 * reference the "ContactForm" JS object.
	 *
	 * @param data {String} HTML markup for the contact form to display.
	 * @param status {String} Text status for the request.
	 * @param xmlhttp {XMLHttpRequest} The request object that triggered this
	 * callback
	 *
	 * @changelog - rev 1
	 */
	return function(data, status, xmlhttp) {
		
		if (me._dialog || $('#contactform').length > 0) {
			// Close the dialog (it might be open or not)
			$(me._dialog).dialog("close");
		}
		
		me._dialog = $(data).dialog(me._options["dialog"]);
		me._bindValidator();
		
		// Add autocomplete
		var subject_autocomplete_options = [];
		$('option', $('#contact_subject_autocomplete')).each(function() {
			subject_autocomplete_options.push($(this).val());
		});

		$('#contact_subject').autocomplete({
			"delay": 250,
			"source": subject_autocomplete_options,
			"select": function(event, ui) {
				$(this).val(ui.item.label);
				$(this).keyup();
			}
		});
		
		// Add FAQ filter
		me._faqfilter = new FAQFilter('#contactform_faq_questions');
		$('#contact_subject').keyup(function(event) {
			me._faqfilter.update($(this).val());
		}).keyup();
	};
};

/**
 * Binds the ContactValidator to the input fields on the contact form. This
 * method expects there to be an "email", "subject", and "message" field. If any
 * of these fields don't exist there is no penalty, but no other fields will be
 * validated either.
 */
ContactForm.prototype._bindValidator = function() {
	$('#contact_email').blur(this._validator.getValidateEmail());
	$('#contact_subject').blur(this._validator.getValidateSubject());
	$('#contact_message').blur(this._validator.getValidateMessage());
	$('#contactform_form').submit(this._validator.getValidateSubmit());
};

/**
 * This method is called when the form is submitted and successfully passes
 * validation. It sumbits the form over AJAX, closes the current modal dialog
 * and sets the AJAX submission callback to the ContactForm.getCreateDialog()
 * return method.
 *
 * @param form The form to submit.
 */
ContactForm.prototype.submitForm = function(form) {
	// Read the form parameters first
	var url = $(form).attr("action");
	var data = [
				$(form).serialize(),
				'ajax=true',
				'submit=Send+Message'
			].join('&');

	// Close the current dialog
	$(this._dialog).dialog("close");

	// Submit the form via ajax
	$.ajax({
		"url": url,
		"method": "POST",
		"cache": false,
		"data": data,
		"success": this.getCreateDialog(),
		"error": this.handleAjaxError
	});

	return false;
};

/**
 * Callback method when an error occurs during an AJAX request.
 *
 * @TODO Make this method/entire process more graceful.
 *
 * @param xmlhttp {XMLHttpRequest} The ajax request that triggered this method.
 * @param status {String} The text status describing the error.
 * @param error {Object} The actual error thrown.
 */
ContactForm.prototype.handleAjaxError = function(xmlhttp, status, error) {
	alert(
		[
			"An error occurred while fetching data from the server. (", 
			status, 
			"). Please try again."
		].join("")
	);
};
