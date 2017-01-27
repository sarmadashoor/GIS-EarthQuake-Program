/**
 * This class is a validator for the EHP contact form. It is not generalized in
 * any way. Modifications to this class need coincide carefully with
 * modifications to the form itself.
 *
 *
 * @TODO Improve validator to work with more common forms. Make more generic.
 *
 * @author emartinez
 * @date   2010/09/20
 *
 * @widgets jquery
 */


/**
 * This is the constructor for an email validator class.
 *
 * @param contactForm {DOM} The contact form to validate.
 */
ContactValidator = function(contactForm) {
	this._contactForm = contactForm;
};

/**
 * This method validates an email address. Email address is an optional field.
 * An email is considered valid if it is either empty, or if it _looks_ like an 
 * email address. No checking is done to verify if the address is real or not.
 *
 * If the email address fails to validate then an error message is appended 
 * below the email input field.
 */
ContactValidator.prototype.getValidateEmail = function() {
	var me = this;
	return function(event) {
		var value = $(this).val();
		// If non-empty and not valid then fail
		if (value != '' && ! value.match(/^[\S]+@[\S]+\.[\S]+$/)) {
			$(this).parent('li').append([
				'<span class="inputError">',
					'You must either omit the email address or ',
					'enter a valid email address.',
				'</span>'
			].join(""));
		}
		// If empty or non-empty and valid then pass 
		else {
			try {
				// Remove the previous error if it now passes
				$('.inputError', $(this).parent('li')).remove();
			} catch (e) { /** Just means it isn't there. **/ }
		}
	};
};

/**
 * This method validates an email subject. An email subject is required and is 
 * considered valid as long as it is not empty.
 *
 * If the email subject fails to validate then an error message is appended 
 * below the subject input field.
 */
ContactValidator.prototype.getValidateSubject = function() {
	var me = this;
	return function(event) {
		var value = $(this).val();
		// If value is empty then fail
		if (value == '') {
			$(this).parent('li').append([
				'<span class="inputError">',
					'You must enter a subject.',
				'</span>'
			].join(""));
		}
		// If value is non-empty then pass
		else {
			try {
				// Remove the previous error if it now passes
				$('.inputError', $(this).parent('li')).remove();
			} catch (e) { /** Just means it isn't there. **/ }
		}
	};
};

/**
 * This method validates an email message. An email message is required and is 
 * considered valid as long as it is not empty.
 *
 * If the email message fails to validate then an error message is appended 
 * below the message input field.
 */
ContactValidator.prototype.getValidateMessage = function() {
	var me = this;
	return function(event) {
		var value = $(this).val();
		// If value is empty then fail
		if (value == '') {
			$(this).parent('li').append([
				'<span class="inputError">',
					'You must enter a message.',
				'</span>'
			].join(""));
		}
		// If value is non-empty then pass
		else {
			try {
				// Remove the previous error if it now passes
				$('.inputError', $(this).parent('li')).remove();
			} catch (e) { /** Just means it isn't there. **/ }
		}
	};
};

/**
 * This method validates each of the three input fields upon submitting the 
 * form. If the form validates successfully it will be submitted via AJAX. 
 * Otherwise appropriate error messages are displayed and the form is not 
 * submitted.
 *
 *
 * @see getValidateEmail
 * @see getValidateSubject
 * @see getValidateMessage
 */
ContactValidator.prototype.getValidateSubmit = function() {
	var me = this;
	return function(event) {
		var inputElements = [
			$('#contact_email').get(0),
			$('#contact_subject').get(0),
			$('#contact_message').get(0)
		];
		// Validate each element
		for (var i = 0, element; element = inputElements[i]; ++i) {
			$(element).blur();
		}
		
		try {
		if ($('.inputError', $(this)).length == 0) {
			me._contactForm.submitForm(this);
		}
		} catch (e) {/* Do nothing */}
		return false; // Prevent default
	};
};
