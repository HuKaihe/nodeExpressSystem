#node_Express项目通用系统

##项目结构
###启动
bin文件夹

    supervisor ./bin/www
###模型
model文件夹

    /model
###公共静态资源
静态资源

    app.use(express.static(path.join(__dirname, '/')));
    
    <!--获取css文件-->
    <link href="/public/stylesheets/style.css" rel='stylesheet'>

library文件夹中存放各种第三方资源库，比如jquery, animate.css
###视图

    #存放hbs渲染的页面
    /view
    #存放html静态页面
    /view/static
###路由
route文件夹，你可以

1. 前台展示 index.js 访问 /
2. 后台管理 system.js 访问 /system/
###node_modules
    "async": "^2.1.4",
    "body-parser": "^1.15.2",
    "connect-flash": "^0.1.1",
    "cookie-parser": "~1.4.3",
    "cookie-session": "^2.0.0-alpha.2",
    "debug": "~2.2.0",
    "express": "~4.13.4",
    "express-session": "^1.15.0",
    "formidable": "^1.1.1",
    "hbs": "~4.0.0",
    "moment": "^2.17.1",
    "morgan": "~1.7.0",
    "multer": "^1.3.0",
    "mysql": "^2.13.0",
    "serve-favicon": "~2.3.0"

##公共模块
###db.js
#### 引入   

    let db = require('../model/db');
    
#### 增删改查

其中value为可选参数，可以是字符串或者字符串数组
    
    db.query/delete/insert/update(sql, [value], cb)
    
#### sql生成器

    /**
     * 拼接查询的sql语句
     * table 表 字符串||数组
     * cases where条件  字符串||字符串数组||对象||对象数组
     *       对象 field : 字段、relation : 关系（默认=）、logic : 逻辑关系（默认and）
     * value 查找的字段 字符串||数组
     * limit 记录截断 数组 [截断开始，截断结束]
     * extra 其他条件 字符串||数组
     * */
     
     /**
      * case支持以下几种情况:
      * 1. "name" 代表字段的单个字符串，此时，关系默认为判等
      * 2. ["name","password"] 字段数组，此时逻辑运算符为“与”，关系默认为判等
      * 3. {'field':'name', relation:'='} 字段条件对象
      * 4. [{'field':'name', relation:'='},{'field':'name', relation:'=',logic:'or'}] 字段数组
      *
      * */
      
    db.queryMaker(table, cases, value, limit, extra);
    
    // 例如
    db.queryMaker('blog',['title','pub_date'],'*',[1,2],"order by pub_date");
    // => select * from blog where title=? and pub_date =? limit 1,2 order by pub_date
    
    db.queryMaker('blog', [{'field':'title'},{'field':'pub_date', relation:'=',logic:'or'}])
    // => select * from blog where title=? or pub_date=?
    
**注意，queryMaker函数中，想要指定后面的参数，前面的参数必须指定，如果没有，则可以使用null;query/delete/insert/update方法第二个参数可以完全省略，直接指定回调函数**
    
###rightCheck.js
检查用户是否登录

##规范
node后台直接使用ES6进行编码，前台使用ES5或者经babel解码后的ES6进行编码。
    
    