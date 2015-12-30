/**
 * Created by Jeff on 2015-12-22.
 */
Meteor.subscribe("allPosts");
//Meteor.subscribe("allPostImages");

Template.listPosts.helpers({
    'posts': function () {
        return Posts.find();
    },
    //images: function () {
    //
    //    var imageID = Posts.find({_id: this._id}).fetch()[0].imageID;
    //
    //    return PostImages.find({_id:imageID});
    //}

});

Template.listPosts.events({
    'click .delete-post': function () {
        event.preventDefault();
        var sure = confirm('Are you sure you want to delete this post?');
        if (sure === true) {
            var imageIDs = Posts.find({_id: this._id}).fetch()[0].fileIds;

            for (imageID of imageIDs){
                PostImages.remove({_id: imageID});
            }

            Posts.remove({_id: this._id}, function (error, result) {
                if (error) {
                    toastr.error("Delete failed... " + error);
                } else {
                    toastr.success('Post deleted!');
                }
            })
        }
    }
});


