$().ready(function() {
  $('#userbar>div>a').click(function() {
    var rel=$(this).attr('rel');
    $('#userbar form').hide();
    $('#'+rel+'Form').toggle().find('input:visible').eq(0).focus();
    return false;
  })

  $('#registerForm').submit(function() {
    var fields=['nn_username','nn_password1','nn_password2','nn_email'];
    var $invalid=$();

    for (var i in fields) {
      var $f=$(this).find('input[name='+fields[i]+']');
      if (!$f.val()) $invalid=$invalid.add($f);
      if (fields[i]=='nn_email') {
        var ex=new RegExp(/^.+?@.+?\..+?$/);
        if (!$f.val().match(ex)) {
          $invalid=$invalid.add($f);
        }
      }
    }

    var $p1=$(this).find('input[name=nn_password1]');
    var $p2=$(this).find('input[name=nn_password2]');
    if ($p1.val()!=$p2.val()) $invalid=$invalid.add($p1).add($p2);

    $invalid.addClass('invalid').eq(0).focus();
    return $invalid.length==0;
  });

  $('#registerForm input').keyup(function() {
    $(this).removeClass('invalid');
  });

  $('input.rating').each(function() {
    var val=$(this).val();
    if (val>0) {
      var bp=(val-1)*16;
      $(this).css('background-position','left -'+bp+'px');
    } else {
      $(this).css('background-image','none');
    }
  });

});
