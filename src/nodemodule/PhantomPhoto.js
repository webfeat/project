  var webPage = require('webpage');
            var page = webPage.create();
            page.zoomFactor = 1;
            
            page.viewportSize =  { width: 1920, height: 1080 };
            page.open('http://www.baidu.com', function start(status,ddd) {
                console.log(status);
                page.render('src/dist3/img/849c25bc-31fd-4f5b-93ec-c5f4d1f09a02' + '.jpeg', {format: 'jpeg', quality: '1000'});
                phantom.exit();
            });