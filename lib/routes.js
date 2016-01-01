/**
 * Created by Jeff on 2015-12-09.
 */
//if(Meteor.isClient){
//    Accounts.onLogin(function(){
//        FlowRouter.go('home');
//    });
//}
FlowRouter.route("/",{
    name: "home",
    action(){
    BlazeLayout.render("MainLayout", {main: "Home"});
}
});
FlowRouter.route("/home",{
    action(){
    FlowRouter.go('home');
}
});
FlowRouter.route("/gallery",{
    name: "gallery",
    action(){
    BlazeLayout.render("MainLayout", {main: "Gallery"});
}
});

FlowRouter.route("/upload",{
    name: "upload",
    action(){
    BlazeLayout.render("MainLayout", {main: "upload"});
}
});

FlowRouter.route("/profile",{
    name: "profile",
    action(){
    if(!Meteor.userId()){
        alert("Please log in");
        FlowRouter.go('home');
    }
    BlazeLayout.render("MainLayout", {main: "profile"});
}
});

FlowRouter.route("/userlist",{
    name: "userlist",
    action(){
    BlazeLayout.render("MainLayout", {main: "UserList"});
}
});

FlowRouter.route("/register",{
    name: "register",
    action(){
    BlazeLayout.render("MainLayout", {main: "signupForm"});
}
});

FlowRouter.route("/bulletin",{
    name: "bulletin",
    action(){
    BlazeLayout.render("MainLayout", {main: "listPosts"});
}
});

FlowRouter.route("/post/:id",{
    name: 'post',
    action() {
    BlazeLayout.render('MainLayout', {main: "PostSingle"});
}
});

FlowRouter.route("/editpost/:id",{
    name: 'edit-post',
    action() {
    BlazeLayout.render('MainLayout', {main: "UpdatePost"});
}
});

FlowRouter.route("/userslist",{
    name: 'user-list',
    action() {
    BlazeLayout.render('MainLayout', {main: "UserList"});
}
});



FlowRouter.route("/newpost",{
    name: 'new-post',
    action() {
    if(!Roles.userIsInRole(Meteor.userId(), 'admin')){
        alert('Access Denied');
        FlowRouter.go('bulletin');
    }
    BlazeLayout.render('MainLayout', {main: "CreatePost"});
}
});