<%@ page import="jandcode.wax.core.utils.*; jandcode.dbm.*" %>
<%
    WaxTml ut = new WaxTml(this)
    def domain = ut.getModel().getDomain("WaxAuth_User")
%>
<script type="text/javascript">
    /**
     * Редактирование пользователей одним большим списком с пагинацией на клиенте
     */
    Ext.define('Jc.auth.UserEdit', {
        extend: 'Jc.frame.CustomEditList',

        requires: [
            'Jc.auth.Ut'
        ],

        domain: "WaxAuth_User",
        headerIсon: "user",

        createGridColumns: function (b) {
            var th = this;
            var cols = [
                b.column("id"),

                b.column("name", {
                    jsclass: "Icontext", atag: true,
                    onIconCell: function (v, m, r) {
                        if (r.get("locked")) {
                            return "cancel";
                        } else {
                            return "user";
                        }
                    },
                    onTextCell: function (v, m, r) {
                        return '<b>' + v + '</b>';
                    },
                    onClickCell: function (rec, e) {
                        if (e.getTarget('a')) {
                            th.showProfile();
                        }
                    }
                }),

                b.column("fullname")
            ];
            <%
        // значения из всех остальных полей, которые не помечены как стандартные
        def fe = new WaxFieldExt(null)
        for (f in domain.fields) {
            fe.comp = f
            if (!f.rt.getValueBoolean("auth.stdfield") && fe.visible) {
      %>
            cols.push(b.column("${f.name}"));
            <%
            }
        }
      %>
            return cols;
        },

        createGridToolbar: function (b) {
            var tb = this.callParent(arguments);
            tb.push(b.action({text: "Изменить пароль", icon: "key", onExec: this.act_changePassword}));
            tb.push(b.action({text: "Профиль", icon: "user", onExec: this.showProfile}));
            return tb;
        },

        /**
         * action: upd
         */
        act_changePassword: function () {
            var th = this;
            var r = th.grid.getCurRec();
            if (!r) return;
            var f = th.domain.createDomainFrame("changePassword", {recId: r.getId()});
            f.showDialog();
        },

        showProfile: function () {
            var r = this.grid.getCurRec();
            if (!r) return;
            Jc.auth.Ut.showProfile(r.get("id"));
        }

    });
</script>

