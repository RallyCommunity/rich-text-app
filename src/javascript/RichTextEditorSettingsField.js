Ext.define('RichTextEditorSettingsField', {
    alias: 'widget.richtexteditorsettingsfield',
    extend: 'Rally.ui.richtext.RichTextEditor',

    constructPlugins: function() {
        this.plugins = _.reject([this.plugins, 'rallyrichtexttemplates']); //we don't want the templates plugin
        return this.callParent(arguments);
    },
    
    _createResizer: function(){}, //This is an override so that the resizer handle which is hardcoded in the component doesn't hide the last line of the editor.

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
    }
});