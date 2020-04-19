<%-- 
    Document   : register
    Created on : Apr 19, 2015, 4:47:06 PM
    Author     : 108
--%>

<%@page import="osn.ProjectProperties"%>
<%
    String msg = request.getParameter("msg");
    msg = (msg == null ? "" : "<font color='yellow'>" + msg + "</font>");

    String email = (String) session.getAttribute("email");
    String name = (String) session.getAttribute("name");

    String profilePicPath = "images/users/none.png";
%>


<!DOCTYPE html>
<html>
    <head>
        <title><%=ProjectProperties.projectTitle%></title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
            body {
                font-family: Arial, Helvetica, sans-serif;
                background-color: black;
            }

            * {
                box-sizing: border-box;
            }

            /* Add padding to containers */
            .container {
                padding: 16px;
                background-color: white;
            }

            /* Full-width input fields */
            input[type=text], input[type=password] {
                width: 100%;
                padding: 15px;
                margin: 5px 0 22px 0;
                display: inline-block;
                border: none;
                background: #f1f1f1;
            }

            input[type=text]:focus, input[type=password]:focus {
                background-color: #ddd;
                outline: none;
            }

            /* Overwrite default styles of hr */
            hr {
                border: 1px solid #f1f1f1;
                margin-bottom: 25px;
            }

            /* Set a style for the submit button */
            .registerbtn {
                background-color: #4CAF50;
                color: white;
                padding: 16px 20px;
                margin: 8px 0;
                border: none;
                cursor: pointer;
                width: 100%;
                opacity: 0.9;
            }

            .registerbtn:hover {
                opacity: 1;
            }

            /* Add a blue text color to links */
            a {
                color: dodgerblue;
            }

            /* Set a grey background color and center the text of the "sign in" section */
            .signin {
                background-color: #f1f1f1;
                text-align: center;
            }
        </style>
    </head>
    <body>
        <h1><%=msg%></h1>
        <form method="post" action="Login">
            <div class="container">
                <h1>Login</h1>


                <label ><b>Email</b></label>
                <input type="text" placeholder="Enter Email" name="email" required>

                <label ><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="password" required>

                <button type="submit" class="registerbtn">Signin</button>
            </div>

            <div class="container signin">
                
            </div>
        </form>

    </body>
</html>
