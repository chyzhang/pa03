Template.record.helpers({
	Chat: function(){return Chat.find({uid:this.uid}, {sort:{time: -1}});}
})

Template.iChat.helpers({
	isTheChat: function(){return Meteor.userId() == this.uid}
});

Template.iChat.events({
	"click .jbsapp-delete-icon": function(){Chat.remove(this._id);}
})