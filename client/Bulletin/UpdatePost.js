/**
 * Created by Jeff on 2015-12-28.
 */
Template.UpdatePost.onCreated(function () {
    var self = this;
    var id = FlowRouter.getParam("id");
    self.autorun(function () {
        self.subscribe('singlePost', id);
    })
});


Template.UpdatePost.helpers({
    getPostDocument: function () {
        var id = FlowRouter.getParam("id");
        return Posts.findOne({_id: id});
    },
    //images: function(){
    //    var id = FlowRouter.getParam("id");
    //    var imageIDs = Posts.find({_id:id}).fetch()[0].fileIds;
    //    return PostImages.find({_id:{ $in: imageIDs}});
    //
    //}
    //hasImages: function(){
    //    var id = FlowRouter.getParam("id");
    //    var imageIDs = Posts.find({_id:id}).fetch()[0].fileIds;
    //    return !(imageIDs == undefined || imageIDs == []);
    //}


})


Template.UpdatePost.events({
    'click #update-post-back': function(event){
        event.preventDefault();
        Meteor.call("PostImagesCleanOrphans");
        var id = FlowRouter.getParam("id");
        FlowRouter.go('/post/'+id);
    },
    //'change #update-post-add-image':function(event){
    //    //files = event.currentTarget.files[0];
    //    FS.Utility.eachFile(event, function(file) {
    //        var newFile = new FS.File(file);
    //        PostImages.insert(newFile, function (error, fileObj) {
    //            if (error) {
    //                toastr.error("Upload failed... please try again.");
    //            } else {
    //
    //
    //                var id = FlowRouter.getParam("id");
    //                Posts.update({_id: id},{$addToSet: { fileIds: fileObj._id  } });
    //                toastr.success('Upload succeeded!');
    //            }
    //        });
    //    });
    //},
    //'click .delete-image': function(event) {
    //    event.preventDefault();
    //
    //    var sure = confirm('Are you sure you want to delete this image?');
    //    if (sure === true) {
    //        var imageId = this._id;
    //        PostImages.remove({ _id:imageId }, function(error,result) {
    //            if (error) {
    //                toastr.error("Delete failed... " + error);
    //            } else {
    //                var postId = FlowRouter.getParam("id");
    //                Posts.update({_id: postId},{$pull: { fileIds: imageId  } });
    //                toastr.success('Image deleted!');
    //            }
    //        })
    //    }
    //}

});


AutoForm.addHooks('updatePostForm', {
         after: {
            update: function () {
                Meteor.call("PostImagesInsertPostId",this.docId);
                Meteor.call("PostImagesRemoveDetached",this.docId);
                Meteor.call("PostImagesCleanOrphans");
            }
        },
        onSuccess: function() {
            try{
                var id = FlowRouter.getParam("id");
                FlowRouter.go('/post/'+id);
            } catch(e){
            }
        }
    }
);

