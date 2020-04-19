<%-- 
    Document   : revoke
    Created on : Mar 12, 2017, 9:11:53 AM
    Author     : Helias
--%>

<%@page import="osn.ProjectProperties"%>
<%@page import="osn.DataBase"%>
<%
    String msg = request.getParameter("msg");
    msg = (msg == null ? "" : msg);

    String email = (String) session.getAttribute("email");
    String name = (String) session.getAttribute("name");

    if (email == null) {
        response.sendRedirect("index.jsp?msg=Unauthorized Access");
        return;
    } else {
        String tid = request.getParameter("tid");
        String pageRedirrect = request.getParameter("page");
        String visibility = request.getParameter("visibility");

        String query = "update fileuploads set visible='"+visibility+"' where tid="+tid.trim();

        DataBase dbfunc = new DataBase();
        dbfunc.createConnection();
        System.out.println(query);
        dbfunc.updateRecord(query);
        dbfunc.closeConnection();
        
        response.sendRedirect(pageRedirrect+"?msg=Status Changed Successfully!");
    }


%>