define([
    'backbone',
    'views/navigationBarView',
    'views/appointment/appointmentListView',
    'views/appointment/appointmentAddEditView',
    'collections/appointmentCollection'
], function(Backbone, NavigationBarView, AppointmentListView, AppointmentAddEditView, AppointmentCollection){
    var AppointmentRouter = Backbone.Router.extend({
       routes: {
           '': 'index',
           'add': 'add',
           'appointment/:id': 'edit',
           '*path': 'defaultRoute'
       },

        initialize: function(){
            this.collection = new AppointmentCollection();
            this.collection.fetch();

            this.navBarView = new NavigationBarView();
            this.listView = new AppointmentListView(this.collection, this.navBarView);
            this.editView = new AppointmentAddEditView(this.collection);
            this.addView = new AppointmentAddEditView(this.collection);

            this.editView.type = this.editView.editType;
            this.addView.type = this.addView.addType;

            this.navBarView.addView = this.addView;
            this.navBarView.editView = this.editView;
        },

        'index': function(){
            this.addView.clear();
            this.navBarView.render();
            this.listView.render();
        },

        'edit': function(id){
            this.listView.clear();
            this.editView.apptModel = this.collection.get(id);
            this.navBarView.renderAddEditNavBar(this.navBarView.editType);
            this.editView.render();
        },

        'add': function(){
            this.listView.clear();
            this.navBarView.renderAddEditNavBar(this.navBarView.addType);
            this.addView.render();
        },

        'defaultRoute': function(path){
            console.log(path);
        }
    });
    return AppointmentRouter;
});