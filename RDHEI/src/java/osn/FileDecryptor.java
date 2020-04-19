package osn;
 
import java.io.*;
import java.security.*;
import javax.crypto.*;
import javax.crypto.spec.*;
import java.util.*;
 
public class FileDecryptor
{
    private static String filename;
    private static String password;
    private static FileInputStream inFile;
    private static FileOutputStream outFile;
 
    /**
     * Note: All kinds of exceptions can be thrown in main.
     * See the API documentation for each method used.
     */
 
    public static boolean decode(String[] args) throws Exception
    {
        //System.out.println("-------------File Decryption--------------");
        for(int i=0;i<args.length;i++)
        {            
            //System.out.println("----------->"+args[i]);
        }
        //System.out.println("------------------------------------------");
 
       // File to decrypt.
 
       filename = args[0];
 
       String password = args[2];
 
       inFile = new FileInputStream(filename);
       
       File f = new File(args[0]);            
       
       outFile = new FileOutputStream(args[1]);
 
       PBEKeySpec keySpec = new PBEKeySpec(password.toCharArray());
       SecretKeyFactory keyFactory =
           SecretKeyFactory.getInstance(ProjectProperties.cypher);
       SecretKey passwordKey = keyFactory.generateSecret(keySpec);
 
       // Read in the previouly stored salt and set the iteration count.
 
       byte[] salt = new byte[8];
       inFile.read(salt);
       int iterations = 100;
 
       PBEParameterSpec parameterSpec = new PBEParameterSpec(salt, iterations);
 
       // Create the cipher and initialize it for decryption.
 
       Cipher cipher = Cipher.getInstance(ProjectProperties.cypher);
       cipher.init(Cipher.DECRYPT_MODE, passwordKey, parameterSpec);
 
 
       byte[] input = new byte[64];
       int bytesRead;
       while ((bytesRead = inFile.read(input)) != -1)
       {
          byte[] output = cipher.update(input, 0, bytesRead);
          if (output != null)
             outFile.write(output);
       }
 
       byte[] output = cipher.doFinal();
       if (output != null)
          outFile.write(output);
 
       inFile.close();
       outFile.flush();
       outFile.close();
       return true;
   }
}