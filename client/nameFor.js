Template.nameFor.helpers({
	Chat1: function(){return Chat.find({}, {sort:{name: -1}, limit:10});}
})

Template.iChat1.helpers({
	isTheChat: function(){return Meteor.userId() == this.uid}
});

Template.iChat1.events({
	"click .jbsapp-delete-icon": function(){Chat.remove(this._id);}
})