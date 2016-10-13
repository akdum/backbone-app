var com = com || {};
com.apress = com.apress || {};
com.apress.view = com.apress.view || {};
com.apress.view.ProfileView = Backbone.View.extend({
    el: '#profile',
    template: Handlebars.compile($("#profile-template").html()),
    initialize: function(options){
    },
    render: function(){
        var self = this;
        var output = self.template({user: self.model.toJSON()});
        self.$el.html(output);
        return self;
    },
});