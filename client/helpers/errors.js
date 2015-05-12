Errors = new Mongo.Collection(null); //null because this collection is just on client, not server

throwError = function(message) { // helper function function where we can add errors, no security because the collection is local
Errors.insert({message: message});
};

Template.errors.helpers({
	errors: function(){
		return Errors.find();
	}

});

Template.error.onRendered(function() { //pmRemdered is a callback, passes one function to another function, 
  var error = this.data; //this is refering to the current template instance, and .data is jut the data object (the error) with in that, remember its all about context
  Meteor.setTimeout(function () {
    Errors.remove(error._id);
  }, 3000);
});
