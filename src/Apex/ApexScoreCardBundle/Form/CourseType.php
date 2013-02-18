<?php

namespace Apex\ApexScoreCardBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class CourseType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('courseName')
            ->add('courseAlias')
            ->add('crRedMen')
            ->add('crBlueMen')
            ->add('crYellowMen')
            ->add('crWhiteMen')
            ->add('crRedLadies')
            ->add('crBlueLadies')
            ->add('crYellowLadies')
            ->add('crWhiteLadies')
            ->add('slRedMen')
            ->add('slBlueMen')
            ->add('slYellowMen')
            ->add('slWhiteMen')
            ->add('slRedLadies')
            ->add('slBlueLadies')
            ->add('slYellowLadies')
            ->add('slWhiteLadies')
        ;
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Apex\ApexScoreCardBundle\Entity\Course'
        ));
    }

    public function getName()
    {
        return 'apex_apexscorecardbundle_coursetype';
    }
}
