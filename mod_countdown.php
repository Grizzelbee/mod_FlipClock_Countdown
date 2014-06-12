<?php
/**
 * Apple Style Counter module for Joomla!
 *
 * @package    AppleStyleCountdown.zip
 * @subpackage Modules
 * @link www.splabs.it
 * @license GNU/GPL, see LICENSE.php
 * AppleStyleCounter from SPLabs is free software. This version may have been modified pursuant
 * to the GNU General Public License, and as distributed it includes or
 * is derivative of works licensed under the GNU General Public License or
 * other free or open source software licenses.
 *
 * This module is based on Chris Nanney javascript skills available on  http://cnanney.com/
 *
 */

// no direct access
defined( '_JEXEC' ) or die( 'Restricted access' );

$doc =& JFactory::getDocument();

$doc->addStyleSheet(JURI::root().'modules/mod_countdown/assets/css/countdown.css');
$doc->addScript(JURI::root().'modules/mod_countdown/assets/js/countdown.js');

require( JModuleHelper::getLayoutPath( 'mod_countdown' ) );