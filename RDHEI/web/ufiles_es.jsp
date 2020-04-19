<%-- 
    Created on : Mar 11, 2017, 1:00:20 AM
    Author     : 
--%>
<%@page import="osn.ProjectProperties"%>
<%@page import="osn.DataBase"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.util.Collections"%>
<%@page import="java.util.Arrays"%>
<%@page import="java.io.File"%>

<%
    String opt = request.getParameter("opt");
    
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

    String uploadPage = "FileUploadPS";

    boolean profilePic = true;
    String profilePicPath = "";
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

        <link rel="stylesheet" href="css/style1.css" type="text/css">
        <script type="text/javascript" src="js2/two.js"></script>
        <script type="text/javascript" src="js2/one.js"></script>

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

            <script src="js2/jquery.wmuSlider.js"></script>

            <link rel="stylesheet" type="text/css" href="css/style2.css" />
            <script type="text/javascript" src="JS/jquery-1.4.2.min.js"></script>
            <script src="JS/jquery.autocomplete.js"></script>


            <script>
                            $('.example1').wmuSlider();
            </script>             
        </div>
        <div class="main">
            <div class="content-top">
                <style type="text/css">
                    html {
                        overflow-y:auto;
                        padding-bottom:31px;
                        height: auto;
                    }	
                    body {
                        height:100%;
                    }
                    a:visited{color:#1168CC}
                    #t{padding-top:20px}
                    #content_wrapper_homepage { 
                        top:12%;
                        position:relative;		
                        -webkit-transition: all 0.25s ease-out;
                        -moz-transition: all 0.25s ease-out;
                        -o-transition: all 0.25s ease-out;
                        transition: all 0.25s ease-out;
                    }
                    @media only screen and (max-width: 320px) {
                        #content_wrapper_homepage{top: 20px;}
                    }
                </style>

                <style>
                    #holder { border: 10px dashed #ccc; width: 300px; min-height: 300px; margin: 20px auto;}
                    #holder.hover { border: 10px dashed #0c0; }
                    #holder img { display: block; margin: 10px auto; }
                    #holder p { margin: 10px; font-size: 14px; }
                    progress { width: 100%; }
                    progress:after { content: '%'; }
                    .fail { background: #c00; padding: 2px; color: #fff; }
                    .hidden { display: none !important;}
                </style>
                </head>
                <body> 
                <center><div id='resp'><%=msg%></div></center>
                <div id="content_wrapper_homepage">
                    <div id="content_homepage">                        

                        <form name="x" id="search_form_homepage" onSubmit="return nbr()">                            
                            <table border="0">
                                <tr><td>Specify Secret Message</td><td><input type="text" id="aname" name="aname" value="" width="200" ></td></tr>
                                <tr><td>&nbsp;</td><td>&nbsp;</td></tr>
                                <tr><td><!--Specify Secret Key--></td><td><input type="hidden" id="tagz" name="tagz" value='<%=opt%>'></td></tr>                                
                            </table>                            
                        </form>
                        <!-- en_US All Settings -->

                        <div id="tagline_homepage">
                            <br /><br /><br />
                        </div>

                        <div id="error_homepage"></div>
                        <div style="clear:both;margin-top:20px;"></div>	
                    </div> <!-- content_homepage //-->
                </div> <!-- content_wrapper_homepage //-->	
                <script>
                    jQuery(function () {
                        //$("#tagz").autocomplete("AjaxTagResults?table=fileuploads");
                    });
                </script>
                <article>
                    <center>Drag & Drop Your Files Here To Upload</center>
                    <div id="holder">
                    </div> 
                    <p id="upload" class="hidden"><label>Drag & drop not supported, but you can still upload via this input field:<br><input type="file"></label></p>
                    <p id="filereader">File API & FileReader API not supported</p>
                    <p id="formdata">XHR2's FormData is not supported</p>
                    <p id="progress">XHR2's upload progress isn't supported</p>
                    <p>Upload progress: <progress id="uploadprogress" min="0" max="100" value="0">0</progress></p>    
                </article>

                <canvas hidden class="thumb" id="histogram" width="800" height="600">
                    Your browser does not have support for Canvas.
                </canvas>

                <p hidden id="runtime">Plot runtime...</p>

                <p hidden><label>Histogram for: <select id="histType">
                            <option value="rgb">RGB</option>
                            <option value="red">Red</option>
                            <option value="green">Green</option>
                            <option value="blue">Blue</option>
                            <option value="hue">Hue</option>
                            <option value="sat">Saturation</option>
                            <option value="val">Value (brightness)</option>
                            <option value="cmyk">CMYK</option>
                            <option value="cyan">Cyan</option>
                            <option value="magenta">Magenta</option>
                            <option value="yellow">Yellow</option>
                            <option value="kelvin">Kelvin (Black)</option>
                        </select></label></p>

                <p hidden><label>Count every <input id="accuracy" type="number" min="1" max="50" 
                                             value="1"> pixels</label></p>

                <p hidden><label>Plot style: <select id="plotStyle">
                            <option value="continuous">Continuous</option>
                            <option value="discreet">Discreet</option>
                        </select></label></p>

                <p hidden><label>Plot fill <input id="plotFill" type="checkbox"></label></p>

                <p hidden><label>Plot colors: <select id="plotColors">
                            <option value="none">None</option>
                            <option value="flat">Flat colors</option>
                            <option value="gradient">Gradients</option>
                        </select></label></p>

                <script>
                    var holder = document.getElementById('holder'),
                            tests = {
                                filereader: typeof FileReader != 'undefined',
                                dnd: 'draggable' in document.createElement('span'),
                                formdata: !!window.FormData,
                                progress: "upload" in new XMLHttpRequest
                            },
                    support = {
                        filereader: document.getElementById('filereader'),
                        formdata: document.getElementById('formdata'),
                        progress: document.getElementById('progress')
                    },
                    acceptedTypes = {
                        'image/pdf': false,
                        'image/jpeg': true,
                        'image/jpg': true,
                        'image/docx': false,
                        'image/txt': false
                    },
                    progress = document.getElementById('uploadprogress'),
                            fileupload = document.getElementById('upload');

                    "filereader formdata progress".split(' ').forEach(function (api) {
                        if (tests[api] === false) {
                            support[api].className = 'fail';
                        } else {
                            // FFS. I could have done el.hidden = true, but IE doesn't support
                            // hidden, so I tried to create a polyfill that would extend the
                            // Element.prototype, but then IE10 doesn't even give me access
                            // to the Element object. Brilliant.
                            support[api].className = 'hidden';
                        }
                    });

                    function previewfile(file) {
                        if (tests.filereader === true && acceptedTypes[file.type] === true) {
                            var reader = new FileReader();
                            reader.onload = function (event) {
                                var image = new Image();
                                image.src = event.target.result;
                                //processHistogram(image);
                                image.width = 250; // a fake resize
                                holder.appendChild(image);
                            };

                            reader.readAsDataURL(file);
                        } else {
                            holder.innerHTML += '<p>Uploaded ' + file.name + ' ' + (file.size ? (file.size / 1024 | 0) + 'K' : '');
                            console.log(file);
                        }
                    }

                    /////////////////// helias
                    function processHistogram(img) {
                        var histCanvas = document.getElementById('histogram'),
                                histCtx = histCanvas.getContext('2d'),
                                histType = document.getElementById('histType'),
                                accuracy = document.getElementById('accuracy'),
                                runtime = document.getElementById('runtime'),
                                plotStyle = document.getElementById('plotStyle'),
                                plotFill = document.getElementById('plotFill'),
                                plotColors = document.getElementById('plotColors'),
                                imgSelector = document.getElementById('imgSelector'),
                                //img = document.getElementById('myImg'),
                                imgCanvas = document.createElement('canvas'),
                                imgCtx = imgCanvas.getContext('2d'),
                                gradients = {
                                    'red': histCtx.createLinearGradient(0, 0, img.width, 0),
                                    'green': histCtx.createLinearGradient(0, 0, img.width, 0),
                                    'blue': histCtx.createLinearGradient(0, 0, img.width, 0),
                                    'hue': histCtx.createLinearGradient(0, 0, img.width, 0),
                                    'val': histCtx.createLinearGradient(0, 0, img.width, 0),
                                    'cyan': histCtx.createLinearGradient(0, 0, img.width, 0),
                                    'magenta': histCtx.createLinearGradient(0, 0, img.width, 0),
                                    'yellow': histCtx.createLinearGradient(0, 0, img.width, 0),
                                    'kelvin': histCtx.createLinearGradient(0, 0, img.width, 0)
                                },
                        colors = {
                            'red': ['#000', '#f00'],
                            'green': ['#000', '#0f0'],
                            'blue': ['#000', '#00f'],
                            'hue': [
                                '#f00', // 0, Red,       0°
                                '#ff0', // 1, Yellow,   60°
                                '#0f0', // 2, Green,   120°
                                '#0ff', // 3, Cyan,    180°
                                '#00f', // 4, Blue,    240°
                                '#f0f', // 5, Magenta, 300°
                                '#f00'], // 6, Red,     360°
                            'val': ['#000', '#fff'],
                            'kelvin': ['#fff', '#000'],
                            'cyan': ['#000', '#0ff'],
                            'yellow': ['#000', '#ff0'],
                            'magenta': ['#000', '#f0f']
                        },
                        discreetWidth = Math.round(histCanvas.width / 255),
                                imgData = null;

                        var initHistogram = function () {
                            // Plot defaults
                            accuracy.value = 1;
                            plotStyle.value = 'continuous';
                            plotColors.value = 'flat';
                            plotFill.checked = true;
                            histType.value = 'rgb';

                            var grad, color, i, n;
                            for (grad in gradients) {
                                color = colors[grad];
                                grad = gradients[grad];

                                for (i = 0, n = color.length; i < n; i++) {
                                    grad.addColorStop(i * 1 / (n - 1), color[i]);
                                }
                            }
                        };

                        var imgLoaded = function () {
                            img.className = '';
                            imgCanvas.width = img.width;
                            imgCanvas.height = img.height;
                            imgCtx.drawImage(img, 0, 0);
                            imgData = imgCtx.getImageData(0, 0, img.width, img.height).data;
                            img.className = 'thumb';
                            updateHist();
                        };

                        var calcHist = function (type) {
                            var chans = [[]],
                                    maxCount = 0, val, subtypes = [type];

                            if (type === 'rgb') {
                                chans = [[], [], []];
                                subtypes = ['red', 'green', 'blue'];
                            } else if (type === 'cmyk') {
                                chans = [[], [], [], []];
                                subtypes = ['cyan', 'magenta', 'yellow', 'kelvin'];
                            }

                            var step = parseInt(accuracy.value);
                            if (isNaN(step) || step < 1) {
                                step = 1;
                            } else if (step > 50) {
                                step = 50;
                            }
                            accuracy.value = step;
                            step *= 4;

                            for (var i = 0, n = imgData.length; i < n; i += step) {
                                if (type === 'rgb' || type === 'red' || type === 'green' || type ===
                                        'blue') {
                                    val = [imgData[i], imgData[i + 1], imgData[i + 2]];

                                } else if (type === 'cmyk' || type === 'cyan' || type === 'magenta' ||
                                        type === 'yellow' || type === 'kelvin') {
                                    val = rgb2cmyk(imgData[i], imgData[i + 1], imgData[i + 2]);

                                } else if (type === 'hue' || type === 'sat' || type === 'val') {
                                    val = rgb2hsv(imgData[i], imgData[i + 1], imgData[i + 2]);
                                }

                                if (type === 'red' || type === 'hue' || type === 'cyan') {
                                    val = [val[0]];
                                } else if (type === 'green' || type === 'sat' || type === 'magenta') {
                                    val = [val[1]];
                                } else if (type === 'blue' || type === 'val' || type === 'yellow') {
                                    val = [val[2]];
                                } else if (type === 'kelvin') {
                                    val = [val[3]];
                                }

                                for (var y = 0, m = val.length; y < m; y++) {
                                    if (val[y] in chans[y]) {
                                        chans[y][val[y]]++;
                                    } else {
                                        chans[y][val[y]] = 1;
                                    }

                                    if (chans[y][val[y]] > maxCount) {
                                        maxCount = chans[y][val[y]];
                                    }
                                }
                            }

                            if (maxCount === 0) {
                                return;
                            }

                            histCtx.clearRect(0, 0, histCanvas.width, histCanvas.height);

                            if (plotFill.checked && chans.length > 1) {
                                histCtx.globalCompositeOperation = 'lighter';
                            }

                            for (var i = 0, n = chans.length; i < n; i++) {
                                drawHist(subtypes[i], chans[i], maxCount);
                            }

                            if (plotFill.checked && chans.length > 1) {
                                histCtx.globalCompositeOperation = 'source-over';
                            }
                        };

                        var rgb2hsv = function (red, green, blue) {
                            red /= 255;
                            green /= 255;
                            blue /= 255;

                            var hue, sat, val,
                                    min = Math.min(red, green, blue),
                                    max = Math.max(red, green, blue),
                                    delta = max - min,
                                    val = max;

                            // This is gray (red==green==blue)
                            if (delta === 0) {
                                hue = sat = 0;
                            } else {
                                sat = delta / max;

                                if (max === red) {
                                    hue = (green - blue) / delta;
                                } else if (max === green) {
                                    hue = (blue - red) / delta + 2;
                                } else if (max === blue) {
                                    hue = (red - green) / delta + 4;
                                }

                                hue /= 6;
                                if (hue < 0) {
                                    hue += 1;
                                }
                            }

                            return [Math.round(hue * 255), Math.round(sat * 255), Math.round(val * 255)];
                        };

                        // Note that this is only an approximation of the CMYK color space. for proper
                        // CMYK color space conversion one needs to implement support for color
                        // profiles.
                        var rgb2cmyk = function (red, green, blue) {
                            var cyan = 1 - red / 255;
                            magenta = 1 - green / 255;
                            yellow = 1 - blue / 255;
                            black = Math.min(cyan, magenta, yellow, 1);

                            if (black === 1) {
                                cyan = magenta = yellow = 0;
                            } else {
                                var w = 1 - black;
                                cyan = (cyan - black) / w;
                                magenta = (magenta - black) / w;
                                yellow = (yellow - black) / w;
                            }

                            return [Math.round(cyan * 255), Math.round(magenta * 255),
                                Math.round(yellow * 255), Math.round(black * 255)];
                        };

                        var drawHist = function (type, vals, maxCount) {
                            var ctxStyle;

                            if (plotFill.checked || plotStyle.value === 'discreet') {
                                ctxStyle = 'fillStyle';
                                histCtx.strokeStyle = '#000';
                            } else {
                                ctxStyle = 'strokeStyle';
                            }

                            if (plotColors.value === 'flat') {
                                if (type === 'hue') {
                                    histCtx[ctxStyle] = gradients.hue;
                                } else if (type in colors && type !== 'val') {
                                    histCtx[ctxStyle] = colors[type][1];
                                } else {
                                    histCtx[ctxStyle] = '#000';
                                }

                            } else if (plotColors.value === 'gradient') {
                                if (type in gradients) {
                                    histCtx[ctxStyle] = gradients[type];
                                } else {
                                    histCtx[ctxStyle] = '#000';
                                }
                            } else if (plotColors.value === 'none') {
                                histCtx[ctxStyle] = '#000';
                            }

                            if (plotStyle.value === 'continuous') {
                                histCtx.beginPath();
                                histCtx.moveTo(0, histCanvas.height);
                            }

                            for (var x, y, i = 0; i <= 255; i++) {
                                if (!(i in vals)) {
                                    continue;
                                }

                                y = Math.round((vals[i] / maxCount) * histCanvas.height);
                                x = Math.round((i / 255) * histCanvas.width);

                                if (plotStyle.value === 'continuous') {
                                    histCtx.lineTo(x, histCanvas.height - y);
                                } else if (plotStyle.value === 'discreet') {
                                    if (plotFill.checked) {
                                        histCtx.fillRect(x, histCanvas.height - y, discreetWidth, y);
                                    } else {
                                        histCtx.fillRect(x, histCanvas.height - y, discreetWidth, 2);
                                    }
                                }
                            }

                            if (plotStyle.value === 'continuous') {
                                histCtx.lineTo(x, histCanvas.height);
                                if (plotFill.checked) {
                                    histCtx.fill();
                                }
                                histCtx.stroke();
                                histCtx.closePath();
                            }
                        };

                        var updateHist = function () {
                            var timeStart = (new Date()).getTime();

                            runtime.innerHTML = 'Calculating histogram...';

                            calcHist(histType.value);

                            var timeEnd = (new Date()).getTime();
                            runtime.innerHTML = 'Plot runtime: ' + (timeEnd - timeStart) + ' ms.';
                        };

                        var thumbClick = function (ev) {
                            ev.preventDefault();

                            if (this.className === 'thumb') {
                                this.className = '';
                            } else {
                                this.className = 'thumb';
                            }
                        };

                        /*
                         img.addEventListener('load', imgLoaded, false);
                         img.addEventListener('click', thumbClick, false);
                         histCanvas.addEventListener('click', thumbClick, false);
                         
                         histType.addEventListener('change', updateHist, false);
                         plotStyle.addEventListener('change', updateHist, false);
                         plotFill.addEventListener('change', updateHist, false);
                         plotColors.addEventListener('change', updateHist, false);
                         accuracy.addEventListener('change', updateHist, false);
                         
                         imgSelector.addEventListener('change', function () {
                         img.src = this.value;
                         }, false);
                         */
                        initHistogram();
                        imgLoaded();

                    }

                    function readfiles(files) {
                        debugger;
                        var formData = tests.formdata ? new FormData() : null;
                        var mul = 0;
                        for (var i = 0; i < files.length; i++) {
                            if (i > 0) {
                                mul = 1;
                            } else {
                                if (tests.formdata) {
                                    formData.append('file', files[i]);

                                }
                                previewfile(files[i]);
                            }

                        }
                        if (mul == 1) {
                            alert("Can Upload Only One File\nWith Respect To Security Procedures....");
                        }

                        // now post a new XHR request
                        if (tests.formdata) {
                            var xhr = new XMLHttpRequest();
                            xhr.onreadystatechange = getReadyStateHandler(xhr);

                            xhr.open('POST', '<%=uploadPage%>?msg=' + document.getElementById('aname').value + "&tags=" + document.getElementById('tagz').value);
                            xhr.onload = function () {
                                progress.value = progress.innerHTML = 100;
                            };

                            if (tests.progress) {
                                xhr.upload.onprogress = function (event) {
                                    if (event.lengthComputable) {
                                        var complete = (event.loaded / event.total * 100 | 0);
                                        progress.value = progress.innerHTML = complete;
                                    }
                                }
                            }

                            xhr.send(formData);
                        }

                        /* 
                         * Returns a function that waits for the state change in XMLHttpRequest 
                         */
                        function getReadyStateHandler(xmlHttpRequest) {
                            // an anonynous function returned  
                            // it listens to the XMLHttpRequest instance  
                            return function () {
                                if (xmlHttpRequest.readyState == 4) {
                                    if (xmlHttpRequest.status == 200) {
                                        var original = document.getElementById('response').innerHTML;
                                        document.getElementById('response').innerHTML = original + "<br />" + xmlHttpRequest.responseText;
                                    } else {
                                        //alert("Http error " + xmlHttpRequest.status + ":" + xmlHttpRequest.statusText);
                                    }
                                }
                            };
                        }
                    }

                    if (tests.dnd) {
                        holder.ondragover = function () {
                            this.className = 'hover';
                            return false;
                        };
                        holder.ondragend = function () {
                            this.className = '';
                            return false;
                        };
                        holder.ondrop = function (e) {
                            this.className = '';
                            e.preventDefault();
                            readfiles(e.dataTransfer.files);
                        }
                    } else {
                        fileupload.className = 'hidden';
                        fileupload.querySelector('input').onchange = function () {
                            readfiles(this.files);
                        };
                    }

                </script>


                <div id="response">
                </div> 
                <div id="footer_homepage">
                    <div id="footer_homepage_left">
                        <a href="welcome.jsp">Back</a>

                    </div>
                    <!--div id="footer_homepage_right">                
                        <a href="#" onclick="DDG.toggleall('grp_modal', -1, 'more_menu');
                                        DDG.toggle('more_menu')" onmouseover="DDG.toggleall('grp_modal', -1);
                                                DDG.toggle('more_menu')">More</a>		
                        <ul id="more_menu" class="grp_modal">
                            <li><a href="/about" tabindex="-1">About</a></li>
                            
                        </ul>
                    </div-->
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
