<%-- 
    Document   : hist
    Created on : May 14, 2019, 6:36:52 PM
    Author     : India
--%>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>HTML 5 Canvas-based image histogram example</title>
        <script type="text/javascript"><!--
    window.addEventListener('load', function () {
                var histCanvas = document.getElementById('histogram'),
                        histCtx = histCanvas.getContext('2d'),
                        histType = document.getElementById('histType'),
                        accuracy = document.getElementById('accuracy'),
                        runtime = document.getElementById('runtime'),
                        plotStyle = document.getElementById('plotStyle'),
                        plotFill = document.getElementById('plotFill'),
                        plotColors = document.getElementById('plotColors'),
                        imgSelector = document.getElementById('imgSelector'),
                        img = document.getElementById('myImg'),
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
                        '#f00', // 0, Red,       0�
                        '#ff0', // 1, Yellow,   60�
                        '#0f0', // 2, Green,   120�
                        '#0ff', // 3, Cyan,    180�
                        '#00f', // 4, Blue,    240�
                        '#f0f', // 5, Magenta, 300�
                        '#f00'], // 6, Red,     360�
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

                initHistogram();
                imgLoaded();
            }, false);
            // --></script>

        <style type="text/css"><!--
            #histogram, #myImg {
                border: 1px solid #000;
                cursor: pointer;
                float: left;
                margin-right: 15px;
                margin-bottom: 15px;
            }

            #myImg.thumb {
                max-width: 300px;
                max-height: 400px;
            }

            #histogram.thumb {
                max-width: 300px;
                max-height: 200px;
            }

            #runtime { clear: both }
            --></style>
    </head>
    <body>
        <h1>Image Histogram Demo</h1>

        <p><label>Image: <select id="imgSelector">
                    <option value="histdemo/drop.jpg">Drop</option>
                    <option value="histdemo/eye.jpg">Eye</option> 
                    <option value="histdemo/lena.jpg">Lena</option> 
                </select></label></p>

        <p><a href=""><img 
                    class="thumb" id="myImg" src="histdemo/drop.jpg" alt="Drop"></a></p>

        <p>
            <canvas class="thumb" id="histogram" width="800" height="600">
                Your browser does not have support for Canvas.
            </canvas>
        </p>

        <p id="runtime">Plot runtime...</p>

        <p><label>Histogram for: <select id="histType">
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

        <p><label>Count every <input id="accuracy" type="number" min="1" max="50" 
                                     value="1"> pixels</label></p>

        <p><label>Plot style: <select id="plotStyle">
                    <option value="continuous">Continuous</option>
                    <option value="discreet">Discreet</option>
                </select></label></p>

        <p><label>Plot fill <input id="plotFill" type="checkbox"></label></p>

        <p><label>Plot colors: <select id="plotColors">
                    <option value="none">None</option>
                    <option value="flat">Flat colors</option>
                    <option value="gradient">Gradients</option>
                </select></label></p>
    </body>
</html>
