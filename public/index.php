<?php
/**
 * Craft web bootstrap file
 */

// Set path constants
define('CRAFT_BASE_PATH', dirname(__DIR__).'/src/craftCMS');
define('CRAFT_VENDOR_PATH', CRAFT_BASE_PATH.'/vendor');
define('CRAFT_TEMPLATES_PATH', CRAFT_BASE_PATH.'/src');


// Load Composer's autoloader
require_once CRAFT_VENDOR_PATH.'/autoload.php';

// Load dotenv?
if (file_exists(dirname(__DIR__).'/.env')) {
    (new Dotenv\Dotenv(dirname(__DIR__)))->load();
}

// Load and run Craft
define('CRAFT_ENVIRONMENT', getenv('ENVIRONMENT') ?: 'production');
$app = require CRAFT_VENDOR_PATH.'/craftcms/cms/bootstrap/web.php';
$app->run();
