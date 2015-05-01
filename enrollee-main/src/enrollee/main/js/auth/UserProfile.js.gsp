<%@ page import="jandcode.dbm.*; jandcode.utils.*" %>
<script type="text/javascript">
    Ext.define('Jc.auth.UserProfile', {
        extend: 'Jc.frame.DomainFrame',

        domain: "WaxAuth_User",
        recId: 0,

        onInit: function () {
            var th = this;
            th.callParent();
            //
            var store = this.store = th.domain.createStore();
            var b = th.createBuilder(store);
            //
            Ext.apply(th, {
                title: 'Профиль пользователя'
            });

            var info1 = b.databox({
                items: [
                    b.datalabel2("fullname"),
                    b.datalabel2("locked")
                ]
            });

            this.toolbar = [
                b.action({text: 'Сменить пароль', icon: 'key', onExec: th.act_changePassword})
            ];

            //
            this.items = [
                this.pageHeader = b.pageheader(th.title, 'user'),
                info1
            ]
        },

        onLoadData: function () {
            this.store.daoload("WaxAuth_User", "updater/loadRec", [this.recId]);
            var r = this.store.getCurRec();
            this.pageHeader.setText(r.get('name'));
        },

        /**
         * action: upd
         */
        act_changePassword: function () {
            var f = this.domain.createDomainFrame("changePassword", {recId: this.recId});
            f.showDialog();
        }


    });
</script>
