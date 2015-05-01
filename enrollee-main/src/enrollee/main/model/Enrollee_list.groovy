package enrollee.main.model

import jandcode.dbm.dao.DaoMethod
import jandcode.dbm.data.DataBox
import jandcode.dbm.data.DataRecord
import jandcode.dbm.data.DataStore
import jandcode.dbm.sqlfilter.SqlFilter
import jandcode.utils.UtCnv
import jandcode.utils.UtString
import jandcode.wax.core.model.WaxListDao

public class Enrollee_list extends WaxListDao {

    /**
     * Барлық абитуриенттің грид үшін қысқаша мәліметі
     * @param params
     * @return
     * @throws Exception
     */
    @DaoMethod
    public DataStore list(Map params) throws Exception {

        SqlFilter f = ut.createSqlFilter("Enrollee.ui", params)

        f.filter(field: "itn")
        f.filter(field: "lastName", type: "contains")
        f.filter(field: "firstName", type: "contains")
        f.filter(field: "speciality")
        f.filter(field: "education")
        f.filter(field: "user")
        f.orderBy("lastName", "asc")
        f.orderBy("firstName", "asc")
        f.orderBy("middleName", "asc")
        def orderBy = UtCnv.toString(params.get("orderBy"))
        if (!UtString.empty(orderBy)) {
            if (orderBy.contains("name")) {
                if (orderBy.contains("desc")) {
                    f.orderBy(orderBy, "lastName desc, firstName desc")
                } else {
                    f.orderBy(orderBy, "lastName, firstName")
                }
            } else {
                f.orderBy(orderBy, orderBy)
            }
        }


        f.paginate = true
        f.sql = """
                    select e.*, ic.*, 'name' as name from Enrollee e
                    join IdCard ic on ic.enrollee = e.id
                    where 1 = 1
                    /**/order by lastName
                """

        //                order by LastName, FirstName


        DataStore ds = ut.createStore()
        f.load(ds)

        // formulate "LastName FirstName MiddleName" as "Name"

        addName(ds)
        ut.outTable(ds)
        return ds;
    }

    @DaoMethod
    public DataBox loadForEdit(long enrollee) {
        DataBox dataBox = new DataBox()
        DataRecord recEnr = this.loadRec(enrollee)
        dataBox.put('recEnr', recEnr)


        DataStore stDoc = ut.createStore('Document')
        ut.loadSql(stDoc,
                """
                select * from document where enrollee = ${enrollee}
                """)
        dataBox.put('stDoc', stDoc)



        return dataBox
    }

    private static void addName(DataStore enrStore) {
        for (DataRecord rec : enrStore) {
            String name = ""
            name += rec.getValueString("lastName")
            name += UtString.empty(rec.getValueString("firstName")) ? '' : ' ' + rec.getValueString("firstName")
            name += rec.getValueString("middleName") ? '' : ' ' + rec.getValueString("middleName")

            rec.setValue("name", name)
        }
    }
}
