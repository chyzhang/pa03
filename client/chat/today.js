Template.today.helpers({
	Chat: function(){return Chat.find({});}
})

Template.iChat.helpers({
	isTheChat: function(){return Meteor.userId() == this.uid}
});

Template.iChat.events({
	"click .jbsapp-delete-icon": function(){Chat.remove(this._id);}
})