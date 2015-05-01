<%@ page import="jandcode.wax.core.utils.*; jandcode.dbm.*; jandcode.auth.*; jandcode.utils.*; jandcode.web.*" %>
<%
    WaxTml ut = new WaxTml(this)
    def userId = request.params.getValueLong("id")
    IUserInfo userInfo = ut.getModel().daoinvoke("WaxAuth_User", "auth/getUserInfo", userId)
    def roleNames = []
    def privNames = []
    for (r in userInfo.roles) {
        roleNames.add(r.title)
    }
    for (r in userInfo.privs) {
        privNames.add(r.title)
    }
%>

<div id="~id~x">

</div>


<script type="text/javascript">
    TH.onReady(function () {
        var th = this;
        //
        th.title = 'Профиль пользователя';
        var b = th.createBuilder();

        b.pageheader('${userInfo.name}', 'user', {renderTo: "~id~x"});

        b.databox({
            renderTo: "~id~x",
            items: [
                b.label("Полное имя"),
                b.datalabel('${userInfo.fullname}', {jsclass: "String"}),
                b.label("Заблокирован"),
                b.datalabel('${userInfo.locked}', {jsclass: "Boolean"}),
                b.delim("Информация по правах"),
                b.label("Роли"),
                b.datalabel('${UtString.join(roleNames,", ")}', {jsclass: "String"}),
                b.label("Привелегии"),
                b.datalabel('${UtString.join(privNames,", ")}', {jsclass: "String"})
            ]
        });

        this.toolbar = [
            b.action({
                text: 'Сменить пароль', icon: 'key', onExec: function () {
                    var f = Jc.model.createDomainFrame("WaxAuth_User", "changePassword", {recId: ${userId}});
                    f.showDialog();
                }
            })
        ];


    });
</script>