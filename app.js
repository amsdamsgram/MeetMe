define([
    'backbone',
    'routers/appointmentRouter',
    'jquery',
], function(Backbone, Router, $){
    var initialize = function(){
        initRouter();
        initEventHandler();
    };

    var initRouter = function(){
        new Router();
    };

    var initEventHandler = function(){
      $(document).on('click', 'a', function(){
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