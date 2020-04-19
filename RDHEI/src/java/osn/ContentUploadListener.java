/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package osn;

import org.apache.commons.fileupload.ProgressListener;

public class ContentUploadListener 
	implements ProgressListener
{
    private volatile long 
    	bytesRead = 0L,
    	contentLength = 0L,
    	item = 0L;   
    
    public ContentUploadListener() 
    {
    	super();
    }
    
    public void update(long aBytesRead, long aContentLength, int anItem) 
    {
        bytesRead = aBytesRead;
        contentLength = aContentLength;
        item = anItem;
    }
    
    public long getBytesRead() 
    {
        return bytesRead;
    }
    
    public long getContentLength() 
    {
        return contentLength;
    }
    
    public long getItem() 
    {
        return item;
    }
}
