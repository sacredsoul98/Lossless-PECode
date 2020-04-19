/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package osn;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.net.URL;
import java.net.UnknownHostException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Enumeration;

/**
 *
 * @author
 */
public class ProjectProperties {

    public static String projectTitle = "Lossless and Reversible Data Hiding in Encrypted Images with Public Key Cryptography";
    public static String drive = "E:/";
    public static String siteName = "RDHEI_Storage";
    public static String projectName = "RDHEI";
    public static String projectUrl = "http://" + getMyIp() + ":8084/" + projectName + "/";
    public static String picRepo = drive + siteName + "/";

    public static String sharingUrl = "AjaxData?operation=4&";
    public static String escipherExt = ".sec";

    public static String getdbDriver() {
        String myUrl = "com.mysql.jdbc.Driver";
        return myUrl.trim();
    }

    public static String getDbUrl() {
        String myUrl = "jdbc:mysql://localhost/steg";
        return myUrl;
    }

    public static String getDbUser() {
        String myUrl = "root";
        return myUrl;
    }

    public static String getDbPass() {
        String myUrl = "123456";
        return myUrl;
    }

    public static String genRandIndex() {
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
        return randBatchFileName;
    }

    public static String getEncryptionHashedKey() {
        ArrayList<String> numbers = new ArrayList<String>();
        ArrayList<String> characters = new ArrayList<String>();

        for (int i = 0; i < 9; i++) {
            numbers.add(Integer.toString(i + 1));
        }
        char ch;

        for (ch = 'a'; ch <= 'f'; ch++) {
            characters.add(Character.toString(ch));
        }
        for (ch = 'A'; ch <= 'F'; ch++) {
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
        return randBatchFileName;
    }

    public static String fileSharingKey() {
        ArrayList<String> numbers = new ArrayList<String>();
        ArrayList<String> characters = new ArrayList<String>();

        for (int i = 0; i < 9; i++) {
            numbers.add(Integer.toString(i + 1));
        }
        char ch;

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
        return randBatchFileName;
    }

    public static String getPhotoResources() {
        File f = new File(picRepo);
        if (f.exists() && f.isDirectory()) {
            return f.getAbsolutePath();
        } else {
            f.mkdirs();
            return f.getAbsolutePath();
        }
    }

    public static String getMyIp() {
        ArrayList<String> ipAddress = new ArrayList<String>();
        try {
            Enumeration e = NetworkInterface.getNetworkInterfaces();
            while (e.hasMoreElements()) {
                NetworkInterface n = (NetworkInterface) e.nextElement();
                Enumeration ee = n.getInetAddresses();
                while (ee.hasMoreElements()) {
                    InetAddress i = (InetAddress) ee.nextElement();
                    //System.out.println(i.getHostAddress());
                    ipAddress.add(i.getHostAddress());
                }
            }

            boolean realLocalIp = false;
            int realLocalIndex = -1;
            boolean localIp = false;
            int localIndex = -1;
            boolean generalLocalIp = false;
            int generalIndex = -1;

            for (int i = 0; i < ipAddress.size(); i++) {
                if (ipAddress.get(i).contains(":")) {
                    continue;
                }
                if (ipAddress.get(i).equals("127.0.0.1") || ipAddress.get(i).equals("localhost")) {
                    localIp = true;
                    localIndex = i;
                } else if (ipAddress.get(i).equals("192.168.56.1")) {
                    generalLocalIp = true;
                    generalIndex = i;
                } else {
                    realLocalIp = true;
                    realLocalIndex = i;
                }
            }

            if (realLocalIp) {
                return ipAddress.get(realLocalIndex);
            }
            if (generalLocalIp) {
                return ipAddress.get(generalIndex);
            }
            if (localIp) {
                return ipAddress.get(localIndex);
            }

        } catch (SocketException ex) {
            System.err.println("Exception : " + ex.toString());
        }
        return null;
    }

    public static String USER_AGENT = "Mozilla/5.0";

    // HTTP GET request
    public static String sendGet(String url) throws Exception {
        URL obj = new URL(url);
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();

        // optional default is GET
        con.setRequestMethod("GET");

        //add request header
        con.setRequestProperty("User-Agent", USER_AGENT);

        int responseCode = con.getResponseCode();
        System.out.println("\nSending 'GET' request to URL : " + url);
        System.out.println("Response Code : " + responseCode);

        BufferedReader in = new BufferedReader(
                new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuffer response = new StringBuffer();

        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();

        //print result
        System.out.println(response.toString());
        return response.toString();
    }

    public static String createImageRepository(String userPath, String subDir) {
        File f = new File(userPath, subDir);
        if (!f.exists()) {
            f.mkdirs();
        }
        return f.getAbsolutePath();
    }

    public static String getCurrentFileSharingKey(String tid) throws Exception {
        DataBase dbfunc = new DataBase();
        dbfunc.createConnection();
        String query = "select fkey from fileuploads where tid=" + tid;
        System.out.println(query);
        ResultSet rsett = dbfunc.queryRecord(query);
        boolean found = rsett.next();
        if (found) {
            return rsett.getString("fkey");
        } else {
            return "none";
        }
    }

    public static String isCurrentFileShared(String tid, String reciever) throws Exception {
        DataBase dbfunc = new DataBase();
        dbfunc.createConnection();
        String query = "select fkey from acp where fid=" + tid + " and recieverid='" + reciever + "' and isshared=1";
        System.out.println(query);
        ResultSet rsett = dbfunc.queryRecord(query);
        boolean found = rsett.next();
        if (found) {
            return "YES$$$" + rsett.getString("fkey");
        } else {
            return "NO";
        }
    }
    public static String cypher = "PBEWithMD5AndDES";

    public static String genKey(String cypher) {
        ArrayList<String> numbers = new ArrayList<String>();
        ArrayList<String> characters = new ArrayList<String>();

        for (int i = 0; i < 9; i++) {
            numbers.add(Integer.toString(i + 1));
        }
        char ch;

        for (ch = 'A'; ch <= 'F'; ch++) {
            characters.add(Character.toString(ch));
        }

        for (ch = 'a'; ch <= 'f'; ch++) {
            characters.add(Character.toString(ch));
        }

        Collections.shuffle(numbers);
        Collections.shuffle(characters);

        String randBatchFileName = "";

        for (int j = 0; j < 2; j++) {
            randBatchFileName += characters.get(j);
        }
        for (int j = 0; j < 2; j++) {
            randBatchFileName += numbers.get(j);
        }

        Collections.shuffle(numbers);
        Collections.shuffle(characters);

        for (int j = 0; j < 2; j++) {
            randBatchFileName += characters.get(j);
        }
        for (int j = 0; j < 2; j++) {
            randBatchFileName += numbers.get(j);
        }
        return randBatchFileName;
    }
}
