Template.postPage.helpers({ //this is a helper function tied to postPage that returs the comments for the postItem that the user has selected 
	comments: function() { // returs the comments for the postItem that the user has selected 
		return Comments.find({postId: this._id}); //by using the return feature
	} //to call the Comments collection and "find" the comments associated to the particular id of the post 
});
