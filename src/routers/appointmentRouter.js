define([
    'backbone',
    'views/appointment/appointmentListView',
    'views/appointment/appointmentAddEditView',
    'collections/appointmentCollection',
    'models/appointment'
], function(Backbone, AppointmentListView, AppointmentAddEditView, AppointmentCollection, AppointmentModel){
    var AppointmentRouter = Backbone.Router.extend({
       routes: {
           '': 'index',
           'add': 'addAppt',
           'appointment/:id': 'editAppt',
           '*path': 'defaultRoute'
       },

        initialize: function(){
            this.collection = new AppointmentCollection();
            this.listView = new AppointmentListView();
            this.editView = new AppointmentAddEditView();
            this.addView = new AppointmentAddEditView();

            Backbone.history.start({ pushState: true});
        },

        'index': function(){
            console.log('index page');
            this.editView.clear();
            this.addView.clear();
            this.collection.fetch();
            this.listView.collection = this.collection;
            this.listView.render();
        },

        'editAppt': function(id){
            this.listView.clear();
            this.editView.type = 'edit';
            this.editView.collection = this.collection;
            this.editView.model = this.collection.get(id);
            this.editView.render();
        },

        'addAppt': function(){
            this.listView.clear();
            this.editView.type = 'add';
            this.addView.collection = this.collection;
            this.editView.model = null;
            this.addView.render();
        },

        'defaultRoute': function(path){
          console.log(path);
        }
    });
    return AppointmentRouter;
});