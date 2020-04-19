/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package osn;

import com.mysql.jdbc.exceptions.jdbc4.MySQLIntegrityConstraintViolationException;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Iterator;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author Helias
 */
public class SaveTaggedInformation extends HttpServlet {

    /**
     * Processes requests for both HTTP
     * <code>GET</code> and
     * <code>POST</code> methods.
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
            HttpSession session = request.getSession(false);
            String email = (String) session.getAttribute("email");

            String tid = request.getParameter("pid");
            String title = request.getParameter("title");
            String friendName = title.split("-")[0].trim();
            String friendMail = title.split("-")[1].trim();
            String x = request.getParameter("x");
            String y = request.getParameter("y");
            String h = request.getParameter("h");
            String w = request.getParameter("w");

            if (email.trim().equals(friendMail.trim())) {
                String query = "insert into taginfo(tid,email,title,friendName,friendMail,x,y,h,w,uploaddate,status) values(" + tid + ",'" + email + "','" + title + "','" + friendName + "','" + friendMail + "','" + x + "','" + y + "','" + h + "','" + w + "',now(),'Y')";
                String query2= "insert into notifications(`email`,`notification`,`activity`,`publishDate`,siteType) values('" + email + "','User(" + email + ") has Tagged Themselves.','TagPic:" + tid + "',now(),'"+ProjectProperties.siteName+"')";
                DataBase dbfunc = new DataBase();
                dbfunc.createConnection();
                System.out.println(query);
                dbfunc.updateRecord(query);
                System.out.println(query2);
                dbfunc.updateRecord(query2);
                dbfunc.closeConnection();

                out.println("<font color='white'>You Are Added To Your Own Picture...</font>");
            } else {
                String query = "insert into taginfo(tid,email,title,friendName,friendMail,x,y,h,w,uploaddate) values(" + tid + ",'" + email + "','" + title + "','" + friendName + "','" + friendMail + "','" + x + "','" + y + "','" + h + "','" + w + "',now())";
                //String query2= "insert into notifications(`email`,`notification`,`activity`,`publishDate`,siteType) values('" + friendMail + "','User(" + email + ") has Tagged Friend with (" + friendMail + ")','New PhotoTag request by " + email + "',now(),'"+ProjectProperties.siteName+"')";


                DataBase dbfunc = new DataBase();
                dbfunc.createConnection();
                System.out.println(query);
                dbfunc.updateRecord(query);
                //System.out.println(query2);
                //dbfunc.updateRecord(query2);
                dbfunc.closeConnection();



                out.println("<font color='white'>Message Has Been Sent To(" + friendMail + ") For Confirmation!!!</font>");
            }
        } catch (MySQLIntegrityConstraintViolationException e) {
            out.println("<font color='red'>Error: User Already Tagged</font>");
        } catch (Exception e) {
            out.println("<font color='red'>Exception : " + e.toString() + "</font>");
        } finally {
            out.close();
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP
     * <code>GET</code> method.
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
     * Handles the HTTP
     * <code>POST</code> method.
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
