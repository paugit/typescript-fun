var context;
var imageData;
var pixels;
var width;
var height;

window.onload = () => {
    let canvas = <HTMLCanvasElement>document.getElementById("plasma");
    context = canvas.getContext("2d")

    width = canvas.width;
    height = canvas.height;

    imageData = context.getImageData(0, 0, width, height);
    pixels = imageData.data;

    mainLoop();
 }
 
 function mainLoop() {
    let hw = width / 2.0;
    let hh = height / 2.0;

    let t = Date.now() / 500.0;
    let index = 0;

    for(let y=0; y<height; y++) {
        for(let x=0; x<width; x++) {
            let xx = x - hw;
            let yy = y - hh;
            
            let aa = Math.sin(x / 22.0 + t * 0.99);
            let bb = Math.sin(y / 25.0 + t * 1.02);
            let cc = Math.sin((y + x) / 14.0 + t);

            let dd = Math.sin(Math.sqrt(xx * xx + yy * yy) / 9.0 + t * 1.01);

            let v = (aa + bb + cc + dd) / 4.0;

            pixels[index++] = 128 + Math.sin(3.145 + v * 4) * 128;
            pixels[index++] = 128 + Math.sin(v * 10) * 128;
            pixels[index++] = 128 + Math.sin(1.5 + v * 4) * 64;
            pixels[index++] = 255;
        }
    }

    context.putImageData(imageData, 0, 0);

    requestAnimationFrame(mainLoop);
 }
 