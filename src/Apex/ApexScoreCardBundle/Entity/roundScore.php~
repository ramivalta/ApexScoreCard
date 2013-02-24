<?php

namespace Apex\ApexScoreCardBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * roundScore
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Apex\ApexScoreCardBundle\Entity\roundScoreRepository")
 */
class roundScore
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var integer
     *
     * @ORM\Column(name="round_id", type="integer")
     */
    private $roundId;

    /**
     * @var integer
     *
     * @ORM\Column(name="hole_id", type="integer")
     */
    private $holeId;

    /**
     * @var integer
     *
     * @ORM\Column(name="score", type="integer", nullable=true)
     */
    private $score;
    
    /**
     * @var float
     *
     * @ORM\Column(name="round_hcp", type="float")
     */
    private $round_hcp;

    /**
     * @var Apex\ApexScoreCardBundle\Entity\Round
     *
     * @ORM\ManyToOne(targetEntity="Apex\ApexScoreCardBundle\Entity\Round", inversedBy="round_s")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="round_id", referencedColumnName="id")
     * })
     */
    private $rounds;
    

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set roundId
     *
     * @param integer $roundId
     * @return roundScore
     */
    public function setRoundId($roundId)
    {
        $this->roundId = $roundId;
    
        return $this;
    }

    /**
     * Get roundId
     *
     * @return integer 
     */
    public function getRoundId()
    {
        return $this->roundId;
    }


    /**
     * Set holeId
     *
     * @param integer $holeId
     * @return roundScore
     */
    public function setHoleId($holeId)
    {
        $this->holeId = $holeId;
    
        return $this;
    }

    /**
     * Get holeId
     *
     * @return integer 
     */
    public function getHoleId()
    {
        return $this->holeId;
    }

    /**
     * Set score
     *
     * @param integer $score
     * @return roundScore
     */
    public function setScore($score)
    {
        $this->score = $score;
    
        return $this;
    }

    /**
     * Get score
     *
     * @return integer 
     */
    public function getScore()
    {
        return $this->score;
    }


    /**
     * Set rounds
     *
     * @param \Apex\ApexScoreCardBundle\Entity\Round $rounds
     * @return roundScore
     */
    public function setRounds(\Apex\ApexScoreCardBundle\Entity\Round $rounds = null)
    {
        $this->rounds = $rounds;
    
        return $this;
    }

    /**
     * Get rounds
     *
     * @return \Apex\ApexScoreCardBundle\Entity\Round 
     */
    public function getRounds()
    {
        return $this->rounds;
    }

    /**
     * Set round_hcp
     *
     * @param float $roundHcp
     * @return roundScore
     */
    public function setRoundHcp($roundHcp)
    {
        $this->round_hcp = $roundHcp;
    
        return $this;
    }

    /**
     * Get round_hcp
     *
     * @return float 
     */
    public function getRoundHcp()
    {
        return $this->round_hcp;
    }
}