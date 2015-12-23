/**
 * Created by Jeff on 2015-12-22.
 */
Meteor.subscribe("allPosts");
Meteor.subscribe("allPostImages");

Template.listPosts.helpers({
   'posts': function(){
       return Posts.find();
   },
    images: function () {

        var imageID = Posts.find({_id: this._id}).fetch()[0].imageID;

        return PostImages.find({_id:imageID});
    }

});


Template.listPosts.events({
    'dropped #dropzone': function(e) {
        var user = Meteor.user();
        FS.Utility.eachFile(e, function(file) {
            var newFile = new FS.File(file);
            var insertedFile = PostImages.insert(newFile, function (error, fileObj) {
                if (error) {
                    toastr.error("Upload failed... please try again.");
                } else {
                    toastr.success('Upload succeeded!');
                }
            });
            console.log(insertedFile);
        });
    }
});

