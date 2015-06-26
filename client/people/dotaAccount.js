Template.dotaAccount.helpers({
	profiles: function(){ return Meteor.users.find({});}
})

Template.dotaAccount.events({
	"click .profile-photo": function(event){
		console.log(event.target);
		console.log(this);
		
	}
})