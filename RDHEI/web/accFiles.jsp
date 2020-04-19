<%-- 
    Created on : Mar 11, 2017, 1:00:20 AM
    Author     : 
--%>
<%@page import="java.sql.ResultSetMetaData"%>
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

    String email = (String) session.getAttribute("email");
    String name = (String) session.getAttribute("name");

    if (email == null) {
        response.sendRedirect("index.jsp?msg=Unauthorized Access");
        return;
    }

    String uploadPage = "FileUpload";

    boolean profilePic = true;
    String profilePicPath = "";

    String table = "";
    table = "fileuploads";

%>

<!DOCTYPE HTML>
<html>
    <head>
        <title><%=ProjectProperties.projectTitle%></title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <link href="css2/style.css" rel="stylesheet" type="text/css" media="all" />
        <link href='http://fonts.googleapis.com/css?family=Raleway' rel='stylesheet' type='text/css'>
        <script src="js2/jquery.min.js"></script>
        <script src="js2/jquery.magnific-popup.js" type="text/javascript"></script>
        <link href="css2/magnific-popup.css" rel="stylesheet" type="text/css">
        <script>
            $(document).ready(function () {
                $('.popup-with-zoom-anim').magnificPopup({
                    type: 'inline',
                    fixedContentPos: false,
                    fixedBgPos: true,
                    overflowY: 'auto',
                    closeBtnInside: true,
                    preloader: false,
                    midClick: true,
                    removalDelay: 300,
                    mainClass: 'my-mfp-zoom-in'
                });
            });
        </script>        
    </head>
    <body>
        <div class="index-banner">
            <div class="header-top">	
                <div class="wrap">
                    <h1><%=msg%></h1>
                    <div class="logo">
                        <a href="index.jsp"><img src="images/logo.png" alt=""/></a>
                    </div>	            
                    <div class="menu">																                    
                        <a href="#" class="right_bt" id="activator"><img src="images/nav_icon.png" alt=""></a>
                        <div class="box" id="box">
                            <div class="box_content_center">
                                <div class="menu_box_list">
                                    <ul>
                                        <li><a href="welcome.jsp">Home</a></li>							   							   
                                            <%if (email == null) {
                                            %>
                                        <li><a href="login.jsp">Login</a></li>

                                        <%
                                        } else {
                                        %>
                                        <li><a href="logout.jsp">Logout</a></li>                                                                                                                        

                                        <%
                                            }
                                        %>
                                    </ul>
                                </div>
                                <a class="boxclose" id="boxclose"><img src="images/close.png" alt=""></a>
                            </div>                
                        </div>
                        <script type="text/javascript">
                            var $ = jQuery.noConflict();
                            $(function () {
                                $('#activator').click(function () {
                                    $('#box').animate({'top': '0px'}, 500);
                                });
                                $('#boxclose').click(function () {
                                    $('#box').animate({'top': '-700px'}, 500);
                                });
                            });
                            $(document).ready(function () {

                                //Hide (Collapse) the toggle containers on load
                                $(".toggle_container").hide();

                                //Switch the "Open" and "Close" state per click then slide up/down (depending on open/close state)
                                $(".trigger").click(function () {
                                    $(this).toggleClass("active").next().slideToggle("slow");
                                    return false; //Prevent the browser jump to the link anchor
                                });

                            });
                        </script>
                    </div> 	
                    <div class="clear"></div>		
                </div>	
            </div>	            

            <link rel="stylesheet" type="text/css" href="css/style2.css" />            
            <script src="JS/jquery.autocomplete.js"></script>

            <script language="javascript">
                            function editLink(tid,aK) {
                                var link = "FileDownloader?tid=" + tid+"&sK="+aK;                                
                                var x = prompt("Enter Your Access Key :", "");
                                if(x==aK){
                                    window.location = link;
                                }else{                                    
                                    alert("Invalid Key");
                                }   
                            }
                            function editLinkMsg(tid,aK) {
                                var link = "recView.jsp?tid=" + tid+"&sK="+aK;                                
                                var x = prompt("Enter Your Access Key :", "");
                                if(x==aK){
                                    window.location = link;
                                }else{                                    
                                    alert("Invalid Key");
                                }   
                            }

            </script>

            <script>
                $('.example1').wmuSlider();
            </script>             
        </div>
        <script type="text/javascript" src="JS/ajax.js"></script>
        <div class="main">
            <center>
                <!--form name="x" id="search_form_homepage" action="results.jsp">                                                
                    Specify Image Directorys:<input type="text" id="tagz" name="tagz" value="" width="400" >                                                
                    <input type="submit" style="height:20px;background-color:#3b5998;font-size:12px;width:100px;color:white;font-family:'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', 'DejaVu Sans', Verdana, sans-serif"; value="Search">               
                </form-->

                <script>
                jQuery(function () {
                    $("#tagz").autocomplete("AjaxTagResults?table=fileuploads");
                });
                </script>
            </center>            
            <div class="wrap">
                <div class="abstract">
                    <ul class="breadcrumb breadcrumb__t"><a class="home" href="welcome.jsp">Back</a></ul>
                    <div class="section group">
                        <div class="cont1 span_2_of_g1">    
                            <%
                                //System.out.println("--------" + s);
                                try {
                                    DataBase obj = new DataBase();
                                    String query = "select * from fileuploads where tid in(select fid from acp where recieverid='" + email + "' and isshared=1)";
                                    System.err.println(query);

                                    obj.createConnection();
                                    ResultSet rset = obj.queryRecord(query);

                                    ResultSetMetaData rsmd = rset.getMetaData();
                                    int numColumns = rsmd.getColumnCount();

                                    String resultHtml = "";

                                    boolean found = rset.next();

                                    if (found) {
                                        rset.last();
                                        int count = rset.getRow();
                                        int row = 0;
                                        int counter = 0;
                                        rset.beforeFirst();
                                        while (rset.next()) {
                                            row++;
                                            counter++;
                                            if (row == 1) {
                                                resultHtml += "<div class=\"section group\">\n";
                                            }
                                            if (rset.getString("visible").equals("Y")) {
                                                resultHtml += "<div class=\"col_1_of_about-box span_1_of_about-box\">\n<a class=\"popup-with-zoom-anim\" href=\"#small-dialog" + (counter + 1) + "\"><span class=\"rollover\"> </span><img src=\"images/sf.png\" title=\"continue\" alt=\"\"/></a>\n";
                                                resultHtml += "<div id=\"small-dialog" + (counter + 1) + "\" class=\"mfp-hide\">\n<div class=\"pop_up\"><img src=\"images/sf.png\" alt=\"\"/>\n<div class=\"mfp-title\">Name:" + rset.getString("filename") + "</div>\n</div>\n</div>\n";
                                                resultHtml += "<div class=\"g_desc\">\n<div class=\"g_1\">\n<h4 class=\"no\">\n<a href=\"#\">Size:" + rset.getString("filesize").split("\\.")[0] + "KB</a></h4>\n<p class=\"g_2\"><a href=\"#\">Directory:" + rset.getString("album") + "/" + rset.getString("filename") + "</a></p>\n</div>\n<div class=\"clear\"></div>\n</div>\n</div>\n";
                                            } else {
                                                // check owner
                                                if (email.equals(rset.getString("email"))) {
                                                    resultHtml += "<div class=\"col_1_of_about-box span_1_of_about-box\">\n<a class=\"popup-with-zoom-anim\" href=\"#small-dialog" + (counter + 1) + "\"><span class=\"rollover\"> </span><img src=\"images/sf.png\" title=\"continue\" alt=\"\"/></a>\n";
                                                    resultHtml += "<div id=\"small-dialog" + (counter + 1) + "\" class=\"mfp-hide\">\n<div class=\"pop_up\"><img src=\"images/sf.png\" alt=\"\"/>\n<div class=\"mfp-title\">Name:" + rset.getString("filename") + "</div>\n</div>\n</div>\n";
                                                    resultHtml += "<div class=\"g_desc\">\n<div class=\"g_1\">\n<h4 class=\"no\">\n<a href=\"#\">Size:" + rset.getString("filesize").split("\\.")[0] + "KB</a></h4>\n<p class=\"g_2\"><a href=\"#\">Directory:" + rset.getString("album") + "/" + rset.getString("filename") + "</a></p>\n</div>\n<div class=\"clear\"></div>\n</div>\n</div>\n";
                                                } else {
                                                    // check file permission to user
                                                    String status = ProjectProperties.isCurrentFileShared(rset.getString("tid"), email);
                                                    boolean permitted = false;
                                                    String aK = "";
                                                    if (status.startsWith("YES")) {
                                                        permitted = true;
                                                        aK = status.split("[$$$]+")[1];
                                                    }

                                                    if (permitted) {
                                                        resultHtml += "<div class=\"col_1_of_about-box span_1_of_about-box\">\n<a class=\"popup-with-zoom-anim\" href=\"#small-dialog" + (counter + 1) + "\"><span class=\"rollover\"> </span><img src=\"KeyImageCreator?color=black&capcom=" + aK + "\" title=\"continue\" alt=\"\"/></a>\n";
                                                        resultHtml += "<div id=\"small-dialog" + (counter + 1) + "\">\n<div><a href='#' onclick=\"editLink('"+rset.getString("tid").trim()+"','"+aK+"')\">Name:" + rset.getString("filename") + "</a>\n</div>\n</div>\n";
                                                        resultHtml += "<div class=\"g_desc\">\n<div class=\"g_1\">\n<h4 class=\"no\">\n<a href=\"#\">Size:" + rset.getString("filesize").split("\\.")[0] + "KB</a></h4>\n<p class=\"g_2\"><a href='#' onclick=\"editLinkMsg('"+rset.getString("tid").trim()+"','"+aK+"')\">View Secret Message</a></p>\n</div>\n<div class=\"clear\"></div>\n</div>\n</div>\n";
                                                    } else {
                                                        resultHtml += "<div class=\"col_1_of_about-box span_1_of_about-box\">\n<a class=\"popup-with-zoom-anim\" href=\"#small-dialog" + (counter + 1) + "\"><span class=\"rollover\"> </span><img src=\"images/locks/1.jpg\" title=\"continue\" alt=\"\"/></a>\n";
                                                        resultHtml += "<div id=\"small-dialog" + (counter + 1) + "\" class=\"mfp-hide\">\n<div class=\"pop_up\"><img src=\"images/locks/1.jpg\" alt=\"\"/>\n<div class=\"mfp-title\">Name:" + rset.getString("filename") + "</div>\n</div>\n</div>\n";
                                                        resultHtml += "<div class=\"g_desc\">\n<div class=\"g_1\">\n<h4 class=\"no\">\n<a href=\"#\">Size:" + rset.getString("filesize").split("\\.")[0] + "KB</a></h4>\n<p class=\"g_2\"><a href=\"#\">Directory:" + rset.getString("album") + "/" + rset.getString("filename") + "</a></p>\n</div>\n<div class=\"clear\"></div>\n</div>\n</div>\n";
                                                    }
                                                }

                                            }
                                            if (row == 3) {
                                                resultHtml += "</div>\n";
                                                row = 0;
                                            }
                                        }
                                    } else {
                                        resultHtml = "<font color='red' size='7'>No Files Shared For You</font>";
                                    }

                                    out.println(resultHtml);
                                    obj.closeConnection();

                                } catch (Exception ex) {
                                    out.println("Exception:" + ex.toString());
                                }

                            %>
                        </div>
                    </div>
                </div>
            </div>


    </body>
</html>
