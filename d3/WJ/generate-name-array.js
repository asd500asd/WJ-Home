/*
 * 递归同步抓取src/page  下所有一Routes.js命名的文件，最终生成src/page/allRoutes.js文件
 * */
var fs = require('fs');
var path = require('path');
var pagePath = path.join(__dirname, 'views');
var imports = [];
var routesNames = [];
getRoutes(pagePath);
console.log('routesNames', routesNames);

var w = [];
routesNames.forEach(function (n, i) {
    console.log('n', n);
    let o = {
        address: './dist/views/' + n + '/index.html',
        title: n,
        image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535975434508&di=236ab2a54a0a4c3d0b7eadeb03ed013f&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Fback_pic%2F03%2F69%2F58%2F1257b51c395371e.jpg'
    };
    w.push(o);
});

var nameString = 'var arr = ' + JSON.stringify(w) + ';\n' +
    '// 获得外部容器控件\n' +
    'var container = document.getElementById(\'container\')\n' +
    'for (var i = 0; i < arr.length; i++) {\n' +
    '    var h3 = document.createElement(\'h3\');\n' +
    '    // 动态生成a标签\n' +
    '    var a = document.createElement(\'a\');\n' +
    '    a.setAttribute(\'class\', \'containerC\');\n' +
    '    a.href = arr[i].address;\n' +
    '    a.target = "_blank";\n' +
    '    //动态生成a中的img标签、strong标签及p标签\n' +
    '    var img = document.createElement(\'img\');\n' +
    '    var strong = document.createElement(\'strong\');\n' +
    '    var p = document.createElement(\'p\');\n' +
    '    //动态设置img的src路径及h4标签和介绍内容\n' +
    '    img.src = arr[i].image;\n' +
    '    strong.innerHTML = arr[i].title;\n' +
    '    p.innerHTML = arr[i].title;\n' +
    '    // 将img标签和strong标签加入到每个a标签上\n' +
    '    a.appendChild(img);\n' +
    '    a.appendChild(strong);\n' +
    '    a.appendChild(p);\n' +
    '    // 将a标签加到外部容器上\n' +
    '    container.appendChild(a);\n' +
    '\n' +
    '\n' +
    '\n' +
    '}'
fs.writeFileSync(path.join(__dirname, 'index.js'), nameString);

function getRoutes(filePath, fileName, modulesName) {
    if (!modulesName) {
        modulesName = fileName;
    }

    var stat = fs.statSync(filePath);
    var isDir = stat.isDirectory();
    if (isDir) {
        var files = fs.readdirSync(filePath)
        // console.log('filePath', filePath);
        if (files && files.length) {
            files.forEach(function (fn, index) {
                var fp = path.join(filePath, fn);
                getRoutes(fp, fn, modulesName);
            });
        }
    } else {
        if (fileName === 'index.html') {
            console.log('fileNamehtml', fileName);

            var pathName = filePath.replace(pagePath, '');
            var routesPath = './dist/views'+pathName;

            if (process.platform.indexOf('win') >= 0) {
                routesPath = routesPath.replace(/\\/g, "\/");
            }
            console.log('routesPath', routesPath);
            routesNames.push(modulesName);
        }
    }
}

