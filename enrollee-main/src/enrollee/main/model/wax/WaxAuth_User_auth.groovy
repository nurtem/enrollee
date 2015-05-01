package enrollee.main.model.wax

import jandcode.auth.IRole
import jandcode.auth.IUserInfo
import jandcode.auth.impl.RoleImpl
import jandcode.auth.impl.UserInfoImpl
import jandcode.dbm.dao.DaoMethod
import jandcode.dbm.data.DataRecord
import jandcode.dbm.data.DataStore
import jandcode.dbm.data.UtData
import jandcode.utils.UtLang
import jandcode.utils.UtString
import jandcode.utils.error.XError
import jandcode.wax.core.model.WaxDao

/**
 * Аутенфикация
 */
public class WaxAuth_User_auth extends WaxDao {

    /**
     * login
     * @param username имя пользователя
     * @param passwd пароль
     * @return информация о пользователе или ошибка
     */
    @DaoMethod
    public IUserInfo login(String username, String passwd) throws Exception {
        passwd = UtString.md5Str(passwd)
        username = username.toLowerCase()
        def lst = ut.createStore()
        ut.loadSql(lst,
                "select * from ${ut.tableName} where name=:name and passwd=:passwd",
                [name: username, passwd: passwd]
        )
        if (lst.size() == 0) {
            throw new XError(UtLang.t("Қолданушы аты не құпия сөз қате"));
        }
        //
        def t = lst.getCurRec()
        if (t.getValueBoolean("locked")) {
            throw new XError("Қолданушы бұғатталған");
        }
        //
        return loadUserInfoForRec(t)
    }

    /**
     * Создать и загрузить IUserInfo по записи пользователя
     * @param t
     * @return
     */
    public IUserInfo loadUserInfoForRec(DataRecord t) {
        //
        UserInfoImpl ui = new UserInfoImpl();
        ui.setId(t.getValueLong("id"));
        ui.setName(t.getValueString("name"));
        ui.setFullname(t.getValueString("fullname"));
        ui.setGuest(false);
        ui.setLocked(t.getValueBoolean("locked"));
        // дополнительные атрибуты
        // значения из всех остальных полей, которые не помечены как стандартные
        for (f in t.domain.fields) {
            if (!f.rt.getValueBoolean("auth.stdfield")) {
                ui.attrs[f.name] = t.getValue(f)
            }
        }
        // роли пользователя
        DataStore roles = ut.loadSql("""
            select r.id, r.code from WaxAuth_Role_User ru, WaxAuth_Role r
            where r.id=ru.role_id and ru.user_id=:id
        """, ui.getId())
        def roleCodes = UtData.uniqueValues(roles, "code")
        ui.updateRoles(roleCodes)
        // атрибуты пользователя
        DataStore attrs = ut.loadSql("""
            select * from WaxAuth_UserAttrs
            where user_id=:id
        """, ui.getId())
        for (r in attrs) {
            ui.attrs[r.getValueString("name")] = r.getValueString("value")
        }
        return ui;
    }

    @DaoMethod
    public IUserInfo getUserInfo(long userId) {
        def r = ut.loadRec("WaxAuth_User", userId);
        return loadUserInfoForRec(r)
    }

    /**
     * Загрузка всех ролей с привелегиями из базы
     */
    @DaoMethod
    public Collection<IRole> loadAllRoles() {
        DataStore roles = ut.loadSql("select * from WaxAuth_Role")
        DataStore rolePrivs = ut.loadSql("select * from WaxAuth_Role_Priv")
        def m_role = [:]
        for (role in roles) {
            RoleImpl ri = new RoleImpl()
            ri.setName(role.getValueString("code"))
            ri.setTitle(role.getValueString("name"))
            m_role[role.getValueLong("id")] = ri
        }
        for (priv in rolePrivs) {
            def rid = priv.getValueLong("role_id")
            RoleImpl roleInst = m_role.get(rid)
            if (roleInst != null) {
                roleInst.getPrivNames().add(priv.getValueString("priv_code"))
            }
        }
        return m_role.values()
    }


}

