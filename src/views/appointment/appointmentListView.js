define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/appointment/appt-list.html'
], function($, _, Backbone, appointmentListTemplate){
    var AppointmentListView = Backbone.View.extend({
        el: $('#appointments-list-container'),
        title: 'Meet Me',

        initialize: function(){
            this.collection = null;
        },

        events: {
            'click .delete-appt': 'deleteAppt'
        },

        deleteAppt: function(e){
            var id = $(e.target).attr('id');
            this.collection.get(id).destroy();
        },

        render: function(){
            $(document).attr('title', this.title);
            var compiledTemplate = _.template(appointmentListTemplate, {sortArray: this.orderByDate()});
            $(this.el).html(compiledTemplate);
            _.bindAll(this, 'render');
            this.collection.bind('remove', this.render);
            return this;
        },

        orderByDate: function(){
            var sortData = _(this.collection.toJSON()).chain().sortBy('startTime')
                .sortBy('startDate').groupBy('startDateFormat').value();
            console.log(sortData);
            return sortData;
        },

        clear: function(){
            $(this.el).empty();
        }
    });
    return AppointmentListView;
});