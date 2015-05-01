<%@ page import="jandcode.dbm.*; jandcode.utils.*" %>

<script type="text/javascript">
    Ext.define('Jc.About', {
        extend: 'Jc.Frame',

        onInit: function () {
            this.callParent(arguments);
            //
            var th = this;

            var b = th.createBuilder();

            Ext.apply(this, {
                title: 'Бағдарлама туралы',
                shower: 'dialogclose'
            });

            this.items = [
                b.pageheader(Jc.ini.app.title, Jc.url("images/top-icon.jpg"), {
                    padding: 15
                }),
                b.databox({
                    items: [
                        b.label("Қосымшаны дайындаған"),
                        b.label("Айбала Орынбекова", {
                            style: {
                                'font-weight': 'bold',
                                'color': 'rgb(44, 26, 124)'
                            },
                            getText: function () {
                                var s = this.text;
                                if (!s) return '';
                                return s;
                            }
                        })
                    ]
                })
            ]
            ;
        }

    })
    ;
</script>
