/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package osn;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.math.BigInteger;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.util.Arrays;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author user
 */
public class FileDownloader extends HttpServlet {

    private boolean proceed;
    private String docFile;

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");

        try {

            HttpSession session = request.getSession(false);

            String username = (String) session.getAttribute("email");
            String tid = request.getParameter("tid");

            String owner = request.getParameter("owner");
            if (owner == null) {
                DataBase dbfunc = new DataBase();
                dbfunc.createConnection();

                String queryz = "select * from fileuploads where tid in (select fid from acp where recieverid='" + username + "' and fid=" + tid + ")";
                System.out.println("---------" + queryz);
                ResultSet rset = dbfunc.queryRecord(queryz);
                ResultSetMetaData rsmd = rset.getMetaData();
                int numColumns = rsmd.getColumnCount();

                String key = null;
                String path = null;
                String sys = null;

                boolean found = rset.next();
                if (found) {
                    rset.last();
                    int count = rset.getRow();
                    int row = 0;

                    rset.beforeFirst();
                    if (rset.next()) {
                        path = rset.getString("filepath").trim();
                        key = rset.getString("fkey").trim();
                        sys = rset.getString("tags").trim();
                    }

                } else {
                    IOException e = new IOException();
                    throw e;
                }

                dbfunc.closeConnection();

                String ext = null;                
                ext = ProjectProperties.escipherExt;
                

                File temp = new File(path.trim());
                String n = temp.getName().split("\\.")[0];
                String e = temp.getName().split("\\.")[1];
                File temp2 = new File(ProjectProperties.drive, "Temp_cache");
                if (!temp2.exists()) {
                    temp2.mkdir();
                }
                temp2 = new File(temp2.getAbsolutePath(), temp.getName().replace(ext, ""));

                File dest = new File(temp.getAbsolutePath());
                String args[] = {dest.getAbsolutePath(), temp2.getAbsolutePath(), key.trim()};
                if (FileDecryptor.decode(args)) {
                    if (dest.exists()) {
                        System.out.println("--Decryption Succeded--" + dest.getAbsolutePath());
                        docFile = temp2.getAbsolutePath();
                        proceed = true;
                    } else {
                        System.out.println("--Decryption Failed1--");
                    }
                } else {
                    // TODO Auto-generated catch block
                    System.out.println("--Decryption Failed2--");
                }

                proceed = true;

                if (proceed) {
                    URL pdfDir = null;
                    URLConnection urlConn = null;
                    ServletOutputStream stream = null;
                    BufferedInputStream buf = null;
                    try {

                        pdfDir = new URL("file:///" + docFile);

                    } catch (MalformedURLException mue) {
                        throw new ServletException(mue.getMessage());
                    }
                    try {

                        stream = response.getOutputStream();
                        File fz = new File(docFile);
                        //set response headers
                        response.setContentType("application/octet-stream");
                        response.addHeader("Content-Disposition", "attachment; filename=\"" + fz.getName().replaceAll(" ", "-").toUpperCase() + "\"");

                        urlConn = pdfDir.openConnection();
                        response.setContentLength((int) urlConn.getContentLength());

                        buf = new BufferedInputStream(urlConn.getInputStream());
                        int readBytes = 0;

                        //read from the file; write to the ServletOutputStream
                        while ((readBytes = buf.read()) != -1) {
                            stream.write(readBytes);
                        }

                        stream.close();
                    } catch (IOException ioe) {
                        response.sendRedirect("download.jsp?msg=Failed to Create Document : " + ioe.toString());
                        return;
                    }
                }
            } else {
                DataBase dbfunc = new DataBase();
                dbfunc.createConnection();

                String queryz = "select * from fileuploads where tid in (" + tid + ")";
                System.out.println("---------" + queryz);
                ResultSet rset = dbfunc.queryRecord(queryz);
                ResultSetMetaData rsmd = rset.getMetaData();
                int numColumns = rsmd.getColumnCount();

                String key = null;
                String path = null;
                String sys = null;

                boolean found = rset.next();
                if (found) {
                    rset.last();
                    int count = rset.getRow();
                    int row = 0;

                    rset.beforeFirst();
                    if (rset.next()) {
                        path = rset.getString("filepath").trim();
                        key = rset.getString("fkey").trim();
                        sys = rset.getString("tags").trim();
                    }

                } else {
                    IOException e = new IOException();
                    throw e;
                }

                dbfunc.closeConnection();

                String ext = null;

                ext = ProjectProperties.escipherExt;
                File temp = new File(path.trim());
                String n = temp.getName().split("\\.")[0];
                String e = temp.getName().split("\\.")[1];
                File temp2 = new File(ProjectProperties.drive, "Temp_cache");
                if (!temp2.exists()) {
                    temp2.mkdir();
                }
                temp2 = new File(temp2.getAbsolutePath(), temp.getName().replace(ext, ""));

                File dest = new File(temp.getAbsolutePath());
                String args[] = {dest.getAbsolutePath(), temp2.getAbsolutePath(), key.trim()};
                if (FileDecryptor.decode(args)) {
                    if (dest.exists()) {
                        System.out.println("--Decryption Succeded--" + dest.getAbsolutePath());
                        docFile = temp2.getAbsolutePath();
                        proceed = true;
                    } else {
                        System.out.println("--Decryption Failed1--");
                    }
                } else {
                    // TODO Auto-generated catch block
                    System.out.println("--Decryption Failed2--");
                }

                proceed = true;

                if (proceed) {
                    URL pdfDir = null;
                    URLConnection urlConn = null;
                    ServletOutputStream stream = null;
                    BufferedInputStream buf = null;
                    try {

                        pdfDir = new URL("file:///" + docFile);

                    } catch (MalformedURLException mue) {
                        throw new ServletException(mue.getMessage());
                    }
                    try {

                        stream = response.getOutputStream();
                        File fz = new File(docFile);
                        //set response headers
                        response.setContentType("application/octet-stream");
                        response.addHeader("Content-Disposition", "attachment; filename=\"" + fz.getName().replaceAll(" ", "-").toUpperCase() + "\"");

                        urlConn = pdfDir.openConnection();
                        response.setContentLength((int) urlConn.getContentLength());

                        buf = new BufferedInputStream(urlConn.getInputStream());
                        int readBytes = 0;

                        //read from the file; write to the ServletOutputStream
                        while ((readBytes = buf.read()) != -1) {
                            stream.write(readBytes);
                        }

                        stream.close();
                    } catch (IOException ioe) {
                        response.sendRedirect("download.jsp?msg=Failed to Create Document : " + ioe.toString());
                        return;
                    }
                }
            }

        } catch (Exception ex) {
            System.out.println("Exception = " + ex.toString());
            ex.printStackTrace();
            response.sendRedirect("welcome.jsp?msg=Exception = " + ex.toString());
            return;
        } finally {
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>
}
