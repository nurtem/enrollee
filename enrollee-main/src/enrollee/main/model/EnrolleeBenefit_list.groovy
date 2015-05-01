package enrollee.main.model

import jandcode.dbm.dao.DaoMethod
import jandcode.dbm.data.DataStore
import jandcode.wax.core.model.WaxListDao

public class EnrolleeBenefit_list extends WaxListDao {
    @DaoMethod
    public DataStore loadUpd(long enrollee) {
        DataStore store = ut.loadSql("""
                    select * from ${ut.tableName}
                    where enrollee = ${enrollee}
                    """)
        return store
    }

}