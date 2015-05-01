/**
 */
Ext.define('Jc.auth.ChangePassword', {
    extend: 'Jc.frame.CustomEditRec',

    domain: "WaxAuth_User.edit",
    daoname: "WaxAuth_User",
    daomethod_upd: "updater/updPasswd",

    onInit: function () {
        var th = this;
        th.callParent();
        //
        var b = th.createBuilder(th.store);
        this.title = "Изменение пароля";
        //
        this.items = [
            b.datalabel2("name"),
            b.datalabel2("fullname"),

            b.delim("Пароль"),
            b.input2("passwd"),
            b.input2("passwd2")
        ];

    }

});
 