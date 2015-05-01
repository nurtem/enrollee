<%@ page import="jandcode.web.*" %>
<%
    // body для темы debugdiv

    Tml th = this
%>

<table width="100%">
    <tr>
        <td width="50%">
            <div class="jc-app-debughint">menu1</div>

            <div id="jc-app-menu1" class="jc-app-debugpanel">
            </div>

        </td>
        <td width="50%">
            <div class="jc-app-debughint">menu2</div>

            <div id="jc-app-menu2" class="jc-app-debugpanel">
            </div>

        </td>
    </tr>
</table>


<table class="jc-app-debuggrid" width="100%">
    <tr>
        <td class="jc-app-tools-wrap">
            <div class="jc-app-debughint">title</div>

            <div id="jc-app-tools-title" class="jc-app-debugpanel"></div>

            <div class="jc-app-debughint">toolbar</div>

            <div id="jc-app-tools-toolbar" class="jc-app-debugpanel"></div>

            <div class="jc-app-debughint">body</div>

            <div id="jc-app-tools-body" class="jc-app-debugpanel"></div>
        </td>
        <td class="jc-app-content-wrap">
            <div id="jc-app-content">

                <table width="100%">
                    <tr>
                        <td width="50%">
                            <div class="jc-app-debughint">title</div>

                            <div id="jc-app-content-title" class="jc-app-debugpanel"></div>

                        </td>
                        <td width="50%">
                            <div class="jc-app-debughint">toolbar</div>

                            <div id="jc-app-content-toolbar" class="jc-app-debugpanel"></div>

                        </td>
                    </tr>
                </table>

                <div class="jc-app-debughint">body</div>

                <div id="jc-app-content-body" class="jc-app-debugpanel"></div>
            </div>
        </td>
    </tr>
</table>

${th.vars.bodytext}