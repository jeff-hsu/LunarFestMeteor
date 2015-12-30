/**
 * Created by Jeff on 2015-12-26.
 */
Template.CreatePost.events({
   'click #create-post-back': function(event){
       event.preventDefault();
       FlowRouter.go('/bulletin');
   }
});


AutoForm.addHooks('insertPostForm', {

        //after:{
        //    insert:function(){
        //        console.log("aaa");
        //        FlowRouter.go('/bulletin');
        //        console.log("bbb");
        //    }

        onSuccess: function() {
            try{
                FlowRouter.go('/bulletin');
            } catch(e){
                console.log("yo");
            }
        }
}
);