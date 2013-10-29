define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/navigationBar.html'
], function($, _, Backbone, appointmentListTemplate){
    var NavigationBarView = Backbone.View.extend({
        el: $('#nav-bar'),

        initialize: function(){
        },

        events: {
            'click .nav-btn': 'toggleButtons',
            'click .nav-btn.save': 'saveAppt'
        },

        render: function(){
            var compiledTemplate = _.template(appointmentListTemplate);
            $(this.el).html(compiledTemplate);
            _.bindAll(this, 'render');
            return this;
        },

        toggleButtons: function(){
            console.log('loooool');
        },

        saveAppt: function(){
            this.addView.addEditAppt();
        },

        clear: function(){
            $(this.el).empty();
        }
    });
    return NavigationBarView;
});