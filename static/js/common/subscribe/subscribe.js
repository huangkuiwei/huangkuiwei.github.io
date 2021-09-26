$(document).ready(function () {
  var platformData = {
    // 模拟数据，最终要根据接口来定义字段
    platformList: [
      {
        name: '知乎',
        logo: '../static/images/platform/logo.png',
        source: '热搜榜',
        isSubscribe: true,
        hotSearchList: [
          { name: '全运会开幕式', reading: '128.9万', trend: 1 },
          { name: '莆田新增病例最小3岁', reading: '125.4万', trend: -1 },
          { name: '大学老师为了教恋爱课有多拼', reading: '123.2万', trend: 0 },
          { name: '千万不要买长得像糖的药', reading: '122.9万', trend: 1 },
          { name: '体育圈顶流齐聚全运会', reading: '109.4万', trend: -1 },
          { name: '白鹿看一生一世反应太真实', reading: '123.2万', trend: 0 },
          { name: '千万不要买长得像糖的药', reading: '122.9万', trend: 0 },
          { name: '体育圈顶流齐聚全运会', reading: '109.4万', trend: 1 },
        ],
      },
      {
        name: '知乎',
        logo: '../static/images/platform/logo.png',
        source: '热搜榜',
        isSubscribe: true,
        hotSearchList: [
          { name: '全运会开幕式', reading: '128.9万', trend: 1 },
          { name: '莆田新增病例最小3岁', reading: '125.4万', trend: -1 },
          { name: '大学老师为了教恋爱课有多拼', reading: '123.2万', trend: 0 },
          { name: '千万不要买长得像糖的药', reading: '122.9万', trend: 1 },
          { name: '体育圈顶流齐聚全运会', reading: '109.4万', trend: -1 },
          { name: '白鹿看一生一世反应太真实', reading: '123.2万', trend: 0 },
          { name: '千万不要买长得像糖的药', reading: '122.9万', trend: 0 },
          { name: '体育圈顶流齐聚全运会', reading: '109.4万', trend: 1 },
        ],
      },
    ],
    platformId: undefined, // 导航栏选择的平台id
    mode: 1, // 1:最新 2:最热
    platformListDom: $('.subscribe-index-page .platform-list'),
    platformListInnerHTML: '',

    // 加载 loading 动画
    loading: function () {
      // 移除前一次动画
      var originalLoadingDom = document.querySelector('.subscribe-index-page .platform-list .custom-loading');
      var parent = document.querySelector('.subscribe-index-page .platform-list');

      if (originalLoadingDom) {
        parent.removeChild(originalLoadingDom);
      }

      var loadingDom = document.createElement('div');
      loadingDom.className = 'custom-loading';
      loadingDom.innerHTML = '<img src="../static/plugin/layer/theme/default/loading-2.gif" alt=""/>';
      parent.appendChild(loadingDom);

      // 返回一个关闭动画函数
      return function () {
        parent.removeChild(loadingDom);
      };
    },

    // 渲染平台数据
    renderPlatformList: function () {
      platformData.platformListInnerHTML = '';

      platformData.platformList.forEach(function (platform) {
        platformData.platformListInnerHTML +=
          '<div class="item"><div class="info"><img src="' +
          platform.logo +
          '" alt="" /><span class="platform-name">' +
          platform.name +
          '</span><span class="source">' +
          platform.source +
          '</span></div><div class="list">';

        platform.hotSearchList.forEach(function (hotSearch, index) {
          platformData.platformListInnerHTML +=
            '<div class="list-item"><span class="rank' +
            ' rank' +
            (index + 1) +
            '">' +
            (index + 1) +
            '</span><span class="name">' +
            hotSearch.name +
            '</span><span class="reading"></span>';

          if (hotSearch.trend === -1) {
            platformData.platformListInnerHTML +=
              '<img class="trend" src="../static/images/platform/down.png" alt="" />';
          } else if (hotSearch.trend === 0) {
            platformData.platformListInnerHTML +=
              '<img class="trend" src="../static/images/platform/line.png" alt="" />';
          } else if (hotSearch.trend === 1) {
            platformData.platformListInnerHTML += '<img class="trend" src="../static/images/platform/up.png" alt="" />';
          }

          platformData.platformListInnerHTML += '</div>';
        });

        platformData.platformListInnerHTML +=
          '</div><div class="others"><div class="refresh">' +
          '<img class="icon" src="../static/images/platform/refresh.png" alt="" />' +
          '<span class="time">3分钟前</span>' +
          '</div><div class="subscribe">';

        if (platform.isSubscribe) {
          platformData.platformListInnerHTML += '<span style="color: #999999" class="name">已订阅</span>';
        } else {
          platformData.platformListInnerHTML += '<span class="name">订阅</span>';
        }

        if (platform.isSubscribe) {
          platformData.platformListInnerHTML +=
            '<img class="icon" src="../static/images/platform/subscribe-active.png" alt="" />';
        } else {
          platformData.platformListInnerHTML +=
            '<img class="icon" src="../static/images/platform/subscribe.png" alt="" />';
        }

        platformData.platformListInnerHTML += '</div></div></div></div>';

        platformData.platformListDom.html(platformData.platformListInnerHTML);
      });
    },

    // 查询数据，渲染
    queryPlatform: function (data) {
      data = data || {};
      platformData.platformId = data.platformId || location.hash.replace('#', ''); // 保存id

      // 调后端查询接口查询平台列表
      var closeLoading = platformData.loading();

      setTimeout(function () {
        closeLoading();

        // 根据数据渲染 platform-list 节点
        platformData.renderPlatformList();
      }, 500);
    },
  };

  // 方便测试，正式需删
  platformData.platformList = platformData.platformList
    .concat(platformData.platformList)
    .concat(platformData.platformList);

  // 上次进入页面加载数据
  platformData.queryPlatform();
});
