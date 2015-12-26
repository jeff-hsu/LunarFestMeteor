/**
 * Created by Jeff on 2015-12-26.
 */
Template.CreatePost.events({
   'click #create-post-back': function(event){
       event.preventDefault();
       FlowRouter.go('/bulletin');
   }
});

AutoForm.hooks({
    insertPostForm: {
        onSuccess: function() {
            FlowRouter.go('/bulletin');
        }
    }
});