/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package osn;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.codec.digest.DigestUtils;

/**
 *
 * @author Helias
 */
public class Registration extends HttpServlet {

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

            String email = request.getParameter("email");
            
            String fn = request.getParameter("firstname");
            String sn = request.getParameter("sweetname");

            String pw = request.getParameter("pw");
            String cpw = request.getParameter("cpw");

            if (pw != null && cpw != null) {
                if (!pw.trim().equals(cpw.trim())) {
                    response.sendRedirect("index.jsp?msg=Passwords Mismatch!");
                    return;
                }
            } else {
                response.sendRedirect("index.jsp?msg=Please Provide Passwords");
                return;
            }
            
            String store = email.split("@")[0].trim();

            //define ArrayList to hold Integer objects
            ArrayList<String> numbers = new ArrayList<String>();
            ArrayList<String> characters = new ArrayList<String>();

            for (int i = 0; i < 9; i++) {
                numbers.add(Integer.toString(i + 1));
            }
            char ch;

            for (ch = 'a'; ch <= 'z'; ch++) {
                characters.add(Character.toString(ch));
            }
            for (ch = 'A'; ch <= 'Z'; ch++) {
                characters.add(Character.toString(ch));
            }

            Collections.shuffle(numbers);
            Collections.shuffle(characters);

            String randBatchFileName = "";

            for (int j = 0; j < 3; j++) {
                randBatchFileName += characters.get(j);
            }
            for (int j = 0; j < 3; j++) {
                randBatchFileName += numbers.get(j);
            }

            store = store + "_" + randBatchFileName;

            File f = new File(ProjectProperties.getPhotoResources() , store.trim());            

            if (!f.exists()) {
                f.mkdirs();
            }           

            pw = DigestUtils.md5Hex(pw);
            String query = "insert into users(`email`,`password`,`firstname`,`sweetname`,`dateofjoin`,`siteType`) values('" + email + "','" + pw + "','" + fn + "','" + sn + "',now(),'" + f.getAbsolutePath().replace("\\", "\\\\") + "')";

            DataBase dbfunc = new DataBase();
            dbfunc.createConnection();
            System.out.println(query);
            dbfunc.updateRecord(query);
            dbfunc.closeConnection();

            response.sendRedirect("index.jsp?msg=User(" + email.trim() + ") Account Created!!!");

        } catch (Exception ex) {
            Logger.getLogger(Registration.class.getName()).log(Level.SEVERE, null, ex);
            response.sendRedirect("index.jsp?msg=" + ex.toString());
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
