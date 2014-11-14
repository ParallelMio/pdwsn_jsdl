/**
 * Created by LV on 2014/11/15.
 */
require.config({
    packages: [
        {
            name: 'zrender',
            location: 'src',
            main: 'zrender'
        }
    ]
});
require(
    [
        "zrender",
        "zrender/animation/animation",
        "zrender/shape/BezierCurve",
        "zrender/shape/Line",
        "zrender/shape/Image",
        "zrender/shape/Rectangle"
    ],
    function (zrender, Animation, BezierCurveShape, LineShape, ImageShape, RectangleShape) {

        // 初始化zrender
        var zr = zrender.init(document.getElementById("Main"));
        var color = require('zrender/tool/color');
        var width = Math.ceil(zr.getWidth());
        var height = Math.ceil(zr.getHeight());
        var PeakNum = 2;
        var RadinSize = width / PeakNum;
        var MaxCotainerHeight = height;
        var LevelHeight = 100;
        var RadinPeak = 30;
        var SpeedTime = 3500;
        var pipStrokeColor = '#000';
        var pipeLineWidth = 2;
        var pipeHeight = height - 200;

        // 背景墙 右
        DrawImage(zr, ImageShape, 'img/wall.jpg', 300, pipeHeight - 118, 400, 330, 0.3, false);
        // 背景墙 左
        DrawImage(zr, ImageShape, 'img/wall_left.jpg', -100, pipeHeight + 5, 200, 200, 0.3, false);
        // 塔
        DrawImage(zr, ImageShape, 'img/tower.png', 700 + (width - 700) / 2 - 50, pipeHeight - 320, 100, 200, 0.9, true);
        // 草丛
        DrawImage(zr, ImageShape, 'img/grass.png', 700, pipeHeight - 148, width - 700, 30, 1, false);
        // 井壁
        DrawImage(zr, ImageShape, 'img/well.png', 100, pipeHeight - 162, 200, 370, 0.5, false);
        // 井盖
        DrawImageWellCap(zr, ImageShape, 'img/well_cap.png', 110, pipeHeight - 165, 180, 30, 1, false);
        // 土壤层
        DrawImage(zr, ImageShape, 'img/soil.png', 700, pipeHeight - 118, width - 700, 400, 0.9, false);
        // 波浪
        DrawWave(zr, BezierCurveShape, PeakNum, RadinSize, MaxCotainerHeight, LevelHeight, RadinPeak, SpeedTime, 0, 0, 'rgba(0,153,204,0.4)');
        DrawWave(zr, BezierCurveShape, PeakNum, RadinSize, MaxCotainerHeight, LevelHeight, RadinPeak, SpeedTime, 200, 50, 'rgba(0,153,204,0.2)');
        // 左侧 横着
        DrawLine(zr, LineShape, 0, pipeHeight + 5, 100, pipeHeight + 5, pipStrokeColor, pipeLineWidth);
        // 左侧 竖着
        DrawLine(zr, LineShape, 100, pipeHeight + 5, 100, pipeHeight - 150, pipStrokeColor, pipeLineWidth);
        // 井盖 左边沿
        DrawLine(zr, LineShape, 100, pipeHeight - 150, 120, pipeHeight - 150, pipStrokeColor, pipeLineWidth);
        // 井盖 右边沿
        DrawLine(zr, LineShape, 280, pipeHeight - 150, 300, pipeHeight - 150, pipStrokeColor, pipeLineWidth);
        DrawLine(zr, LineShape, 300, pipeHeight - 150, 300, pipeHeight - 115, pipStrokeColor, pipeLineWidth);
        DrawLine(zr, LineShape, 300, pipeHeight - 115, 700, pipeHeight - 115, pipStrokeColor, pipeLineWidth);
        // 画 仪表
        DrawImage(zr, ImageShape, 'img/meter.png', 300, pipeHeight - 100, 80, 100, 1, true);
        // 探头 线
        DrawLine(zr, LineShape, 300, pipeHeight - 80, 280, pipeHeight - 80, pipStrokeColor, 4);
        DrawLine(zr, LineShape, 280, pipeHeight - 80, 280, pipeHeight - 110, pipStrokeColor, 4);
        // 探头
        DrawRectangle(zr, RectangleShape, 280 - 5, pipeHeight - 140, 10, 30, [5, 5, 5, 5], 'rgba(204,0,0,255)', '#000', 2);
        // 仪表 下边 探头线
        DrawLine(zr, LineShape, 300 + 80 / 2, pipeHeight - 100 + 100, 300 + 80 / 2, pipeHeight - 100 + 230, '#666666 ', 2);
        // 水位探头
        DrawRectangle(zr, RectangleShape, 300 + 80 / 2 - 5, pipeHeight - 100 + 230, 10, 60, [2, 2, 2, 2], '#669966', '#000', 2);
        // 仪表 右侧 线
        DrawLine(zr, LineShape, 300 + 80, pipeHeight - 100 + 100 / 2 + 10, 700 + (width - 700) / 2, pipeHeight - 100 + 100 / 2 + 10, '#CCCCCC', 2);
        DrawLine(zr, LineShape, 700 + (width - 700) / 2, pipeHeight - 100 + 100 / 2 + 10, 700 + (width - 700) / 2, pipeHeight - 270, '#CCCCCC', 2);
        // 画 信号
        var signalCenterX =  700 + (width - 700) / 2;
        var signalCenterY = pipeHeight - 320 + 37;
        // 左侧
        DrawSignal(zr, BezierCurveShape, signalCenterX-20, signalCenterY-10, signalCenterX-30, signalCenterY, signalCenterX-20, signalCenterY+10, 1000, 4000);
        DrawSignal(zr, BezierCurveShape, signalCenterX-30, signalCenterY-15, signalCenterX-45, signalCenterY, signalCenterX-30, signalCenterY+15, 2000, 4000);
        DrawSignal(zr, BezierCurveShape, signalCenterX-40, signalCenterY-20, signalCenterX-60, signalCenterY, signalCenterX-40, signalCenterY+20, 3000, 4000);
        // 右侧
        DrawSignal(zr, BezierCurveShape, signalCenterX+20, signalCenterY-10, signalCenterX+30, signalCenterY, signalCenterX+20, signalCenterY+10, 1000, 4000);
        DrawSignal(zr, BezierCurveShape, signalCenterX+30, signalCenterY-15, signalCenterX+45, signalCenterY, signalCenterX+30, signalCenterY+15, 2000, 4000);
        DrawSignal(zr, BezierCurveShape, signalCenterX+40, signalCenterY-20, signalCenterX+60, signalCenterY, signalCenterX+40, signalCenterY+20, 3000, 4000);
        zr.render();
    });
function DrawSignal(zr, BezierCurveShape, xStart, yStart, cpX1, cpY1, xEnd, yEnd, time1, time2) {
    var shapeSignal = new BezierCurveShape({
        style: {
            xStart: xStart,
            yStart: yStart,
            cpX1: cpX1,
            cpY1: cpY1,
            xEnd: xEnd,
            yEnd: yEnd,
            strokeColor: 'red',
            lineWidth: 2
        },
        invisible: true
    });

    zr.addShape(shapeSignal);
    zr.animate(shapeSignal.id, "", true)
        .when(time1, {invisible: false})
        .when(time2, {invisible: false})
        .start();
}
function DrawRectangle(zr, RectangleShape, x, y, width, height, array, color, strokeColor, lineWidth) {
    var Rectangle = new RectangleShape({
        style: {
            x: x,
            y: y,
            width: width,
            height: height,
            radius: array,
            color: color,
            strokeColor: strokeColor,
            lineWidth: lineWidth,
            lineJoin: 'round'
        }
    });
    zr.addShape(Rectangle);

}
function DrawImage(zr, ImageShape, src, x, y, width, height, opacity, hoverable) {
    var image = new ImageShape({
        style: {
            image: src,
            width: width,
            height: height,
            x: x,
            y: y,
            opacity: opacity
        },
        hoverable: hoverable
    });
    zr.addShape(image);

}
function DrawImageWellCap(zr, ImageShape, src, x, y, width, height, opacity, hoverable) {
    var image = new ImageShape({
        style: {
            image: src,
            width: width,
            height: height,
            x: x,
            y: y,
            opacity: opacity
        },
        hoverable: hoverable

    });
    zr.addShape(image);
    zr.animate(image.id, "", true).when(5000, {
        rotation: [0, x, y + height / 2]
    }).when(10000, {
        rotation: [1, x, y + height / 2]
    }).when(20000, {
        rotation: [1, x, y + height / 2]
    }).when(30000, {
        rotation: [0, x, y + height / 2]
    }).start();

}
/**
 * 画直线
 * @param zr
 * @param LineShape
 * @param xStart
 * @param yStart
 * @param xEnd
 * @param yEnd
 * @param strokeColor
 * @param lineWidth
 * @constructor
 */
function DrawLine(zr, LineShape, xStart, yStart, xEnd, yEnd, strokeColor, lineWidth) {
    var LineObj = new LineShape({
        style: {
            xStart: xStart,
            yStart: yStart,
            xEnd: xEnd,
            yEnd: yEnd,
            strokeColor: strokeColor,
            lineWidth: lineWidth
        }
    });
    zr.addShape(LineObj);
}
/**
 * 画 水波
 * @param zr
 * @param BezierCurveShape
 * @param PeakNum
 * @param RadinSize
 * @param MaxCotainerHeight
 * @param LevelHeight
 * @param RadinPeak
 * @param SpeedTime
 * @param TimeOffset
 * @param StartOffset
 * @param RGBA
 * @constructor
 */
function DrawWave(zr, BezierCurveShape, PeakNum, RadinSize, MaxCotainerHeight, LevelHeight, RadinPeak, SpeedTime, TimeOffset, StartOffset, RGBA) {
    for (var i = -PeakNum - 1; i <= PeakNum; i++) {
        var BezierCurveObj = new BezierCurveShape({
            style: {
                xStart: i * RadinSize + StartOffset,
                yStart: MaxCotainerHeight,
                cpX1: i * RadinSize + RadinSize / 2 + StartOffset,
                cpY1: MaxCotainerHeight + RadinPeak,
                xEnd: i * RadinSize + RadinSize + StartOffset,
                yEnd: MaxCotainerHeight,
                strokeColor: RGBA,
                lineWidth: LevelHeight * 2
            },
            hoverable: false
        });
        zr.addShape(BezierCurveObj);
        RadinPeak = -RadinPeak;
        zr.animate(BezierCurveObj.id, "", true).when(SpeedTime + TimeOffset, {
            position: [RadinSize * 2, 0]
        }).start();
    }
}
