/**
 * Просмотр чистого html во фрейме
 */
Ext.define('Jc.enrollee.HtmlWrapper', {
    extend: 'Jc.Frame',

    onInit: function () {
        this.callParent();
        //
        var th = this;
        var builder = th.createBuilder();

        th.layout = builder.layout("vbox", {align: 'center'});

        Ext.apply(this, {
            loader: {
                url: 'xxx',
                params: {},
                renderer: function (a, b) {
                    try {
                        var s = th.prepareText(b.responseText);

                        var inn = builder.databox({
                            region: 'center',
                            split: true,
                            //width: innerWidth * 0.75,
                            //height: 90,
                            margin: '20 20 0 20',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                builder.html('<div class="jc-htmltext">' + s + '</div>',
                                    {
                                        bodyPadding: 5,
                                        width: Math.min(innerWidth * 0.75, 700),
                                        margin: '5 0 0 0',
                                        listeners: {
                                            el: {
                                                click: function () {
                                                    console.info("click");
                                                }
                                            }
                                        }
                                    })]
                        });
                        th.add(inn);

                        th.doLayout();
                    } catch (e) {
                        Jc.error(e);
                    }
                }
            }
        });
        if (this.url) {
            this.loader.url = this.url;
        }
    },

    onLoadData: function () {
        this.getLoader().load();
    },

    prepareText: function (s) {
        var cururl = this.getLoader().url;
        var i1 = cururl.lastIndexOf("/");
        cururl = cururl.substr(0, i1 + 1);
        // картинки
        var s1 = s.replace(/<img\s*?src="(.*?)"/ig, function (s, p1) {
            if (p1.indexOf(':') != -1) {
                return s;
            }
            return '<img src="' + cururl + p1 + '"';
        });
        return s1;
    }

});
 