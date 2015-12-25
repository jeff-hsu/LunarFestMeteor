/**
 * Created by Jeff on 2015-12-24.
 */
Template.PostSingle.onCreated(function(){
    var self=this;
    var id = FlowRouter.getParam("id");
    self.autorun(function(){
        self.subscribe('singlePost',id);
    })
})
Template.PostSingle.helpers({
        post: ()=> {
        var id = FlowRouter.getParam("id");
        return Posts.findOne({_id: id});
}
})