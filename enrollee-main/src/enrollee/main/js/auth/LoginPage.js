/**
 * Ввход в систему, оформленный как страница. В центре - форма ввода имени и пароля.
 */
Ext.define('Jc.auth.LoginPage', {
    extend: 'Jc.Frame',

    onInit: function () {
        this.callParent();
        var th = this;
        //
        var b = th.createBuilder();
        //
        Ext.apply(this, {
            title: 'Жүйеге кіру',
            closable: false
        });
        //
        var i_un, i_ps;
        //
        var doLogin = function () {
            Jc.requestText({
                url: "auth/login",
                params: {
                    name: i_un.getValue(),
                    passwd: i_ps.getValue()
                }
            });
            window.location = Jc.baseUrl;
        };
        //
        this.items = [
            b.databox({
                style: 'width: 320px;margin: 80px auto;padding: 20px;',
                items: [
                    b.pageheader('Жүйеге кіру', 'user', {colspan: 2}),
                    b.label('Қолданушы аты'),
                    i_un = b.input(null, {
                        width: 170,
                        enableKeyEvents: true,
                        listeners: {
                            keydown: function (t, e) {
                                if (e.getKey() == e.ENTER) {
                                    i_ps.focus();
                                }
                            }
                        }
                    }),
                    b.label('Құпия сөз'),
                    i_ps = b.input(null, {
                        jsclass: 'Password', width: 170,
                        enableKeyEvents: true,
                        listeners: {
                            keydown: function (t, e) {
                                if (e.getKey() == e.ENTER) {
                                    doLogin();
                                }
                            }
                        }
                    }),
                    //
                    b.button({
                        colspan: 2,
                        scale: 'medium',
                        cellStyle: {textAlign: 'right', paddingTop: '10px'},
                        text: 'Кіру',
                        iconCls: 'icon-login',
                        scope: th,
                        onExec: doLogin
                    })
                ]
            })
        ];
    }

});
