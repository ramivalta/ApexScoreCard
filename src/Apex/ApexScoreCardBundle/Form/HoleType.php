<?php

namespace Apex\ApexScoreCardBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class HoleType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('holeNumber')
            ->add('par')
            ->add('hcp')
            ->add('lengthRed')
            ->add('lengthBlue')
            ->add('lengthYellow')
            ->add('lengthWhite')
        ;
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Apex\ApexScoreCardBundle\Entity\Hole'
        ));
    }

    public function getName()
    {
        return 'apex_apexscorecardbundle_holetype';
    }
}
