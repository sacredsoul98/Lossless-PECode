/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package osn;

/**
 *
 * @author 108
 */
import java.awt.image.BufferedImage;
import java.io.File;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.stream.ImageInputStream;

public class VisualRepresentation {

    public static String getColourHexValue(File file) throws Exception {
        ImageInputStream is = ImageIO.createImageInputStream(file);
        Iterator iter = ImageIO.getImageReaders(is);

        if (!iter.hasNext()) {
            System.out.println("Cannot load the specified file " + file.getAbsolutePath());
            System.exit(1);
        }
        ImageReader imageReader = (ImageReader) iter.next();
        imageReader.setInput(is);

        BufferedImage image = imageReader.read(0);

        int height = image.getHeight();
        int width = image.getWidth();

        Map m = new HashMap();
        for (int i = 0; i < width; i++) {
            for (int j = 0; j < height; j++) {
                int rgb = image.getRGB(i, j);
                int[] rgbArr = getRGBArr(rgb);
                // Filter out grays....                
                if (!isGray(rgbArr)) {
                    Integer counter = (Integer) m.get(rgb);
                    if (counter == null) {
                        counter = 0;
                    }
                    counter++;
                    m.put(rgb, counter);
                }
            }
        }
        String colourHex = getMostCommonColour(m);
        System.out.println(colourHex);
        return colourHex;
    }

    public static String getMostCommonColour(Map map) {
        List list = new LinkedList(map.entrySet());
        Collections.sort(list, new Comparator() {
            public int compare(Object o1, Object o2) {
                return ((Comparable) ((Map.Entry) (o1)).getValue())
                        .compareTo(((Map.Entry) (o2)).getValue());
            }
        });
        Map.Entry me = (Map.Entry) list.get(list.size() - 1);
        int[] rgb = getRGBArr((Integer) me.getKey());

        for (int i = 0; i < (rgb.length + rgb.length); i++) {            
            for (int j = 0; j < (rgb.length + rgb.length); j++) {
                int rFilter[] = getRGBArr((Integer) me.getKey());
                int gFilter[] = getRGBArr((Integer) me.getKey());
                int bFilter[] = getRGBArr((Integer) me.getKey());
            }
            int rgbFilter[] = getRGBArr((Integer) me.getKey());
        }
        return Integer.toHexString(rgb[0]) + " " + Integer.toHexString(rgb[1]) + " " + Integer.toHexString(rgb[2]);
    }

    public static int[] getRGBArr(int pixel) {
        int alpha = (pixel >> 24) & 0xff;
        int red = (pixel >> 16) & 0xff;
        int green = (pixel >> 8) & 0xff;
        int blue = (pixel) & 0xff;
        return new int[]{red, green, blue};

    }

    public static boolean isGray(int[] rgbArr) {
        int rgDiff = rgbArr[0] - rgbArr[1];
        int rbDiff = rgbArr[0] - rgbArr[2];
        // Filter out black, white and grays...... (tolerance within 10 pixels)
        int tolerance = 10;
        if (rgDiff > tolerance || rgDiff < -tolerance) {
            if (rbDiff > tolerance || rbDiff < -tolerance) {
                return false;
            }
        }
        return true;
    }
}
