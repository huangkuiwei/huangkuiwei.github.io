/**
 * 预先载入dialog
 */
$(document).ready(function () {
  $('.dialog').load('../../../common/dialogTemplate.html', function () {
    $(document).trigger('dialogLoaded');
  });
});
