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
            ->add('startTime')
            ->add('endTime')
            ->add('course')
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
