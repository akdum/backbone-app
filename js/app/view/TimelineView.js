var com = com || {};
com.apress = com.apress || {};
com.apress.view = com.apress.view || {};
com.apress.view.TimelineView = Backbone.View.extend({
    el: '#timeline',
    template: Handlebars.compile($("#timeline-template").html()),
    events: {
        'click .profile': 'showDialog'
    },
    initialize: function(options){
    },
    render: function(){
        var self = this;
        if (self.model.length > 0){
        var output = self.template({tweet: self.model.toJSON()});
        self.$el.append(output);
        }
        return self;
    },
    showDialog: function(options) {
        var self =this,
        $target = $(options.currentTarget),
        username = $target.data('user');
        var profileView = new com.apress.view.ProfilePopupView({user: username});
    }
});