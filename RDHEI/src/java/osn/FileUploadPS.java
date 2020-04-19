/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package osn;

import enh.BitFlipping;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.nio.file.attribute.BasicFileAttributes;
import java.nio.file.attribute.FileOwnerAttributeView;
import java.nio.file.attribute.UserPrincipal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import javax.servlet.Servlet;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;

/**
 *
 * @author Helias
 */
public class FileUploadPS extends HttpServlet implements Servlet {

    private static final long serialVersionUID = 2740693677625051632L;

    public FileUploadPS() {
        super();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        Map params = request.getParameterMap();
        Iterator ik = params.keySet().iterator();
        while (ik.hasNext()) {
            String key = (String) ik.next();
            String value = ((String[]) params.get(key))[0];
            System.out.println("<br />key : " + key + " value : " + value);
        }

        String filePath = "";
        String albumname = ProjectProperties.fileSharingKey();
        String tags = request.getParameter("msg");
        //String sharingKey = request.getParameter("tags");
        String opt = request.getParameter("tags");
        String sharingKey = ProjectProperties.getEncryptionHashedKey();

        PrintWriter out = response.getWriter();

        if (albumname == null) {
            out.println("No Appropriate Folder Name");
            return;
        }
        if (albumname.trim().length() == 0) {
            out.println("No Appropriate Folder Name");
            return;
        }

        HttpSession session = request.getSession();
        String email = (String) session.getAttribute("email");
        String siteType = (String) session.getAttribute("siteType");

        // create file upload factory and upload servlet
        FileItemFactory factory = new DiskFileItemFactory();
        ServletFileUpload upload = new ServletFileUpload(factory);

        // set file upload progress listener
        ContentUploadListener listener = new ContentUploadListener();
        session.setAttribute("LISTENER", listener);

        // upload servlet allows to set upload listener
        upload.setProgressListener(listener);

        List uploadedItems = null;
        FileItem fileItem = null;

        try {
            filePath = ProjectProperties.createImageRepository(siteType, albumname.trim());
            // iterate over all uploaded files
            uploadedItems = upload.parseRequest(request);

            Iterator i = uploadedItems.iterator();
            HashMap<String, String> hm = new HashMap<String, String>();
            int noOfImages = 0;
            String redirectPage = "";

            String uploadStatus = "";

            ArrayList<String> fname = new ArrayList<String>();
            ArrayList<String> fsize = new ArrayList<String>();
            ArrayList<String> fpath = new ArrayList<String>();

            while (i.hasNext()) {
                fileItem = (FileItem) i.next();

                if (fileItem.isFormField() == false) {
                    if (fileItem.getSize() > 0) {

                        File uploadedFile = null;
                        String myFullFileName = fileItem.getName(),
                                myFileName = "",
                                slashType = (myFullFileName.lastIndexOf("\\") > 0) ? "\\" : "/"; // Windows or UNIX
                        int startIndex = myFullFileName.lastIndexOf(slashType);

                        // Ignore the path and get the filename
                        myFileName = myFullFileName.substring(startIndex + 1, myFullFileName.length());

                        // Create new File object                        
                        uploadedFile = new File(filePath, myFileName.replace("'", ""));

                        // Write the uploaded file to the system
                        fileItem.write(uploadedFile);
                        boolean proceed = false;
                        String msg = "";
                        try {
                            if (opt.equals("1")) {
                                BufferedImage image = ImageIO.read(uploadedFile);                                
                                BitFlipping gc = new BitFlipping();
                                if (gc.getFlippedBitSets(image)) {                                    
                                    proceed = true;
                                }else{
                                    proceed = false;
                                    msg = ("Image Size For RDHEI are not Supported");
                                }
                            }
                            if (opt.equals("2")) {
                                BufferedImage image = ImageIO.read(uploadedFile);
                                int height = image.getHeight();
                                int width = image.getWidth();
                                proceed = true;
                            }
                        } catch (Exception ioe) {
                            ioe.printStackTrace();
                            proceed = false;
                            msg = ("Exception "+ioe.toString());
                        }

                        if (proceed) {
                            String path = uploadedFile.getAbsolutePath();
                            Path file = Paths.get(path);
                            System.out.println("Generated Hashed Key : " + sharingKey);

                            double bytes = uploadedFile.length();
                            double kilobytes = (bytes / 1024);

                            fname.add(uploadedFile.getName());
                            fsize.add("" + kilobytes);
                            fpath.add(uploadedFile.getAbsolutePath().replace("\\", "\\\\"));

                            noOfImages++;
                            uploadStatus += ("<br />" + uploadedFile.getName() + "--->Upload Success...");
                        } else {
                            uploadedFile.delete();
                            uploadStatus += ("<br />" + uploadedFile.getName() + "--->"+msg);
                        }   

                    }
                }
            }

            DataBase dbfunc = new DataBase();
            dbfunc.createConnection();
            for (int k = 0; k < fname.size(); k++) {
                //data secure
                File uf = new File(fpath.get(k));
                File parent = uf.getParentFile();
                File target = new File(parent, "enc_" + uf.getName());
                File content = new File(parent, "content.txt");
                String path = content.getAbsolutePath();
                Files.write(Paths.get(path), tags.getBytes(), StandardOpenOption.CREATE);
                String cmd = "encrypt";
                String inputImage = uf.getAbsolutePath();
                String outputImage = target.getAbsolutePath();
                String secret = content.getAbsolutePath();
                String a[] = {cmd, inputImage, outputImage, secret};
                //System.out.println(Arrays.toString(a)+"-------------"+curFile.exists());
                if (Stego.encrypt(a)) {
                    System.out.println("Image Secured");
                }
                content.delete();
                uf.delete();
                uf = target;

                String outFile = "";
                outFile = uf.getAbsolutePath();
                String args[] = {uf.getAbsolutePath(), sharingKey, outFile, ProjectProperties.escipherExt};
                System.out.println(Arrays.toString(args));
                if (FileEncryptor.secureContent(args)) {
                    System.out.println("File Encrypted Successfully...");
                    uf.delete();
                }
                //

                String query = "insert into fileuploads(`email`,`album` ,`filename` ,`filesize` ,`filepath` ,`filetype` ,`tags`,`fkey`,`uploaddate`,`visible`)";
                query += " values ('" + email.trim() + "','" + albumname + "','" + uf.getName() + "' ,'" + fsize.get(k) + "' ,'" + uf.getAbsolutePath().replace("\\", "\\\\") + ProjectProperties.escipherExt + "' ,'File' ,'" + tags + "','" + sharingKey + "',now(),'N')";
                System.out.println(query);
                dbfunc.updateRecord(query);
            }
            dbfunc.closeConnection();

            uploadStatus += ("<br />Total Files Uploaded for Directory('" + albumname + "') are :" + noOfImages);
            uploadStatus += ("<br /><a href='photos.jsp'>Reload</a>&nbsp;&nbsp;<a href='welcome.jsp'>Back</a>");

            out.println(uploadStatus);

        } catch (FileUploadException e) {
            e.printStackTrace();
            out.println(e.toString());
        } catch (Exception e) {
            e.printStackTrace();
            out.println(e.toString());
        }
    }
}
