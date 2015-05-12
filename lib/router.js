Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function() {
	return Meteor.subscribe('posts');
	}
});

Router.route('/', {name: 'postsList'});

Router.route('/posts/:_id', {
	name: 'postPage',
	waitOn: function() { //waiting for the subscription to return and using thi.params._id as and argument so that we only subcribe to commnets associted to the current post, but that is actually done at the publications level on publications.js I think
		return Meteor.subscribe('comments', this.params._id); //
	},
	data: function() { return Posts.findOne(this.params._id); } //1.0
});

Router.route('/posts/:_id/edit', {
	name: 'postEdit',
	data: function() { return Posts.findOne(this.params._id); }
});


Router.route('/submit', {name: 'postSubmit'}); //seems like new page need to have routes setup

var requireLogin = function() { //this is a temp solution
	if (! Meteor.user()) {
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
		this.render('accessDenied');
		}
	} else {
		this.next();
	}
}




Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'}); 




//1.0 the route is the first thing to get ran, so when a user wants to 
//view a specifc post the router grabs the unique id of that post and
//uses it dynamiclly to route the request of the user...I think

