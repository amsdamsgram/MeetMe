/**
 * Created by damiensoulard on 03/01/2014.
 */

define([
    'jquery',
    'handlebars'
], function($, Handlebars){

    Handlebars.registerHelper('limitedString', function(str, limit){
         if(str.length > limit){
             return str.slice(0, limit)+'...';
         }
         return str;
    });

});