<%@page import="java.net.URL"%>
<%@page import="osn.ProjectProperties"%>
<%@page import="osn.DataBase"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.util.Collections"%>
<%@page import="java.util.Arrays"%>
<%@page import="java.io.File"%>
<%
    String msg = request.getParameter("msg");
    msg = (msg == null ? "" : "<font color='white'>"+msg+"</font>");

    String email = (String) session.getAttribute("email");
    String name = (String) session.getAttribute("name");

    if (email == null) {
        response.sendRedirect("index.jsp?msg=Unauthorized Access");
        return;
    }

    boolean profilePic = true;
    String profilePicPath = "images/users/none.png";


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
        <script src="js2/login.js"></script>
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
                        <font color='white'>Welcome <%=email%></font>
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
                                        <hr />
                                        <li><a href="ufiles_es.jsp?opt=1" class="hf"  title="Upload Files">Upload Files(Proposed System)</a></li>
                                        <!--li><a href="ufiles_es.jsp?opt=2" class="hf"  title="Upload Files">Upload Files(Enhanced System)</a></li-->
                                        <li><a href="filesSettings.jsp?table=fileuploads" class="hf"  title="Share Files">Share Files</a></li>
                                        <li><a href="accFiles.jsp" class="hf"  title="Access Shared Files">Access Shared Files</a></li> 
                                        <hr />                          
                                        <li><a href="hist.jsp" class="hf"  title="Histogram">View Demo Histogram Analysis</a></li> 

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
                            $(function() {
                                $('#activator').click(function() {
                                    $('#box').animate({'top': '0px'}, 500);
                                });
                                $('#boxclose').click(function() {
                                    $('#box').animate({'top': '-700px'}, 500);
                                });
                            });
                            $(document).ready(function() {

                                //Hide (Collapse) the toggle containers on load
                                $(".toggle_container").hide();

                                //Switch the "Open" and "Close" state per click then slide up/down (depending on open/close state)
                                $(".trigger").click(function() {
                                    $(this).toggleClass("active").next().slideToggle("slow");
                                    return false; //Prevent the browser jump to the link anchor
                                });

                            });
                        </script>
                    </div> 	
                    <div class="clear"></div>		
                </div>	
            </div>	

            <script src="js2/jquery.wmuSlider.js"></script> 
            <script>
                            $('.example1').wmuSlider();
            </script> 	           	      
        </div>
        <div class="main">
            <div class="content-top">
                <div class="section1">                                         
                    <div class="clear"></div>
                </div>
            </div>
            <div class="content-bottom">   	   	    
            </div>
        </div>        
    </body>
</html>
