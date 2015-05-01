/**
 * Редактирование записи через dao.
 * Вход:
 * mode = ins|upd
 * recData = {} данные для записи по умолчанию.
 * recId!=0 - редактируемая запись, нужно загрузить. Помещается в recData.id.
 *            При вставке после выполнения в recId - id добавленной записи.
 *
 * Выход:
 * store - собственно запись. После вставки в поле id - id добавленной записи.
 *
 */
Ext.define('Jc.enrollee.EnrEditDialog', {
    extend: 'Jc.Frame',

    daoname: "Enrollee",
    domain: "Enrollee",

    /**
     * dao-метод для загрузки записи
     */
    daomethod_loadRec: "updater/loadBox",
    daomethod_loadempty: "updater/loadBoxEmpty",

    /**
     * dao-метод для добавления записи.
     * Метод должен имет один параметр: store.
     * Метод должен возвращать id добавленной записи.
     */
    daomethod_ins: "updater/ins",

    /**
     * dao-метод для изменения записи.
     * Метод должен имет один параметр: store.
     */
    daomethod_upd: "updater/upd",

    /**
     * Режим ins/upd/CUSTOM. В зависимости от режима выбирается метод "daomethod_MODE"
     * для модификации записи. Если такого метода нет (например mode="insSub"), то тогда
     * подразумевается метод "updater/MODE".
     */
    mode: null,

    title: UtLang.t("Редактирование записи"),

    onInit: function () {
        this.callParent();

        var th = this;
        th.shower = 'dialog';
        th.style = {margin: 'auto'};

        th.height = window.innerHeight * 0.8;
        th.width = 550;
        th.border = true;
        th.layout = {
            type: 'table',
            columns: 2
        };

        if (!th.recData) {
            th.recData = {};
        }
        if (th.recId) {
            th.recData.id = th.recId;
            if (!th.mode) {
                th.mode = "upd";
            }
        }
        if (!th.mode) {
            th.mode = "ins";
        }
        if (th.isIns()) {
            th.dataBox = Jc.daoinvoke(this.daoname, this.daomethod_loadempty);
            th.title = UtLang.t("Новая запись");
        }
        else {
            th.dataBox = Jc.daoinvoke(this.daoname, this.daomethod_loadRec, [th.recId]);

            th.title = th.title + '-  ' +
            th.dataBox.recIdCard.getCurRec().get('lastName') + ' ' +
            th.dataBox.recIdCard.getCurRec().get('firstName').substr(0, 1) + '.';
        }
        // создаем box

        //
        //
        var b = th.createBuilder(th.dataBox);

        var bRecEnr = Jc.app.createBuilder(th.dataBox.recEnr);
        var bStDoc = Jc.app.createBuilder(th.dataBox.stDoc);
        var bStBen = Jc.app.createBuilder(th.dataBox.stBen);
        var bRecCert = Jc.app.createBuilder(th.dataBox.recCert);
        var bRecIdCard = Jc.app.createBuilder(th.dataBox.recIdCard);

        var store2 = Jc.daoinvoke('Benefit', 'list/load');


        th.items = [
            b.databox(
                {
                    region: 'center',
                    split: true,
                    margin: 20,
                    //padding: '50 50 50 50',
                    layout: {
                        type: 'jctable',
                        align: 'center',
                        columns: 2
                    },
                    colspan: 2,
                    items: [
                        bRecIdCard.delim("Жеке куәліктегі мәліметтер:", {padding: '0 0 10 0'}),

                        bRecIdCard.input2("lastName"),
                        bRecIdCard.input2("firstName"),
                        bRecIdCard.input2("middleName"),
                        bRecIdCard.input2("birthD"),
                        bRecIdCard.input2("identityNum"),
                        bRecIdCard.input2("itn"),
                        bRecIdCard.input2("issueDate"),
                        bRecIdCard.input2("tillDate"),
                    ]
                }),

            b.databox(
                {
                    region: 'center',
                    split: true,
                    margin: 20,
                    //padding: '50 50 50 50',
                    layout: {
                        type: 'jctable',
                        align: 'center',
                        columns: 2
                    },
                    colspan: 2,
                    items: [
                        bRecEnr.delim("Қосымша мәліметтер:", {padding: '0 0 10 0'}),
                        bRecEnr.input2("identifyNum"),
                        bRecEnr.input2("phone"),
                        bRecEnr.input2("addressA"),
                        bRecEnr.input2("addressB"),
                    ]
                }),

            b.databox(
                {
                    region: 'center',
                    split: true,
                    margin: 20,
                    //padding: '50 50 50 50',
                    layout: {
                        type: 'jctable',
                        align: 'center',
                        columns: 2
                    },
                    colspan: 2,
                    items: [
                        bRecEnr.delim("Таңдау параметрлері:", {padding: '10 0 10 0'}),

                        bRecEnr.input2("education"),
                        bRecEnr.input2("speciality"),
                        bRecEnr.input2("department"),
                        bRecEnr.input2("citizen"),
                        bRecEnr.input2("gender"),
                    ]
                }),

            b.databox(
                {
                    region: 'center',
                    split: true,
                    margin: 20,
                    colspan: 2,

                    layout: {
                        type: 'auto'
                    },
                    items: [
                        b.delim(UtLang.t('Құжаттар:'), {padding: '10 0 10 0'}),
                        th.grid2 = bStDoc.grid({
                            region: 'center',
                            split: true,
                            width: 'fit',
                            flex: 4,

                            border: true,
                            style: {
                                marginTop: "8px",
                                marginLeft: "4px"
                            },
                            multiSelect: true,
                            autoScroll: true,
                            loadMask: false,
                            columns: [
                                bStDoc.column('documentType', {flex: 2}),
                                bStDoc.column('docNum', {flex: 1}),
                                bStDoc.column('docCount', {flex: 1})
                            ],
                            tbar: [
                                bStDoc.actionIns({
                                    onExec: function (act) {
                                        Jc.showFrame({
                                            frame: 'Jc.enrollee.DocEdit',
                                            recData: act.rec,
                                            onSaveData: function () {
                                                th.grid2.insRec(this.store.getCurRec())
                                            }
                                        })

                                    }
                                }),
                                bStDoc.actionUpd({
                                    onExec: function (act) {
                                        Jc.showFrame({
                                            frame: 'Jc.enrollee.DocEdit',
                                            recData: act.rec,
                                            onSaveData: function () {
                                                th.grid2.updRec(this.store.getCurRec())
                                            }
                                        })
                                    }
                                }),
                                bStDoc.actionDel({
                                    onExec: function () {
                                        Jc.showFrame({
                                            frame: 'Jc.Frame',
                                            onInit: function () {
                                                var me = this;
                                                me.callParent();
                                                var b = me.createBuilder();
                                                //
                                                Ext.apply(me, {
                                                    title: UtLang.t("Удаление записи"),
                                                    layout: b.layout("table"),
                                                    width: 450,
                                                    height: 100,
                                                    shower: "dialog"
                                                });
                                                //

                                                me.showConfig = {
                                                    ok: {text: Jc.msg.yes},
                                                    cancel: {text: Jc.msg.no}
                                                };
                                                //
                                                me.items = [
                                                    b.icon("del", {padding: '0 16 0 0'}),
                                                    b.html(UtLang.t("Вы хотите удалить запись?"))
                                                ]
                                            },

                                            onOk: function () {
                                                th.grid2.delRec(th.grid2.getCurRec())
                                            }
                                        });
                                    }
                                })
                            ]
                        }),
                    ]
                }),

            b.databox(
                {
                    region: 'center',
                    split: true,
                    margin: 20,
                    //padding: '50 50 50 50',
                    layout: {
                        type: 'jctable',
                        align: 'center',
                        columns: 2
                    },
                    colspan: 2,
                    items: [
                        b.delim(UtLang.t('Certificate:'), {padding: '10 0 0 0'}),

                        bRecCert.input2("s1"),
                        bRecCert.input2("s2"),
                        bRecCert.input2("s3"),
                        bRecCert.input2("s4"),
                        bRecCert.input2("s5")
                    ]
                }),

            b.databox(
                {
                    region: 'center',
                    split: true,
                    margin: 20,
                    colspan: 2,

                    layout: {
                        type: 'auto'
                    },
                    items: [
                        b.delim(UtLang.t('Жеңілдіктер:'), {padding: '10 0 0 0'}),

                        th.attrContainer = b.box({
                            layout: {type: 'vbox', align: 'stretch'},
                            colspan: 2,
                            margin: '10 0 10 100',
                            items: []
                        }),
                        th.btnContainer = b.box({
                            layout: {type: 'hbox', align: 'stretch'},
                            margin: '10 0 10 300',
                            colspan: 2,
                            height: 22,
                            items: [
                                //b.box({width: 130, html: ''}),
                                b.button({
                                    text: '+', width: 30, onExec: function () {
                                        th.addBenefit(bStBen, store2);
                                    }
                                })
                            ]
                        }),
                    ]
                }),


        ];

        th.onCreateStore();
        // загружаем данные сразу, что бы при формировании интерфейса
        // данные можно можно было использовать
        th.loadData();
    },

    /**
     * Вызывается после создания store и перед загрузкой данных.
     * Можно перекрыть для создания дополнительных store, если это необходимо.
     */
    onCreateStore: function () {
    },

    /**
     * Возвращает true, если режим "добавление записи"
     */
    isIns: function () {
        return this.mode.substr(0, 3) == "ins";
    },

    onOk: function () {
        this.controlToData();
        this.onSaveData();
    },

    onSaveData: function () {
        console.info(this.dataBox);
        var mn = this["daomethod_" + this.mode];
        if (!mn) {
            mn = "updater/" + this.mode;
        }
        var a = Jc.daoinvoke(this.daoname, mn, [this.dataBox]);
    },

    addBenefit: function (bStBen, storage2) {
        var th = this;

        /*        Jc.showFrame({
         frame: 'Jc.enrollee.BenefitEdit',
         onSaveData: function () {
         console.info('onOk');
         }
         });
         return*/

        var hbox = bStBen.box({
                layout: {type: 'hbox', align: 'stretch'},
                height: 35,
                padding: '10 0 0 0'
            }
        );
        var nameInp;
        var delBtn = bStBen.button({
            icon: 'del', onExec: function () {
                th.attrContainer.remove(hbox);
            }
        });
        hbox.add(nameInp = bStBen.input('benefit', {
            hbox: hbox,
            width: 'medium',
            emptyText: 'Таңдаңыз',
            jsclass: 'Cbstore',
            store: storage2,
            onChange: function (val, oldVal) {
                var me = this;
                //rec delete from store
                var rec = me.store.getById(val);
                me.store.remove(rec);
            },
            dataToControl: function () {
                var me = this;
                //me.setValue(val);
                console.info('dtToCtrl');
            },
            controlToData: function () {
                var me = this;
                //me.setValue(val);
                console.info('ctrlToDt', me.value);
            }
        }));
        hbox.add(delBtn);

        th.attrContainer.add(hbox);
    }

});