/**
 * Утилиты для auth
 */
Ext.define('Jc.auth.Ut', {

    singleton: true,

    showProfile: function (userId) {
        if (!userId) {
            userId = Jc.ini.userInfo.id;
        }

//        var id = "WaxAuth_User.profile";
//        Jc.app.closeFrame(id);
//        var f = Jc.createDomainFrame("WaxAuth_User", "profile", {id: id, recId: userId});
//        f.showFrame();

        var id = "WaxAuth_User.profile";
        Jc.app.closeFrame(id);
        var f = Ext.create("Jc.frame.Gsp", {
            url: "js/auth/userProfile.html",
            params: {
                id: userId
            }
        });
        f.showFrame();
    }

});
 