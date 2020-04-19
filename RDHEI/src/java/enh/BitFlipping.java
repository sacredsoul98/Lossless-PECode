/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package enh;

import java.awt.image.BufferedImage;

/**
 *
 * @author India
 */
public class BitFlipping {

    int iter = 0;
    int matchCount = 0;

    public boolean getFlippedBitSets(BufferedImage image) {
        int w = image.getWidth();
        int h = image.getHeight();
        if (w > 512) {
            return false;
        }
        if (h > 512) {
            return false;
        }

        for (int i = 0; i < h; i++) {
            if (iter == 100) {
                break;
            }
            for (int j = 0; j < w; j++) {
                iter++;
                int pixel = image.getRGB(j, i);
                flipRegions(pixel);
                //System.out.println("");

                if (iter == 100) {
                    break;
                }
            }
        }
        if (iter == matchCount) {
            return true;
        } else {
            return false;
        }
    }

    public void flipRegions(int pixel) {
        int alpha = (pixel >> 24) & 0xff;
        int red = (pixel >> 16) & 0xff;
        int green = (pixel >> 8) & 0xff;
        int blue = (pixel) & 0xff;
        if (red == green && green == blue) {
            matchCount++;
        }
    }
}
