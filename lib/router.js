Router.configure({
	layoutTemplate: 'layout',
	//loadingTemplate: 'loading',
	//waitOn: function() {return true;}   // later we'll add more interesting things here .... 
});

Router.route('/', {name: 'welcome'});

Router.route('/about', {name: 'about'});

Router.route('/sponsors', {name:'sponsors'})


Router.route('/Chat', {name: 'Chat'});
Router.route('/Chat/edit',{name:'Chatform'});
Router.route('/listenAndSearch', {name: 'listenAndSearch'});
Router.route('/dotaAccount', {name: 'dotaAccount'});
Router.route('/firefly', {name: 'firefly'});
Router.route('/Chat/nameFor',{name:'nameFor'});
Router.route('/Chat/record',{name:'record'});
Router.route('/Chat/today',{name:'today'});

Router.route('/profile/:_id',
	{name:'profile',
	data: function(){ 
		
		return Meteor.users.findOne({_id:this.params._id})
	}
});
Router.route('/profileEdit/:_id',
	{name:'profileEdit',
	data: function(){ return Meteor.users.findOne({_id:this.params._id})}
});
