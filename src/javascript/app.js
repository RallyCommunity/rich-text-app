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
            resizeable: false,

            readyEvent: 'afterload',
            //This function is an override so that the readyEvent
            //is consistently fired async.  Otherwise we get weird
            //settings panel missing buttons/sizing issues
            _drawEditor: function () {
                var editorLoadPromise = this.createClosureEditor();
                this._createResizer();
    
                editorLoadPromise.always(function () {
                    this.initialLoadFinished = true;
                    this._lastValue = this.getValue();
    
                    if (this.getGrowToFitContent()) {
                        var images = Ext.get(this.closureEditor.field).select('img');
                        if (images.elements.length > 0) {
                            Rally.util.Ui.executeCallbackWhenImagesLoaded(images, this._growToFitContent, this);
                        }
                        else {
                            this._growToFitContent();
                        }
                    }
    
                    this._ieClosureFocusWorkaround();
                    this.fireEvent('load', this);

                    //This is the only added line
                    Ext.defer(function() { this.fireEvent('afterload', this); }, 1, this);
                }, this);
            },
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
