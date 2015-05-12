

Template.postItem.helpers({
	ownPost: function() {
		return this.userId === Meteor.userId();
	}, //so this checks if the post the user is looking at is their own, it does that by checking if the id of the currently logged in user is the same as the id of the user that created the post

  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  },

  //commentsCount: function() { 
  	//return Comments.find({postId: this._id}).count(); 
//simple helper function that counts the number of comments for the post and returns the count
  //} this got removed at the bottome of chapter 10-5


});