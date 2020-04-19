<%-- 
    Document   : localContent
    Created on : Mar 24, 2017, 1:22:48 AM
    Author     : Helias
--%>

<%@page import="osn.ProjectProperties"%>
<%@page import="osn.DataBase"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.util.Collections"%>
<%@page import="java.util.Arrays"%>
<%@page import="java.io.File"%>

<%
    String msg = request.getParameter("msg");
    msg = (msg == null ? "" : msg);

    String option = request.getParameter("option");
    option = (option == null ? "100" : option);
    
    String friendMail = request.getParameter("friendMail");

    String email = (String) session.getAttribute("email");
   
    if (email == null) {
        response.sendRedirect("index.jsp?msg=Unauthorized Access");
        return;
    }
    
    

    boolean adsProceed = true;
    boolean profilePic = true;
    String profilePicPath = "";
%>
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Welcome</title>
        <link rel="stylesheet" type="text/css" href="css/style.css">
        <link href="jQueryAssets/jquery.ui.core.min.css" rel="stylesheet" type="text/css">
        <link href="jQueryAssets/jquery.ui.theme.min.css" rel="stylesheet" type="text/css">
        <link href="jQueryAssets/jquery.ui.accordion.min.css" rel="stylesheet" type="text/css">
        <link href="jQueryAssets/jquery.ui.button.min.css" rel="stylesheet" type="text/css">
        <link href="jQueryAssets/jquery.ui.tabs.min.css" rel="stylesheet" type="text/css">
        <script src="jQueryAssets/jquery-1.8.3.min.js" type="text/javascript"></script>
        <script src="jQueryAssets/jquery-ui-1.9.2.accordion.custom.min.js" type="text/javascript"></script>
        <script src="jQueryAssets/jquery-ui-1.9.2.button.custom.min.js" type="text/javascript"></script>
        <script src="jQueryAssets/jquery-ui-1.9.2.tabs.custom.min.js" type="text/javascript"></script>
    </head>

    <body bgcolor="black">

        <header class="head" id="headId">
            <div align="left" >
                <%
                    String notifications = "";
                    {
                        String query = "select * from profiles p where p.email='" + email.trim() + "' and p.siteType='" + ProjectProperties.siteName + "'";
                        System.out.println(query);

                        DataBase dbfunc = new DataBase();
                        dbfunc.createConnection();

                        ResultSet rsett = dbfunc.queryRecord(query);
                        boolean found = rsett.next();

                        if (found) {
                            profilePicPath = "HttpObjectDownload?email=" + email + "&option=1";
                            profilePic = true;

                        } else {
                            notifications += "<a id='note' href='profileSettings.jsp'>Click Here To Set Profile</a><br />";
                            profilePic = false;
                        }
                    }
                    email = friendMail;
                %>




            </div>
            <div style="padding:.5% 0 0 .5% ;margin-left:.5%" >

                <div class="HeadingCc" id="HeadingId"  ><%=msg%>                    
                    <div style="text-align:right;margin-right:10px">  <a class="hf" href="welcome.jsp" >HOME</a>&nbsp;<a class="hf" href="logout.jsp" >LOGOUT</a> </div></div>
            </div>

        </div>


    </header>
    <div style="padding:2px">
        <div class="c_barleft" id="Id_barleft">
            <div style="padding:20px;alignment-adjust:central" align="center">
                <%
                    if (!profilePic) {
                        profilePicPath = "images/users/none.png";
                        out.println("<p><img src=\"" + profilePicPath + "\" width=\"150\" height=\"120\"  alt=\"\"/>");
                    } else {
                        out.println("<p><img src=\"" + profilePicPath + "\" width=\"195\" height=\"240\"  alt=\"\"/>");
                    }
                %>
                <label style="color:#FFF"> <a href="welcome.jsp" class="hf">Home</a></label>
                &nbsp;
                <label style="color:#FFF"   ><a href="logout.jsp" class="hf">Logout</a></label>
            </div>

            <div class="cleft_content" id="Idleft_content">


                <div id="Accordion1" style="text-decoration:none">
                    <h3><a href="#" id="account" class="hhf">Account</a></h3>
                    <div>
                        <p><a href="profileSettings.jsp"  class="hf" title="Edit Profile Settings">Edit Profile</a></p>                            
                        <p><a href="upload.jsp?option=1" class="hf" >Upload Profile Pic</a></p>
                    </div>     
                    <h3><a href="#" class="hhf" >Images</a></h3>
                    <div>
                        <p><a href="photosSettings.jsp?option=2" class="hf"  title="Edit Uploaded Image Settings">Edit Uploaded Image Settings</a></p>                            
                        <p><a href="photos.jsp?option=2" class="hf"  title="View/Upload Images">View/Upload Images</a></p>                                                        
                        <p><a href="photos_private.jsp" class="hf"  title="Private Images">Private Images</a></p>
                        <p><a href="photos_public.jsp" class="hf" title="Public Images">Public Images</a></p>
                    </div>
                    <h3><a href="#" class="hhf">Friends</a></h3>
                    <div>                            
                        <p><a href="friends.jsp?option=1" class="hf"  title="Friends">Add Friends</a></p>                            
                        <p><a href="friends.jsp?option=2" class="hf"  title="Friends">View Friends</a></p>                            
                    </div>
                </div>
                <p>&nbsp;</p>
                <p align="center">&nbsp; </p>
            </div>
            <p>&nbsp;</p>
        </div>
        <div class="c_center" id="Id_center">
            <div class="wall" id="wall">
                <h1><%=email%>-Public Photos</h1>
            </div>
            <div class="wallpot">
                <div id="Tabs1">
                    <ul>
                        <li><a href="#tabs-1">Photos</a></li>
                        <!--li><a href="#tabs-2">Album</a></li-->
                    </ul>
                    <div id="tabs-1">
                        <%
                            {
                                DataBase dbfunc = new DataBase();
                                dbfunc.createConnection();

                                String query = "select tid from fileuploads where email='" + email.trim() + "' and filetype='Image' and visible='Y' and siteType='"+ProjectProperties.siteName+"'";

                                ResultSet rset = dbfunc.queryRecord(query);
                                boolean found = rset.next();

                                if (found) {
                                    rset.last();
                                    int count = rset.getRow();
                                    int row = 0;
                                    String line = "";
                                    rset.beforeFirst();
                                    while (rset.next()) {
                                        row++;
                                        if (row == 1) {
                                            line += "<p><span style=\"padding:20px;alignment-adjust:central\"><a href=\"ImageServlet?email=" + email + "&option=21&tid=" + rset.getString(1) + "\"><img src=\"ImageServlet?email=" + email + "&option=21&tid=" + rset.getString(1) + "\" width=\"160\" height=\"160\"  alt=\"\"/></a></span>";
                                            continue;
                                        }
                                        if (row % 4 == 0) {
                                            line += "<span style=\"padding:20px;alignment-adjust:central\"><a href=\"ImageServlet?email=" + email + "&option=21&tid=" + rset.getString(1) + "\"><img src=\"ImageServlet?email=" + email + "&option=21&tid=" + rset.getString(1) + "\" width=\"160\" height=\"160\"  alt=\"\"/></a></span></p>";
                                            row = 0;
                                            continue;
                                        } else {
                                            line += "<span style=\"padding:20px;alignment-adjust:central\"><a href=\"ImageServlet?email=" + email + "&option=21&tid=" + rset.getString(1) + "\"><img src=\"ImageServlet?email=" + email + "&option=21&tid=" + rset.getString(1) + "\" width=\"160\" height=\"160\"  alt=\"\"/></a></span>";
                                            continue;
                                        }
                                    }
                                    out.println(line);
                                }
                            }
                        %>

                    </div>
                    <!--div id="tabs-2">
                        <p>Album I:							     </p>
                        <p><span style="padding:20px;alignment-adjust:central"><img src="images/user.jpg" width="101" height="89"  alt=""/></span><span style="padding:20px;alignment-adjust:central"><img src="images/user.jpg" width="101" height="89"  alt=""/></span><span style="padding:20px;alignment-adjust:central"><img src="images/user.jpg" width="101" height="89"  alt=""/></span><span style="padding:20px;alignment-adjust:central"><img src="images/user.jpg" width="101" height="89"  alt=""/></span><span style="padding:20px;alignment-adjust:central"><img src="images/user.jpg" width="101" height="89"  alt=""/></span></p>
                        <p><span style="padding:20px;alignment-adjust:central"><img src="images/user.jpg" width="101" height="89"  alt=""/></span><span style="padding:20px;alignment-adjust:central"><img src="images/user.jpg" width="101" height="89"  alt=""/></span><span style="padding:20px;alignment-adjust:central"><img src="images/user.jpg" width="101" height="89"  alt=""/></span><span style="padding:20px;alignment-adjust:central"><img src="images/user.jpg" width="101" height="89"  alt=""/></span><span style="padding:20px;alignment-adjust:central"><img src="images/user.jpg" width="101" height="89"  alt=""/></span></p>
                        <p>Album  II: </p>
                        <p><span style="padding:20px;alignment-adjust:central"><img src="images/user.jpg" width="101" height="89"  alt=""/></span><span style="padding:20px;alignment-adjust:central"><img src="images/user.jpg" width="101" height="89"  alt=""/></span><span style="padding:20px;alignment-adjust:central"><img src="images/user.jpg" width="101" height="89"  alt=""/></span><span style="padding:20px;alignment-adjust:central"><img src="images/user.jpg" width="101" height="89"  alt=""/></span><span style="padding:20px;alignment-adjust:central"><img src="images/user.jpg" width="101" height="89"  alt=""/></span></p>
                        <p><span style="padding:20px;alignment-adjust:central"><img src="images/user.jpg" width="101" height="89"  alt=""/></span><span style="padding:20px;alignment-adjust:central"><img src="images/user.jpg" width="101" height="89"  alt=""/></span><span style="padding:20px;alignment-adjust:central"><img src="images/user.jpg" width="101" height="89"  alt=""/></span><span style="padding:20px;alignment-adjust:central"><img src="images/user.jpg" width="101" height="89"  alt=""/></span><span style="padding:20px;alignment-adjust:central"><img src="images/user.jpg" width="101" height="89"  alt=""/></span></p>
                        <p>&nbsp;</p>
                    </div-->
                </div>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;	</p>
                <p>&nbsp;</p>
            </div>
            <p>&nbsp;</p>
        </div>
        <div class="c_barright" id="Id_barright" >
            <!-- add code-->
            <%
                if (adsProceed) {
                    ServletContext context = session.getServletContext();
                    String absolutePath = context.getRealPath("/ads/");
                    File adsRoot = new File(absolutePath);
                    if (adsRoot.exists() && adsRoot.isDirectory()) {
                        File list[] = adsRoot.listFiles();
                        Collections.shuffle(Arrays.asList(list));
                        out.println("<div><font color=\"black\" size=\"5\">Ads</div>");
                        for (int i = 0; i < list.length; i++) {
                            out.println("<a href=\"\"><img src=\"ads/" + list[i].getName() + "\" style=\"border: 1px solid rgb(128, 128, 128);\" alt=\"Ad" + (i + 1) + "\" border=\"0\" /></a><br />");
                            if (i == 2) {
                                break;
                            }
                        }
                    }

                }

            %>     
        </div>
        <div></div>
    </div>
    <footer class="cfooter" id="idfooter">All Rights Reserved @ 2017

    </footer>
</div>
<script type="text/javascript">
    $(function() {
        $( "#Accordion1" ).accordion({
            collapsible:true,
            icons:{header: "ui-icon-arrow-1-e", activeHeader: "ui-icon-minus"},
            heightStyle:"content",
            active:1
        }); 
    });
    $(function() {
        $( "#Button1" ).button({
            disabled:true
        }); 
    });
    $(function() {
        $( "#Accordion5" ).accordion({
            heightStyle:"content",
            icons:{header: "ui-icon-arrowthick-1-e"}
        }); 
    });
    $(function() {
        $( "#Button1" ).button(); 
    });
    $(function() {
        $( "#Tabs1" ).tabs(); 
    });
    $(function() {
        $( "#Button2" ).button(); 
    });
    $(function() {
        $( "#Button3" ).button(); 
    });
</script>
</body>
</html>


