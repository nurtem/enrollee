/**
 * Список файлов
 */
Ext.define('Jc.enrollee.BenefitEdit', {

    extend: 'Jc.frame.CustomEditRec',
    recData: null,

    domain: "EnrolleeBenefit",
    daoname: "EnrolleeBenefit",

    onInit: function () {
        var th = this;
        th.callParent();
        //
        th.shower = "dialog";
        th.width = 230; //fix
        var b = th.createBuilder(th.store);
        //
        th.items = [
            b.input2("benefit")
        ];

    }

});
