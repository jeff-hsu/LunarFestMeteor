/**
 * Created by Jeff on 2015-12-09.
 */
Template.Gallery.onCreated (function() {
    var self = this;

    self.limit = new ReactiveVar;
    self.limit.set(parseInt(Meteor.settings.public.recordsPerPage));

    //console.log("gallery created");

    Tracker.autorun(function() {
       // Meteor.subscribe('images', self.limit.get());
        Meteor.subscribe('images');
    });
})

Template.Gallery.onRendered ( function() {
    var self = this;
    // is triggered every time we scroll
    $(window).scroll(function() {
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
            incrementLimit(self);
        }
    });
});

//Template.Gallery.helpers({
//    'images': function() {
//        return Images.find({},{sort:{uploadedAt:-1}});
//    }
//});

var incrementLimit = function(templateInstance) {
    var newLimit = templateInstance.limit.get() +
        parseInt(Meteor.settings.public.recordsPerPage);
    templateInstance.limit.set(newLimit);
}

Template.imageView.onCreated( function(){
    console.log("imageview created");
    //Meteor._reload.reload();
    //Tracker.flush();
});

Template.imageView.onDestroyed( function(){
    console.log("imageview destroyed");
    FlowRouter.reload()
    //Tracker.flush();
});

Template.imageView.helpers({
    images: function () {
        if(Template.instance().subscriptionsReady()){
            if(Session.get("filterImageQuery")){
                return Images.find(Session.get("filterImageQuery"),{sort:{uploadedAt:-1}});
            }else{
                return Images.find({},{sort:{uploadedAt:-1}});
            }

        }

    },
    postDate: function() {
        return moment(this.uploadedAt).format('MMMM Do YYYY, h:mm:ss a');
    },
    ownImage: function() {
        return this.userId === Meteor.userId();
    }
});

Template.imageView.events({
    'click .delete-image': function(event) {
        event.preventDefault();

        var sure = confirm('Are you sure you want to delete this image?');
        if (sure === true) {
            Images.remove({ _id:this._id }, function(error,result) {
                if (error) {
                    toastr.error("Delete failed... " + error);
                } else {
                    toastr.success('Image deleted!');
                }
            })
        }
    },
    'click #imageView-status-submit':function(event, template){
        event.preventDefault();

        console.log(template.find('#imageView-status').value);
        Images.update({_id:this._id},{$set: {status:template.find('#imageView-status').value}})
    }
});


