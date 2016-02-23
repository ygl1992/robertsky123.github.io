define("app",[],function(){var t=angular.module("app",["ui.router","ngAnimate","ngSanitize"]);return t}),define("controller/homeController",["app"],function(t){t.controller("homeController",["$scope","$stateParams","$state",function(t,e,n){}])}),define("service/libsList",["app"],function(t){t.factory("$libList",["$http",function(t){var e=function(e){var n=SITE_CONFIG.MODAL_PATH+"libslist.json?v="+SITE_CONFIG.VERSION;t.get(n).success(function(t){e(null,t)}).error(function(){console.log("$libList 服务失败")})};return{find:e}}])}),define("controller/libsListController",["app","service/libsList"],function(t){t.controller("libsListController",["$scope","$location","$stateParams","$state","$libList",function(t,e,n,i,o){function l(e){t.type=e,t.libLists=angular.copy("all"===e?r:_.filter(r,{type:e}))}var r;t.type=null,o.find(function(e,i){t.libLists=i.list,r=_.clone(i.list),n.type&&l(n.type),i.typeList.unshift({title:"全部",type:"all"}),t.types=i.typeList}),t.filter=function(t){e.search({type:t}),l(t)},t.isActive=function(e){return e==t.type?!0:void 0}}])}),define("userInfo",[],function(){var t=[{authorId:1,name:"陈振远",avatar:"3.jpg"},{authorId:2,name:"宋寒永",avatar:"2.jpg"},{authorId:3,name:"沈晨瑶",avatar:"1.jpg"},{authorId:4,name:"杨灿",avatar:"4.jpg"}];return t}),define("service/libsDetail",["app"],function(t){t.factory("$libDetail",["$http",function(t){var e=function(e,n){var i=SITE_CONFIG.COLLECTION_PATH+e+".md?v="+FILE_VERSION[e].version;t.get(i).success(function(t){n(null,t)}).error(function(){console.log("$libDetail 服务失败")})};return{find:e}}])}),define("controller/libsDetailController",["app","userInfo","service/libsDetail","service/libsList"],function(t,e){t.controller("libsDetailController",["$scope","$stateParams","$state","$libDetail","$libList",function(t,n,i,o,l){var r=n.id,s="";o.find(r,function(e,n){t.content=marked(n),setTimeout(function(){$("pre code").each(function(t,e){hljs.highlightBlock(e)})},0)}),l.find(function(n,i){s=_.filter(i.list,{id:r})[0].authorId,t.author=_.filter(e,{authorId:parseInt(s,10)})[0]})}])}),define("service/snippetsList",["app"],function(t){t.factory("$snippetList",["$http",function(t){var e=function(e){var n=SITE_CONFIG.MODAL_PATH+"snippets.json?v="+SITE_CONFIG.VERSION;t.get(n).success(function(t){e(null,t)}).error(function(){console.log("$libList 服务失败")})};return{find:e}}])}),define("controller/snippetsListController",["app","service/snippetsList"],function(t){t.controller("snippetsListController",["$scope","$location","$stateParams","$state","$snippetList",function(t,e,n,i,o){function l(e){t.type=e,t.libLists=angular.copy("all"===e?r:_.filter(r,{type:e}))}var r;t.type=null,o.find(function(e,i){t.libLists=i.list,r=_.clone(i.list),n.type&&l(n.type),i.typeList.unshift({title:"全部",type:"all"}),t.types=i.typeList}),t.filter=function(t){e.search({type:t}),l(t)},t.isActive=function(e){return e==t.type?!0:void 0}}])}),define("service/snippetsDetail",["app"],function(t){t.factory("$snippetDetail",["$http",function(t){var e=function(e,n){var i=SITE_CONFIG.SNIPPETS_PATH+e+".md?v="+(new Date).getTime();t.get(i).success(function(t){n(null,t)}).error(function(){console.log("$snippetDetail 服务失败")})};return{find:e}}])}),define("controller/snippetsDetailController",["app","userInfo","service/snippetsDetail","service/snippetsList"],function(t,e){t.controller("snippetsDetailController",["$scope","$stateParams","$state","$snippetDetail","$snippetList",function(t,n,i,o,l){var r=n.id,s="";o.find(r,function(e,n){t.content=marked(n),setTimeout(function(){$("pre code").each(function(t,e){hljs.highlightBlock(e)})},0)}),l.find(function(n,i){s=_.filter(i.list,{id:r})[0].authorId,t.author=_.filter(e,{authorId:parseInt(s,10)})[0]})}])}),define("controller/aboutusController",["app","userInfo"],function(t,e){t.controller("aboutUsController",["$scope","$stateParams","$state",function(t,n,i){t.authors=e}])}),define("appRoute",["app","controller/homeController","controller/libsListController","controller/libsDetailController","controller/snippetsListController","controller/snippetsDetailController","controller/aboutusController"],function(t){t.config(["$stateProvider","$urlRouterProvider","$locationProvider",function(t,e,n){n.html5Mode(!1),e.otherwise("/"),t.state("home",{url:"/",templateUrl:"/views/home.html",controller:"homeController",pageTitle:"首页"}).state("libs",{url:"/libs?type",templateUrl:"/views/libsList.html",controller:"libsListController",pageTitle:"前端组件类库",reloadOnSearch:!1}).state("libs.detail",{url:"/:id",templateUrl:"/views/libsList.detail.html",controller:"libsDetailController",pageTitle:"前端组件类库"}).state("snippets",{url:"/snippets?type",templateUrl:"/views/snippetsList.html",controller:"snippetsListController",pageTitle:"前端组件类库",reloadOnSearch:!1}).state("snippets.detail",{url:"/:id",templateUrl:"/views/snippetsList.detail.html",controller:"snippetsDetailController",pageTitle:"前端组件类库"}).state("aboutus",{url:"/aboutus",templateUrl:"/views/aboutUs.html",controller:"aboutUsController",pageTitle:"关于我们"})}])}),define("appConifg",["app"],function(t){t.run(["$rootScope","$state","$stateParams","$anchorScroll",function(t,e,n,i){t.$state=e,t.$stateParams=n,t.$on("$stateChangeStart",function(t,e,n,i,o){NProgress.start()}),t.$on("$stateChangeSuccess",function(t,e,n,o,l){i();var r=e.name;-1!==r.indexOf("libs")?$("body").attr("class","pg-libslist"):-1!==r.indexOf("aboutus")?$("body").attr("class","pg-aboutus"):$("body").attr("class",""),$(".collapse").collapse("hide"),NProgress.done()})}]),t.config(["$httpProvider",function(t){}])}),function(){function t(){l=window.innerWidth,r=window.innerHeight,c={x:0,y:r},s=document.getElementById("js-bubble-canvas"),s.width=l,s.height=r,a=s.getContext("2d"),p=[];for(var t=0;.05*l>t;t++){var e=new o;p.push(e)}i()}function e(){window.addEventListener("resize",n)}function n(){l=window.innerWidth,r=window.innerHeight,s.width=l,s.height=r}function i(){if(u){a.clearRect(0,0,l,r);for(var t in p)p[t].draw()}requestAnimationFrame(i)}function o(){function t(){e.pos.x=Math.random()*l,e.pos.y=r+100*Math.random(),e.alpha=.1+.3*Math.random(),e.scale=.1+.3*Math.random(),e.velocity=Math.random()}var e=this;!function(){e.pos={},t()}(),this.draw=function(){e.alpha<=0&&t(),e.pos.y-=e.velocity,e.alpha-=5e-4,a.beginPath(),a.arc(e.pos.x,e.pos.y,20*e.scale,0,2*Math.PI,!1),a.fillStyle="rgba(255,255,255,"+e.alpha+")",a.fill()}}var l,r,s,a,p,c,u=!0;t(),e()}(),define("bubbleEffect",function(){}),require.config({baseUrl:"/js/",paths:{app:"app",appRoute:"app.route",appConifg:"app.config",userInfo:"component/userInfo",bubbleEffect:"component/bubble-effect"}}),require(["app","appRoute","appConifg","bubbleEffect"],function(){angular.bootstrap(document,["app"])}),define("main",function(){});