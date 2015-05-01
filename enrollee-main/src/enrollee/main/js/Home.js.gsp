<%@ page import="jandcode.wax.core.utils.WaxTml; jandcode.auth.IUserInfo; jandcode.auth.AuthService; jandcode.lang.*" %>
<%
    WaxTml th = new WaxTml(this);

    IUserInfo ui = th.service(AuthService.class).currentUser
%>
<script type="text/javascript">
    Ext.define('Jc.Home', {
        extend: 'Jc.Frame',

        onInit: function () {
            this.callParent(arguments);
            var th = this;
            var b = th.createBuilder();
            th.layout = b.layout("vbox", {align: 'center'});
            Ext.apply(this, {
                title: 'Басты бет',
                closable: false
            });
            //
            var myWidth = innerWidth ? (innerWidth * 0.85) : 700;
            var btnWidth = 350;
            th.items = [
                b.databox({
                    region: 'center',
                    split: true,
                    margin: '0 20 20 20',
                    width: myWidth,
                    minHeight: innerHeight ? innerHeight * 0.65 : 500,
                    padding: '50 50 50 50',
                    layout: {
                        type: 'hbox',
                        align: 'center'
                    },
                    items: [

                        new Ext.Component({
                            width: myWidth / 1.8,
                            loader: {
                                //*load contents from this url
                                url: Jc.url('help/comm.html'),
                                renderer: 'html',
                                autoLoad: true,
                                scripts: true
                            }
                        }),

                        b.box({
                            region: 'center',
                            split: true,

                            padding: '20 50 50 50',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                <% if (ui.isGuest()) {%>
                                b.button({
                                    text: th.getBtnText('Құжаттарды тіркеу'),
                                    width: btnWidth,
                                    margin: '0 10 10 10',
                                    listeners: {
                                        click: function () {
                                            // this == the button, as we are in the local scope
                                            Jc.showFrame({
                                                frame: "Jc.enrollee.EnrReqFrame", id: true
                                            });
                                        }
                                    }
                                }),
                                <% } else {%>
                                b.button({
                                    text: th.getBtnText('Абитуриенттер'),
                                    width: btnWidth,
                                    margin: '0 10 10 10',
                                    listeners: {
                                        click: function () {
                                            // this == the button, as we are in the local scope
                                            Jc.showFrame({
                                                frame: "Jc.Enrollee", id: true
                                            });
                                        }
                                    }
                                }),
                                <% } %>
                                b.button({
                                    margin: 10,
                                    text: th.getBtnText('Қабылдау комиссиясы тизими'),
                                    width: btnWidth,
                                    listeners: {
                                        click: function () {
                                            // this == the button, as we are in the local scope
                                            Jc.showFrame({
                                                frame: "Jc.enrollee.HtmlWrapper",
                                                id: 'app-frame-comm',
                                                title: 'Қабылдау комиссиясы тизими',
                                                url: Jc.url('help/comm.html')
                                            });
                                        }
                                    }
                                }),

                                b.button({
                                    margin: 10,
                                    text: th.getBtnText('Оқуға қабылдаудың үлгі қағидалары'),
                                    width: btnWidth,
                                    listeners: {
                                        click: function () {
                                            // this == the button, as we are in the local scope
                                            Jc.showFrame({
                                                frame: "Jc.enrollee.HtmlWrapper",
                                                id: 'app-frame-tipo',
                                                title: 'Оқуға қабылдаудың үлгі қағидалары',
                                                url: Jc.url('help/tipo kaz.html')
                                            });
                                        }
                                    }
                                }),

                                b.button({
                                    margin: 10,
                                    text: th.getBtnText('Білім беру грантын беру тәртібі'),
                                    width: btnWidth,
                                    listeners: {

                                        click: function () {
                                            Jc.showFrame({
                                                frame: "Jc.enrollee.HtmlWrapper",
                                                id: 'app-frame-bilim',
                                                title: 'Білім беру грантын беру тәртібі',
                                                url: Jc.url('help/bilim beru granty.html')
                                            });
                                        }


                                    }
                                }),

                                b.button({
                                    margin: 10,
                                    text: th.getBtnText('Бакалавриат қабылдау құжаттары'),
                                    width: btnWidth,
                                    listeners: {

                                        click: function () {
                                            Jc.showFrame({
                                                frame: "Jc.enrollee.HtmlWrapper",
                                                id: 'app-frame-bakalavr',
                                                title: 'Бакалавриат қабылдау құжаттары',
                                                url: Jc.url('help/bakalavr.html')
                                            });
                                        }

                                    }
                                }),

                                b.button({
                                    margin: 10,
                                    text: th.getBtnText('Магистратураға құжаттар'),
                                    width: btnWidth,
                                    listeners: {

                                        click: function () {
                                            Jc.showFrame({
                                                frame: "Jc.enrollee.HtmlWrapper",
                                                id: 'app-frame-magistraturaga',
                                                title: 'Магистратураға құжаттар',
                                                url: Jc.url('help/magistratura.html')
                                            });

                                        }
                                    }
                                }),

                                b.button({
                                    margin: 10,
                                    text: th.getBtnText('Шетел азаматтарының құжаттарын нострификациялау'),
                                    width: btnWidth,
                                    listeners: {

                                        click: function () {
                                            Jc.showFrame({
                                                frame: "Jc.enrollee.HtmlWrapper",
                                                id: 'app-frame-shet',
                                                title: 'Шетел азаматтарының құжаттарын нострификациялау',
                                                url: Jc.url('help/shet el azamattary.html')
                                            });
                                        }

                                    }
                                }),

                                b.button({
                                    margin: 10,
                                    text: th.getBtnText('Қабылдану квотасы'),
                                    width: btnWidth,
                                    listeners: {
                                        click: function () {
                                            Jc.showFrame({
                                                frame: "Jc.enrollee.HtmlWrapper",
                                                id: 'app-frame-kvota',
                                                title: 'Қабылдану квотасы',
                                                url: Jc.url('help/qabyldau kvotasy.html')
                                            });
                                        }
                                    }
                                })
                            ]
                        })

                    ]
                }),

                Ext.create('Ext.panel.Panel', {
                    bodyStyle: Ext.String.format("background-image:url({0}) !important", Jc.url('images/top.gif')),
                    height: 150,
                    width: myWidth
                })


            ];
            //
        },

        getBtnText: function (text) {
            return Ext.String.format('<span><h3>{0}</h3></span>', Ext.util.Format.ellipsis(text, 40));
        }
    });
</script>
