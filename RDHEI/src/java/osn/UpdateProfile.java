/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package osn;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author
 */
public class UpdateProfile extends HttpServlet {

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
            String submit = request.getParameter("submit");
            if (submit.trim().equals("Save")) {

                String email = request.getParameter("email");
                email = validateInput(email);
                String work = request.getParameter("work");
                work = validateInput(work);

                String UGCOURSE = request.getParameter("UGCOURSE");
                UGCOURSE = validateInput(UGCOURSE);

                String PGCOURSE = request.getParameter("PGCOURSE");
                PGCOURSE = validateInput(PGCOURSE);

                String PPGCOURSE = request.getParameter("PPGCOURSE");
                PPGCOURSE = validateInput(PPGCOURSE);

                String edu = "[" + UGCOURSE + "]" + "[" + PGCOURSE + "]" + "[" + PPGCOURSE + "]";

                String relationship = request.getParameter("relationship");
                relationship = validateInput(relationship);
                String familyMembers = request.getParameter("familyMembers");
                familyMembers = validateInput(familyMembers);
                String aboutme = request.getParameter("aboutme");
                aboutme = validateInput(aboutme);
                String quotations = request.getParameter("quotations");
                quotations = validateInput(quotations);
                String movies = request.getParameter("movies");
                movies = validateInput(movies);
                String tvshows = request.getParameter("tvshows");
                tvshows = validateInput(tvshows);
                String singer = request.getParameter("singer");
                singer = validateInput(singer);
                String book = request.getParameter("book");
                book = validateInput(book);
                String player = request.getParameter("player");
                player = validateInput(player);
                String city = request.getParameter("city");
                city = validateInput(city);
                String phone = request.getParameter("phone");
                phone = validateInput(phone);
                String address = request.getParameter("address");
                address = validateInput(address);                

                String query1 = "insert into profiles(`email`,`work`,`education`,`relationship`,`familyMembers`,`aboutMe`,`quotations`,`movies`,`tvshows`,`singer`,`book`,`player`,`cityOfLiving`,`phone`,`address`,`siteType`) ";
                query1 += " values('" + email + "','" + work + "','" + edu + "','" + relationship + "','" + familyMembers + "','" + aboutme + "','" + quotations + "','" + movies + "','" + tvshows + "','" + singer + "','" + book + "','" + player + "','" + city + "','" + phone + "','" + address + "','"+ProjectProperties.siteName+"')";
                
                String query3 = "insert into notifications(`email`,`notification`,`activity`,`publishDate`,`siteType`) values('" + email + "','User(" + email + ") Updated Their Profile" + "','New Profile Update',now(),'"+ProjectProperties.siteName+"')";

                DataBase dbfunc = new DataBase();
                dbfunc.createConnection();
                System.out.println(query1);
                dbfunc.updateRecord(query1);                
                dbfunc.updateRecord(query3);                

                response.sendRedirect("profileSettings.jsp?msg=Profile Created...");

            }
        } catch (SQLException ex) {
            Logger.getLogger(UpdateProfile.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            out.close();
        }
    }

    private String validateInput(String value) {
        String defaultVal = "";
        if (value == null) {
            defaultVal = "None";
        } else if (value.trim().length() == 0) {
            defaultVal = "None";
        } else if (value.trim().contains("Select")) {
            defaultVal = "None";
        } else {
            defaultVal = value;
        }
        return defaultVal;
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
