/*此文件中设置了首页所有需要js实现的页面效果，主要分为：
 * 1.首页banner轮播图的特效
 * 2.购物车鼠标移入事件(此效果用CSS3实现，有兼容性问题)
 * 3.横向导航栏的鼠标移入事件
 * 4.竖向导航栏的鼠标移入事件
 * 5.小米明星单品的左右滑动效果
 * */





/*banner图轮播特效：
 * 1.特效集成了多种动画效果，每次动画完成时间为3s；
 * 2.特效为随机出现，特效进行过程中无法进行其他特效
 * 3.其他特效持续更新····
 * */
(function () {
  /** 公共数据区域* */
  /*图片数组*/
  var images = [
    'images/index/t1irjjb_kt1rxrhcrk.jpg',
    'images/index/t11zcgbkat1rxrhcrk.jpg',
    'images/index/t1u8e_btbt1rxrhcrk.jpg',
    'images/index/t1uacjb5zt1rxrhcrk.jpg',
    'images/index/t1jfh_bqet1rxrhcrk.jpg'
  ];
  /*公共函数区域*/
  function $(a) {
    return document.getElementsByClassName(a);
  }

  //数据函数
  function dataFn(effect, n) {          //n表示向左或向右
    this.width = 992;                   //图片宽度
    this.height = 420;                  //图片高度
    this.pardiv = $('nav-bmd')[0];     //主DIV
    this.img = $('banner-mimg')[0];      //主图片
    if (effect === 'press') {         //挤压特效数据
      this.speed = 0.8;                    //挤压时间/s
      this.transition = 'transform ' + this.speed + 's ease-out 0s';//过渡设置
      this.transform = 'scaleX(1)';//原始图片的初始比例，同时也作为新添加图片的最终比例
      this.newtransform = 'scaleX(0)';//新添加图片元素的初始比例，同时也作为原始图片的最终比例
      this.newtransformOrigin = 'right';//新添加图片从哪一侧出现
      this.transformOrigin = 'left';//原始图片从哪一侧退出
      if (n === (-1)) {
        this.newtransformOrigin = 'left';//根据哪侧按钮被单击新添加图片从哪一侧出现
        this.transformOrigin = 'right';//根据哪侧按钮被单击原始图片从哪一侧退出
      }
    } else if (effect === 'flip') {     //卷帘渐隐数据
      this.cname = 'collapse';          //指定新添加元素的class
      this.lwidth = 62;                 //指定新添加元素的宽度（必须能被图片宽度整除）
      this.zIndex = -1;                 //指定新添加元素的zIndex属性
      this.top = 0;                     //指定新添加元素的top定位
      this.left = 0;                    //指定新添加元素的left定位
      this.leftend = this.width;//指定最后一块div的left定位作为停止计时器的判定条件
      if (n === (-1)) {
        this.left = this.width - this.lwidth;//根据哪侧按钮被单击指定新添加元素left定位
        this.leftend = this.lwidth * n;                 //根据哪测按钮被单机设置停止计时器条件
      }
      this.opacity = 0;               //指定新添加元素的初始透明度
      this.opadd = 0.05;               //指定每次增加的透明度
      this.timeadd = 10;            //指定每次变换透明度的间隔时间
      this.divtimeadd = 20;         //指定每次添加新div的间隔时间
    } else if (effect === 'corner') {   //从页脚掀开特效数据
      this.cname = 'collapse';          //指定新添加元素的class
      this.lwidth = 124;                 //指定新添加元素的宽度（必须能被图片宽度整除）
      this.lcount = 0;                    //指定新添加元素的初始水平条数
      this.lcountend = this.width / this.lwidth;//指定新添加元素的水平条数
      this.vheight = 70;            //指定新添加元素的高度（必须能被图片高度整除）
      this.vcount = 0;               //指定新添加元素的初始垂直条数
      this.vcountend = this.height / this.vheight;//指定新添加元素的垂直条数
      this.zIndex = -1;                 //指定新添加元素的zIndex属性
      this.top = 0;                     //指定新添加元素的top定位
      this.left = 0;                    //指定新添加元素的left定位
      this.topend = this.height;          //指定最后垂直方向最后一块div的top定位作为停止计时器条件
      this.leftend = this.width;//指定最后一块div的left定位作为停止计时器的判定条件
      if (n === (-1)) {
        this.top = this.height - this.vheight;//指定新添加元素的top定位（执行中会不断更改）
        this.topend = this.vheight * n;//根据哪侧按钮被单击指定最后垂直方向最后一块div的top以停止计时器
        this.left = this.width - this.lwidth;//根据哪侧按钮被单击指定新添加元素left定位（执行中不断更改）
        this.leftend = this.lwidth * n;                 //根据哪测按钮被单机设置停止计时器条件
      }
      this.transition = 'opacity 0.5s ease-out 0ms'; //指定新添加元素的过渡效果（适当增加执行时间可改善效果）
      this.opacity = 0;               //指定新添加元素的初始透明度
      this.timeadd = 50;            //指定透明度变化的延迟时间(因为脚本的同步执行，适当增加此值可改善效果)
      this.divtimeadd = 50;         //指定每次添加新div的间隔时间（由于同步造成阻塞，适当调整改善属性）
      this.clrtime = 800;              //指定最后一块div开始渐变多久后清除所有div（最好与过渡的执行时间匹配）
    } else if (effect === 'drop') {     //掉落特效数据
      this.cname = 'collapse';          //指定新添加元素的class
      this.lwidth = 124;                 //指定新添加元素的宽度（必须能被图片宽度整除）
      this.zIndex = -1;                 //指定新添加元素的zIndex属性
      this.top = this.width * (-1);                     //指定新添加元素的top定位
      this.topend = 0;                  //指定新添加元素过渡结束top值
      this.left = 0;                    //指定新添加元素的left定位
      this.leftend = this.width;//指定最后一块div的left定位作为停止计时器的判定条件
      if (n === (-1)) {
        this.left = this.width - this.lwidth;//根据哪侧按钮被单击指定新添加元素left定位
        this.leftend = this.lwidth * n;                 //根据哪测按钮被单机设置停止计时器条件
      }
      this.timeadd = 20;            //指定为新div添加后多久会执行过渡（适当设置为后续程序执行完大约所需时间）
      this.divtimeadd = 80;         //指定每次添加新div的间隔时间
      this.transition = 'top 1s ease-out 0s';//指定top属性的过渡效果
      this.clrtime = 1600;               //设置最后一块div开始过渡后多久清除所有div(最好大于过渡的执行事件匹配)
    }
  }

  /*每条从上方掉落的特效（JS+CSS3）*/
  function Drop(n) {
    dataFn.call(this, 'drop', n);
    var self = this;
    self.dropFn = function () {
      var timer = setInterval(function () {
        var newdiv = document.createElement('div');
        newdiv.className = self.cname;
        newdiv.style.left = self.left + 'px';
        newdiv.style.top = self.top + 'px';
        newdiv.style.height = self.height + 'px';
        newdiv.style.width = self.lwidth + 'px';
        newdiv.style.backgroundImage = 'url(' + images[imgIndex] + ')';
        newdiv.style.backgroundPositionX = self.left * (-1) + 'px';
        self.left += (self.lwidth * n);
        newdiv.style.transition = self.transition;
        newdiv.style.zIndex = self.zIndex;
        self.pardiv.appendChild(newdiv);
        if (self.left === self.leftend) {
          clearInterval(timer);
        }
        setTimeout((function (newdiv) {
          return function () {
            newdiv.style.top = self.topend + 'px';
          }
        })(newdiv), self.timeadd)
      }, self.divtimeadd)
    }
  }

  /*从角落连续翻动特效(JS+CSS)*/
  function Corner(n) {
    dataFn.call(this, 'corner', n);
    var self = this;
    self.cornerFn = function () {
      var timer = setInterval(function () {
        for (var i = 0; i < self.vcount + 1; i++) {
          var newdiv = document.createElement('div');
          newdiv.className = self.cname;
          self.left = self.lwidth * (self.lcount - i);
          newdiv.style.left = self.left + 'px';
          self.top = self.vheight * i;
          newdiv.style.top = self.top + 'px';
          newdiv.style.height = self.vheight + 'px';
          newdiv.style.width = self.lwidth + 'px';
          newdiv.style.opacity = self.opacity;
          newdiv.style.backgroundImage = 'url(' + images[imgIndex] + ')';
          newdiv.style.zIndex = self.zIndex;
          newdiv.style.backgroundPosition = self.left * (-1) + 'px ' + self.top * (-1) + 'px';
          newdiv.style.transition = self.transition;
          self.pardiv.appendChild(newdiv);
          setTimeout((function (newdiv, count) {
            return function () {
              newdiv.style.opacity = 1;
            };
          })(newdiv, self.lcount), self.timeadd);
        }
        if (self.lcountend + self.vcount === self.lcount) {
          clearInterval(timer);
        }
        self.lcount = self.lcount + 1;
        self.vcount = self.vcount + 1 >= self.vcountend ? self.vcount : self.vcount + 1;
      }, self.divtimeadd)
    }
  }

  /*水平卷帘渐隐特效（纯JS）*/
  function Flip(n) {
    dataFn.call(this, 'flip', n);
    var self = this;
    self.flipFn = function () {
      var timer = setInterval(function () {
        var newdiv = document.createElement('div');
        newdiv.className = self.cname;
        newdiv.style.left = self.left + 'px';
        newdiv.style.top = self.top + 'px';
        newdiv.style.height = self.height + 'px';
        newdiv.style.width = self.lwidth + 'px';
        newdiv.style.backgroundImage = 'url(' + images[imgIndex] + ')';
        newdiv.style.backgroundPositionX = self.left * (-1) + 'px';
        self.left += (self.lwidth * n);
        newdiv.style.zIndex = self.zIndex;
        newdiv.style.opacity = self.opacity;
        self.pardiv.appendChild(newdiv);
        if (self.left === self.leftend) {
          clearInterval(timer);
        }
        var timer1 = setInterval((function (opacity, left) {
          return function () {
            opacity += self.opadd;
            newdiv.style.opacity = opacity;
            if (opacity >= 1) {
              clearInterval(timer1);
            }
          }
        })(self.opacity, self.left), self.timeadd);
      }, self.divtimeadd)
    }
  }

  /*挤压特效（JS+CSS3）*/
  function Press(n) {
    dataFn.call(this, 'press', n);
    var self = this;
    this.pressFn = function () {
      var newimg = new Image();
      newimg.src = images[imgIndex];
      newimg.style.transform = self.newtransform;
      newimg.style.transformOrigin = self.newtransformOrigin;
      newimg.style.transition = self.transition;
      self.img.style.transition = self.transition;
      self.img.style.transform = self.transform;
      self.img.style.transformOrigin = self.transformOrigin;
      var newdiv = document.createElement('div');
      newdiv.appendChild(newimg);
      this.pardiv.appendChild(newdiv);
      newimg.onload = function () {
        self.img.style.transform = self.newtransform;
        newimg.style.transform = self.transform;
      }
    }
  }

  /*将所有包含有特效方法的构造函数进行封装
   * 并通过获取随机数的方式来决定按钮单击事件的处理函数
   * 以及所有公共函数
   * */
  var arr = [Press, Flip, Corner, Drop];      //封装效果函数的构造对象
  /*轮播图逻辑函数fn：
  * 1.移除上一个图片下标对应的页码透明度（html中li[0]的透明度为0.8）
  * 2.设置lor向左或向右，会传入数据函数和效果函数中
  * 3.根据传进的数字决定图片下标（单机左箭头传入-1，单击右箭头和周期处理函数changetimer传入1，
  * 单击右下角页码传入2~6）
  * 4.设置当前图片下标对应的页码透明度
  * 5.解除箭头和页码的单击处理函数
  * 6.获取随机特效数字以及执行随机效果函数
  * 7.处理完成后恢复html以及为箭头和页码绑定处理函数
  * */
  var fn = function (n) {       //按钮的单击处理函数
    return function () {
      li[imgIndex].removeAttribute('style');
      var lor = null;
      if (n <= 1) {
        imgIndex = n === 1 && imgIndex === 4 ? 0 : n === (-1) && imgIndex === 0 ? (images.length - 1) : imgIndex + n;
        lor = n;
      } else {
        imgIndex = n-2;
        lor = 1;
      }
      li[imgIndex].style.opacity=0.8;
      lm.onclick = null;
      rm.onclick = null;
      for (var i = 0; i < li.length; i++) {
        li[i].onclick=null;
      }
      var attr = null;
      var rnnum = parseInt(Math.random() * arr.length);
      rnnum = rnnum === arr.length ? 0 : rnnum;
      if (arr[rnnum] === Press) {
        attr = 'pressFn';
      } else if (arr[rnnum] === Flip) {
        attr = 'flipFn';
      } else if (arr[rnnum] === Corner) {
        attr = 'cornerFn';
      } else if (arr[rnnum] === Drop) {
        attr = 'dropFn';
      }
      (new arr[rnnum](lor))[attr]();
      setTimeout(function () {
        img.src = images[imgIndex];
        img.removeAttribute('style');
        while ($('nav-bmd')[0].children[1]) {
          $('nav-bmd')[0].removeChild($('nav-bmd')[0].children[1]);
        }
        lm.onclick = fn(-1);
        rm.onclick = fn(1);
        for (var i = 0; i < li.length; i++) {
          li[i].onclick=(function (i) {
            return function () {
              fn((i+2))();
            }
          })(i);
        }
      }, 1800);
    }
  };
  var changetimer = setInterval(fn(1), 4000);//设定周期图片轮播定时器
  var banm = $('banner-main')[0];             //banner主div
  var img = $('banner-mimg')[0];  //banner主图片
  var rm = $('nav-bms2')[0];      //向右按钮
  var lm = $('nav-bms1')[0];      //向左按钮
  var ul = banm.getElementsByTagName('ul')[0];//页码ul
  var li = ul.children;                       //页码下单个li
  var imgIndex = 0;               //当前图片下标
  lm.onclick = fn(-1);            //为按钮添加单击事件
  rm.onclick = fn(1);
  banm.addEventListener('mouseover', function () {    //为主div添加鼠标移入和移出事件处理函数
    if (changetimer) {
      clearInterval(changetimer);
    }
  });
  banm.addEventListener('mouseout', function () {
    var changetimer = setInterval(fn(1), 5000);
    banm.addEventListener('mouseover', function () {
      clearInterval(changetimer);
    })
  });
  for (var i = 0; i < li.length; i++) {   //为页码下单个li添加单击处理函数
    li[i].onclick=(function (i) {
      return function () {
        fn((i+2))();
      }
    })(i);
  }
})();


/*竖向导航栏的鼠标移入事件处理*/
(function () {
  var li = document.getElementsByClassName('subnav-leftnav');
  var ul = document.getElementsByClassName('subnav-hide');
  for (var i = 0; i < li.length; i++) {
    li[i].onmouseover = (function (i) {
      return function () {
        ul[i].style.display = 'block';
      }
    })(i);
    li[i].onmouseout = (function (i) {
      return function () {
        ul[i].style.display = 'none';
      }
    })(i)
  }
})();


/*横向导航栏的鼠标移入事件处理*/
(function () {
  var li = document.querySelectorAll('.banner-tli');
  for (var i = 0; i < li.length; i++) {
    if (li[i].querySelector('.banner-top-hide')) {
      li[i].addEventListener('mouseover', fn(i), true);
      li[i].addEventListener('mouseout', function (i) {
        return function (e) {
          e=e ? e : window.event;
          var s = e.toElement || e.relatedTarget;
          if (!this.contains(s)) {
            li[i].querySelector('.triangle').style.display = 'none';
            var ul = li[i].querySelector('.banner-top-hide');
            var ulwidth = 200;
            var timer = setInterval(function () {
              ulwidth = ulwidth - 3 <= 0 ? 0 : ulwidth - 3;
              ul.style.height = ulwidth + 'px';
              if (ulwidth <= 0) {
                ul.style.zIndex = 5;
                clearInterval(timer);
              }
            }, 1);
          }
        }
      }(i), true);
    }
  }
  function fn(i) {
    return function (e) {
      e=e ? e : window.event;
      var s = e.fromElement || e.relatedTarget;
      if (!this.contains(s)) {
        li[i].querySelector('.triangle').style.display = 'block';
        var ul = li[i].querySelector('.banner-top-hide');
        var ulwidth = 0;
        ul.style.left = i * 95 * (-1) + 'px';
        var timer = setInterval(function () {
          ulwidth += 3;
          ul.style.height = ulwidth + 'px';
          if (ulwidth >= 200) {
            ul.style.zIndex = 3;
            clearInterval(timer);
          }
        }, 1)
      }
    }
  }
})();

/*小米明星单品的左右滑动效果*/
(function () {
  var left = document.getElementsByClassName('section--star-left')[0];
  var right = document.getElementsByClassName('section--star-right')[0];
  var state = 0;
  var ul = document.querySelector('.section-star-ul');
  left.onclick = slide(1);
  right.onclick = slide(-1);
  function slide(n) {
    return function () {
      if (state <= 0 && n == (-1)) {
        var timer = setInterval(function () {
          state += 10;
          ul.style.left = state * (-1) + 'px';
          if (state >= 1240) {
            clearInterval(timer);
          }
        }, 1)
      } else if (state >= 1240 && n == 1) {
        var timer1 = setInterval(function () {
          state -= 10;
          ul.style.left = state * (-1) + 'px';
          if (state <= 0) {
            clearInterval(timer1);
          }
        })
      }
    }
  }
})();