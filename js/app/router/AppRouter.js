var com = com || {};
com.apress = com.apress || {};
com.apress.router = com.apress.router || {};
com.apress.router.AppRouter = Backbone.Router.extend({
    searchModel : null,
    initialize: function(options){
        var self = this;
        self.searchModel = options.searchModel;
        self.listenTo(self.searchModel, 'change:query', self.navigateToSearch);
    },
    navigateToSearch: function(model, options){
    //manually navigate to the search url
    this.navigate("search/" + model.get('query'), {trigger: true});
    },
    routes: {
        'search/:query' : 'search'
    },
    search: function(query){
        var self = this;
        console.log('search for ' + query);
        if(self.searchModel.get('query') !== query){
            self.searchModel.set('query', query, {silent:true});
        }
         //now go the that view
        self.searchModel.fetch(
        {
            success: function(model){
            //create the results view
            var resultsView = new com.apress.view.ResultsView({model:model.clone()});
            },
            error: function(e){
                alert('No results available');
            }
        });
    }
});