/**
 * Created by Jeff on 2016-01-01.
 */
Template.imagesUpload.events({
    'change .imageInput':function(event){
        /* var files = event.currentTarget.files[0];
         console.log(files);
         var upload = orion.filesystem.upload({
         fileList: files,
         name: files.name,
         uploader: "S3"
         });
         Tracker.autorun(function () {
         if (upload.ready()) {
         console.log(upload.fileId)
         }
         });
         Tracker.autorun(function () {
         var progress = upload.progress();
         console.log(progress);
         });*/
    },
    'dropped #dropzone': function(e) {
        var user = Meteor.user();
        FS.Utility.eachFile(e, function(file) {
            var newFile = new FS.File(file);
            newFile.useremail = user.emails[0].address;
            newFile.userId = user._id;
            newFile.status = "pending";
            Images.insert(newFile, function (error, fileObj) {
                if (error) {
                    toastr.error("Upload failed... please try again.");
                } else {
                    toastr.success('Upload succeeded!');
                }
            });
        });
    }
});