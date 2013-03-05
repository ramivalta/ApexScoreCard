<?php

namespace Apex\ApexScoreCardBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Apex\ApexScoreCardBundle\Entity\Course;
use Apex\ApexScoreCardBundle\Form\CourseType;
use Symfony\Component\HttpFoundation\Response;

/**
 * Course controller.
 *
 * @Route("/course")
 */
class CourseController extends BaseController
{
    /**
     * Lists all Course entities.
     *
     * @Route("/", name="course")
     * @Method("GET")
     * @Template()
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $entities = $em->getRepository('ApexScoreBundle:Course')->findAll();

        return array(
            'entities' => $entities,
        );
    }

    /**
     * Creates a new Course entity.
     *
     * @Route("/", name="course_create")
     * @Method("POST")
     * @Template("ApexScoreBundle:Course:new.html.twig")
     */
    public function createAction(Request $request)
    {
        $entity  = new Course();
        $form = $this->createForm(new CourseType(), $entity);
        $form->bind($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('course_show', array('id' => $entity->getId())));
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Displays a form to create a new Course entity.
     *
     * @Route("/new", name="course_new")
     * @Method("GET")
     * @Template()
     */
    public function newAction()
    {
        $entity = new Course();
        $form   = $this->createForm(new CourseType(), $entity);

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Finds and displays a Course entity.
     *
     * @Route("/{id}", name="course_show")
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ApexScoreBundle:Course')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Course entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Displays a form to edit an existing Course entity.
     *
     * @Route("/{id}/edit", name="course_edit")
     * @Method("GET")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ApexScoreBundle:Course')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Course entity.');
        }

        $editForm = $this->createForm(new CourseType(), $entity);
        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Edits an existing Course entity.
     *
     * @Route("/{id}", name="course_update")
     * @Method("PUT")
     * @Template("ApexScoreBundle:Course:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ApexScoreBundle:Course')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Course entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createForm(new CourseType(), $entity);
        $editForm->bind($request);

        if ($editForm->isValid()) {
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('course_edit', array('id' => $id)));
        }

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Deletes a Course entity.
     *
     * @Route("/{id}", name="course_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, $id)
    {
        $form = $this->createDeleteForm($id);
        $form->bind($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $entity = $em->getRepository('ApexScoreBundle:Course')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find Course entity.');
            }

            $em->remove($entity);
            $em->flush();
        }

        return $this->redirect($this->generateUrl('course'));
    }

    /**
     * Creates a form to delete a Course entity by id.
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
    
    
    public function getCourseListAction()
    {
		$em = $this->getDoctrine()->getManager();
		$entities = $em->getRepository('ApexScoreBundle:Course')->findBy(array(), array('courseName' => 'ASC'));;
		
		if (!$entities) {
    		throw $this->createNotFoundException('Unable to find Course entity');
    	}
		
		$courses = array();
		foreach ($entities as $poops) { // homopaskakyrpä, kaks tuntia meni tähänkin
    		$courses[] = $poops->getJson();
    	}
    	return new Response(json_encode(array('courses' => $courses)));
    }
    
    public function getCourseDataAction()
    {
    	$json = $this->getRequestJson();
    	
    	$course_id = $json->data->course_id;
    	$em = $this->getDoctrine()->getManager();
    	
    	$c = $em->getRepository('ApexScoreBundle:Course')->find($course_id);
    	$course = $c->getJson();
    	
    	return new Response(json_encode(array('course' => $course)));
    }

 /*   public function getCourseNameById()
    {
    	$json = $this->getRequestJson();
    	
    	$course_id = $json->data->course_id;
    	$em = $this->getDoctrine()->getManager();
    	
		$n = $em->getRepository('ApexScoreBundle:Course')-find($course_id);
		
		$name = $m->getJson();
    	
    	return new Response(json_encode(array('course' => $name)));
    	
    } */
    
}


