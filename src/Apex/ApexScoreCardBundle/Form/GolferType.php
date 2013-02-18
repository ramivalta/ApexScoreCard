<?php

namespace Apex\ApexScoreCardBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class GolferType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
        	->add('username')
			->add('email')
			->add('password')
            ->add('name')
            ->add('tee')
            ->add('gender')
            ->add('handicap')
        ;
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Apex\ApexScoreCardBundle\Entity\Golfer'
        ));
    }

    public function getName()
    {
        return 'apex_apexscorecardbundle_golfertype';
    }
}
