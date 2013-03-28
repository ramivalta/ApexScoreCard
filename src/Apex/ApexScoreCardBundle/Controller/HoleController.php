<?php

namespace Apex\ApexScoreCardBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Apex\ApexScoreCardBundle\Entity\Hole;
use Apex\ApexScoreCardBundle\Form\HoleType;
use Symfony\Component\HttpFoundation\Response;

/**
 * Hole controller.
 *
 * @Route("/hole")
 */
class HoleController extends BaseController
{
    /**
     * Lists all Hole entities.
     *
     * @Route("/", name="hole")
     * @Method("GET")
     * @Template()
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $entities = $em->getRepository('ApexScoreBundle:Hole')->findAll();

        return array(
            'entities' => $entities,
        );
    }

    /**
     * Creates a new Hole entity.
     *
     * @Route("/", name="hole_create")
     * @Method("POST")
     * @Template("ApexScoreBundle:Hole:new.html.twig")
     */
    public function createAction(Request $request)
    {
        $entity  = new Hole();
        $form = $this->createForm(new HoleType(), $entity);
        $form->bind($request);

        if ($form->isValid()) {
        
            $courseId = $request->get('course_Id');
        
            $em = $this->getDoctrine()->getManager();
            
            $course = $em->getRepository('ApexScoreBundle:Course')->find($courseId);
            $entity->setCourse($course);
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('course_show', array('id' => $entity->getCourse()->getId())));
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Displays a form to create a new Hole entity.
     *
     * @Route("/new", name="hole_new")
     * @Method("GET")
     * @Template()
     */
    public function newAction($courseId)
    {
        $entity = new Hole();
        $form   = $this->createForm(new HoleType(), $entity);
        
        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
            'course_Id' => $courseId
        );
    }

    /**
     * Finds and displays a Hole entity.
     *
     * @Route("/{id}", name="hole_show")
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ApexScoreBundle:Hole')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Hole entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Displays a form to edit an existing Hole entity.
     *
     * @Route("/{id}/edit", name="hole_edit")
     * @Method("GET")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ApexScoreBundle:Hole')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Hole entity.');
        }

        $editForm = $this->createForm(new HoleType(), $entity);
        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Edits an existing Hole entity.
     *
     * @Route("/{id}", name="hole_update")
     * @Method("PUT")
     * @Template("ApexScoreBundle:Hole:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ApexScoreBundle:Hole')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Hole entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createForm(new HoleType(), $entity);
        $editForm->bind($request);

        if ($editForm->isValid()) {
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('hole_edit', array('id' => $id)));
        }

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Deletes a Hole entity.
     *
     * @Route("/{id}", name="hole_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, $id)
    {
        $form = $this->createDeleteForm($id);
        $form->bind($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $entity = $em->getRepository('ApexScoreBundle:Hole')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find Hole entity.');
            }

            $em->remove($entity);
            $em->flush();
        }

        return $this->redirect($this->generateUrl('hole'));
    }

    /**
     * Creates a form to delete a Hole entity by id.
     *
     * @param mixed $id The entity id
     *
     * @return Symfony\Component\Form\Form The form
     */
    private function createDeleteForm($id)
    {
        return $this->createFormBuilder(array('id' => $id))
            ->add('id', 'hidden')
            ->getForm()
        ;
    }
 
 	public function getHoleDataAction()
 	{
 		$json = $this->getRequestJson();
 		
 		$course_id = $json->data->course_id;
 			
 		$em = $this->getDoctrine()->getManager();
 		
 		$entities = $em->getRepository('ApexScoreBundle:Hole')->findByCourseId($course_id);
 		
 		if (!$entities) {
 			throw $this->createNotFoundException('Unable to fin Hole entity');
 		}
 		
 		$holes = array();
 		
 		foreach ($entities as $h) {
 			$holes[] = $h->getJson();
 		}
 		
 		return new Response(json_encode(array('holes' => $holes)));
 	
 	}
 	
 	public function saveHoleDataAction()
 	{
 		$json = $this->getRequestJson();

 		$ar = json_decode($json->data);
 		$course_id = $json->course_id;

 		$em = $this->getDoctrine()->getManager();
 		
// 		error_log($course_id);

		$course = $em->getRepository('ApexScoreBundle:Course')->find($course_id);

 		
 		foreach ($ar as $h) {
			$entity = new Hole();
			$entity->setCourse($course);	
			$entity->setCourseId($course_id);
			error_log($course_id);
			$entity->setHoleNumber($h->hole_number);
			$entity->setPar($h->hole_par);
			$entity->setHcp($h->hole_hcp);
			$entity->setLengthRed($h->hole_length_red);
			$entity->setLengthBlue($h->hole_length_blue);
			$entity->setLengthYellow($h->hole_length_yellow);
			$entity->setLengthWhite($h->hole_length_white);

			$em->persist($entity);
			$em->flush();	
		}
		

// 		error_log($ar[7]->hole_par);
 		
 		
 		
 		
		return new Response
			(json_encode
				(array('message' => 'OK'))
			);

 		
 		
 	}

}
