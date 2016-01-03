/**
 * Created by Jeff on 2015-12-10.
 */

Template.profile.onCreated ( function() {
    var self = this;

    self.limit = new ReactiveVar;
    self.limit.set(parseInt(Meteor.settings.public.recordsPerPage));

    Session.set("filterImageQuery",{});
    Session.set("currentFilterTab", "all");

    Tracker.autorun(function() {
        Meteor.subscribe('images', Meteor.userId());
    });
});

Template.profile.onRendered ( function() {
    var self = this;
    // is triggered every time we scroll
    $(window).scroll(function() {
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
            incrementLimit(self);
        }
    });
});

Template.profile.onDestroyed( function() {
    //console.log("profile destroyed");

    Session.set("filterImageQuery",undefined);
    Session.set("currentFilterTab", undefined);
});

Template.personInfo.helpers({
  'thisUser': function(){
      //return Meteor.users.find({'_id': this._id},{fields: {'profile':1}});
      return Meteor.user();
  }
})

Template.petInfo.helpers({
    'thisUser': function(){
        //return Meteor.users.find({'_id': this._id},{fields: {'profile':1}});
        return Meteor.user();
    }
})



var incrementLimit = function(templateInstance) {
    var newLimit = templateInstance.limit.get() +
        parseInt(Meteor.settings.public.recordsPerPage);
    templateInstance.limit.set(newLimit);
}

Template.personInfo.events({
    "click #verify-email": function(){
        Meteor.call("SendVerificationEmail",Meteor.userId());
        toastr.info("Verification Email Sent, please check your inbox");
    }
})
Template.personInfo.helpers({
    "notVerified": function(){
        return !(this.verified);
    }
})

Template.personalPhoto.events({
    "click #imageTab-all":function(event){
        event.preventDefault();
        Session.set("currentFilterTab","all");
        Session.set("filterImageQuery",{});
    },
    "click #imageTab-app":function(event){
        event.preventDefault();
        Session.set("currentFilterTab","app")
        Session.set("filterImageQuery",{status: "approved"});
    },
    "click #imageTab-pen":function(event){
        event.preventDefault();
        Session.set("currentFilterTab","pen")
        Session.set("filterImageQuery",{status: "pending"});
    },
    "click #imageTab-ina":function(event){
        event.preventDefault();
        Session.set("currentFilterTab","ina")
        Session.set("filterImageQuery",{status: "inappropriate"});
    },
    "click #test":function(event){
        event.preventDefault();
        FlowRouter.reload();
    },
})
