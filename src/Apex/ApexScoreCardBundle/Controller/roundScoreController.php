<?php

namespace Apex\ApexScoreCardBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Apex\ApexScoreCardBundle\Entity\roundScore;
use Apex\ApexScoreCardBundle\Form\roundScoreType;
use Symfony\Component\HttpFoundation\Response;

/**
 * roundScore controller.
 *
 * @Route("/roundscore")
 */
class roundScoreController extends BaseController
{
    /**
     * Lists all roundScore entities.
     *
     * @Route("/", name="roundscore")
     * @Method("GET")
     * @Template()
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $entities = $em->getRepository('ApexScoreBundle:roundScore')->findAll();

        return array(
            'entities' => $entities,
        );
    }

    /**
     * Creates a new roundScore entity.
     *
     * @Route("/", name="roundscore_create")
     * @Method("POST")
     * @Template("ApexScoreBundle:roundScore:new.html.twig")
     */
    public function createAction(Request $request)
    {
        $entity  = new roundScore();
        $form = $this->createForm(new roundScoreType(), $entity);
        $form->bind($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('roundscore_show', array('id' => $entity->getId())));
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Displays a form to create a new roundScore entity.
     *
     * @Route("/new", name="roundscore_new")
     * @Method("GET")
     * @Template()
     */
    public function newAction()
    {
        $entity = new roundScore();
        $form   = $this->createForm(new roundScoreType(), $entity);

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Finds and displays a roundScore entity.
     *
     * @Route("/{id}", name="roundscore_show")
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ApexScoreBundle:roundScore')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find roundScore entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Displays a form to edit an existing roundScore entity.
     *
     * @Route("/{id}/edit", name="roundscore_edit")
     * @Method("GET")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ApexScoreBundle:roundScore')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find roundScore entity.');
        }

        $editForm = $this->createForm(new roundScoreType(), $entity);
        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Edits an existing roundScore entity.
     *
     * @Route("/{id}", name="roundscore_update")
     * @Method("PUT")
     * @Template("ApexScoreBundle:roundScore:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ApexScoreBundle:roundScore')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find roundScore entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createForm(new roundScoreType(), $entity);
        $editForm->bind($request);

        if ($editForm->isValid()) {
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('roundscore_edit', array('id' => $id)));
        }

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Deletes a roundScore entity.
     *
     * @Route("/{id}", name="roundscore_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, $id)
    {
        $form = $this->createDeleteForm($id);
        $form->bind($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $entity = $em->getRepository('ApexScoreBundle:roundScore')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find roundScore entity.');
            }

            $em->remove($entity);
            $em->flush();
        }

        return $this->redirect($this->generateUrl('roundscore'));
    }

    /**
     * Creates a form to delete a roundScore entity by id.
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
    
    public function createNewRoundScoreAction()
    {
    	$json = $this->getRequestJson();
    	
    	$round_id = $json->data->round_id;
    	$round_hcp = $json->data->round_hcp;
    	
    	$em = $this->getDoctrine()->getManager();
    	
    	$entity = new roundScore();
    	
		$round = $em->getRepository('ApexScoreBundle:Round')->find($round_id);
		
		$entity->setRounds($round);
		$entity->setRoundHcp($round_hcp);
    	$entity->setHoleId(1);
/*    	$entity->setScore(); */
    	
    	$em->persist($entity);
    	$em->flush();
    	
		return new Response(json_encode(array('message' => 'OK')));
    	
    }	
    	
}
