<?php

namespace Apex\ApexScoreCardBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class roundGolferType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('roundId')
            ->add('golferId')

#            ->add('rounds')
#            ->add('golfers')
        ;
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Apex\ApexScoreCardBundle\Entity\roundGolfer'
        ));
    }

    public function getName()
    {
        return 'apex_apexscorecardbundle_roundgolfertype';
    }
}
