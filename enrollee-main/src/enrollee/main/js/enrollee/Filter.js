/**
 * Список файлов
 */
Ext.define('Jc.enrollee.Filter', {

    extend: 'Jc.Frame',

    onInit: function () {
        var th = this;
        th.callParent(arguments);

        th.store = Jc.createStore("Enrollee.filter");
        var b = th.createBuilder();

        //var setV;
        var stQuery = Ext.create('Ext.data.Store', {
            fields: ['id', 'name'],
            data: [
                {id: 1, name: "Барлығы"},
                {id: 0, name: "Тек сұраныстар"}
            ]
        });
        th.items = [
            b.input2("education", {
                width: 'fit'
            }),
            b.input2("speciality", {
                width: 'fit'
            }),
            b.input2("itn", {
                width: 'fit'
            }),
            b.input2("firstName", {
                width: 'fit'
            }),
            b.input2("lastName", {
                width: 'fit'
            }),

            b.label("Сұраныс"),

            new Ext.form.field.ComboBox({
                store: stQuery,
                queryMode: 'local',
                valueField: 'id',
                displayField: 'name',
                width: 'fit',
                controlToData: function () {
                    var me = this;
                    if (me.value == 0) {
                        th.store.getCurRec().setValue("user", 0);
                    } else {
                        th.store.getCurRec().setValue("user", null);
                    }
                },

                dataToControl: function () {
                    var value = th.store.getCurRec().getValue("user");
                    if (!value) {
                        value = 1;
                    }
                    this.setValue(value);
                }
            })
        ];


        th.tbar = Ext.create('Ext.toolbar.Toolbar', {
            layout: {
                overflowHandler: 'Menu'
            },
            items: [
                b.action({
                    text: "Жаңарту", icon: "refresh", onExec: th.filterate
                })
                , b.action({
                    text: "Тазалау", icon: "clear", onExec: th.clear
                })
            ]
        })
    },

    filterate: function () {
        var th = this;
        th.controlToData();
        Ext.apply(th.grid.store, {
            daoname: "Enrollee.ui/list",
            daomethod: "list",
            daoparams: [th.store]
        });
        th.grid.store.load();
    },

    clear: function () {
        var th = this;
        th.store.removeAll();

        th.dataToControl();
    },

    controlToDataGen: function (owner) {

        var th = this;
        var v = owner.getValue();
        if (v) {
            th.map[owner.field] = v;
        } else {
            delete  th.map[owner.field];
        }
    }
});