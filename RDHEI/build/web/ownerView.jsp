<%@page import="osn.Stego"%>
<%@page import="osn.FileDecryptor"%>
<%@page import="java.io.File"%>
<%@page import="osn.ProjectProperties"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="osn.DataBase"%>
<%

    String tid = request.getParameter("tid");
    String owner = request.getParameter("owner");
    String secMsg = null;

    String key = request.getParameter("key");
    String filePath = null;
    try {
        DataBase dbfunc = new DataBase();
        dbfunc.createConnection();
        String queryz = "select * from fileuploads where tid in (" + tid + ")";
        //System.out.println("---------" + queryz);
        ResultSet rset = dbfunc.queryRecord(queryz);
        if (rset.next()) {
            filePath = rset.getString("filepath");
        }
        dbfunc.closeConnection();

        String ext = null;

        ext = ProjectProperties.escipherExt;
        File temp = new File(filePath.trim());
        String n = temp.getName().split("\\.")[0];
        String e = temp.getName().split("\\.")[1];
        File temp2 = new File(ProjectProperties.drive, "Temp_cache");
        if (!temp2.exists()) {
            temp2.mkdir();
        }
        temp2 = new File(temp2.getAbsolutePath(), temp.getName().replace(ext, ""));

        File dest = new File(temp.getAbsolutePath());
        String docFile = null;
        boolean proceed = false;
        String args[] = {dest.getAbsolutePath(), temp2.getAbsolutePath(), key.trim()};
        if (FileDecryptor.decode(args)) {
            if (temp2.exists()) {
                System.out.println("Decryption Succeded--" + temp2.getAbsolutePath());
                docFile = temp2.getAbsolutePath();
                proceed = true;
            } else {
                System.out.println("--Decryption Failed1--");
            }
        } else {
            System.out.println("--Decryption Failed2--");
        }

        if (proceed) {
            File tar = new File(docFile);
            String a[] = {"decrypt",tar.getAbsolutePath()};
            secMsg = Stego.decrypt(a);
            tar.delete();
        }

    } catch (Exception e) {
        out.println(e.toString());
    }
    out.println("<h1>Secret Message</h1>");
    out.println("<h1>" + secMsg + "</h1>");
    out.println("<img src='FileDownloader?tid=" + tid + "&owner=" + owner + "' />");
%>