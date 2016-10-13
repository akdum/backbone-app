var com = com || {};
com.apress = com.apress || {};
com.apress.model = com.apress.model || {};
com.apress.model.Search = Backbone.Model.extend({
    urlRoot : 'http://localhost:8080/search', 
    url : 'http://localhost:8080/search',
    sync: function(method, model, options){
        this.url = this.urlRoot;
        if(this.get('query')){
            this.url = this.url + '/' + this.get('query');
        }   
        Backbone.sync.call(this, method, model, options);
        },
});