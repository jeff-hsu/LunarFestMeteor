/**
 * Created by Jeff on 2015-12-24.
 */
Meteor.subscribe("allPostImages");

Template.PostSingle.onCreated(function () {
    var self = this;
    var id = FlowRouter.getParam("id");
    self.autorun(function () {
        self.subscribe('singlePost', id);
    })
})
Template.PostSingle.helpers({
    post: function () {
        var id = FlowRouter.getParam("id");
        return Posts.findOne({_id: id});
    },
    images: function(){
        var id = FlowRouter.getParam("id");
        var imageIDs = Posts.find({_id:id}).fetch()[0].fileIds;
        return PostImages.find({_id:{ $in: imageIDs}});

    }

})


