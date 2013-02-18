<?php

namespace Apex\ApexScoreCardBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Apex\ApexScoreCardBundle\Entity\Round;
use Apex\ApexScoreCardBundle\Form\RoundType;

/**
 * Round controller.
 *
 * @Route("/round")
 */
class RoundController extends Controller
{
    /**
     * Lists all Round entities.
     *
     * @Route("/", name="round")
     * @Method("GET")
     * @Template()
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $entities = $em->getRepository('ApexScoreBundle:Round')->findAll();

        return array(
            'entities' => $entities,
        );
    }

    /**
     * Creates a new Round entity.
     *
     * @Route("/", name="round_create")
     * @Method("POST")
     * @Template("ApexScoreBundle:Round:new.html.twig")
     */
    public function createAction(Request $request)
    {
        $entity  = new Round();
        $form = $this->createForm(new RoundType(), $entity);
        $form->bind($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('round_show', array('id' => $entity->getId())));
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Displays a form to create a new Round entity.
     *
     * @Route("/new", name="round_new")
     * @Method("GET")
     * @Template()
     */
    public function newAction()
    {
        $entity = new Round();
        $form   = $this->createForm(new RoundType(), $entity);

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Finds and displays a Round entity.
     *
     * @Route("/{id}", name="round_show")
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ApexScoreBundle:Round')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Round entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Displays a form to edit an existing Round entity.
     *
     * @Route("/{id}/edit", name="round_edit")
     * @Method("GET")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ApexScoreBundle:Round')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Round entity.');
        }

        $editForm = $this->createForm(new RoundType(), $entity);
        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Edits an existing Round entity.
     *
     * @Route("/{id}", name="round_update")
     * @Method("PUT")
     * @Template("ApexScoreBundle:Round:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ApexScoreBundle:Round')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Round entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createForm(new RoundType(), $entity);
        $editForm->bind($request);

        if ($editForm->isValid()) {
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('round_edit', array('id' => $id)));
        }

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Deletes a Round entity.
     *
     * @Route("/{id}", name="round_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, $id)
    {
        $form = $this->createDeleteForm($id);
        $form->bind($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $entity = $em->getRepository('ApexScoreBundle:Round')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find Round entity.');
            }

            $em->remove($entity);
            $em->flush();
        }

        return $this->redirect($this->generateUrl('round'));
    }

    /**
     * Creates a form to delete a Round entity by id.
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
}
