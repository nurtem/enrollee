<%@ page import="jandcode.wax.core.utils.WaxTml; jandcode.auth.IUserInfo; jandcode.auth.AuthService; jandcode.lang.*" %>
<%
    WaxTml th = new WaxTml(this);

    IUserInfo ui = th.service(AuthService.class).currentUser
%>

<script type="text/javascript">
    Ext.define("Jc.App", {
        extend: "Jc.BaseApp",

        requires: ['Jc.auth.LoginPage'],

        createMainMenu: function () {
            //
            var menu = Jc.menu;
            var item = Jc.action;
            //
            var logo = Ext.create('Jc.container.LogoContainer', {
                text: Jc.ini.app.title,
                listeners: {
                    click: {
                        element: 'el',
                        fn: function () {
                            Jc.app.home();
                        }
                    }
                }
            });
            //
//            logo = [logo].concat(this.createMenuForGuest());

            <% if (ui.isGuest()) {%>
            return [logo, '->'].concat(this.createMenuForGuest());
            <% } else {%>
            return [logo, '->'].concat(this.createMenuForUser());
            <% } %>
        },

        createMenuForUser: function () {
            var mm = [
                Jc.action({text: 'Басты бет', icon: "home", scope: this, onExec: this.home}),
                Jc.menu({
                    text: UtLang.t('Көмек'), icon: "help", scope: this, onExec: this.help, items: [
                        Jc.action({text: 'Бағдарлама туралы', scope: this, onExec: this.about})
                    ]
                }),
                <% if (!ui.isGuest()) {%>
                Jc.menu({
                    text: "${ui.fullname}", icon: "user", scope: this, menu: [
                        Jc.action({text: 'Шығу', icon: "logout", scope: this, onExec: this.logout})
                    ]
                }),

                <% } %>

            ];
            return mm;
        },

        createMenuForGuest: function () {
            var mm = [
                Jc.action({text: 'Басты бет', icon: "home", scope: this, onExec: this.home}),
                Jc.menu({
                    text: UtLang.t('Көмек'), icon: "help", scope: this, onExec: this.help, items: [
                        Jc.action({text: 'Бағдарлама туралы', scope: this, onExec: this.about})
                    ]
                }),
                Jc.action({text: 'Жүйеге кіру', icon: "login", scope: this, onExec: this.login})

            ];
            return mm;
        },

        home: function () {
            Jc.showFrame({
                frame: "Jc.Home",
                id: true
            });
        },

        help: function () {
            Jc.showFrame({
                frame: "Jc.frame.HtmlView", id: 'app-frame-help',
                title: 'Көмек',
                url: Jc.url('help/index.html')
            });
        },

        about: function () {
            Jc.showFrame({frame: "Jc.About"});
        },

        bachelor: function () {
            Jc.showFrame({frame: "Jc.enrollee.Bachelor", id: 'bach'});
        },

        master: function () {
            Jc.showFrame({frame: "Jc.enrollee.Master", id: 'mast'});
        },

        enrollee: function () {
            Jc.showFrame({frame: "Jc.Home2", id: 'enr'});
        },

        //

        logout: function () {
            Jc.requestText({
                url: "auth/logout"
            });
            window.location = Jc.baseUrl;
        },

        login: function () {
            Jc.showFrame({
                frame: "Jc.auth.LoginPage",
                id: true
            });
        },

        __end__: null

    });
</script>
