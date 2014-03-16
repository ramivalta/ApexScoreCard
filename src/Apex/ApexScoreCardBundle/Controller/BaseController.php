<?php
namespace Apex\ApexScoreCardBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
#use Hanman\HiihtaaVaanBundle\Entity\Workshift;
#use Hanman\HiihtaaVaanBundle\Form as Forms;
#use Hanman\HiihtaaVaanBundle\Utility as Utils;
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of BaseController
 *
 * @author Martti
 */
class BaseController extends Controller {
    
    protected function validateDateTimes(&$start, &$end)
    {
        try 
        {
            $ds = new \DateTime();
            $start = $ds->setTimestamp($start);
            $de = new \DateTime();
            $end = $de->setTimestamp($end);
        }
        catch (\Exception $e)
        {
            return false;
        }
        return true;
    }
    
    protected function getRequestJson($assoc = false)
    {
        try 
        {
            $content = $this->get("request")->getContent();
            if (!empty($content))
            {
                return json_decode($content, $assoc);
            }
        }
        catch (\Exception $e)
        {
            return null;
        }
        return null;
    }
    
}

?>
