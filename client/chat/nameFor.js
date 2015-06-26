Template.nameFor.helpers({
	Chat: function(){return Chat.find({}, {sort:{name: -1}, limit:10});}
})

Template.iChat.helpers({
	isTheChat: function(){return Meteor.userId() == this.uid}
});

Template.iChat.events({
	"click .jbsapp-delete-icon": function(){Chat.remove(this._id);}
})