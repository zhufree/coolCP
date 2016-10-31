$(function() {
  $('input').on('blur', function() {
    if ($(this).val().length === 0) {
      alert('该字段不能为空');
    }
  });
});
