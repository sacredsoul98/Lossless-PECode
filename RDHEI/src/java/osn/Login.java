/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package osn;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.commons.codec.digest.DigestUtils;

/**
 *
 * @author
 */
public class Login extends HttpServlet {

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
            String email = request.getParameter("email");
            String password = request.getParameter("password");

            DataBase dbfunc = new DataBase();
            dbfunc.createConnection();

            password = DigestUtils.md5Hex(password);

            String query = "select * from users where email='" + email.trim() + "' and password='" + password.trim() + "'";
            System.out.println(query);
            ResultSet rsett = dbfunc.queryRecord(query);
            boolean found = rsett.next();

            if (found) {
                if (rsett.getString("usertype").trim().equals("0")) {
                    //Obtain the session object, create a new session if doesn't exist
                    HttpSession session = request.getSession(true);
                    session.setAttribute("id", rsett.getString("id").trim());
                    session.setAttribute("email", rsett.getString("email").trim());
                    session.setAttribute("name", rsett.getString("firstname").trim());
                    session.setAttribute("usertype", rsett.getString("usertype").trim());
                    session.setAttribute("siteType", rsett.getString("siteType").trim());
                    //session.setMaxInactiveInterval(600);                    
                    response.sendRedirect("admin.jsp");
                }
                if (rsett.getString("usertype").trim().equals("1")) {
                    //Obtain the session object, create a new session if doesn't exist
                    HttpSession session = request.getSession(true);
                    session.setAttribute("id", rsett.getString("id").trim());
                    session.setAttribute("email", rsett.getString("email").trim());
                    session.setAttribute("name", rsett.getString("firstname").trim());
                    session.setAttribute("usertype", rsett.getString("usertype").trim());
                    session.setAttribute("siteType", rsett.getString("siteType").trim());
                    response.sendRedirect("welcome.jsp");
                }
            } else {
                response.sendRedirect("index.jsp?msg=" + "<br><b>Invalid user id. Plz Register.");
                return;
            }
        } catch (SQLException ex) {
            Logger.getLogger(Login.class.getName()).log(Level.SEVERE, null, ex);
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
