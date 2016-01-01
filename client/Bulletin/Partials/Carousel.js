/**
 * Created by Jeff on 2015-12-30.
 */
Template.CarouselItem.helpers({
    isActive: function () {
        return (this.index === 0) ? 'active': '';
    }
});

Template.CarouselIndicator.helpers({
    isActive: function () {
        return (this.index === 0) ? 'active': '';
    }
});