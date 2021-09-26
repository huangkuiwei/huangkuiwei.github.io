$(document).ready(function () {
  var searchData = {
    searchNodeList: [],
    searchContentDom: $('.search-index-page .search-content'),
    searchInputDom: $('.search-index-page .input-box input'),
    searchIconDom: $('.search-index-page .input-box .search-icon'),
    searchNodeInnerHTML: '',
    platform: {},
    pagination: {
      totalData: 100, // 数据总条数
      current: 1, // 当前页码
      pageData: 10, // 每页数据条数
    },

    // 加载 loading 动画
    loading: function () {
      // 移除前一次动画
      var originalLoadingDom = document.querySelector('.search-index-page .search-content .custom-loading');
      var parent = document.querySelector('.search-index-page .search-content');

      if (originalLoadingDom) {
        parent.removeChild(originalLoadingDom);
      }

      var loadingDom = document.createElement('div');
      loadingDom.className = 'custom-loading';
      loadingDom.innerHTML = '<img src="../../../static/plugin/layer/theme/default/loading-2.gif" alt=""/>';
      parent.appendChild(loadingDom);

      // 返回一个关闭动画函数
      return function () {
        parent.removeChild(loadingDom);
      };
    },

    renderSearchNode: function () {
      searchData.searchNodeInnerHTML = '';

      // styleMode 定义使用哪套样式，根据实际情况来
      if (searchData.platform.styleMode === 1) {
        searchData.searchNodeList.forEach(function (searchNode) {
          searchData.searchNodeInnerHTML +=
            '<div class="item"><img class="logo" src="' +
            searchNode.logo +
            '" alt="" /><div class="info"><span class="name">' +
            searchNode.name +
            '</span><span class="num">' +
            searchNode.num +
            '位订阅者</span></div>';

          if (searchNode.isSubscribe) {
            searchData.searchNodeInnerHTML +=
              '<div class="cancel"><img src="../../../static/images/favorite-filling.png" alt="" /><span>取消订阅</span></div></div>';
          } else {
            searchData.searchNodeInnerHTML +=
              '<div class="add"><img src="../../../static/images/favorite-filling.png" alt="" /><span>订阅</span></div></div>';
          }
        });

        searchData.searchContentDom.children('.list').removeClass('style2');
        searchData.searchContentDom.children('.list').addClass('style1');
      } else if (searchData.platform.styleMode === 2) {
        searchData.searchNodeList.forEach(function (searchNode) {
          searchData.searchNodeInnerHTML +=
            '<div class="item"><img class="logo" src="' +
            searchNode.logo +
            '" alt="" /><div class="detail"><div class="desc"><span class="title">' +
            searchNode.title +
            '</span><span class="tag">' +
            searchNode.tag +
            '</span></div><span class="content">' +
            searchNode.content +
            '</span></div><div class="info"><span class="time">' +
            searchNode.time +
            '</span><span class="source">' +
            searchNode.source +
            '</span></div><img class="icon" src="../../../static/images/detail/arrow-right.png" alt="" /></div>';
        });

        searchData.searchContentDom.children('.list').removeClass('style1');
        searchData.searchContentDom.children('.list').addClass('style2');
      }

      searchData.searchContentDom.children('.list').html(searchData.searchNodeInnerHTML);
    },

    // 查询数据，渲染
    queryPlatform: function (data) {
      searchData.platform = (data && data.platform) || searchData.platform;

      // 调后端查询接口查询平台列表
      var closeLoading = searchData.loading();

      setTimeout(function () {
        // 虚拟数据，改为接口获取
        if (searchData.platform.styleMode === 1) {
          searchData.searchNodeList = [
            { logo: './static/images/platform/logo.png', name: '南充人事资源网', num: 3718739, isSubscribe: false },
            { logo: './static/images/platform/logo.png', name: '南充人事资源网', num: 3718739, isSubscribe: true },
            { logo: './static/images/platform/logo.png', name: '南充人事资源网', num: 3718739, isSubscribe: false },
            { logo: './static/images/platform/logo.png', name: '南充人事资源网', num: 3718739, isSubscribe: true },
          ];
        } else {
          searchData.searchNodeList = [
            {
              logo: './static/images/platform/logo.png',
              title: '神舟十二号返回舱成功着陆',
              tag: '热门新闻',
              content:
                '载人航天工程空间站工程阶段飞行任务总指挥部决定，9月17日神舟十二号飞船返回地球。载人航天工程空间站工程阶段飞行任务总指挥部决',
              time: '10分钟前',
              source: 'ProcessOn',
            },
            {
              logo: './static/images/platform/logo.png',
              title: '神舟十二号返回舱成功着陆',
              tag: '热门新闻',
              content:
                '载人航天工程空间站工程阶段飞行任务总指挥部决定，9月17日神舟十二号飞船返回地球。载人航天工程空间站工程阶段飞行任务总指挥部决',
              time: '10分钟前',
              source: 'ProcessOn',
            },
          ];
        }

        // 测试代码
        searchData.searchNodeList = searchData.searchNodeList
          .concat(searchData.searchNodeList)
          .concat(searchData.searchNodeList)
          .concat(searchData.searchNodeList)
          .concat(searchData.searchNodeList)
          .concat(searchData.searchNodeList);

        closeLoading();

        searchData.renderSearchNode();
      }, 500);
    },

    filterSearchNodeList: function () {
      var value = searchData.searchInputDom.val();

      if (value && value.trim()) {
        searchData.queryPlatform();
      } else {
        $.message({
          message: '请输入搜索的关键词',
          type: 'error',
        });
      }
    },
  };

  // 点击搜索图标
  searchData.searchIconDom.on('click', function () {
    searchData.filterSearchNodeList();
  });

  // 回车
  searchData.searchInputDom.on('keydown', function (event) {
    if (event.keyCode === 13) {
      searchData.filterSearchNodeList();
    }
  });

  // 导航栏修改平台类别时重新获取数据渲染页面
  $(document).on('searchPlatformChange', function (event, data) {
    searchData.queryPlatform(data);
  });

  // 分页触发函数
  window.currentPage = function (currentPage) {
    searchData.pagination.current = currentPage;
    searchData.queryPlatform();
  };

  // 分页代码
  $('#pager').zPager({
    totalData: searchData.pagination.totalData,
    pageData: searchData.pagination.pageData,
    btnShow: false,
    minPage: 1,
  });
});
