Posts = new Mongo.Collection('posts'); //declaring a new collection, which is just a table to store data

Posts.allow({ //now that we are allowing editing and deleting from the client side I have to "allow" those action
	update: function(userId, post) { return ownsDocument(userId, post); },
	remove: function(userId, post) { return ownsDocument(userId, post); },	
});


Posts.deny({
	update: function(userId, post, fieldNames) {
		//makes it so the user can only edit the following two fields
		return (_.without(fieldNames, 'url', 'title').length > 0); //returns a stub-array of the fields other than url and title, because those cannot be edited 
	} // this is 8-3, a bit hard to conceptualize
});

Posts.deny({
  update: function(userId, post, fieldNames, modifier) {
    var errors = validatePost(modifier.$set);
    return errors.title || errors.url;
  }
}); //for the post edit page


validatePost = function (post) {
	var errors = {};
	if (!post.title)
		errors.title = "Please fill in a headline";
	if (!post.url)
		errors.url = "Please fill in a URL";
	return errors;
}



Meteor.methods({ //this whole thing is just security for what is being entered into the db
	postInsert: function(postAttributes) {
		check(Meteor.userId(), String); //makes sure meteor user id is a string
		check(postAttributes, { //postAttributes is just an object with title/url in it, and use to ensure those two values are strings
			title: String,
			url: String
		});

		var errors = validatePost(postAttributes); //this to validate for the presence of the URL and title from the standpoint of the server (because before it was just the client)
		if (errors.title || errors.url)
			throw new Meteor.Error('invalid-post', "You must set a title and URL for your post");





		var postWithSameLink = Posts.findOne({url: postAttributes.url});
		if (postWithSameLink) {
			return { // this return stops the method from running / creating a dup post
				postExists: true, //and we use this to make a notification on the client side	
				_id: postWithSameLink._id
			}
		}//so this thing checks make sure there is not already a post with the same link



		var user = Meteor.user(); //get the current user record from Meteor.users collection
		var post = _.extend(postAttributes, {
			userId: user._id,
			author: user.username,
			submitted: new Date(),
			commentsCount: 0
		}); //_.extend takes the values already in postAttributes and adds what's above

		var postId = Posts.insert(post);
		return {
			_id: postId
		};//we insert everthing into the db and then return the object to the user, what they just posted

	}


});