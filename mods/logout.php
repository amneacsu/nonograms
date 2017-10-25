<?php

setcookie('nn_user','',time()-3600,$cfg['cookie-path'],$cfg['cookie-domain']);
setcookie('nn_pass','',time()-3600,$cfg['cookie-path'],$cfg['cookie-domain']);
session_destroy();

header('Location: /');

?>
