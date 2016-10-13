var com = com || {};
com.apress = com.apress || {};
com.apress.view = com.apress.view || {};
com.apress.view.ProfilePopupView = Backbone.View.extend({
    template: Handlebars.compile($("#profile-template").html()),
    model: null,
    initialize: function(options){
        var self = this;
        //create a collection for this view to render
        self.model = new com.apress.model.Profile({id: options.user});
        //force the fetch to fire a reset event
        self.model.fetch({});
        self.listenTo(self.model, 'change', self.render);
    },
    render: function(){
        var self = this;
        if(self.model.get('screen_name')){
            $('#profile-dialog').on('show.bs.modal', function (event) {
                var modal = $(this);
                modal.find('.modal-title').text('@'+self.model.get('screen_name') + 's Profile');
                modal.find('.modal-body .modal-name').text(self.model.get('name'));
                modal.find('.modal-body .modal-descr').text(self.model.get('description'));
                modal.find('.modal-body .modal-followers').text(self.model.get('followers_count') + ' Followers');                
            });
            $('#profile-dialog').modal('show');
        }

        return self;
        },
});