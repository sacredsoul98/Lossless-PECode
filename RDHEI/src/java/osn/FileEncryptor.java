package osn;

import java.io.*;
import java.security.*;
import javax.crypto.*;
import javax.crypto.spec.*;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

public class FileEncryptor {

    private static String filename;
    private static String password;
    private static FileInputStream inFile;
    private static FileOutputStream outFile;

    /**
     * Note: As with the pervious example, all kinds of exceptions can be thrown
     * in main. See the API documentation for each method used.
     */
    public static boolean secureContent(String... args) {
        //System.out.println("-------------File Encryption--------------");
        for(int i=0;i<args.length;i++)
        {            
            //System.out.println("----------->"+args[i]);
        }
        //System.out.println("------------------------------------------");
        
        try {
            // File to encrypt.  It does not have to be a text file!
            filename = args[0];
            // Password must be at least 8 characters (bytes) long

            String password = args[1];

            inFile = new FileInputStream(filename);
            outFile = new FileOutputStream(args[2] + args[3]);

            // Use PBEKeySpec to create a key based on a password.
            // The password is passed as a character array

            PBEKeySpec keySpec = new PBEKeySpec(password.toCharArray());
            SecretKeyFactory keyFactory =
                    SecretKeyFactory.getInstance(ProjectProperties.cypher);
            SecretKey passwordKey = keyFactory.generateSecret(keySpec);

            // PBE = hashing + symmetric encryption.  A 64 bit random
            // number (the salt) is added to the password and hashed
            // using a Message Digest Algorithm (MD5 in this example.).
            // The number of times the password is hashed is determined
            // by the interation count.  Adding a random number and
            // hashing multiple times enlarges the key space.

            byte[] salt = new byte[8];
            Random rnd = new Random();
            rnd.nextBytes(salt);
            int iterations = 100;

            //Create the parameter spec for this salt and interation count

            PBEParameterSpec parameterSpec = new PBEParameterSpec(salt, iterations);

            // Create the cipher and initialize it for encryption.

            Cipher cipher = Cipher.getInstance(ProjectProperties.cypher);
            cipher.init(Cipher.ENCRYPT_MODE, passwordKey, parameterSpec);

            // Need to write the salt to the (encrypted) file.  The
            // salt is needed when reconstructing the key for decryption.

            outFile.write(salt);

            // Read the file and encrypt its bytes.

            byte[] input = new byte[64];
            int bytesRead;
            while ((bytesRead = inFile.read(input)) != -1) {
                byte[] output = cipher.update(input, 0, bytesRead);
                if (output != null) {
                    outFile.write(output);
                }
            }

            byte[] output = cipher.doFinal();
            if (output != null) {
                outFile.write(output);
            }

            inFile.close();
            outFile.flush();
            outFile.close();
            return true;
        } catch (Exception ex) {
            Logger.getLogger(FileEncryptor.class.getName()).log(Level.SEVERE, null, ex);
            return false;
        }
    }
}