/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package osn;

import java.awt.image.BufferedImage;
import java.io.BufferedInputStream;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.activation.MimetypesFileTypeMap;
import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Helias
 */
public class ImageServlet extends HttpServlet {

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
        try {
            String email = request.getParameter("email");
            String option = request.getParameter("option");
            //System.out.println("--------------"+option);     

            if (option.trim().equals("21")) {
                String tid = request.getParameter("tid");
                String query = "select * from fileuploads where tid=" + tid.trim();
                System.out.println("-" + query);
                DataBase dbfunc = new DataBase();
                dbfunc.createConnection();

                ResultSet rsett = dbfunc.queryRecord(query);
                boolean found = rsett.next();

                if (found) {
                    String owner = rsett.getString("email");
                    String pic = rsett.getString("filepath");
                    String picStatus = rsett.getString("visible");
                    //System.out.println(picStatus+"-----"+found+"----------"+query);

                    File f = new File(pic);
                    String ext = f.getName().split("\\.")[1].trim();

                    MimetypesFileTypeMap mimeTypesMap = new MimetypesFileTypeMap();

                    // only by file name
                    String mimeType = mimeTypesMap.getContentType(f.getName());
                    //System.out.println("-----------------"+mimeType);
                    response.setContentType(mimeType);
                    response.addHeader("Content-Disposition", "attachment; filename=" + f.getName().replaceAll(" ", "-"));

                    String pathToWeb = getServletContext().getRealPath(File.separator);

                    BufferedImage bi = ImageIO.read(f);
                    OutputStream outz = response.getOutputStream();
                    ImageIO.write(bi, ext, outz);
                    outz.close();

                }

                dbfunc.closeConnection();
            }
            
            if (option.trim().equals("22")) {
                String tid = request.getParameter("tid");
                String query = "select * from fileuploadsps where tid=" + tid.trim();
                System.out.println("-" + query);
                DataBase dbfunc = new DataBase();
                dbfunc.createConnection();

                ResultSet rsett = dbfunc.queryRecord(query);
                boolean found = rsett.next();

                if (found) {
                    String owner = rsett.getString("email");
                    String pic = rsett.getString("filepath");
                    String picStatus = rsett.getString("visible");
                    //System.out.println(picStatus+"-----"+found+"----------"+query);

                    File f = new File(pic);
                    String ext = f.getName().split("\\.")[1].trim();

                    MimetypesFileTypeMap mimeTypesMap = new MimetypesFileTypeMap();

                    // only by file name
                    String mimeType = mimeTypesMap.getContentType(f.getName());
                    //System.out.println("-----------------"+mimeType);
                    response.setContentType(mimeType);
                    response.addHeader("Content-Disposition", "attachment; filename=" + f.getName().replaceAll(" ", "-"));

                    String pathToWeb = getServletContext().getRealPath(File.separator);

                    BufferedImage bi = ImageIO.read(f);
                    OutputStream outz = response.getOutputStream();
                    ImageIO.write(bi, ext, outz);
                    outz.close();

                }

                dbfunc.closeConnection();
            }

        } catch (Exception ex) {
            Logger.getLogger(ImageServlet.class.getName()).log(Level.SEVERE, null, ex);
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
