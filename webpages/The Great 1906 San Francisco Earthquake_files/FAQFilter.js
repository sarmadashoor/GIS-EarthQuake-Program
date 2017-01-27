/**
 *
 * -- Change log --
 * Revision 1 - 2010/09/20 EMM: Removed many small and irrelevant words from 
 * search string.
 *
 * Revision 2 - 2010/09/20 EMM: Qualified subcategory selector so errenreous 
 * <strong> tags did not create false subcategories.
 *
 */



/**
 * FAQ Filter filters/unfilters a FAQ list (based on the current FAQ list 
 * formatting.
 */
FAQFilter = function(selector) {
	this.el = $(selector);
	this.noResults = '<p class="noresults">No Results</p>';
};


/**
 * This method tests a value to see if it matches the current search case 
 * insensitively.
 *
 * @param value - the value being tested.
 * @param searches - and array of values to find.
 * @return true if all values in the array searches exist in value.
 */
FAQFilter.prototype.test = function(value, searches) {
	var numTerms = searches.length;
	var matches = true;
	for(var i = 0; i < numTerms; i++) {
		if (value.indexOf(searches[i]) == -1) {
			matches = false;
			break;
		}
	}
	return matches;
};


/**
 * Update refilters based on new search text, showing new matches and hiding 
 * things that no longer match.
 *
 * This could be dramatically improved by removing common words from the 
 * "searches" array that may prevent otherwise matching questions from being 
 * shown.
 *
 * @param searchtext a string with one or more words.
 *        when empty, all faqs are shown.
 *        when non-empty, uses FAQFilter.test to test each category, sub 
 *        category, and faq leaving only questions or categories that match.
 *
 * @changelog 1
 * @changelog 2
 */
FAQFilter.prototype.update = function(searchtext) {
	var me = this;

	if (searchtext == '') {
		//show everything
		$('*', me.el).show();
		$('.noresults', me.el.parent('div')).remove();
		return;
	}

	//otherwise filter
	// Remove some common and irrelevant words (changelog 1)
	var searches = searchtext.toLowerCase()
		.replace(/\b[\w']{1,3}\b/g, ' ')
		.replace(/\bwhere\b/g, ' ')
		.replace(/\bfind\b/g, ' ')
		.replace(/\blooking\b/g, ' ')
		.replace(/\s{2,}/, ' ')
		.replace(/^\s+/, '')
		.replace(/\s+$/, '')
		.split(' ');

	$('h4', me.el).each(function(){
		var category = $(this);
		var categoryChildren = category.next('ul');
		var categoryMatch = me.test(category.text().toLowerCase(), searches);

		if (categoryMatch) {
			//matches category name, show all faqs
			category.show();
			categoryChildren.show();
			$('*', categoryChildren).show();
			return;
		}

		//when no subcategories match, must hide parent
		// EMM: changelog 2
		var subCategories = $('strong.subcategory', categoryChildren);
		//if (subCategories.length == 0) {
			//no subcategories, just check faqs

			//flag to tell whether any faqs match
			var faqMatch = false;

			//check if any faqs match
			$('a', categoryChildren).each(function() {
				var faq = $(this);

				if (me.test(faq.text().toLowerCase(), searches)) {
					faqMatch = true;
					//matches, so show
					faq.parent('li').show();
				} else {
					//doesn't match, so hide
					faq.parent('li').hide();
				}
			});

			if (!faqMatch) {
				//no matching faqs in this category, so hide
				category.hide();
				categoryChildren.hide();
			} else {
				//matching faqs in this category, make sure container is visible
				//   (faqs are already shown/hidden)
				category.show();
				categoryChildren.show();
			}
		//} 


		if (subCategories.length != 0) {
			//flag to tell whether any subcategories match
			var subCategoryMatch = false;

			//check if subcategories match
			subCategories.each(function(){
				var subCategory = $(this);
				var subCategoryChildren = subCategory.next('ul');
				var thisSubCategoryMatch = false;

				if (me.test(subCategory.text().toLowerCase(), searches)) {
					//matches sub category name, so show it and all children
					thisSubCategoryMatch = true;
					subCategory.parent('li').show();
					$('*', subCategoryChildren).show();
				} else {
					//didn't match subcategory name, so check questions
					var faqMatch = false;

					$('a', subCategoryChildren).each(function() {
						var faq = $(this);
						if (me.test(faq.text().toLowerCase(), searches)) {
							faqMatch = true;
							faq.parent('li').show();
						} else {
							faq.parent('li').hide();
						}
					});

					if (faqMatch) {
						//if one question matched, sub category matched
						thisSubCategoryMatch = true;
					}
				}

				if (thisSubCategoryMatch) {
					subCategoryMatch = true;
					//sub category matched, so show
					subCategory.parent('li').show();
				} else {
					//didn't match, so hide
					subCategory.parent('li').hide();
				}
			});

			if (subCategoryMatch) {
				//matching sub categories in this category, make sure container is visible
				//   (categories and faqs are already shown/hidden)
				category.show();
				categoryChildren.show();
			} else {
				//no matching sub categories in this category, so hide
				category.hide();
				categoryChildren.hide();
			}
		}
	});
	
	// Show a "no results" message if everything is hidden (customizable)
	if ($(':visible', me.el).length == 0) {
		if ($('.noresults', me.el.parent('div')).length == 0) {
			$(me.el.parent('div')).append(me.noResults);
		}
	} else {
		$('.noresults', me.el.parent('div')).remove();
	}
};