<?php defined( '_JEXEC' ) or die( 'Restricted access' ); ?>

<?php
	if($params->get('loadjQuery')==1)
		echo '<script type="text/javascript" src="http://code.jquery.com/jquery-1.4.3.min.js"></script>';
?>

<div id="countdownwrap">


<?php 
  	$now    = date('Y-m-d H:i');
	try
	{
        $target = date ('Y-m-d H:i', StrToTime($params->get( 'destinationDate', '25.12.2022 00:00' )));
	} catch (Exception $e)	{
		$target = $now;
	}
    
    if ($now >= $target) {
        echo '<div id="countdowncontainer"><h2><center>';
        echo $params->get( 'endText', '' );
        echo '</center></h2></div>';
    } else {
    ?>
    <div id="countdowncontainer"></div>
    <script type="text/javascript">
        var target = "<?php echo $target; ?>";
        (function($) {
              counterInit();
              initialDigitCheck(theDiffString);
              setInterval(doCount, pace);
          })(jQuery);
        </script>
    <?php } ?>
</div>
