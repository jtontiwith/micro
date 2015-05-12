Template.postSubmit.events({
'submit form': function(e) {
  e.preventDefault();

var post = {          //all this does is put the actual post in the post variable
  url: $(e.target).find('[name=url]').val(), 
  title: $(e.target).find('[name=title]').val()
};

var errors = validatePost(post);
if (errors.title || errors.url)
  return Session.set('postSubmitErrors', errors);
  
Meteor.call('postInsert', post, function(error, result) {
  //something here
  if (error)
    return throwError(error.reason);

//we will show this but then route the user anyway
	if (result.postExists)
		throwError('This link has already been posted');

  Router.go('postPage', {_id: result._id});
    }); //just routes the user to the new post page that was created, the Router go part
  }
});

//there is some syntax in here I don't recognize because it's jquery

Template.postSubmit.onCreated(function() {
  Session.set('postSubmitErrors', {}); //set the Session with the name postSubmitErrors
});                                    //the empty {} is where the field and string will go 

Template.postSubmit.helpers({ //look for postSubmite Template helper function and do...
  errorMessage: function(field) { //errorMessage : <- is equal too then do...
    return Session.get('postSubmitErrors') [field]; //get the value out of the Session
  },
  errorClass: function(field) {
    return !!Session.get('postSubmitErrors') [field] ? 'has-error' : '';
   }
});