Template.record.helpers({
	Chat2: function(){return Chat.find({uid:this.uid}, {sort:{time: -1}});}
})

Template.iChat2.helpers({
	isTheChat: function(){return Meteor.userId() == this.uid}
});

Template.iChat2.events({
	"click .jbsapp-delete-icon": function(){Chat.remove(this._id);}
})