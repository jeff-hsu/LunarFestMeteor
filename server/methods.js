/**
 * Created by Jeff on 2015-12-28.
 */
//Meteor.methods({
//    updatePost: function (modifier, objID) {
//        Posts.update(objID,modifier);
//
//    }
//});

Meteor.methods({
    //Adding a field of postId to the inserted images that belongs to this post
   PostImagesInsertPostId: function(docID){
       var imageIDs = Posts.findOne({_id: docID}).fileIds;
       if(imageIDs != undefined && imageIDs.length>0){
           PostImages.update(
               {
                   $and:[{ _id: {$in: imageIDs}},{postId: {$exists: false}}]
               },
               {
                   $set:{postId: docID}
               },
               {
                   multi: true
               }
           );
           PostImages.files._ensureIndex({postId:1});
       }
   },
    //Deleting PostImages files that do not belong to any post
    PostImagesCleanOrphans: function(){
        PostImages.remove({postId: {$exists: false}});
    },
    PostImagesRemoveDetached: function(docID){
        var imageIDs = Posts.findOne({_id: docID}).fileIds;
        if(imageIDs != undefined && imageIDs.length>0){
            PostImages.remove(
                {
                    // Query PostImages that are not in the imageIDs array but has postid of this post. ie. got detached
                    $and: [{ postId: docID},{ _id: {$nin:imageIDs }}]
                }
            );
        }else{
            PostImages.remove(
                {
                    // Else remove all images that is marked belonging to this post
                    postId: docID
                }
            );
        }
    },
    "SendVerificationEmail":function(userId){
        Accounts.sendVerificationEmail(userId);
    }
});