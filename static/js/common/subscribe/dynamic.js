$(document).ready(function () {
  var dynamicData = {
    dynamicList: [
      {
        logo: '../static/images/platform/logo.png',
        time: '9月13日',
        detailList: [
          { title: '#神舟万里中秋回家#', hot: '2110万热度', time: '19:21' },
          { title: '上气道压力测定对阻塞性睡眠呼吸暂停综合征阻塞部位定位诊断研究', hot: '2110万热度', time: '19:21' },
          { title: '肖斯塔科维奇的<24首前奏曲与赋格曲>(下)', hot: '2110万热度', time: '19:21' },
        ],
      },
      {
        logo: '../static/images/platform/logo.png',
        time: '9月13日',
        detailList: [
          { title: '#神舟万里中秋回家#', hot: '2110万热度', time: '19:21' },
          { title: '上气道压力测定对阻塞性睡眠呼吸暂停综合征阻塞部位定位诊断研究', hot: '2110万热度', time: '19:21' },
          { title: '肖斯塔科维奇的<24首前奏曲与赋格曲>(下)', hot: '2110万热度', time: '19:21' },
        ],
      },
    ],
    dynamicDom: $('.subscribe-dynamic-page .platform-list .left'),
    dynamicInnerHTML: '',

    // 加载 loading 动画
    loading: function () {
      // 移除前一次动画
      var originalLoadingDom = document.querySelector('.subscribe-dynamic-page .platform-list .custom-loading');
      var parent = document.querySelector('.subscribe-dynamic-page .platform-list .left');

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

    // 渲染数据
    renderDynamic: function () {
      dynamicData.dynamicInnerHTML = '';

      dynamicData.dynamicList.forEach(function (dynamic) {
        dynamicData.dynamicInnerHTML +=
          '<div class="item"><div class="logo"><img src="' +
          dynamic.logo +
          '" alt="" />' +
          '<div class="line"></div></div><div class="detail"><div class="time">' +
          dynamic.time +
          '</div><div class="list">';

        dynamic.detailList.forEach(function (detail) {
          dynamicData.dynamicInnerHTML +=
            '<div class="list-item"><span class="title">' +
            detail.title +
            '</span><span class="hot">' +
            detail.hot +
            '</span><span class="time">' +
            detail.time +
            '</span></div>';
        });

        dynamicData.dynamicInnerHTML += '</div></div></div>';
      });

      dynamicData.dynamicDom.html(dynamicData.dynamicInnerHTML);

      // 事件绑定
      dynamicData.dynamicDom.children('.item').each(function () {
        $(this.querySelector('.logo img')).on('click', function () {
          location.href = '/subscribe/detail.html';
        });
      });
    },

    queryPlatform: function () {
      var closeLoading = dynamicData.loading();

      setTimeout(function () {
        closeLoading();

        dynamicData.renderDynamic();
      }, 500);
    },
  };

  dynamicData.dynamicList = dynamicData.dynamicList
    .concat(dynamicData.dynamicList)
    .concat(dynamicData.dynamicList)
    .concat(dynamicData.dynamicList);

  dynamicData.queryPlatform();
});
