/**
 * Список файлов
 */
Ext.define('Jc.enrollee.DocEdit', {

    extend: 'Jc.frame.CustomEditRec',
    recData: null,

    domain: "Document",
    daoname: "Document",

    onInit: function () {
        var th = this;
        th.callParent();
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

    },

    onOk: function () {
        var th = this;
        if (!th.isValid()) {
            Jc.showError("Қажетті мәліметтер толтырылмаған!");
            return false;
        } else {
            th.controlToData();
            th.onSaveData();
            return true;
        }
    },

    isValid: function () {
        var th = this, isValid = true;
        Jc.eachChild(th,
            function (z) {
                if (z.jsclass) {
                    if (!z.isValid()) {
                        isValid = false
                    }
                }
            }, true);
        return isValid;
    },

    onInitAfter: function () {
        Jc.eachChild(this,
            function (z) {
                if (z.jsclass) {
                    if (z.dataIndex != "issued")
                        z.allowBlank = false;
                }
            }, true);

    }

});
