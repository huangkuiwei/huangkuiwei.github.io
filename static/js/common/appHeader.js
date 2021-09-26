/**
 * 预先载入公共头部
 */
$(document).ready(function () {
  var navList;

  if (location.pathname === '/search.html') {
    navList = [
      { id: 1, styleMode: 1, name: '节点' }, // styleMode 定义使用哪套样式，根据实际情况来
      { id: 2, styleMode: 2, name: '站内' },
      { id: 3, styleMode: 2, name: '百度' },
      { id: 4, styleMode: 2, name: '搜狗' },
      { id: 5, styleMode: 2, name: '360' },
      { id: 6, styleMode: 2, name: '必应' },
      { id: 7, styleMode: 2, name: '微博' },
      { id: 8, styleMode: 2, name: '头条' },
      { id: 9, styleMode: 2, name: '视频' },
      { id: 10, styleMode: 2, name: '知乎' },
      { id: 11, styleMode: 2, name: '谷歌' },
      { id: 11, styleMode: 2, name: '淘宝' },
      { id: 11, styleMode: 2, name: '京东' },
      { id: 11, styleMode: 2, name: '拼多多' },
    ];
  } else {
    navList = [
      { id: 1, name: '综合' },
      { id: 2, name: '科技' },
      { id: 3, name: '娱乐' },
      { id: 4, name: '社区' },
      { id: 5, name: '购物' },
      { id: 6, name: '财经' },
      { id: 7, name: '开发' },
      { id: 8, name: '校务' },
      { id: 9, name: '政务' },
      { id: 10, name: '专栏' },
      { id: 11, name: '报刊' },
    ];
  }

  $('.header-wrap').load('../../../common/appHeader.html', function () {
    var navData = {
      navList: navList,
      navListDom: $('.nav-list'),
      navListDomInnerHtml: '',
      platformId: undefined,
      needHighLight: location.pathname === '/platform.html' || location.pathname === '/search.html',

      platformChange: function (index, context) {
        location.hash = navData.navList[index].id;
        navSpanList.removeClass('active');

        if (navData.needHighLight) {
          $(context).addClass('active');

          var changeEvent = '';

          if (location.pathname === '/platform.html') {
            changeEvent = 'platformChange';
          } else if (location.pathname === '/search.html') {
            changeEvent = 'searchPlatformChange';
          }

          // 触发平台分类变更事件
          $(document).trigger(changeEvent, {
            platform: navData.navList[index],
          });
        } else {
          location.href = '/platform.html' + '#' + navData.navList[index].id;
        }
      },
    };

    // 只有在查询平台列表的时候才进行此操作
    if (navData.needHighLight) {
      navData.platformId = location.hash.replace('#', '') || navData.navList[0].id;
    }

    navData.navList.forEach(function (item) {
      if (Number(item.id) === Number(navData.platformId)) {
        navData.navListDomInnerHtml += '<span class="f16 active"' + '">' + item.name + '</span>';
      } else {
        navData.navListDomInnerHtml += '<span class="f16"' + '">' + item.name + '</span>';
      }
    });

    navData.navListDom.html(navData.navListDomInnerHtml);

    var navSpanList = $('.nav-list span');

    navSpanList.each(function (index) {
      var _this = this;

      $(_this).on('click', function () {
        navData.platformChange(index, _this);
      });
    });

    if (navData.needHighLight) {
      // 初始化时手动触发一次
      var index = navData.navList.findIndex(function (item) {
        return Number(item.id) === Number(navData.platformId);
      });

      navData.platformChange(index, navSpanList[index]);
    }
  });
});
