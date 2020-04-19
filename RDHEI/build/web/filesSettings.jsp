<%@page import="java.sql.ResultSetMetaData"%>
<%@page import="java.net.URL"%>
<%@page import="osn.ProjectProperties"%>
<%@page import="osn.DataBase"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.util.Collections"%>
<%@page import="java.util.Arrays"%>
<%@page import="java.io.File"%>
<%
    String msg = request.getParameter("msg");
    msg = (msg == null ? "" : msg);

    String table = request.getParameter("table");
    String email = (String) session.getAttribute("email");
    String name = (String) session.getAttribute("name");

    if (email == null) {
        response.sendRedirect("index.jsp?msg=Unauthorized Access");
        return;
    }


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
                <%
                    {
                        if (table.equals("fileuploads")) {
                            String query = "select * from " + table + " where email='" + email.trim() + "'";
                            System.out.println(query);

                            DataBase dbfunc = new DataBase();
                            dbfunc.createConnection();

                            ResultSet rset = dbfunc.queryRecord(query);

                            ResultSetMetaData rsmd = rset.getMetaData();
                            int numColumns = rsmd.getColumnCount();

                            String resultHtml = "";

                            resultHtml += "<center><table border=2>";
                            resultHtml += "<tr>";

                            for (int i = 1; i <= numColumns; i++) {
                                // uncomment the following three lines and define bool least to initiate blocking those columns
                                boolean notDisplay = false;
                                notDisplay = (i == 1 || i == 2 || i == 5 || i == 7 || i == 8 || i==11);
                                if (!notDisplay) {
                                    resultHtml += "<td>" + rsmd.getColumnName(i).toUpperCase() + "</td>";
                                }
                            }
                            resultHtml += "<td>Sharing Operations</td>";
                            resultHtml += "</tr>";

                            boolean found = rset.next();
                            //out.println("<br><b>Sql Result</b>+"+query+"==>"+found);
                            if (found) {
                                rset.last();
                                int count = rset.getRow();
                                int row = 0;
                                rset.beforeFirst();
                                while (rset.next()) {
                                    row++;
                                    resultHtml += "<tr>";
                                    for (int i = 1; i <= numColumns; i++) {
                                        // uncomment the following three lines and define bool least to initiate blocking those columns
                                        boolean notDisplay = false;
                                        notDisplay = (i == 1 || i == 2 || i == 5 || i == 7 || i == 8);
                                        if (!notDisplay) {
                                            if (i == 6) {
                                                resultHtml += "<td><a href=''><img src=\"images/sf.png\" width=\"160\" height=\"160\"  alt=\"\"/></a></td>";
                                            } 
                                            else if (i == 11) {
                                                String visibility = rset.getString(i).trim();
                                                if (visibility.trim().equals("Y")) {
                                                    //visibility = "<a href=\"revoke.jsp?tid=" + rset.getString(1) + "&page=welcome.jsp&visibility=N\">Private</a>";
                                                    //resultHtml += "<td>" + visibility + "</td>";
                                                    resultHtml += "<td>Viewable To All</td>";
                                                }
                                                if (visibility.trim().equals("N")) {
                                                    //visibility = "<a href=\"revoke.jsp?tid=" + rset.getString(1) + "&page=welcome.jsp&visibility=Y\">Public</a>";
                                                    //resultHtml += "<td>" + visibility + "</td>";
                                                    String sh = "<a href=\"share.jsp?tid=" + rset.getString(1) + "&page=welcome.jsp&visibility=Y\">Share</a>&nbsp;&nbsp;<a href=\"ownerView.jsp?tid=" + rset.getString(1) + "&owner="+email+"&key="+rset.getString("fkey")+"\">View</a>";
                                                    resultHtml += "<td>" +sh+ "</td>";
                                                }                                                
                                                
                                            } 
                                            
                                            else if (i == 9) {
                                                resultHtml += "<td>" + rset.getString(i) + "</td>";
                                            } else {
                                                resultHtml += "<td>" + rset.getString(i) + "</td>";
                                            }
                                        }
                                    }
                                    resultHtml += "</tr>";
                                }
                                resultHtml += "</table></center>";
                                out.println(resultHtml);
                            } else {
                                out.println("No Files Uploaded Yet!");
                            }
                        }                        
                    }


                %>


                <div class="section1">                    
                    <div class="clear"></div>
                </div>
            </div>
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
