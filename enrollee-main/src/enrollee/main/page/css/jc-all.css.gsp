<%@ page import="jandcode.web.*; jandcode.wax.core.utils.theme.*" %>
<%
    /*

      Генерация css-файла, который состоит из элементов описанных в теме в элементе
      <item name="jc-all.css"....

      Аргументы в request.params:

        theme - имя темы. Если не указано, используется тема по умолчанию. Если
                     указано, но такой темы нет, то тоже используется тема по умолчанию


     */
    Tml th = this
    def theme = th.app.service(WaxThemeService).getTheme(th.request.params.getValueString("theme"))

    // собираем
    def files = []
    def jca = theme.items.find('jc-all.css')
    if (jca != null) {
        for (m in jca) {
            if (m.css) {
                files.add(m.path)
            }
        }
    }

    // выводим
    th.outTml("jc/compoundFile", files: files,
            before: "\n/* theme: ${theme.name} compound: \${file} */\n")
%>