/**
 * Список файлов
 */
Ext.define('Jc.enrollee.CertEdit', {

    extend: 'Jc.frame.CustomEditRec',
    recData: null,

    domain: "Certificate",
    daoname: "Certificate",

    onInit: function () {
        var th = this;
        th.callParent();
        th.layout = {
            type: 'jctable',
            columns: 4
        };
        //
        th.shower = "dialog";
        th.width = 530; //fix
        var b = th.createBuilder(th.store);
        //
        th.items = [
            b.input2("documentType"),
            b.input2("docNum"),
            b.input2("docCount"),
            b.input2("issued")
        ];

    }

});
