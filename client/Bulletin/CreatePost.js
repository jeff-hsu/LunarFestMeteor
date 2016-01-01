/**
 * Created by Jeff on 2015-12-26.
 */
Template.CreatePost.events({
   'click #create-post-back': function(event){
       event.preventDefault();
       Meteor.call("PostImagesCleanOrphans");
       FlowRouter.go('/bulletin');
   }
});


AutoForm.addHooks('insertPostForm', {
        after: {
            insert: function (err, docID) {
                Meteor.call("PostImagesInsertPostId",docID);
                Meteor.call("PostImagesCleanOrphans");
            }
        },
        onSuccess: function() {
            try{
                FlowRouter.go('/bulletin');
            } catch(e){

            }
        }
}
);