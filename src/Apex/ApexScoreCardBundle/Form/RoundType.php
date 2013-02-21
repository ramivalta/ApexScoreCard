<?php

namespace Apex\ApexScoreCardBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class RoundType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
    	
        $builder
            ->add('courseId')
#            , 'choice', array(
 #           	'choices' => array(
  #          		'1' => 'Muurame Golf hardcoded',
	#				'2' => 'Laukaan Peurunkagolf hardcoded',
     #       	)))
            ->add('startTime')
            ->add('endTime')

        ;
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Apex\ApexScoreCardBundle\Entity\Round'
        ));
    }

    public function getName()
    {
        return 'apex_apexscorecardbundle_roundtype';
    }
}
