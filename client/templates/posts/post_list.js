Template.postsList.helpers({
	posts: function() {
	return Posts.find({}, {sort: {submitted: -1}});
	}	
}); //"helpers" 2/20 Meteor docs

//the document (records) in Post are just a bunch of groupings of data
//and things like post are all grouped in the same way, that is they
//are all made up of the same components, anyway they need to be displayed
//or returned in same way, so the post_list.html throw "posts" the 
//same one up there set equal (and thus is) the function telling to
//get the info out of the db 