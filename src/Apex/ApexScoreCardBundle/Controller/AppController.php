<?php

namespace Apex\ApexScoreCardBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;



class AppController extends BaseController
{

	/**
	 *
	 * @Route ("/", name="app")
	 * @Method("GET")
	 * @Template()
	 */

    public function indexAction()
    {
    
        $em = $this->getDoctrine()->getManager();
        
		$golfers = $em->getRepository('ApexScoreBundle:Golfer')->findOneById('4');

		return array(
			'golfers' => $golfers,
		);
    
    
#        return $this->render('ApexScoreBundle:App:index.html.twig');
    }
}
