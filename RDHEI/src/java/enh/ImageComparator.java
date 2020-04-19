package enh;

//Problem Set 3 : Problem 2

import javax.swing.*;

import java.awt.image.*;

import java.awt.Image;

import java.awt.BorderLayout;

import java.awt.event.*;

import java.awt.MediaTracker;

import java.awt.Dimension;



public class ImageComparator extends JFrame implements ActionListener {

    private JPanel thePanel;

    private Image image1;

    private Image image2;

    private String string1;

    private String string2;

    private ImageIcon left = null;

    private ImageIcon right = null;

    private JLabel leftLabel;

    private JLabel rightLabel;

    private int id = 0;

    private int iconWidth = -1;

    private int iconHeight = -1;

    private Dimension iconDim;

    

    public ImageComparator( Image i1, String s1, Image i2, String s2 ) {

        addWindowListener(

                /*

                 * We have to supply a WindowListener that will handle

                 * WINDOW_CLOSING events

                 */

        new WindowAdapter() {

            public void windowClosing( WindowEvent e ) {

                if (ImageComparator.this == e.getWindow()) {

                    setVisible( false );

                    System.exit( 0 );

                }

            }

        }

        );

        // provide a UNIX exit via menu

        JMenuBar menuBar = new JMenuBar();

        setJMenuBar( menuBar );

        JMenu menu = new JMenu( "File" );

        menuBar.add( menu );

        JMenuItem exitItem = new JMenuItem( "Exit" );

        exitItem.addActionListener( this );

        menu.add( exitItem );

        

        image1 = i1;

        image2 = i2;

        string1 = s1;

        string2 = s2;

        thePanel = new JPanel();

        MediaTracker tracker = new MediaTracker( thePanel );

        

        if ( image1 != null ) {

            tracker.addImage( i1, id++ );

            left = new ImageIcon( image1 );

            leftLabel = new JLabel( left );

        }

        else {

            leftLabel = new JLabel( string1 );

        }

        

        leftLabel.setHorizontalAlignment( JLabel.CENTER );

        leftLabel.setVerticalAlignment( JLabel.CENTER );

        leftLabel.setHorizontalTextPosition( JLabel.CENTER );

        leftLabel.setVerticalTextPosition( JLabel.CENTER );

        

        if ( image2 != null ) {

            tracker.addImage( i2, id++ );

            right = new ImageIcon( image2 );

            rightLabel = new JLabel( right );

        }

        else {

            rightLabel = new JLabel( string2 );

        }

        

        rightLabel.setHorizontalAlignment( JLabel.CENTER );

        rightLabel.setVerticalAlignment( JLabel.CENTER );

        rightLabel.setHorizontalTextPosition( JLabel.CENTER );

        rightLabel.setVerticalTextPosition( JLabel.CENTER );

        

        try {

            tracker.waitForAll();

        }

        catch( InterruptedException e )

        {}

        

        thePanel.add( leftLabel );

        thePanel.add( rightLabel );

        JScrollPane thePane = new JScrollPane( thePanel );

        getContentPane().add( thePane, BorderLayout.CENTER );

        pack();

        

        iconWidth = Math.max( leftLabel.getWidth(), rightLabel.getWidth() );

        iconHeight = Math.max( leftLabel.getHeight(), rightLabel.getHeight() );

        iconDim = new Dimension( iconWidth, iconHeight );

        System.out.println( iconDim );

        leftLabel.setPreferredSize( iconDim );

        rightLabel.setPreferredSize( iconDim );

        pack();

        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        setTitle("MedianFilter(Original<- ->FilteredImage)");
        setVisible( true );

    }

    

    public void setLeft( Image lImage ) {

        image1 = lImage;

        if ( image1 != null ) {

            MediaTracker tracker = new MediaTracker( thePanel );

            tracker.addImage( image1, id++ );

            left = new ImageIcon( image1, string1 );

            leftLabel.setIcon( left );

            leftLabel.setText( "" );

        }

    }

    

    public void setRight( Image rImage ) {

        image2 = rImage;

        if ( image2 != null ) {

            MediaTracker tracker = new MediaTracker( thePanel );

            tracker.addImage( image2, id++ );

            right = new ImageIcon( image2, string2 );

            rightLabel.setIcon( right );

            rightLabel.setText( "" );

        }

    }

    

    public void actionPerformed( ActionEvent e ) {

        if ( e.getActionCommand().equals( "Exit" ) ) {

            setVisible( false );

            System.exit( 0 );

        }

    }

}