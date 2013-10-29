define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/appointment/appt-list.html'
], function($, _, Backbone, appointmentListTemplate){
    var AppointmentListView = Backbone.View.extend({
        el: $('#appointments-list-container'),
        pageTitle: 'Meet Me',
        navTitle: 'My Appointments',

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
            this.renderNavBar();
            var compiledTemplate = _.template(appointmentListTemplate, {sortArray: this.orderByDate()});
            $(this.el).html(compiledTemplate);
            _.bindAll(this, 'render');
            this.collection.bind('remove', this.render);
            return this;
        },

        renderNavBar: function(){
            $(document).attr('title', this.pageTitle);

            var leftBtn = $('.nav-btn.left');
            var rightBtn = $('.nav-btn.right');

            $('#header-title').html(this.navTitle);

            leftBtn.removeClass('cancel').addClass('edit');
            rightBtn.removeClass('save').addClass('add');
            leftBtn.attr('href', '/edit');
            rightBtn.attr('href', '/add');
            leftBtn.html('Edit');
            rightBtn.html('+');
        },

        orderByDate: function(){
            var sortData = _(this.collection.toJSON()).chain().sortBy('startTime')
                .sortBy('startDate').groupBy('startDateFormat').value();
            return sortData;
        },

        clear: function(){
            $(this.el).empty();
        }
    });
    return AppointmentListView;
});