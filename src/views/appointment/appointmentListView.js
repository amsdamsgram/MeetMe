define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/appointment/appt-list.html'
], function($, _, Backbone, appointmentListTemplate){
    var AppointmentListView = Backbone.View.extend({
        el: $('#appointments-list-container'),

        // Title
        pageTitle: 'Meet Me',

        // Class
        deleteBtnClass: 'delete-btn',

        initialize: function(){
            this.apptCollection = null;
        },

        events: {
            'click .delete-btn': 'deleteAppt',
            'click .delete-icon': 'renderDeleteButton',
            'click .appt-edit-container': 'removeDeleteButton'
        },

        render: function(){
            $(document).attr('title', 'Meet Me');
            var compiledTemplate = _.template(appointmentListTemplate, {sortArray: this.orderByDate()});
            $(this.el).html(compiledTemplate);
            _.bindAll(this, 'render');
            this.apptCollection.bind('remove', this.render);
            return this;
        },

        orderByDate: function(){
            var sortData = _(this.apptCollection.toJSON()).chain().sortBy('startTime')
                .sortBy('startDate').groupBy('startDateFormat').value();
            return sortData;
        },

        renderDeleteButton: function(ev){
            this.removeDeleteButton();
            var btn = $('<span>').addClass(this.deleteBtnClass).html('Delete');
            $(ev.target).closest('article').append(btn);
            // Focus to make the transition works
            btn.focus();
            btn.addClass('active');
            $(ev.target).closest('div.slide-container').addClass('active');

            this.toggleHrefEditContainer();
        },

        removeDeleteButton: function(){
            $('.' + this.deleteBtnClass).removeClass('active');
            $('.slide-container').removeClass('active');
            var self = this;
            $('.' + this.deleteBtnClass).bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(){
                self.toggleHrefEditContainer();
                $(this).remove();
            });
        },

        toggleHrefEditContainer: function(){
            var container = $('.appt-edit-container');
            var href = container.attr('href');

            if(href == '#'){
                container.attr('href', container.attr('id'));
                container.removeAttr('id');
            } else {
                container.attr('href', '#');
                container.attr('id', href);
            }
        },

        deleteAppt: function(e){
            var id = $(e.target).closest('article').attr('id');
            this.apptCollection.get(id).destroy();
        },

        clear: function(){
            $(this.el).empty();
        }
    });
    return AppointmentListView;
});