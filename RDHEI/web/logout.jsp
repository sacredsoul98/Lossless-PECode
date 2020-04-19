<%

    session = request.getSession(false);
    if (session != null) {
        session.invalidate();
        response.sendRedirect("index.jsp?msg=Succesfully Logged Out");
    }

%>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Welcome</title>
<link rel="stylesheet" type="text/css" href="css/style.css">
<link href="jQueryAssets/jquery.ui.core.min.css" rel="stylesheet" type="text/css">
<link href="jQueryAssets/jquery.ui.theme.min.css" rel="stylesheet" type="text/css">
<script src="jQueryAssets/jquery-1.8.3.min.js" type="text/javascript"></script>
</head>

<body>

<header class="head" id="headId">
<div style="padding:.5% 0 0 .5% ;margin-left:.5%" >
	
<div class="HeadingCc" id="HeadingId"  >
  <p>OSN LogOff</p>

</div>

</div>


</header>
<div style="padding:2px">
 <div class="c_barleft" id="Id_barleft">
   <div class="cleft_content" id="Idleft_content">
  <p>&nbsp;</p>
     <p align="center">&nbsp; </p>
 </div>
   <p>&nbsp;</p>
 </div>
 <div class="c_center" id="Id_center">
   <div class="all" id="wall">
 <p>&nbsp;</p>
 <div class="HeadingCc" id="HeadingId"  >
  <p>Signing Off.....</p>

</div>
   </div>
   <p>&nbsp;</p>
 </div>
 <div class="c_barright" id="Id_barright" >
   <div class="cleft_content" id="Idleft_content2"><br>
<p align="center">&nbsp; </p>
   </div>
 </div>
 <div>Content for New Div Tag Goes Here</div>
</div>
<footer class="cfooter" id="idfooter">All Rights Reserved @ 2017

</footer>
 </div>
<script type="text/javascript">
$(function() {
	$( "#Button1" ).button({
		disabled:true
	}); 
});
</script>
</body>
</html>
