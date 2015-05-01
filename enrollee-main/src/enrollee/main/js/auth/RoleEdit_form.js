/**
 *
 */
Ext.define('Jc.auth.RoleEdit_form', {
    extend: 'Jc.frame.CustomEditRec',

    domain: 'WaxAuth_Role.edit',
    daoname: 'WaxAuth_Role',

    onInit: function () {
        this.callParent();
        var th = this;
        th.width = 495; //fix
        //
        var b = th.createBuilder(th.store);
        //
        var treeStore = Jc.createTreeStore("WaxAuth_Role.privtree", {
            daoname: 'WaxAuth_Role',
            daomethod: 'priv/loadForRole',
            daoparams: [th.recId]
        });
        var tree = th.tree = b.tree({
            colspan: 2,
            store: treeStore,
            height: 300,
            width: "100%"
        });
        //
        this.items = [
            b.input2("code"),
            b.input2("name"),
            b.delim("Привелегии роли"),
            tree
        ];
        //
    },

    onSaveData: function () {
        var records = this.tree.getView().getChecked();
        var ids = [];
        Ext.Array.each(records, function (rec) {
            ids.push(rec.get('id'));
        });
        this.store.getCurRec().set("privs", ids.join(','));
        //
        this.callParent();
    }

});
 