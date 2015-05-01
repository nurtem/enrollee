<jc:page tml="app">
    <script type="text/javascript">
        Ext.define("LocalFrame1", {
            extend: "Jc.Frame",

            onInit: function () {
                var th = this;
                th.callParent();
                //
                var b = th.createBuilder();
                //
                Ext.apply(this, {
                    title: "Құжаттар",
                    layout: b.layout("autobox")//autobox
                });

                var grid = Ext.create('Jc.enrollee.DocEdit', {
                    region: 'center',
                    split: true,
                    width: 'fit',
                    enrollee: 1
                });

                //
                th.items = [
                    grid
                ];

                //
                th.toolbar = [
                    b.action({
                        text: "Action1", icon: "tool", onExec: function () {
                            //
                        }
                    })
                ];
            }

        });

        //////
        Ext.onReady(function () {
            var f = Ext.create('LocalFrame1');
            f.showFrame();
        });

    </script>
</jc:page>
