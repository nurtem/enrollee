/**
 * Список файлов
 */
Ext.define('Jc.enrollee.RelEdit', {

    extend: 'Jc.frame.CustomEditRec',
    recData: null,

    domain: "Relative",
    daoname: "Relative",

    onInit: function () {
        var th = this;
        th.callParent();
        //
        th.shower = "dialog";
        th.width = 530; //fix
        var b = th.createBuilder(th.store);
        //
        th.items = [
            b.input2("name"),
            b.input2("relativeType"),
            b.input2("birthD")
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
                    z.allowBlank = false;
                }
            }, true);

    }

});
