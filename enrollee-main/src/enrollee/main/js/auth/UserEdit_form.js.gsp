<%@ page import="jandcode.wax.core.utils.*; jandcode.dbm.*" %>
<%
    WaxTml ut = new WaxTml(this)
    def domain = ut.getModel().getDomain("WaxAuth_User")
    def dopFields = []
    def fe = new WaxFieldExt(null)
    for (f in domain.fields) {
        fe.comp = f
        if (!f.rt.getValueBoolean("auth.stdfield") && fe.editable) {
            dopFields.add(f)
        }
    }
%>
<script type="text/javascript">
    Ext.define('Jc.auth.UserEdit_form', {
        extend: 'Jc.frame.CustomEditRec',

        domain: "WaxAuth_User.edit",
        daoname: "WaxAuth_User",

        onInit: function () {
            var th = this;
            th.callParent();
            //
            th.width = 530; //fix
            var b = th.createBuilder(th.store);
            //
            th.items = [
                b.delim("Основные свойства"),
                b.input2("name"),
                b.input2("fullname"),
                b.input2("locked")
            ];

            if (th.isIns()) {
                th.items.push([
                    b.delim("Пароль"),
                    b.input2("passwd"),
                    b.input2("passwd2")
                ]);
            }

            <% if (dopFields.size()>0) { %>
            th.items.push(b.delim("Дополнительные свойства"));
            <% for (f in dopFields) {%>
            th.items.push(b.input2("${f.name}"));
            <% } %>
            <% } %>

            var treeStore = Jc.createTreeStore("WaxAuth_User.roletree", {
                daoname: 'WaxAuth_User',
                daomethod: 'updater/loadRoles',
                daoparams: [th.recId]
            });
            var tree = th.tree = b.tree({
                colspan: 2,
                width: "100%",
                store: treeStore,
                height: 200
            });
            //
            th.items.push(
                    b.delim("Роли пользователя"),
                    tree
            )
        },

        onSaveData: function () {
            var records = this.tree.getView().getChecked();
            var ids = [];
            Ext.Array.each(records, function (rec) {
                ids.push(rec.get('id'));
            });
            this.store.getCurRec().set("roles", ids.join(','));
            //
            this.callParent();
        }

    });
</script>

