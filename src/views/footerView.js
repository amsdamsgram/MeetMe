define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/footer.html'
], function($, _, Backbone, footerTemplate){
    var FooterView = Backbone.View.extend({
        el: $('footer'),

        events: {
            'click .lng': 'changeLng'
        },

        initialize: function(){
        },

        render: function(){
            var compiledTemplate = _.template(footerTemplate);
            $(this.el).html(compiledTemplate);
            $(this.el).show();
            return this;
        },

        changeLng:function(ev){
            $.i18n.setLng($(ev.target).attr('id'), function(t) {
                Backbone.history.loadUrl();
            });
        },

        clear: function(){
            $(this.el).empty();
            $(this.el).hide();
        }
    });
    return FooterView;
});