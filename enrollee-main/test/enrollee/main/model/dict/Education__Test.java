package enrollee.main.model.dict;

import jandcode.dbm.data.DataStore;
import jandcode.dbm.test.DbmTestCase;
import org.junit.Test;

public class Education__Test extends DbmTestCase {

    {
        logSetUp = true;
    }

    @Test
    public void getSub() throws Exception {
        DataStore st = dbm.getUt().loadSql("select * from subject");
        dbm.outTable(st);
    }
}
