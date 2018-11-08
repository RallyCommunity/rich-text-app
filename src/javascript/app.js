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
         cls: 'default-counter'
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
            xtype:'rallyrichtexteditor',
            margin: '10 70 0 60',
            fieldLabel: 'Informational Text',
            _createResizer: function(){}, //This is an override so that the resizer handle which is hardcoded in the component doesn't hide the last line of the editor.
            resizeable: false
        }];

    },

    _launchInfo: function() {
        if ( this.about_dialog ) { this.about_dialog.destroy(); }

        this.about_dialog = Ext.create('Rally.technicalservices.InfoLink',{
            showLog: this.getSetting('saveLog'),
            logger: this.logger
        });
    },

    isExternal: function(){
        return typeof(this.getAppId()) == 'undefined';
    }
});
