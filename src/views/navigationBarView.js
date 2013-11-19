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

        render: function(){
            var view = this;
            var params = {
                leftBtn: this.leftBtn,
                rightBtn: this.rightBtn,
                title: this.title
            };
            var compiledTemplate = _.template(appointmentListTemplate, params);
            $(this.el).html(compiledTemplate);
            this.$el.find('.left').on('click', function() {
                view.leftBtn.callback();
            });
            this.$el.find('.right').on('click', function(){
                view.rightBtn.callback();
            });
            this.titlePosition();
            return this;
        },

        titlePosition: function(){
            var navBarWidth = $('#nav-bar').width();
            var titleWidthMiddle = $('#nav-title').width() / 2;
            $('#nav-title').css('left', 50 - ((titleWidthMiddle / navBarWidth) * 100)+'%');
        },

        clear: function(){
            $(this.el).empty();
        }
    });
    return NavigationBarView;
});