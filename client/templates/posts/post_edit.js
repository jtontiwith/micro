Template.postEdit.onCreated(function() {
	Session.set('postEditErrors', {});
});
Template.postEdit.helpers({
	errorMessage: function(field) {
		return Session.get('postEditErrors') [field];	
	},
	errorClass: function (field) {
		return !!Session.get('postEditErrors') [field] ? 'has-error' : '';
	}
});

Template.postEdit.events({ //just the normal form submission stuff
	'submit form': function(e) {
		e.preventDefault();//supress default event like normal

		var currentPostId = this._id; //grabbing the id of the current post the user is on and putting it in a variable

		var postProperties = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val()
		}//get the new form field values from the page and store them in a postProperties object

var errors =  validatePost(postProperties);
if (errors.title || errors.url)
	return Session.set('postEditErrors', errors);

//now it's time to update
//The object is passed to Post.update (Meteor's Collection.update() Method, the selector, currentPostId, which is the current post, is referenced and change by the second argument aka the modifier using the $set operator which replaces the specific fields while leaving the rest untouched, and the third argument is just the standard if/else callback that alerts an error in case  
Posts.update(currentPostId, {$set: postProperties}, function(error) {
	if (error) {
		throwError(error.reason);
	} else {
		Router.go('postPage', {_id: currentPostId});
		}
	});
},

'click .delete': function(e) { //click event, the normal jquery event syntax
	e.preventDefault();

	if (confirm("Delete this post?")) { //confirm displays the dialogue box that makes a user confirm or not, upon click the rest of the code executes
		var currentPostId = this._id //grab the id of the currrent post (from the templates data context) and put it in the variable
		Posts.remove(currentPostId); //Posts (the collection) so Posts.remove the document 
		Router.go('postsList'); //then forward the user back to the main posts page
		}
	}
});