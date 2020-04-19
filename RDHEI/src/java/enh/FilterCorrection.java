package enh;

//Problem Set 3 : Problem 2
import java.io.*;

import java.awt.image.*;
import javax.imageio.ImageIO;

public class FilterCorrection {

    private static BufferedImage srcImage;

    private static BufferedImage dstImage;

    public static void init(String[] args) {

        srcImage = null;

        dstImage = null;

        ImageComparator theViewer;

        MedianFilter theFilter;

        FilterOp theOp;

        if (args.length < 1) {
            usage();
        }

        try {

            srcImage = loadImage(args[0]);

        } catch (IOException e) {

            System.err.println("Could not load " + args[0] + " as JPEG");

            System.exit(1);

        }

        theViewer = new ImageComparator(srcImage, null, null, "Processing image");

        theFilter = new MedianFilter(3);

        theOp = new FilterOp(theFilter);

        /* extra credit: add a loop around this line "dstImage = theOp.filter(srcImage, dstImage);"

         *int n = Integer.parseInt(JOptionPane.showInputDialog("Enter the number of times the image should be filtered"));

         *while (n>0) { 

         */
        dstImage = theOp.filter(srcImage, dstImage);

        /* extra credit (cont.)    

         *n--;

         }*/
        if (dstImage == null) {

            System.err.println("Median Filter failed.");

            System.exit(1);

        }

        theViewer.setRight(dstImage);

        //System.exit(0); 
    }

    private static void usage() {

        System.err.println("Usage: java Program imageName");

        System.exit(1);

    }

    private static BufferedImage loadImage(String fileName) throws IOException {

        BufferedImage image = ImageIO.read(new File(fileName));
        return image;

    }

}
