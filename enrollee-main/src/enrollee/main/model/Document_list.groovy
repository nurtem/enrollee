package enrollee.main.model

import jandcode.dbm.dao.DaoMethod
import jandcode.dbm.data.DataStore
import jandcode.wax.core.model.WaxListDao

public class Document_list extends WaxListDao {

    @DaoMethod
    public DataStore getByEnrollee(long enrollee) throws Exception {
        DataStore store = ut.createStore(ut.getDomain());
        ut.loadSql(store,
                """
                    select * from document
                    where enrollee = ${enrollee}
                """)

        ut.outTable(store)

        return store;
    }
}
