/**
 * Created by Jeff on 2015-12-23.
 */
Meteor.methods({
    'create_user':function(username,email,password,name,country){
        Accounts.createUser({
            username: username,
            email: email,
            password: password,
            profile: {
                name: name,
                country: country
            }
        });

    }
})