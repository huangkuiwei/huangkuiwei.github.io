$(document).ready(function () {
  var detailData = {
    detailList: [
      { title: '神舟十二号返回舱成功着陆', reading: '10w', num: '87800' },
      { title: '当代中国教师面临的教育伦理问题', reading: '10w', num: '87800' },
      {
        title: '开创德国哲学革命的主要理论武器——康德对莱布尼茨和伏尔夫思辩理性超脱感性经验的批判',
        reading: '10w',
        num: '87800',
      },
      { title: '上海交大医学院2009级八年制(4+4)报考指南-上海交通大学', reading: '10w', num: '87800' },
    ],
    detailDom: $('.subscribe-detail-page .subscribe-detail .right'),
    detailInnerHTML: '',
    selectModeDom: $('.subscribe-detail-page .subscribe-detail .options span'),
    mode: '1', // 1：24h热文榜 2：即时视频榜 3：热词

    // 渲染数据
    renderDetailList: function () {
      detailData.detailInnerHTML = '';

      detailData.detailList.forEach(function (detail, index) {
        detailData.detailInnerHTML +=
          '<div class="item"><span class="rank' +
          ' rank' +
          (index + 1) +
          '">' +
          (index + 1) +
          '</span><span class="title">' +
          detail.title +
          '</span><span class="reading">' +
          detail.reading +
          '阅读+</span><span class="num">' +
          detail.num +
          '人在看</span><img class="allow-right" src="../static/images/detail/arrow-right2.png" alt="" /></div>';
      });

      detailData.detailDom.html(detailData.detailInnerHTML);
    },

    // 加载 loading 动画
    loading: function () {
      // 移除前一次动画
      var originalLoadingDom = document.querySelector('.subscribe-detail-page .subscribe-detail .custom-loading');
      var parent = document.querySelector('.subscribe-detail-page .subscribe-detail');

      if (originalLoadingDom) {
        parent.removeChild(originalLoadingDom);
      }

      var loadingDom = document.createElement('div');
      loadingDom.className = 'custom-loading';
      loadingDom.innerHTML = '<img src="../../../../static/plugin/layer/theme/default/loading-2.gif" alt=""/>';
      parent.appendChild(loadingDom);

      // 返回一个关闭动画函数
      return function () {
        parent.removeChild(loadingDom);
      };
    },

    queryDetailList: function () {
      // 调后端查询接口查询平台列表
      var closeLoading = detailData.loading();

      setTimeout(function () {
        closeLoading();

        detailData.renderDetailList();
      }, 500);
    },

    changeMode: function (event) {
      detailData.mode = event.target.dataset.mode;
      detailData.selectModeDom.removeClass('active');

      detailData.selectModeDom.each(function (index) {
        if (this.dataset.mode === detailData.mode) {
          $(this).addClass('active');
        }
      });

      // 调接口查询
      detailData.queryDetailList();
    },
  };

  detailData.detailList = detailData.detailList
    .concat(detailData.detailList)
    .concat(detailData.detailList)
    .concat(detailData.detailList);

  detailData.selectModeDom.on('click', function (event) {
    detailData.changeMode(event);
  });

  detailData.queryDetailList();
});
