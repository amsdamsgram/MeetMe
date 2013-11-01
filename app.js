define([
    'backbone',
    'routers/appointmentRouter',
    'jquery',
], function(Backbone, Router, $){
    var initialize = function(){
        initRouter();
        initHistory();
        initEventHandler();
    };

    var initRouter = function(){
        new Router();
    };

    var initHistory = function(){
        Backbone.history.start({ pushState: true});
    };

    var initEventHandler = function(){
      $(document).on('click', 'a', function(e){
        var href = $(this).attr('href');
          if(href != '#'){
              Backbone.history.navigate(href, {trigger: true});
              return false;
          }
      });
    };
    return {
        initialize: initialize
    }
});