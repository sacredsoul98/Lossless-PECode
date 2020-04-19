/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package osn;

import java.io.File;
import java.net.InetAddress;
import java.net.UnknownHostException;
import javax.servlet.ServletContext;
import utility.Wap;

/**
 *
 * @author India
 */
public class Config {

    public static String getMyIp() {
        InetAddress ipa;
        String ip = "";
        try {

            ipa = InetAddress.getLocalHost();
            ip = ipa.getHostAddress();
            //System.out.println("Current IP address : " + ip);

        } catch (UnknownHostException e) {
            return e.toString();
        }
        return ip;
    }    

    public static String contextPath = "";

    public static void setContext(ServletContext context) {
        String root = context.getRealPath("");
        File rootDir = new File(root);
        contextPath = rootDir.getAbsolutePath().replace("build\\web", "");
    }
    
    public static boolean getServerStatus(){
        return Wap.isAccessValid(Config.contextPath);
    }
}
