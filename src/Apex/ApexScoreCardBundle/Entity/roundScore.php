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
     * @var float
     *
     * @ORM\Column(name="round_tee", type="string", length=255)
     */
    private $round_tee;
    
    /**
     * @var boolean
     * @ORM\Column(name="fairway_hit", type="boolean", nullable=true)
     */
    private $fairway_hit;
    
    /**
     * @var boolean
     * @ORM\Column(name="green_hit", type="boolean", nullable=true)
     */
    private $green_hit;
    

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
	 * Get fairway_hit
	 *
	 * @return boolean
	 */
	public function getFairwayHit()
	{
		return $this->fairway_hit;
	}
	
	/**
	 * Set fairway_hit
	 *
	 * @return roundScore
	 */
	public function setFairwayHit($fairway_hit)
	{
		$this->fairway_hit = $fairway_hit;
		
		return $this;
	}
	
	/**
	 * Get green_hit
	 *
	 * @return boolean
	 */
	public function getGreenHit()
	{
		return $this->green_hit;
	}
	
	/**
	 * Set green_hit
	 *
	 * @return roundScore
	 */
	public function setGreenHit($green_hit)
	{
		$this->green_hit = $green_hit;
		
		return $this;
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
     * Set round_tee
     *
     * @param string $roundTee
     * @return roundScore
     */
    public function setRoundTee($roundTee)
    {
        $this->round_tee = $roundTee;
        
        return $this;
    }

    /**
     * Get round_tee
     *
     * @return string
     */
    public function getRoundTee()
    {
        return $this->round_tee;
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
    
    public function getJson()
    {
    	$fairway_hit = $this->fairway_hit;
    	if ($fairway_hit == null || $fairway_hit == 0) {
    		$fairway_hit = false;
    	}
    	else if ($fairway_hit == 1) {
    		$fairway_hit = true;
    	}
    	$green_hit = $this->green_hit;
    	if ($green_hit == null || $green_hit == 0) {
    		$green_hit = false;
    	}
    	else if ($green_hit == 1) {
    		$green_hit = true;
    	}
    	
    	return array(
    		'id' 		=> $this->id,
    		'round_id'  => $this->roundId,
    		'hole_id' 	=> $this->holeId,
    		'score' 	=> $this->score,
    		'round_hcp' => $this->round_hcp,
    		'round_tee' => $this->round_tee,
    		'fairway_hit' => $fairway_hit,
    		'green_hit' => $green_hit,
    	);
    }
}