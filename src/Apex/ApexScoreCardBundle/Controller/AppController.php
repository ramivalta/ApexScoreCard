<?php

namespace Apex\ApexScoreCardBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class AppController extends Controller
{
    public function indexAction()
    {
        return $this->render('ApexScoreBundle:App:index.html.twig');
    }
}
