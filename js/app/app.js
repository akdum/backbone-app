$(function() {
    

    //////////////////////////////
    // init timeline.
    var timeLine =  new com.apress.collection.Timeline();
    var timeLineView = new com.apress.view.TimelineView({model: timeLine});
    // initial render
    timeLineView.render();
    timeLine.fetch({reset:true});
    timeLineView.listenTo(timeLine, 'reset', timeLineView.render);
    //////////////////////////////////
    // init profile
    var profile = new com.apress.model.Profile();
    var profileView = new com.apress.view.ProfileView({model: profile});
    profile.fetch();
    profileView.listenTo(profile,'change', profileView.render);
    ////////////////////////////////
    searchModel = new com.apress.model.Search(),
    searchView = new com.apress.view.SearchView({model: searchModel}),
    appRouter = new com.apress.router.AppRouter({searchModel: searchModel});

    Backbone.history.start();
});