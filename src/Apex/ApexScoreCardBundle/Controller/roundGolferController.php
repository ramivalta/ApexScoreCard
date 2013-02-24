<?php

namespace Apex\ApexScoreCardBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Apex\ApexScoreCardBundle\Entity\roundGolfer;
use Apex\ApexScoreCardBundle\Form\roundGolferType;
use Symfony\Component\HttpFoundation\Response;

/**
 * roundGolfer controller.
 *
 * @Route("/roundgolfer")
 */
class roundGolferController extends BaseController
{
    /**
     * Lists all roundGolfer entities.
     *
     * @Route("/", name="roundgolfer")
     * @Method("GET")
     * @Template()
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $entities = $em->getRepository('ApexScoreBundle:roundGolfer')->findAll();

        return array(
            'entities' => $entities,
        );
    }

    /**
     * Creates a new roundGolfer entity.
     *
     * @Route("/", name="roundgolfer_create")
     * @Method("POST")
     * @Template("ApexScoreBundle:roundGolfer:new.html.twig")
     */
    public function createAction(Request $request)
    {
        $entity  = new roundGolfer();
        $form = $this->createForm(new roundGolferType(), $entity);
        $form->bind($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('roundgolfer_show', array('id' => $entity->getId())));
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Displays a form to create a new roundGolfer entity.
     *
     * @Route("/new", name="roundgolfer_new")
     * @Method("GET")
     * @Template()
     */
    public function newAction()
    {
        $entity = new roundGolfer();
        $form   = $this->createForm(new roundGolferType(), $entity);

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Finds and displays a roundGolfer entity.
     *
     * @Route("/{id}", name="roundgolfer_show")
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ApexScoreBundle:roundGolfer')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find roundGolfer entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Displays a form to edit an existing roundGolfer entity.
     *
     * @Route("/{id}/edit", name="roundgolfer_edit")
     * @Method("GET")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ApexScoreBundle:roundGolfer')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find roundGolfer entity.');
        }

        $editForm = $this->createForm(new roundGolferType(), $entity);
        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Edits an existing roundGolfer entity.
     *
     * @Route("/{id}", name="roundgolfer_update")
     * @Method("PUT")
     * @Template("ApexScoreBundle:roundGolfer:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ApexScoreBundle:roundGolfer')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find roundGolfer entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createForm(new roundGolferType(), $entity);
        $editForm->bind($request);

        if ($editForm->isValid()) {
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('roundgolfer_edit', array('id' => $id)));
        }

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Deletes a roundGolfer entity.
     *
     * @Route("/{id}", name="roundgolfer_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, $id)
    {
        $form = $this->createDeleteForm($id);
        $form->bind($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $entity = $em->getRepository('ApexScoreBundle:roundGolfer')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find roundGolfer entity.');
            }

            $em->remove($entity);
            $em->flush();
        }

        return $this->redirect($this->generateUrl('roundgolfer'));
    }

    /**
     * Creates a form to delete a roundGolfer entity by id.
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
    
    public function createNewRoundGolferAction()
    {
    	$json = $this->getRequestJson();
    
		$round_id = $json->data->round_id;
//		error_log($json->round_data->golfer_id);


    	$em = $this->getDoctrine()->getManager();
    	
		$golfer_id = $this->get('security.context')->getToken()->getUser()->getId();

    	$entity = new roundGolfer();
    	
    	$round = $em->getRepository('ApexScoreBundle:Round')->find($round_id);
    	$golfer = $em->getRepository('ApexScoreBundle:Golfer')->find($golfer_id);
    	
    	$entity->setRounds($round);
    	$entity->setGolfers($golfer);
    	
    	$em->persist($entity);
    	$em->flush();
    	
    	return new Response(json_encode(array('message' => 'OK')));
    }
}
