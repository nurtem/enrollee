package enrollee.main.model

import jandcode.auth.AuthService
import jandcode.auth.IUserInfo
import jandcode.dbm.dao.DaoMethod
import jandcode.dbm.data.DataBox
import jandcode.dbm.data.DataRecord
import jandcode.dbm.data.DataStore
import jandcode.utils.error.XError
import jandcode.wax.core.model.WaxUpdaterDao
import org.joda.time.DateTime

public class Enrollee_updater extends WaxUpdaterDao {

    @DaoMethod
    public DataBox loadBox(long enrollee) {
        DataBox dataBox = new DataBox()

        //enrollee
        DataRecord recEnr = loadRec(enrollee)
        dataBox.put('recEnr', recEnr)

        //documents
        DataStore stDoc = ut.createStore('Document')
        ut.loadSql(stDoc,
                """
                select * from Document where enrollee = ${enrollee}
                """)
        dataBox.put('stDoc', stDoc)

        //benefits
        DataStore stBen = ut.createStore('EnrolleeBenefit')
        ut.loadSql(stBen, """
                    select * from EnrolleeBenefit where enrollee = ${enrollee}
                    """)
        dataBox.put('stBen', stBen)

        //relatives
        DataStore stRel = ut.createStore('Relative')
        ut.loadSql(stRel, """
                    select * from Relative where enrollee = ${enrollee}
                    """)
        dataBox.put('stRel', stRel)

        //certificate
        def stCert = ut.createStore("Certificate")
        ut.loadSql(stCert, """
                    select * from Certificate where enrollee = ${enrollee}
                    """)
        def recCert = stCert.getCurRec()
        dataBox.put('recCert', recCert)

        def stSp = ut.createStore("SubPoint")
        ut.loadSql(stSp, """
                            select sp.* from Certificate c
                            join SubPoint sp on sp.certificate = c.id
                            where c.enrollee = ${enrollee}
                        """)
        checkCert(stSp)
        dataBox.put('stSp', stSp)

        def stCard = ut.createStore("IdCard")
        ut.loadSql(stCard, """
                    select * from IdCard where enrollee = ${enrollee}
                    """)
        def recIdCard = stCard.getCurRec()
        dataBox.put('recIdCard', recIdCard)

        return dataBox
    }

    static void checkCert(DataStore st) {
        if (st.size() == 4) {
            return
        }

        st.clear()

        for (int i = 1; i < 5; i++) {
            st.add().setValue("subject", i)
        }
    }

    @DaoMethod
    public DataBox loadBoxEmpty() {
        DataBox dataBox = new DataBox()

        //enrollee
        DataRecord recEnr = ut.createRecord()
        dataBox.put('recEnr', recEnr)

        //documents
        DataStore stDoc = ut.createStore('Document')
        dataBox.put('stDoc', stDoc)

        //benefits
        DataStore stBen = ut.createStore('EnrolleeBenefit')
        dataBox.put('stBen', stBen)

        //relatives
        DataStore stRel = ut.createStore('Relative')
        dataBox.put('stRel', stRel)

        //certificate
        def recCert = ut.createRecord("Certificate")
        dataBox.put('recCert', recCert)

        def stSp = ut.createStore("SubPoint")
        checkCert(stSp)
        dataBox.put('stSp', stSp)

        def recIdCard = ut.createRecord("IdCard")
        dataBox.put('recIdCard', recIdCard)

        return dataBox
    }

    @DaoMethod
    public long ins(DataBox dataBox) throws Exception {
        DataRecord recEnr = (dataBox.getValue('recEnr') as DataStore).getCurRec()
        recEnr.setValue('recDate', new DateTime())
        IUserInfo user = app.service(AuthService.class).getCurrentUser()

        recEnr.setValue("user", user.getId())

        if (user.isGuest()) {
            recEnr.setValue("isQuery", true)
        }

        long enrId = ut.insertRec('Enrollee', recEnr)
        insertDepends(enrId, dataBox)
        return enrId
    }

    @DaoMethod
    public void upd(DataBox dataBox) throws Exception {
        DataRecord recEnr = (dataBox.getValue('recEnr') as DataStore).getCurRec()
        IUserInfo user = app.service(AuthService.class).getCurrentUser()
        recEnr.setValue("user", user.getId())

        ut.updateRec('Enrollee', recEnr)
        def enrId = recEnr.getValueLong('id')
        deleteDepends(enrId)
        insertDepends(enrId, dataBox)

    }

    @DaoMethod
    @Override
    public void del(long id) throws Exception {
        deleteDepends(id)
        ut.deleteRec('Enrollee', id)
    }

    void validate(DataBox dataBox) {

    }

    void deleteDepends(long id) {
        //benefit
        ut.execSql(
                """
                delete from EnrolleeBenefit where enrollee = ${id}
                """)

        //docs
        ut.execSql(
                """
                delete from Document where enrollee = ${id}
                """)

        //idCard
        ut.execSql(
                """
                delete from IdCard where enrollee = ${id}
                """)

        //relatives
        ut.execSql(
                """
                delete from Relative where enrollee = ${id}
                """)

        //subPoint
        ut.execSql(
                """
                delete from SubPoint where certificate in
                    (
                    select id from Certificate where enrollee = ${id}
                    )
                """)
        //certificate
        ut.execSql(
                """
                delete from Certificate where enrollee = ${id}
                """)
    }

    void insertDepends(long id, DataBox dataBox) {

        DataRecord recIdCard = (dataBox.getValue('recIdCard') as DataStore).getCurRec()
        DataRecord recCert = (dataBox.getValue('recCert') as DataStore).getCurRec()
        DataStore stDoc = dataBox.getValue('stDoc') as DataStore
        DataStore stBen = dataBox.getValue('stBen') as DataStore
        DataStore stRel = dataBox.getValue('stRel') as DataStore
        DataStore stSp = dataBox.getValue('stSp') as DataStore

        if (stSp.size() != 4) {
            throw new XError("Пән саны 4 болуы тиіс")
        }

        recIdCard.setValue('enrollee', id)
        ut.insertRec("IdCard", recIdCard)

        //docs
        for (DataRecord doc in stDoc) {
            doc.setValue('enrollee', id)
            ut.insertRec('Document', doc)
        }

        //benefits
        for (DataRecord ben in stBen) {
            ben.setValue('enrollee', id)
            ut.insertRec('EnrolleeBenefit', ben)
        }

        //relative
        for (DataRecord rel in stRel) {
            rel.setValue('enrollee', id)
            ut.insertRec('Relative', rel)
        }

        //certificate
        recCert.setValue('enrollee', id)
        def certId = ut.insertRec("Certificate", recCert)
        for (DataRecord sp in stSp) {
            sp.setValue('Certificate', certId)
            ut.insertRec('SubPoint', sp)
        }
    }

    @Override
    protected void onBeforeSave(DataRecord rec, boolean ins) throws Exception {
    }
}
