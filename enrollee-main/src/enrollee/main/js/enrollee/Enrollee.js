Ext.define('Jc.enrollee.Enrollee', {

    extend: 'Jc.control.Grid',
    store: null,

    initComponent: function () {
        var th = this;
        th.store = Jc.createStore("Enrollee.ui");

        var b = Jc.app.createBuilder(th.store);
        //
        th.border = false;
        th.multiSelect = false;

        th.columns = [];

        th.columns.push([
            new Ext.grid.RowNumberer(),
            b.column('name', {flex: 3, minWidth: 100}),
            b.column('speciality', {width: 200}),
            b.column('education', {width: 200}),
            b.column('recDate', {width: 100})
        ]);

        th.tbar = [];

        th.tbar.push(
            [
                b.actionInsFrame({frame: 'Jc.enrollee.EnrEditFrame'}),
                b.actionUpdFrame({frame: 'Jc.enrollee.EnrEditFrame'}),
                b.actionDelFrame({daoname: 'Enrollee/updater'})
            ]
        );

        th.bbar = [];
        th.bbar.push([b.paging({
            //</locale>
            displayMsg: '{2} жазбаның  {0} - {1} аралығы көрсетіліп тұр',
            emptyMsg: 'Мәлімет жоқ',
            beforePageText: 'Бет',
            afterPageText: 'барлығы {0}'

            //<locale>
        })]);

        th.on('itemdblclick', function (t, rec) {
            var act = b.actionUpdFrame({
                frame: 'Jc.enrollee.EnrEditFrame',
                scope: this,
                recData: rec.data,
                recId: rec.data.id
            });

            act.execute();
        });

        th.on("selectionchange", function (t, recArr) {
            //
        });


        th.on("headerclick", function (ct, header, e, t) {
            //
            //e.stopEvent();
            var oldVal = th.store.daoparams[0].getCurRec().getValue("orderBy");
            var el = header.el;
            el.removeCls('x-column-header-sort-ASC');
            el.addCls('x-column-header-sort-DESC');

            if (oldVal == header.dataIndex) {
                th.store.daoparams[0].getCurRec().setValue("orderBy", header.dataIndex + ' desc');
                el.removeCls('x-column-header-sort-ASC');
                el.addCls('x-column-header-sort-DESC');
            } else {
                th.store.daoparams[0].getCurRec().setValue("orderBy", header.dataIndex);
                el.removeCls('x-column-header-sort-DESC');
                el.addCls('x-column-header-sort-ASC');
            }
            th.store.load();
        });

        th.callParent();
    }

})
;
