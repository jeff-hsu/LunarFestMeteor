/**
 * Created by Jeff on 2015-12-09.
 */
if(Meteor.isClient){
    //Accounts.onLogin(function(){
    //    FlowRouter.go('lobby');
    //});
    //Accounts.onLogout(function(){
    //    FlowRouter.go('home');
    //});
}

FlowRouter.route("/images",{
    name: "images",
    action(){
    BlazeLayout.render("MainLayout", {main: "Image"});
}
});

FlowRouter.route("/lobby",{
    name: "lobby",
    action(){
    BlazeLayout.render("MainLayout", {main: "Lobby"});
}
});
FlowRouter.route("/",{
    name: "home",
    action(){
    BlazeLayout.render("MainLayout", {main: "Home"});
}
});
FlowRouter.route("/profile",{
    name: "profile",
    action(){
    //if(!this.userId){
    //    FlowRouter.go('home');
    //}
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

FlowRouter.route("/home",{
    action(){
    FlowRouter.go('home');
}
});