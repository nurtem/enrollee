/**
 *
 */
Ext.define('Jc.Enrollee', {
    extend: 'Jc.Frame',

    onInit: function () {
        this.callParent(arguments);
        var th = this;
        var b = th.createBuilder();
        th.layout = b.layout("border");
        Ext.apply(this, {
            title: 'Абитуриенттер'
        });
        //
        th.items = [

            th.grid = Ext.create('Jc.enrollee.Enrollee', {
                title: 'Абитуриент',
                region: 'center',
                split: true,
                width: 'fit',
                flex: 5,
                collapsible: false,
                closable: false,
                owner: th,

                border: true,
                style: {
                    //marginTop : "8px",
                    marginLeft: "4px"
                },
                multiSelect: true,
                autoScroll: true,
                loadMask: false
            }),
            th.filterFrame = Ext.create('Jc.enrollee.Filter', {
                grid: th.grid,
                region: 'west',
                split: true,
                flex: 1,
                collapsible: true,
                closable: false,
                border: true,
                owner: th
            })
        ];
        //
    },

    onShowFrame: function () {
        this.filterFrame.filterate();
    },

    getFilterFrame: function () {
        return this.filterFrame;
    },

    getEnrGrid: function () {
        return this.grid2;
    }
});

 