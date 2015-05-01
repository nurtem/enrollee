Ext.define('Jc.enrollee.EnrReqFrame', {
    extend: 'Jc.Frame',
    daoname: "Enrollee",
    domain: "Enrollee",
    /**
     * dao-метод для загрузки записи
     */
    daomethod_loadRec: "updater/loadBox",
    daomethod_loadempty: "updater/loadBoxEmpty",
    daomethod_ins: "updater/ins",
    daomethod_upd: "updater/upd",
    mode: null,
    title: UtLang.t("Редактирование записи"),

    onInit: function () {
        this.callParent();

        var th = this;
        th.shower = 'main';

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
        th.layout = b.layout("vbox", {align: 'center'});
        var bRecEnr = Jc.app.createBuilder(th.dataBox.recEnr);
        var bStBen = Jc.app.createBuilder(th.dataBox.stBen);
        var bStSp = Jc.app.createBuilder(th.dataBox.stSp);
        var bRecCert = Jc.app.createBuilder(th.dataBox.recCert);
        var bStRel = Jc.app.createBuilder(th.dataBox.stRel);
        var bRecIdCard = Jc.app.createBuilder(th.dataBox.recIdCard);

        var store2 = Jc.daoinvoke('Benefit', 'list/load');


        th.items = [
            b.databox(
                {
                    region: 'center',
                    split: true,
                    //margin: 20,
                    width: 1100,
                    padding: '50 50 50 50',
                    layout: {
                        type: 'jctable',
                        align: 'center',
                        columns: 2
                    },
                    items: [

                        b.databox(
                            {
                                layout: {
                                    type: 'jctable',
                                    align: 'center',
                                    columns: 2
                                },
                                margin: 10,
                                items: [
                                    bRecIdCard.delim("Жеке куәліктегі мәліметтер:", {padding: '0 0 10 0'}),

                                    bRecIdCard.input2("lastName"),
                                    bRecIdCard.input2("firstName"),
                                    bRecIdCard.input2("middleName"),
                                    bRecIdCard.input2("birthD"),
                                    bRecIdCard.input2("identityNum", {
                                        minValue: 0,
                                        minLength: 9,
                                        maxLength: 9,
                                        minLengthText: '9 саннан тұруы тиіс',
                                        maxLengthText: '9 саннан тұруы тиіс'
                                    }),
                                    bRecIdCard.input2("itn", {
                                        minValue: 0,
                                        minLength: 11,
                                        maxLength: 11,
                                        minLengthText: '11 саннан тұруы тиіс',
                                        maxLengthText: '11 саннан тұруы тиіс'
                                    }),
                                    bRecIdCard.input2("issueDate"),
                                    bRecIdCard.input2("tillDate")
                                ]
                            }),
                        b.databox(
                            {
                                layout: {
                                    type: 'jctable',
                                    align: 'center',
                                    columns: 2
                                },
                                margin: 10,
                                items: [
                                    bRecEnr.delim("Қосымша мәліметтер:", {padding: '0 0 10 0'}),
                                    bRecEnr.input2("phone"),
                                    bRecEnr.input2("email", {
                                        allowBlank: false,
                                        regex: /^((([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z\s?]{2,5}){1,25})*(\s*?;\s*?)*)*$/,
                                        regexText: 'Бұл бағанға нүктелі үтірмен(;) жалғасатын бір/бірнеше дұрыс E- mail енгізіледі',
                                        blankText: 'E- mail адрес(тер)іңізді енгізіңіз'
                                    }),
                                    bRecEnr.input2("addressA"),
                                    bRecEnr.input2("addressB")
                                ]
                            }),
                        /*b.databox(
                         {

                         region: 'center',
                         split: true,
                         colspan: 2,

                         layout: {
                         type: 'auto'
                         },
                         margin: 10,
                         items: [
                         b.delim(UtLang.t('Құжаттар:'), {padding: '10 0 10 0'}),
                         bStDoc.grid({
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
                         bStDoc.column('docCount', {flex: 1}),
                         bStDoc.column('issued', {flex: 2})
                         ],
                         tbar: [
                         bStDoc.actionIns({
                         onExec: function (act) {
                         Jc.showFrame({
                         frame: 'Jc.enrollee.DocEdit',
                         recData: act.rec,
                         onSaveData: function () {
                         act.grid.insRec(this.store.getCurRec())
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
                         act.grid.updRec(this.store.getCurRec())
                         }
                         })
                         }
                         }),
                         bStDoc.actionDel({
                         onExec: function (act) {
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
                         act.grid.delRec(act.rec)
                         }
                         });
                         }
                         })
                         ]
                         }),
                         ]
                         }),*/
                        b.databox(
                            {
                                region: 'center',
                                split: true,
                                //margin: 20,
                                colspan: 2,

                                layout: {
                                    type: 'auto'
                                },
                                margin: 10,
                                items: [
                                    b.delim(UtLang.t('Туыстары:'), {padding: '10 0 10 0'}),
                                    bStRel.grid({
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
                                            bStRel.column('name', {flex: 2}),
                                            bStRel.column('relativeType', {flex: 1}),
                                            bStRel.column('birthD', {flex: 1})
                                        ],
                                        tbar: [
                                            bStRel.actionIns({
                                                onExec: function (act) {
                                                    Jc.showFrame({
                                                        frame: 'Jc.enrollee.RelEdit',
                                                        recData: act.rec,
                                                        onSaveData: function () {
                                                            act.grid.insRec(this.store.getCurRec())
                                                        }
                                                    })

                                                }
                                            }),
                                            bStRel.actionUpd({
                                                onExec: function (act) {
                                                    Jc.showFrame({
                                                        frame: 'Jc.enrollee.RelEdit',
                                                        recData: act.rec,
                                                        onSaveData: function () {
                                                            act.grid.updRec(this.store.getCurRec())
                                                        }
                                                    })
                                                }
                                            }),
                                            bStRel.actionDel({
                                                onExec: function (act) {
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
                                                            act.grid.delRec(act.rec)
                                                        }
                                                    });
                                                }
                                            })
                                        ]
                                    })
                                ]
                            }),
                        b.databox(
                            {
                                region: 'center',
                                split: true,
                                colspan: 2,
                                layout: {
                                    type: 'auto',
                                    align: 'center'
                                },
                                margin: 10,
                                items: [

                                    b.delim(UtLang.t('Сертификат:'), {
                                        padding: '10 0 10 0'
                                    }),
                                    b.box(
                                        {
                                            layout: {
                                                type: 'hbox',
                                                pack: 'start',
                                                align: 'stretch'
                                            },
                                            items: [
                                                b.databox({
                                                    flex: 2,
                                                    margin: 10,
                                                    layout: {
                                                        type: 'jctable',
                                                        align: 'center',
                                                        columns: 2
                                                    },
                                                    items: [bRecCert.input2('docNum'),
                                                        bRecCert.input2('serialNum'),
                                                        bRecCert.input2('tZhK'),
                                                        bRecCert.input2('tillDate')]
                                                }),
                                                th.spContainer = b.databox({
                                                    flex: 3, margin: 10,
                                                    layout: {type: 'vbox', align: 'center'},
                                                    colspan: 2,
                                                    items: [],
                                                    controlToData: function () {
                                                        bStSp.store.removeAll();
                                                        Jc.controlToDataChilds(this);
                                                    },
                                                    dataToControl: function (t) {
                                                        bStSp.store.each(function (record, index) {
                                                            th.addSubPoint(bStSp, record);
                                                        });
                                                    }
                                                })
                                            ]
                                        }
                                    )
                                ]
                            }),
                        b.databox(
                            {
                                layout: {
                                    type: 'jctable',
                                    align: 'center',
                                    columns: 2
                                },
                                margin: 10,
                                items: [
                                    bRecEnr.delim("Таңдау параметрлері:", {padding: '10 0 10 0'}),

                                    bRecEnr.input2("education"),
                                    bRecEnr.input2("speciality"),
                                    bRecEnr.input2("department"),
                                    bRecEnr.input2("citizen"),
                                    bRecEnr.input2("gender")
                                ]
                            }),
                        b.databox(
                            {
                                colspan: 2,
                                layout: {
                                    type: 'auto'
                                },
                                margin: 10,
                                items: [
                                    b.delim(UtLang.t('Жеңілдіктер:'), {padding: '10 0 0 0'}),

                                    th.attrContainer = b.box({
                                        layout: {type: 'vbox', align: 'center'},
                                        colspan: 2,
                                        margin: '10 0 10 100',
                                        items: [],
                                        controlToData: function () {
                                            bStBen.store.removeAll();
                                            Jc.controlToDataChilds(this);
                                        },
                                        dataToControl: function () {
                                            bStBen.store.each(function (record, index) {
                                                th.addBenefit(bStBen, store2, record.data.benefit);
                                            });
                                        }
                                    }),
                                    th.btnContainer = b.box({
                                        layout: {type: 'vbox', align: 'center'},
                                        margin: '10 0 10 300',
                                        colspan: 2,
                                        height: 22,
                                        items: [
                                            b.button({
                                                text: '+', width: 30, onExec: function () {
                                                    th.addBenefit(bStBen, store2);
                                                }
                                            })
                                        ]
                                    })
                                ]
                            })
                    ]
                })
        ];


        th.bbar = [
            {
                xtype: 'toolbar',
                flex: 1,
                dock: 'bottom',
                ui: 'footer',
                layout: {
                    pack: 'center',
                    type: 'hbox'
                },
                items: [
                    b.button({
                        text: 'Жіберу',
                        width: 100,
                        height: 30,
                        align: 'right',
                        cls: 'btn-bottom',
                        listeners: {
                            click: function () {
                                th.onOk();
                            }
                        }
                    }),
                    b.button({
                        text: 'Жабу',
                        height: 30,
                        width: 100,
                        margin: '0 0 0 10',
                        cls: 'btn-bottom',
                        listeners: {
                            click: function () {
                                th.closeFrame();
                            }
                        }
                    })
                ]
            }
        ];
        th.onCreateStore();
        th.loadData();
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
                    if (z.dataIndex != "firstName" && z.dataIndex != "email") {
                        z.allowBlank = false;
                        z.blankText = 'Баған толтырылуы тиіс'
                    }
                }
            }, true);

    },

    onCreateStore: function () {
    },

    isIns: function () {
        return this.mode.substr(0, 3) == "ins";
    },

    onOk: function () {
        var th = this;
        if (!th.isValid()) {
            Jc.showError("Қажетті мәліметтер толтырылмаған!");
            return false;
        } else {
            th.controlToData();
            Jc.showYN("Мәліметтерді жөнелтуді қалайсыз ба?", function () {
                th.onSaveData();
                Jc.showMsg("Мәліметтер сәтті жолданды!");
                th.closeFrame();
            });
        }
    },

    onSaveData: function () {
        console.info(this.dataBox);
        var mn = this["daomethod_" + this.mode];
        if (!mn) {
            mn = "updater/" + this.mode;
        }
        var a = Jc.daoinvoke(this.daoname, mn, [this.dataBox]);
    },

    addBenefit: function (bStBen, storage2, val) {
        var th = this;

        var hbox = bStBen.box({
                layout: {type: 'hbox', align: 'stretch'},
                height: 35,
                padding: '10 0 0 0'
            }
        );
        var nameInp;
        var delBtn = bStBen.button({
            icon: 'del', onExec: function () {

                var oldVal = nameInp.value;

                if (oldVal) {
                    Ext.each(nameInp.store.removed, function (rec) {
                        if (rec.data.id == oldVal) {
                            nameInp.store.insert(rec.removedFrom || 0, rec);
                            rec.reject();
                            rec.afterReject();
                            return false;
                        }
                    });

                }
                th.attrContainer.remove(hbox);
            }
        });
        hbox.add(
            nameInp = bStBen.input('benefit', {
                hbox: hbox,
                width: 'medium',
                emptyText: 'Таңдаңыз',
                jsclass: 'Cbstore',
                store: storage2,
                onChange: function (newVal, oldVal) {
                    var me = this;
                    if (oldVal) {
                        //ескі мәнді сторға қайтарамыз
                        Ext.each(me.store.removed, function (rec) {
                            if (rec.data.id == oldVal) {
                                me.store.insert(rec.removedFrom || 0, rec);
                                rec.reject();
                                rec.afterReject();
                                return false;
                            }
                        });
                    }
                    //жаңа мәнді стордан алып тастаймыз
                    if (newVal) {
                        var rec = nameInp.store.getById(newVal);
                        nameInp.store.remove(rec);
                    }

                },
                controlToData: function () {
                    var me = this;
                    var rec = {benefit: me.value, enrollee: null, id: null};
                    bStBen.store.add(rec);
                }
            }));
        hbox.add(delBtn);

        nameInp.setValue(val);//осы жерде onChange шақырылады

        th.attrContainer.add(hbox);
    },

    addSubPoint: function (bStSp, record) {
        var th = this;

        var hbox = bStSp.box({
                layout: {type: 'hbox', align: 'stretch'},
                height: 35,
                padding: '10 0 0 0'
            }
        );
        var nameInp;
        var valInp;

        hbox.add(
            nameInp = bStSp.input('subject', {
                controlToData: function () {
                    //
                }
            }));

        hbox.add(
            valInp = bStSp.input('point', {
                allowBlank: false,
                minValue: 2,
                maxValue: 25,
                width: 25,
                padding: '0 10 0 10',
                controlToData: function () {
                    var me = this;
                    var rec = {subject: nameInp.value, point: me.value, certificate: null, id: null};
                    bStSp.store.add(rec);
                }
            }));

        nameInp.setValue(record.data.subject);//осы жерде onChange шақырылады
        valInp.setValue(record.data.point);//осы жерде onChange шақырылады

        th.spContainer.add(hbox);

    }
});