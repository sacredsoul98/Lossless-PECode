/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ajax;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import osn.DataBase;

/**
 *
 * @author 108
 */
public class AjaxImageResults extends HttpServlet {

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
        PrintWriter out = response.getWriter();
        try {

            String s = request.getParameter("q");
            String original = s;
            s = s.toLowerCase();
            //System.out.println("--------" + s);
            try {
                DataBase obj = new DataBase();
                String query = "select * from fileuploads where tags LIKE '%" + s + "%' and visible='Y'";
                obj.createConnection();
                ResultSet rset = obj.queryRecord(query);

                ResultSetMetaData rsmd = rset.getMetaData();
                int numColumns = rsmd.getColumnCount();

                String resultHtml = "";
                
                boolean found = rset.next();

                if (found) {
                    rset.last();
                    int count = rset.getRow();
                    int row = 0;
                    int counter = 0;
                    rset.beforeFirst();
                    while (rset.next()) {
                        row++;
                        counter++;
                        if (row == 1) {
                            resultHtml += "<div class=\"section group\">\n";
                        }
                        resultHtml += "<div class=\"col_1_of_about-box span_1_of_about-box\">\n<a class=\"popup-with-zoom-anim\" href=\"#small-dialog" + (counter + 1) + "\"><span class=\"rollover\"> </span><img src=\"ImageDownloader?pid=" + rset.getString(1) + "\" title=\"continue\" alt=\"\"/></a>\n";
                        resultHtml += "<div id=\"small-dialog" + (counter + 1) + "\" class=\"mfp-hide\">\n<div class=\"pop_up\"><img src=\"ImageDownloader?pid=" + rset.getString(1) + "\" alt=\"\"/>\n<div class=\"mfp-title\">Name:" + rset.getString("filename") + "</div>\n</div>\n</div>\n";
                        resultHtml += "<div class=\"g_desc\">\n<div class=\"g_1\">\n<h4 class=\"no\">\n<a href=\"#\">Size:" + rset.getString("filesize").split("\\.")[0] + "KB</a></h4>\n<p class=\"g_2\"><a href=\"#\">Album:" + rset.getString("album") + "</a></p>\n</div>\n<span class=\"likes\"><a href=\"#\"><img src=\"images/heart.png\" title=\"likes\" alt=\"\">0</a></span>\n<div class=\"clear\"></div>\n</div>\n</div>\n";
                        if (row == 3) {
                            resultHtml += "</div>\n";
                            row = 0;
                        }
                    }
                } else {
                    resultHtml = "<font color='red' size='7'>No Images For " + s + "</font>";
                }
                
                out.println(resultHtml);
                obj.closeConnection();

            } catch (Exception ex) {
                out.println("Exception:" + ex.toString());
            }

        } finally {
            out.close();
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
