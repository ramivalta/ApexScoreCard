<?php

namespace Apex\ApexScoreCardBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('ApexScoreBundle:Default:index.html.twig', array('name' => $name));
    }
}
