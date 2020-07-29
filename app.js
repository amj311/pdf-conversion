const Stopwatch = require("./stopwatch");

const pdfDirectory = "static";
const pathToPdfFile = "static/Document6.pdf";

/**
 * The following code utlizes a nodejs limbrary called pdf2html.
 * It works well inside of nodejs but has a few drawbacks:
 *  - It was designed to only produce a thumbnail, so it only processes one page at a time
 *  - It does not allow us to specify the output location.
 */
function do_pdf2html() {
    const pdf2html = require('pdf2html');

    const options = { page: 1, imageType: 'png', width: 50, height: 226 }
    
    pdf2htmlTimer = new Stopwatch("pdf2html", true);
    pdf2html.thumbnail(pathToPdfFile, options, (err, thumbnailPath) => {
        if (err) {
            console.error('Conversion error: ' + err)
        } else {
            console.log(thumbnailPath)
            pdf2htmlTimer.stop();
        }
    })    
}




/**
 * This code uses child_process to run pdftoppm with shell commands.
 * 
 * pdftoppm is part of the poppler-utils library which can be installed
 * on ubuntu with `sudo apt install poppler-utils`
 * 
 * This is a good option because it processes all pages and allows us to
 * specify both dimensions and output location
 */

function do_pdftoppm() {
    const { exec } = require("child_process");

    const pdftoppmTimer = new Stopwatch("pdftoppm", true);

    exec(`pdftoppm ${pathToPdfFile} ${pdfDirectory}/outputname -png`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        pdftoppmTimer.stop();
    });
}


setTimeout( () => {
    console.log("\nStarting pdf2html test...")
    do_pdf2html();
}, 0)

setTimeout( () => {
    console.log("\nStarting pdftoppm test...")
    do_pdftoppm();
}, 5000)