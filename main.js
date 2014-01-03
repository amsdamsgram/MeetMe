require.config({
   paths:{
       jquery: 'vendors/jquery',
       underscore: 'vendors/underscore',
       backbone: 'vendors/backbone',
       handlebars: 'vendors/handlebars',
       localStorage: 'vendors/backbone.localStorage',
       moment: 'vendors/moment',
       i18n: 'vendors/i18next',
       routers: 'src/routers',
       models: 'src/models',
       views: 'src/views',
       collections: 'src/collections',
       templates: 'src/templates',
       helpers: 'src/helpers'
   },
   shim: {
       "backbone": {
           deps: ['jquery', 'underscore'],
           exports: "Backbone"
       },
       "underscore": {
           exports: "_"
       },
       "localStorage": {
           deps: ['backbone']
       },
       "handlebars": {
           exports: "Handlebars"
       }
   }
});

define([
    'app'
], function(App){
   App.initialize();
});