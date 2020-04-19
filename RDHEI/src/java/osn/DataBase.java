/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package osn;

/**
 *
 * @author Helias
 */
import java.sql.*;

public class DataBase {

    private Connection con;
    private Statement stat;
    private ResultSet result;

    public void createConnection() {
        try {
            Class.forName(ProjectProperties.getdbDriver());            
            con = DriverManager.getConnection(ProjectProperties.getDbUrl(), ProjectProperties.getDbUser(), ProjectProperties.getDbPass());            
        } catch (Exception ex) {
            System.out.println("----"+ex.toString());
        }
    }  
    
    public Connection createConnectionObj() {
        try {
            Class.forName(ProjectProperties.getdbDriver());              
            con = DriverManager.getConnection(ProjectProperties.getDbUrl(), ProjectProperties.getDbUser(), ProjectProperties.getDbPass());            
            return con;
        } catch (Exception ex) {
            return null;
        }
    }

    public void createConnection(String driver, String url) {
        try {
            Class.forName(driver);
            con = DriverManager.getConnection(url);
        } catch (Exception ex) {
        }
    }

    public void createConnection(String driver, String dataSource, String userName, String password) {
        try {
            Class.forName(driver);
            con = DriverManager.getConnection(dataSource, userName, password);
        } catch (Exception ex) {
        }
    }

    public void closeConnection() {
        try {
            con.close();
        } catch (Exception ex) {
        }
    }

    public boolean updateRecord(String strSQL) throws SQLException {
       
            stat = con.createStatement();

            int status = stat.executeUpdate(strSQL);
            if (status == 1) {
                return true;
            } else {
                return false;
            }
        
    }

    public ResultSet queryRecord(String strSQL) throws SQLException {        
            stat = con.createStatement();
            result = stat.executeQuery(strSQL);
            return result;
        
    }    
}