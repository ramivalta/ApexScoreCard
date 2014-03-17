<?php

namespace Apex\ApexScoreCardBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use FOS\UserBundle\Form\Type\RegistrationFormType as BaseType;


class RegistrationFormType extends BaseType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        parent::buildForm($builder, $options);

        // add your custom field
        $builder->add('name', 'text', array('label' => 'Nimi'));
  //      $builder->add('tee');
       $builder->add('gender', 'choice', array ('choices' => array('Male' => 'Mies', 'Female' => 'Nainen'), 'label' => 'Sukupuoli', 'expanded' => true, 
        'multiple' => false, 'required' => true  ));
//       $builder->add('handicap');
	}

    public function getName()
    {
        return 'apex_score_registration';
    }
}

?>