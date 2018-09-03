var arr = [{"address":"./dist/views/smart-analyze/index.html","title":"smart-analyze","image":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535975434508&di=236ab2a54a0a4c3d0b7eadeb03ed013f&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Fback_pic%2F03%2F69%2F58%2F1257b51c395371e.jpg"},{"address":"./dist/views/spread/index.html","title":"spread","image":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535975434508&di=236ab2a54a0a4c3d0b7eadeb03ed013f&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Fback_pic%2F03%2F69%2F58%2F1257b51c395371e.jpg"},{"address":"./dist/views/transportation/index.html","title":"transportation","image":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535975434508&di=236ab2a54a0a4c3d0b7eadeb03ed013f&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Fback_pic%2F03%2F69%2F58%2F1257b51c395371e.jpg"},{"address":"./dist/views/transshipment/index.html","title":"transshipment","image":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535975434508&di=236ab2a54a0a4c3d0b7eadeb03ed013f&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Fback_pic%2F03%2F69%2F58%2F1257b51c395371e.jpg"},{"address":"./dist/views/type-hot/index.html","title":"type-hot","image":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535975434508&di=236ab2a54a0a4c3d0b7eadeb03ed013f&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Fback_pic%2F03%2F69%2F58%2F1257b51c395371e.jpg"},{"address":"./dist/views/videoWatch/index.html","title":"videoWatch","image":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535975434508&di=236ab2a54a0a4c3d0b7eadeb03ed013f&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Fback_pic%2F03%2F69%2F58%2F1257b51c395371e.jpg"},{"address":"./dist/views/weibo/index.html","title":"weibo","image":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535975434508&di=236ab2a54a0a4c3d0b7eadeb03ed013f&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Fback_pic%2F03%2F69%2F58%2F1257b51c395371e.jpg"}];
// 获得外部容器控件
var container = document.getElementById('container')
for (var i = 0; i < arr.length; i++) {
    var h3 = document.createElement('h3');
    // 动态生成a标签
    var a = document.createElement('a');
    a.setAttribute('class', 'containerC');
    a.href = arr[i].address;
    a.target = "_blank";
    //动态生成a中的img标签、strong标签及p标签
    var img = document.createElement('img');
    var strong = document.createElement('strong');
    var p = document.createElement('p');
    //动态设置img的src路径及h4标签和介绍内容
    img.src = arr[i].image;
    strong.innerHTML = arr[i].title;
    p.innerHTML = arr[i].title;
    // 将img标签和strong标签加入到每个a标签上
    a.appendChild(img);
    a.appendChild(strong);
    a.appendChild(p);
    // 将a标签加到外部容器上
    container.appendChild(a);



}