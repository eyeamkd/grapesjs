const fs = require('fs');
const path = require('path');
const localeDir = './locale';
const localeSrcDir = './src/i18n/locale';
//copying the contents from one file to another file synchronously 
const copyRecursiveSync = (src, dest) => { //src stands for source file from which is to be copied , dest file stands for the destination file to which the data needs to be copied 
    const exists = fs.existsSync(src); //returns true if the source path is true 
    const isDir = exists && fs.statSync(src).isDirectory(); //checking if the fileSystem's Stats info is describing a directory 

    if (isDir) { 
        fs.mkdirSync(dest); //if the source path is described as a directory then make a directory 
        fs.readdirSync(src).forEach((file) => { //read directory synchronously and iterate through the file 
            copyRecursiveSync(path.join(src, file), path.join(dest, file)); //recursion call having the source and the destination file  
        });
    } else if (exists) { 
        fs.createReadStream(src).pipe(fs.createWriteStream(dest)); //connecting the data flow from the readable stream to a  writeable stream 
    }
};

copyRecursiveSync(localeSrcDir, localeDir);

// Create locale/index.js file
let result = '';
fs.readdirSync(localeDir).forEach(file => {
    const name = file.replace('.js', '');
    result += `export { default as ${name} } from './${name}'\n`;
});
fs.writeFileSync(`${localeDir}/index.js`, result);
