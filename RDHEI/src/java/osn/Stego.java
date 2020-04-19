/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package osn;

import java.lang.*;
import java.awt.*;
import java.awt.image.*;
import java.io.*;
import javax.imageio.*;
import java.nio.ByteBuffer;
import java.nio.charset.Charset;
import java.nio.file.*;

public class Stego {

    public static void init(String[] args) {

        //String a[] = {"encrypt", "1.png", "gecko.png", "sam.txt"};
        String a[] = {"decrypt", "gecko.png", "dream.txt"};
        args = a;

        if (args.length < 3 || args.length > 4) {
            System.out.println("usage: [encrypt | decrypt] inputFile outputFile [fileToEncrypt]");
            System.exit(1);
        }

        if (args[0].equals("encrypt") && args.length == 4) {
            System.out.println(encrypt(args));
        } else if (args[0].equals("decrypt") && args.length == 3) {
            decrypt(args);
        } else {
            System.out.println("usage: [encrypt | decrypt] inputFile outputFile [fileToEncrypt]");
            System.exit(1);
        }
    }

    public static boolean encrypt(String[] a) {
        String inputFile = a[1];
        String outputFile = a[2];

        BufferedImage src = null;
        try {
            src = ImageIO.read(new File(inputFile));
        } catch (IOException e) {
            System.out.println("Stego: could not open file " + inputFile);
            return false;
        }
        BufferedImage img = new BufferedImage(src.getWidth(), src.getHeight(), BufferedImage.TYPE_4BYTE_ABGR);
        img.getGraphics().drawImage(src, 0, 0, null);

        int width = img.getWidth();
        int height = img.getHeight();
        int max_size = width * height - 4;

        System.out.println("Image width: " + width);
        System.out.println("Image height: " + height);
        System.out.println("Max encryption length: " + max_size);

        byte[] to_encrypt_bytes = null;
        try {
            Path fileToEncrypt = Paths.get(a[3]);
            to_encrypt_bytes = Files.readAllBytes(fileToEncrypt);
        } catch (IOException e) {
            System.out.println("Stego: could not open file " + a[3]);
            return false;
        }

        int encrypt_length = to_encrypt_bytes.length;
        System.out.println("Encryption length: " + encrypt_length);
        if (encrypt_length >= 2147483647) {
            System.out.println("Stego: encryption data is too large");
            return false;
        }
        if (encrypt_length >= max_size) {
            System.out.println("Stego: encryption data is too large for selected image");
            return false;
        }

        byte[] encrypt_length_bytes = ByteBuffer.allocate(4).putInt(encrypt_length).array();
        int cur_byte = 0;
        // First 4 pixels contain length of message
        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                if (cur_byte < 4) {
                    int rgb_int = img.getRGB(x, y);
                    Color color = new Color(rgb_int, true);
                    byte cur_encrypt_byte = encrypt_length_bytes[cur_byte];
                    // first two bits in RED
                    int red = color.getRed();
                    int new_red = ((cur_encrypt_byte >>> 6) & 0x03) | 0xfc;
                    red = (red | 0x03) & new_red;
                    // second two bits in GREEN
                    int green = color.getGreen();
                    int new_green = (cur_encrypt_byte >>> 4) & 0x03 | 0xfc;
                    green = (green | 0x03) & new_green;
                    // third two bits in BLUE
                    int blue = color.getBlue();
                    int new_blue = (cur_encrypt_byte >>> 2) & 0x03 | 0xfc;
                    blue = (blue | 0x03) & new_blue;
                    // last two bits in ALPHA
                    int alpha = color.getAlpha();
                    int new_alpha = cur_encrypt_byte & 0x03 | 0xfc;
                    alpha = (alpha | 0x03) & new_alpha;
                    // make new color
                    Color new_col = new Color(red, green, blue, alpha);
                    img.setRGB(x, y, new_col.getRGB());
                    cur_byte++;
                } else {
                    break;
                }
            }
            if (cur_byte >= 4) {
                break;
            }
        }

        cur_byte = 0;
        for (int y = 4; y < height; y++) {
            for (int x = 4; x < width; x++) {
                if (cur_byte < encrypt_length) {
                    int rgb_int = img.getRGB(x, y);
                    Color color = new Color(rgb_int, true);
                    byte cur_encrypt_byte = to_encrypt_bytes[cur_byte];
                    // first two bits in RED
                    int red = color.getRed();
                    int new_red = ((cur_encrypt_byte >>> 6) & 0x03) | 0xfc;
                    red = (red | 0x03) & new_red;
                    // second two bits in GREEN
                    int green = color.getGreen();
                    int new_green = (cur_encrypt_byte >>> 4) & 0x03 | 0xfc;
                    green = (green | 0x03) & new_green;
                    // third two bits in BLUE
                    int blue = color.getBlue();
                    int new_blue = (cur_encrypt_byte >>> 2) & 0x03 | 0xfc;
                    blue = (blue | 0x03) & new_blue;
                    // last two bits in ALPHA
                    int alpha = color.getAlpha();
                    int new_alpha = cur_encrypt_byte & 0x03 | 0xfc;
                    alpha = (alpha | 0x03) & new_alpha;
                    // make new color
                    Color new_col = new Color(red, green, blue, alpha);
                    img.setRGB(x, y, new_col.getRGB());
                    cur_byte++;
                } else {
                    break;
                }
            }
            if (cur_byte >= encrypt_length) {
                break;
            }
        }

        try {
            File output = new File(outputFile);
            ImageIO.write(img, "png", output);
        } catch (IOException e) {
            System.out.println("Stego: could not save file " + outputFile);
            return false;
        }
        System.out.println("Success");
        return true;
    }

    public static String decrypt(String[] a) {
        String decoded = null;
        BufferedImage img = null;
        try {
            img = ImageIO.read(new File(a[1]));
        } catch (IOException e) {
            System.out.println("Stego: could not open file");
            System.exit(1);
        }

        int width = img.getWidth();
        int height = img.getHeight();

        byte[] length_bytes = new byte[4];
        int cur_byte = 0;
        // First 4 pixels contain length of message
        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                if (cur_byte < 4) {
                    int rgb_int = img.getRGB(x, y);
                    Color color = new Color(rgb_int, true);
                    byte encrypted_info = 0x0;
                    // first two bits in RED
                    int red = color.getRed();
                    encrypted_info = (byte) (encrypted_info | (red & 0x03) << 6);
                    // second two bits in GREEN
                    int green = color.getGreen();
                    encrypted_info = (byte) (encrypted_info | ((green & 0x03) << 4));
                    // third two bits in BLUE
                    int blue = color.getBlue();
                    encrypted_info = (byte) (encrypted_info | ((blue & 0x03) << 2));
                    // last two bits in ALPHA
                    int alpha = color.getAlpha();
                    encrypted_info = (byte) (encrypted_info | (alpha & 0x03));
                    // add byte
                    length_bytes[cur_byte] = encrypted_info;
                    cur_byte++;
                } else {
                    break;
                }
            }
            if (cur_byte >= 4) {
                break;
            }
        }

        int encrypt_length = ByteBuffer.wrap(length_bytes).getInt();

        byte[] decrypted_bytes = new byte[encrypt_length];
        cur_byte = 0;
        for (int y = 4; y < height; y++) {
            for (int x = 4; x < width; x++) {
                if (cur_byte < encrypt_length) {
                    int rgb_int = img.getRGB(x, y);
                    Color color = new Color(rgb_int, true);
                    byte encrypted_info = 0x0;
                    // first two bits in RED
                    int red = color.getRed();
                    encrypted_info = (byte) (encrypted_info | (red & 0x03) << 6);
                    // second two bits in GREEN
                    int green = color.getGreen();
                    encrypted_info = (byte) (encrypted_info | ((green & 0x03) << 4));
                    // third two bits in BLUE
                    int blue = color.getBlue();
                    encrypted_info = (byte) (encrypted_info | ((blue & 0x03) << 2));
                    // last two bits in ALPHA
                    int alpha = color.getAlpha();
                    encrypted_info = (byte) (encrypted_info | (alpha & 0x03));
                    // add byte
                    decrypted_bytes[cur_byte] = encrypted_info;
                    cur_byte++;
                } else {
                    break;
                }
            }
            if (cur_byte >= encrypt_length) {
                break;
            }
        }

        try {
            decoded = new String(decrypted_bytes, "UTF-8");            
        } catch (java.lang.OutOfMemoryError e) {
            System.out.println("Stego: could not decoded bytes");
            decoded = "Exception";
        } catch (Exception e) { 
            e.printStackTrace();
            decoded = "Exception";
        }
        return decoded;
    }
}
