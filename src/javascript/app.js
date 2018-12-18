Ext.define("CArABU.app.RichTextApp", {
    extend: 'Rally.app.App',
    componentCls: 'app',
    defaults: { padding: 10 },
    layout: 'fit',

    config: {
        defaultSettings: {
           html: '<em>Use the gear to change display text...</em>'
        }
    },

    integrationHeaders : {
        name : "CArABU.app.TSApp"
    },

    launch: function() {

      this.removeAll();
      var html = this.getSetting('html');

      this.add({
         xtype: 'component',
         html: html,
         cls: 'default-counter',
         listeners: {
             afterrender: this._setLinkTargets,
             scope: this
         }
      });
    },

    getSettingsFields: function() {

        return [{
            xtype:'container',
            margin: '10 70 0 60',
            html:'<div class="variable-label">Display Text</div>'
        },{
            name:'html',
            flex: 1,
            xtype:'richtexteditorsettingsfield',
            margin: '10 70 0 60',
            fieldLabel: 'Informational Text',
            resizeable: false,

            //this is important for sizing/layout
            //see the RichTextEditorFix for how/why this is fired.
            readyEvent: 'afterload'
        }];

    },

    _launchInfo: function() {
        if ( this.about_dialog ) { this.about_dialog.destroy(); }

        this.about_dialog = Ext.create('Rally.technicalservices.InfoLink',{
            showLog: this.getSetting('saveLog'),
            logger: this.logger
        });
    },

    _setLinkTargets: function(cmp) {
        _.each(Ext.dom.Query.select('a', cmp.getEl().dom), function(a) {
            a.target = '_blank';
        });
    },

    isExternal: function(){
        return typeof(this.getAppId()) == 'undefined';
    }
});
