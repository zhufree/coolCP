$(function() {
  // $('input').on('blur', function() {
  //   if ($(this).val().length === 0) {
  //     alert('该字段不能为空');
  //   }
  // });
  $('#btn').click(function(e) {
    var safe = true;
    $('input').each(function() {
      if($(this).val().length === 0) {
        safe = false;
        $(this).parent().next('.text-danger').show();
      }
      if (safe) {
        $('form').submit();
      }
    });
  });
});
