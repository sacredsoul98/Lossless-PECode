<%-- 
    Document   : share
    Created on : Jul 18, 2015, 11:50:58 PM
    Author     : Helias
--%>

<%@page import="osn.DataBase"%>
<%@page import="osn.ProjectProperties"%>
<%@page import="java.sql.ResultSet"%>

<%
    String username = (String) session.getAttribute("email");
    String email = (String) session.getAttribute("email");

    String tid = request.getParameter("tid");
    String sys = request.getParameter("sys");

    String msg = request.getParameter("msg");
    msg = (msg == null ? "" : "(" + msg.trim() + ")");

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

        <script type="text/javascript" src="ajaxlib.js" ></script>        

        <script language="javascript" type="text/javascript">
            $(function () {
                $("#MoveRight,#MoveLeft").click(function (event) {
                    var id = $(event.target).attr("id");

                    var access = id == "MoveRight" ? "yes" : "no";
                    var selectFrom = id == "MoveRight" ? "#SelectLeft" : "#SelectRight";
                    var moveTo = id == "MoveRight" ? "#SelectRight" : "#SelectLeft";

                    var selectedItems = $(selectFrom + " :selected").toArray();
                    var users = [];
                    var i = 0, len = selectedItems.length;

                    while (i < len)
                    {
                        users.push(selectedItems[i++].value);
                    }

                    //alert(users.join(', '));                       
                    var url = "<%=ProjectProperties.sharingUrl%>tid=" + document.getElementById('tid').value + "&list=" + users.join(',') + "&access=" + access + "&username=" + document.getElementById('username').value + "&sys=" + document.getElementById('sys').value;
                    ajaxFunction(url);

                    $(moveTo).append(selectedItems);
                    selectedItems.remove;
                });
            });
        </script>

        <script language="javascript">
            var req;
            function ajaxFunction(url)
            {
                document.getElementById("note").innerHTML = "";
                var color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
                document.getElementById("note").innerHTML = "<font size='5' color='" + color + "'><i>Starting Sharing Process&nbsp;&nbsp;<img src='images/load.gif' /></i></font>";

                if (window.XMLHttpRequest) // Non-IE browsers
                {
                    req = new XMLHttpRequest();
                    req.onreadystatechange = processStateChange2;

                    try
                    {
                        req.open("GET", url, true);
                    }
                    catch (e)
                    {
                        alert(e);
                    }
                    req.send(null);
                }
                else if (window.ActiveXObject) // IE Browsers
                {
                    req = new ActiveXObject("Microsoft.XMLHTTP");

                    if (req)
                    {
                        req.onreadystatechange = processStateChange2;
                        req.open("GET", url, true);
                        req.send();
                    }
                }
            }

            function processStateChange2()
            {
                /**
                 *	State	Description
                 *	0		The request is not initialized
                 *	1		The request has been set up
                 *	2		The request has been sent
                 *	3		The request is in process
                 *	4		The request is complete
                 */
                if (req.readyState == 4)
                {
                    if (req.status == 200) // OK response
                    {
                        document.getElementById("note").innerHTML = "";
                        var color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
                        document.getElementById("note").innerHTML = "<font size='5' color='" + color + "'><i>" + req.responseText + "</i></font>";
                    }
                    else
                    {
                        alert(req.statusText);
                    }
                }
            }
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


            <script>
                            $('.example1').wmuSlider();
            </script>             
        </div>
        <script type="text/javascript" src="JS/ajax.js"></script>
        <div class="main">
            <center>          

            </center>            
            <div class="wrap">
                <div id="contents">                
                    <div>
                        <font size='5' color='red'><%=msg%></font>
                        <%
                            if (username != null) {
                        %>
                        <br /><br /><br />
                        <center>

                            <form method="post">  
                                <table>
                                    <tr>
                                        <th>File InAccessible Users</th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th>File Accessible Users</th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <select id="SelectLeft" multiple="multiple" style="width: 400px">
                                                <%{
                                                        DataBase jdbc = new DataBase();
                                                        jdbc.createConnection();

                                                        String query1 = "";
                                                        int share = 1;
                                                        query1 = "select recieverid,isshared from acp where fid=" + tid + " and ownerid='" + username + "'";
                                                        System.out.println("-L-" + query1);
                                                        ResultSet rs = jdbc.queryRecord(query1);
                                                        String userList = "";
                                                        while (rs.next()) {
                                                            String ii = rs.getString(1);
                                                            String aa = rs.getString(2);
                                                            if(aa.equals("1")){                                                                
                                                                userList += "'" + rs.getString(1) + "',";
                                                            }
                                                            if(aa.equals("0")){
                                                                out.println("<option value='" + rs.getString(1) + "'>" + rs.getString(1) + "</option>");
                                                                userList += "'" + rs.getString(1) + "',";
                                                            }                                                            
                                                        }

                                                        if (userList.trim().length() > 0) {
                                                            userList = userList.substring(0, userList.trim().length() - 1);
                                                        } else {
                                                            userList = "'none'";
                                                        }

                                                        if (userList.equals("'none'")) {
                                                            query1 = "select email from users where email!='" + username + "'";
                                                            System.out.println(query1);

                                                            rs = jdbc.queryRecord(query1);

                                                            while (rs.next()) {
                                                                out.println("<option value='" + rs.getString(1) + "'>" + rs.getString(1) + "</option>");
                                                            }
                                                        } else {
                                                            query1 = "select email from users where email!='" + username + "' and email not in(" + userList + ")";
                                                            System.out.println(query1);

                                                            rs = jdbc.queryRecord(query1);

                                                            while (rs.next()) {
                                                                out.println("<option value='" + rs.getString(1) + "'>" + rs.getString(1) + "</option>");
                                                            }
                                                        }

                                                        jdbc.closeConnection();

                                                    }
                                                %>
                                            </select>
                                        </td>
                                        <td>
                                        </td>
                                        <td><input id="MoveRight" type="button" value=" >> " title="Set Access" /><br /><input id="MoveLeft" type="button" value=" << " title="UnSet Access"/></td>
                                        <td></td>
                                        <td>
                                            <select id="SelectRight" multiple="multiple" style="width: 400px">          
                                                <%{
                                                        DataBase jdbc = new DataBase();
                                                        jdbc.createConnection();

                                                        String query1 = "";
                                                        int share = 1;
                                                        query1 = "select recieverid from acp where fid=" + tid + " and ownerid='" + username + "'  and isshared=1";
                                                        System.out.println(query1);
                                                        ResultSet rs = jdbc.queryRecord(query1);

                                                        while (rs.next()) {
                                                            out.println("<option value='" + rs.getString(1) + "'>" + rs.getString(1) + "</option>");
                                                        }
                                                        jdbc.closeConnection();
                                                    }
                                                %>
                                            </select>
                                        </td>
                                    </tr>
                                </table>
                                <input type="hidden" id='username' name='username' value='<%=username%>'>
                                <input type="hidden" id='tid' name='tid' value='<%=tid%>'>
                                <input type="hidden" id='sys' name='sys' value='<%=sys%>'>
                                <div id="note" ></div>
                            </form>
                        </center>
                        <br /><br /><br />


                        <%
                            }
                        %>
                    </div>		                
                </div> 
            </div>


    </body>
</html>
