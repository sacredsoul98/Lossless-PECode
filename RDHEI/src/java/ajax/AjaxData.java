/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package ajax;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URL;
import java.net.URLEncoder;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import osn.DataBase;
import osn.ProjectProperties;

/**
 *
 * @author 108
 */
public class AjaxData extends HttpServlet {

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

            String operation = request.getParameter("operation");         
           
            if (operation.equals("4")) {
                String tid = request.getParameter("tid");
                String list = request.getParameter("list");
                String access = request.getParameter("access");
                String username = request.getParameter("username");   
                String fkey = ProjectProperties.getCurrentFileSharingKey(tid);
                
                DataBase jdbc = new DataBase();
                jdbc.createConnection();

                String query1 = "";
                System.out.println("---------------------"+access);
                if(access.equals("yes"))
                {
                    int share = 1;
                    String parts[] = list.split(",");
                    for(int i=0;i<parts.length;i++){
                        query1 = "select * from acp where fid="+tid+" and ownerid='"+username+"' and recieverid='"+parts[i]+"'";
                        System.err.println("--1-"+query1);
                        ResultSet rs = jdbc.queryRecord(query1);
                        if(rs.next()){
                            String temp = "update acp set isshared="+share+" where fid="+tid+" and ownerid='"+username+"' and recieverid='"+parts[i]+"'";
                            System.err.println("--1-"+temp);
                            jdbc.updateRecord(temp);                            
                        }else{                            
                            String temp = "insert into acp(fid,ownerid,recieverid,isshared,shareddate,fkey) values("+tid+",'"+username+"','"+parts[i]+"',"+share+",now(),'"+fkey+"')";
                            System.err.println("---"+temp);
                            jdbc.updateRecord(temp);
                        }                        
                    }
                }
                if(access.equals("no"))
                {
                    int share = 0;
                    String parts[] = list.split(",");
                    for(int i=0;i<parts.length;i++){
                        query1 = "select * from acp where fid="+tid+" and ownerid='"+username+"' and recieverid='"+parts[i]+"'";
                        System.err.println("--0-"+query1);
                        ResultSet rs = jdbc.queryRecord(query1);
                        if(rs.next()){
                            String temp = "update acp set isshared="+share+" where fid="+tid+" and ownerid='"+username+"' and recieverid='"+parts[i]+"'";
                            System.err.println("--0-"+temp);
                            jdbc.updateRecord(temp);                            
                        }else{                            
                            String temp = "insert into acp(fid,ownerid,recieverid,isshared,shareddate,fkey) values("+tid+",'"+username+"','"+parts[i]+"',"+share+",now(),,'"+fkey+"')";
                            System.err.println("---"+temp);
                            jdbc.updateRecord(temp);
                        }                        
                    }
                }
                
                out.println("Permissions Assigned...");                
                jdbc.closeConnection();
            }           

        } catch (Exception ex) {
            out.println(ex.toString());
            ex.printStackTrace();
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
