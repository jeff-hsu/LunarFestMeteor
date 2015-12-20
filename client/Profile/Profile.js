/**
 * Created by Jeff on 2015-12-10.
 */
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

Template.profile.created = function() {
    var self = this;

    self.limit = new ReactiveVar;
    self.limit.set(parseInt(Meteor.settings.public.recordsPerPage));

    Tracker.autorun(function() {
        Meteor.subscribe('images', self.limit.get(), Meteor.userId());
    });
}

Template.profile.rendered = function() {
    var self = this;
    // is triggered every time we scroll
    $(window).scroll(function() {
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
            incrementLimit(self);
        }
    });
}

var incrementLimit = function(templateInstance) {
    var newLimit = templateInstance.limit.get() +
        parseInt(Meteor.settings.public.recordsPerPage);
    templateInstance.limit.set(newLimit);
}

