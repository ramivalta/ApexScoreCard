<?php

namespace Apex\ApexScoreCardBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Apex\ApexScoreCardBundle\Entity\Golfer;
use Apex\ApexScoreCardBundle\Form\GolferType;
use Symfony\Component\HttpFoundation\Response;

/**
 * Golfer controller.
 *
 * @Route("/golfer")
 */
class GolferController extends BaseController
{
    /**
     * Lists all Golfer entities.
     *
     * @Route("/", name="golfer")
     * @Method("GET")
     * @Template()
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $entities = $em->getRepository('ApexScoreBundle:Golfer')->findAll();

        return array(
            'entities' => $entities,
        );
    }

    /**
     * Creates a new Golfer entity.
     *
     * @Route("/", name="golfer_create")
     * @Method("POST")
     * @Template("ApexScoreBundle:Golfer:new.html.twig")
     */
    public function createAction(Request $request)
    {
        $entity  = new Golfer();
        $form = $this->createForm(new GolferType(), $entity);
        $form->bind($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('golfer_show', array('id' => $entity->getId())));
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Displays a form to create a new Golfer entity.
     *
     * @Route("/new", name="golfer_new")
     * @Method("GET")
     * @Template()
     */
    public function newAction()
    {
        $entity = new Golfer();
        $form   = $this->createForm(new GolferType(), $entity);

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Finds and displays a Golfer entity.
     *
     * @Route("/{id}", name="golfer_show")
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ApexScoreBundle:Golfer')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Golfer entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Displays a form to edit an existing Golfer entity.
     *
     * @Route("/{id}/edit", name="golfer_edit")
     * @Method("GET")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ApexScoreBundle:Golfer')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Golfer entity.');
        }

        $editForm = $this->createForm(new GolferType(), $entity);
        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Edits an existing Golfer entity.
     *
     * @Route("/{id}", name="golfer_update")
     * @Method("PUT")
     * @Template("ApexScoreBundle:Golfer:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ApexScoreBundle:Golfer')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Golfer entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createForm(new GolferType(), $entity);
        $editForm->bind($request);

        if ($editForm->isValid()) {
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('golfer_edit', array('id' => $id)));
        }

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Deletes a Golfer entity.
     *
     * @Route("/{id}", name="golfer_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, $id)
    {
        $form = $this->createDeleteForm($id);
        $form->bind($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $entity = $em->getRepository('ApexScoreBundle:Golfer')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find Golfer entity.');
            }

            $em->remove($entity);
            $em->flush();
        }

        return $this->redirect($this->generateUrl('golfer'));
    }

    /**
     * Creates a form to delete a Golfer entity by id.
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
    
    public function jsonGolferAction()
    {
    	$json = $this->getRequestJson();
    	
    	$em = $this->getDoctrine()->getManager();
    	
    	$entity = $em->getRepository('ApexScoreBundle:Golfer')->find($json->id);
    	
    	if (!$entity) {
    		throw $this->createNotFoundException('Unable to find Golfer entity');
    	}
    	
    	$golfer = $entity->getJson();
    	
    	return new Response(json_encode(array('golfer' => $golfer)));
    }
    	
}
