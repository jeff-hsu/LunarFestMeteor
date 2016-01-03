/**
 * Created by Jeff on 2016-01-01.
 */
Template.changePassword.events({
    'submit #changePasswordForm':function(event,template){
        event.preventDefault();
        var oldPass = template.find('#changePass-oldPass').value;
        var newPass = template.find('#changePass-newPass').value;

        Accounts.changePassword(oldPass,newPass,function(error){
            if(error){
                toastr.error(
                    "Error changing password " + error.message,
                    "Change Password Failed",
                    {
                        "closeButton": true,
                        "positionClass": "toast-top-center",
                        "timeOut": "0",
                        "extendedTimeOut": "0",
                    });
            }else{
                toastr.success(
                    "Your new password has been changed",
                    "Change Password Succeded",
                    {
                        "closeButton": true,
                        "positionClass": "toast-top-center",
                        "timeOut": "0",
                        "extendedTimeOut": "0",
                    });
                FlowRouter.go('/profile');
            }
        });
    },



});