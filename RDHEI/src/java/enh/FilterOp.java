package enh;

//Problem Set 3 : Problem 2
import java.awt.image.*;

public class FilterOp{
    private MedianFilter medfil;
    
    public FilterOp(MedianFilter f) {
        medfil = f;
    }
    
    public final BufferedImage filter(BufferedImage src, BufferedImage dst) {
        if ( dst == null )
            dst = createCompatibleDestImage( src, null );
        
        medfil.filter( src, dst );
        
        return dst;
    }
    
    public BufferedImage createCompatibleDestImage(BufferedImage src, ColorModel dstCM) {
        BufferedImage image;
        if ( dstCM == null )
            dstCM = src.getColorModel();
        int w = src.getWidth();
        int h = src.getHeight();
        image = new BufferedImage(dstCM,
        dstCM.createCompatibleWritableRaster( w, h ),
        dstCM.isAlphaPremultiplied(), null );
        
        return image;
    }
}
