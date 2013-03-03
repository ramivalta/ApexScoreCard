<?php

//require __DIR__.'/../vendor/symfony/symfony/src/Symfony/Component/ClassLoader/ApcUniversalClassLoader.php';

use Doctrine\Common\Annotations\AnnotationRegistry;
//use Symfony\Component\ClassLoader\ApcUniversalClassLoader;

//$loader = new ApcUniversalClassLoader('uniqcache');

$loader = require __DIR__.'/../vendor/autoload.php';

// intl
if (!function_exists('intl_get_error_code')) {
    require_once __DIR__.'/../vendor/symfony/symfony/src/Symfony/Component/Locale/Resources/stubs/functions.php';
}

AnnotationRegistry::registerLoader(array($loader, 'loadClass'));

return $loader;
