define([
    'backbone',
    'routers/appointmentRouter',
    'jquery',
    'i18n'
], function(Backbone, Router, $){
    var initialize = function(){
        initRouter();
        initI18n();
        initHistory();
        initEventHandler();
    };

    var initRouter = function(){
        new Router();
    };

    var initHistory = function(){
        Backbone.history.start({ pushState: true});
    };

    var initI18n = function(){
        $.i18n.init({
            lng: 'en',
            fallbackLng: 'en',
            useLocalStorage: false, //set true for production
            resGetPath: 'public/locales/__lng__/__ns__.json',
            ns: {
                    namespaces: ['buttons', 'titles'],
                    defaultNs: 'buttons'
                },
            getAsync: false //don't block until all resources are loaded
        });
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