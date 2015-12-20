/**
 * Created by Jeff on 2015-12-09.
 */
Template.Image.created = function() {
    var self = this;

    self.limit = new ReactiveVar;
    self.limit.set(parseInt(Meteor.settings.public.recordsPerPage));

    Tracker.autorun(function() {
        Meteor.subscribe('images', self.limit.get());
    });
}

Template.Image.rendered = function() {
    var self = this;
    // is triggered every time we scroll
    $(window).scroll(function() {
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
            incrementLimit(self);
        }
    });
}

Template.Image.helpers({
    'images': function() {
        return Images.find({},{sort:{uploadedAt:-1}});
    }
});

var incrementLimit = function(templateInstance) {
    var newLimit = templateInstance.limit.get() +
        parseInt(Meteor.settings.public.recordsPerPage);
    templateInstance.limit.set(newLimit);
}

Template.imagesUpload.events({
    'change .imageInput': function(event,) {
        FS.Utility.eachFile(event, function(file) {
            console.log(file);
            Images.insert(file, function (err, fileObj) {
                // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
            });
        });
    },
    'dropped #dropzone': function(e) {
        var user = Meteor.user();
        FS.Utility.eachFile(e, function(file) {
            var newFile = new FS.File(file);
            newFile.username = user.username;
            newFile.userId = user._id;
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
Template.imageView.helpers({
    images: function () {
        return Images.find({},{sort:{uploadedAt:-1}});
    },
    postDate: function() {
        return moment(this.uploadedAt).format('MMMM Do YYYY, h:mm:ss a');
    },
    ownImage: function() {
        return this.userId === Meteor.userId();
    }
});

Template.imageView.events({
    'click .delete-image': function(e) {
        e.preventDefault();

        var sure = confirm('Are you sure you want to delete this image?');
        if (sure === true) {
            Images.remove({ _id:this._id }, function(error,result) {
                if (error) {
                    toastr.error("Delete failed... " + error);
                } else {
                    toastr.success('Image deleted!');
                }
            })
        }
    }
});
