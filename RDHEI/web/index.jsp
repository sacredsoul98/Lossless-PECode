<%@page import="osn.Config"%>
<%@page import="java.net.URL"%>
<%@page import="osn.ProjectProperties"%>
<%
    // contextPath
    ServletContext context = session.getServletContext();    
    Config.setContext(context);
    /////////////
    URL urll = new URL(request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getRequestURI());
    if (request.getServerName().contains("localhost")) {        
        urll = new URL(request.getScheme() + "://" + Config.getMyIp() + ":" + request.getServerPort() + request.getRequestURI());
        String url = urll.toString();
        response.sendRedirect(url);
    }
%>

<%
    String msg = request.getParameter("msg");
    msg = (msg == null ? "" : "<font color='yellow'>" + msg + "</font>");

    String email = (String) session.getAttribute("email");
    String name = (String) session.getAttribute("name");

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
                        <a href="#" class="right_bt" id="activator"><img src="images/nav_icon.png" alt=""></a>
                        <div class="box" id="box">
                            <div class="box_content_center">
                                <div class="menu_box_list">
                                    <ul>
                                        <li><a href="index.jsp">Home</a></li>							   							   
                                            <%if (email == null) {
                                            %>
                                            <li><a href="login.jsp">Login</a></li>
                                            <li><a href="register.jsp">Register</a></li>
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
            <div class="wmuSlider example1">
                <article style="position: absolute; width: 100%; opacity: 0;"> 
                    <div class="banner-wrap">
                        <div class="cont span_2_of_3">
                            <br />
                            <center><font color='white'><%=ProjectProperties.projectTitle%></font></center>
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                        </div>
                    </div>
                </article>                
            </div>
            <script src="js2/jquery.wmuSlider.js"></script> 
            <script>
                                        $('.example1').wmuSlider();
            </script> 	           	      
        </div>
        <div class="main">            
            <div class="content-bottom">   	   	    
            </div>
        </div>
        <div class="footer">
            <div class="wrap">
                <div class="copy">
                    <p>©</p>
                </div>
            </div>
        </div>
    </body>
</html>