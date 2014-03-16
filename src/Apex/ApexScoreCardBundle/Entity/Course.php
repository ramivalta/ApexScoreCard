<?php

namespace Apex\ApexScoreCardBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Course
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Apex\ApexScoreCardBundle\Entity\CourseRepository")
 */
class Course
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
     * @var string
     *
     * @ORM\Column(name="courseName", type="string", length=255)
     */
    private $courseName;

    /**
     * @var string
     *
     * @ORM\Column(name="courseAlias", type="string", length=255)
     */
    private $courseAlias;

    /**
     * @var float
     *
     * @ORM\Column(name="crRedMen", type="float")
     */
    private $crRedMen;

    /**
     * @var float
     *
     * @ORM\Column(name="crBlueMen", type="float")
     */
    private $crBlueMen;

    /**
     * @var float
     *
     * @ORM\Column(name="crYellowMen", type="float")
     */
    private $crYellowMen;

    /**
     * @var float
     *
     * @ORM\Column(name="crWhiteMen", type="float")
     */
    private $crWhiteMen;

    /**
     * @var float
     *
     * @ORM\Column(name="crRedLadies", type="float")
     */
    private $crRedLadies;

    /**
     * @var float
     *
     * @ORM\Column(name="crBlueLadies", type="float")
     */
    private $crBlueLadies;

    /**
     * @var float
     *
     * @ORM\Column(name="crYellowLadies", type="float")
     */
    private $crYellowLadies;

    /**
     * @var float
     *
     * @ORM\Column(name="slRedMen", type="float")
     */
    private $slRedMen;

    /**
     * @var float
     *
     * @ORM\Column(name="slBlueMen", type="float")
     */
    private $slBlueMen;

    /**
     * @var float
     *
     * @ORM\Column(name="slYellowMen", type="float")
     */
    private $slYellowMen;

    /**
     * @var float
     *
     * @ORM\Column(name="slWhiteMen", type="float")
     */
    private $slWhiteMen;

    /**
     * @var float
     *
     * @ORM\Column(name="slRedLadies", type="float")
     */
    private $slRedLadies;

    /**
     * @var float
     *
     * @ORM\Column(name="slBlueLadies", type="float")
     */
    private $slBlueLadies;

    /**
     * @var float
     *
     * @ORM\Column(name="slYellowLadies", type="float")
     */
    private $slYellowLadies;
    
    /**
     * @var integer
     *
     * @ORM\Column(name="addedBy", type="integer", nullable=true)
     */
     
    private $addedBy;

    /**
     * @ORM\OneToMany(targetEntity="Apex\ApexScoreCardBundle\Entity\Hole", mappedBy="course")
     */
    private $holes;

    /**
     * @ORM\OneToMany(targetEntity="Apex\ApexScoreCardBundle\Entity\Round", mappedBy="course")
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
     * Set courseName
     *
     * @param string $courseName
     * @return Course
     */
    public function setCourseName($courseName)
    {
        $this->courseName = $courseName;
    
        return $this;
    }

    /**
     * Get courseName
     *
     * @return string 
     */
    public function getCourseName()
    {
        return $this->courseName;
    }

    /**
     * Set courseAlias
     *
     * @param string $courseAlias
     * @return Course
     */
    public function setCourseAlias($courseAlias)
    {
        $this->courseAlias = $courseAlias;
    
        return $this;
    }

    /**
     * Get courseAlias
     *
     * @return string 
     */
    public function getCourseAlias()
    {
        return $this->courseAlias;
    }

    /**
     * Set crRedMen
     *
     * @param float $crRedMen
     * @return Course
     */
    public function setCrRedMen($crRedMen)
    {
        $this->crRedMen = $crRedMen;
    
        return $this;
    }

    /**
     * Get crRedMen
     *
     * @return float 
     */
    public function getCrRedMen()
    {
        return $this->crRedMen;
    }

    /**
     * Set crBlueMen
     *
     * @param float $crBlueMen
     * @return Course
     */
    public function setCrBlueMen($crBlueMen)
    {
        $this->crBlueMen = $crBlueMen;
    
        return $this;
    }

    /**
     * Get crBlueMen
     *
     * @return float 
     */
    public function getCrBlueMen()
    {
        return $this->crBlueMen;
    }

    /**
     * Set crYellowMen
     *
     * @param float $crYellowMen
     * @return Course
     */
    public function setCrYellowMen($crYellowMen)
    {
        $this->crYellowMen = $crYellowMen;
    
        return $this;
    }

    /**
     * Get crYellowMen
     *
     * @return float 
     */
    public function getCrYellowMen()
    {
        return $this->crYellowMen;
    }

    /**
     * Set crWhiteMen
     *
     * @param float $crWhiteMen
     * @return Course
     */
    public function setCrWhiteMen($crWhiteMen)
    {
        $this->crWhiteMen = $crWhiteMen;
    
        return $this;
    }

    /**
     * Get crWhiteMen
     *
     * @return float 
     */
    public function getCrWhiteMen()
    {
        return $this->crWhiteMen;
    }

    /**
     * Set crRedLadies
     *
     * @param float $crRedLadies
     * @return Course
     */
    public function setCrRedLadies($crRedLadies)
    {
        $this->crRedLadies = $crRedLadies;
    
        return $this;
    }

    /**
     * Get crRedLadies
     *
     * @return float 
     */
    public function getCrRedLadies()
    {
        return $this->crRedLadies;
    }

    /**
     * Set crBlueLadies
     *
     * @param float $crBlueLadies
     * @return Course
     */
    public function setCrBlueLadies($crBlueLadies)
    {
        $this->crBlueLadies = $crBlueLadies;
    
        return $this;
    }

    /**
     * Get crBlueLadies
     *
     * @return float 
     */
    public function getCrBlueLadies()
    {
        return $this->crBlueLadies;
    }

    /**
     * Set crYellowLadies
     *
     * @param float $crYellowLadies
     * @return Course
     */
    public function setCrYellowLadies($crYellowLadies)
    {
        $this->crYellowLadies = $crYellowLadies;
    
        return $this;
    }

    /**
     * Get crYellowLadies
     *
     * @return float 
     */
    public function getCrYellowLadies()
    {
        return $this->crYellowLadies;
    }


    /**
     * Set slRedMen
     *
     * @param float $slRedMen
     * @return Course
     */
    public function setSlRedMen($slRedMen)
    {
        $this->slRedMen = $slRedMen;
    
        return $this;
    }

    /**
     * Get slRedMen
     *
     * @return float 
     */
    public function getSlRedMen()
    {
        return $this->slRedMen;
    }

    /**
     * Set slBlueMen
     *
     * @param float $slBlueMen
     * @return Course
     */
    public function setSlBlueMen($slBlueMen)
    {
        $this->slBlueMen = $slBlueMen;
    
        return $this;
    }

    /**
     * Get slBlueMen
     *
     * @return float 
     */
    public function getSlBlueMen()
    {
        return $this->slBlueMen;
    }
    
    
    /**
     * Set addedBy
     *
     * @param integer $addedBy
     * @return Course
     */
    public function setAddedBy($addedBy)
    {
    	$this->addedBy = $addedBy;
    	
    	return $this;
    }
    
    /**
     * Get addedBy
     *
     * @return integer
     */
    public function getAddedBy()
    {
    	return $this->addedBy;
    }

    /**
     * Set slYellowMen
     *
     * @param float $slYellowMen
     * @return Course
     */
    public function setSlYellowMen($slYellowMen)
    {
        $this->slYellowMen = $slYellowMen;
    
        return $this;
    }

    /**
     * Get slYellowMen
     *
     * @return float 
     */
    public function getSlYellowMen()
    {
        return $this->slYellowMen;
    }

    /**
     * Set slWhiteMen
     *
     * @param float $slWhiteMen
     * @return Course
     */
    public function setSlWhiteMen($slWhiteMen)
    {
        $this->slWhiteMen = $slWhiteMen;
    
        return $this;
    }

    /**
     * Get slWhiteMen
     *
     * @return float 
     */
    public function getSlWhiteMen()
    {
        return $this->slWhiteMen;
    }

    /**
     * Set slRedLadies
     *
     * @param float $slRedLadies
     * @return Course
     */
    public function setSlRedLadies($slRedLadies)
    {
        $this->slRedLadies = $slRedLadies;
    
        return $this;
    }

    /**
     * Get slRedLadies
     *
     * @return float 
     */
    public function getSlRedLadies()
    {
        return $this->slRedLadies;
    }

    /**
     * Set slBlueLadies
     *
     * @param float $slBlueLadies
     * @return Course
     */
    public function setSlBlueLadies($slBlueLadies)
    {
        $this->slBlueLadies = $slBlueLadies;
    
        return $this;
    }

    /**
     * Get slBlueLadies
     *
     * @return float 
     */
    public function getSlBlueLadies()
    {
        return $this->slBlueLadies;
    }

    /**
     * Set slYellowLadies
     *
     * @param float $slYellowLadies
     * @return Course
     */
    public function setSlYellowLadies($slYellowLadies)
    {
        $this->slYellowLadies = $slYellowLadies;
    
        return $this;
    }

    /**
     * Get slYellowLadies
     *
     * @return float 
     */
    public function getSlYellowLadies()
    {
        return $this->slYellowLadies;
    }

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->holes = new \Doctrine\Common\Collections\ArrayCollection();
    }
    
    /**
     * Add holes
     *
     * @param \Apex\ApexScoreCardBundle\Entity\Hole $holes
     * @return Course
     */
    public function addHole(\Apex\ApexScoreCardBundle\Entity\Hole $holes)
    {
        $this->holes[] = $holes;
    
        return $this;
    }

    /**
     * Remove holes
     *
     * @param \Apex\ApexScoreCardBundle\Entity\Hole $holes
     */
    public function removeHole(\Apex\ApexScoreCardBundle\Entity\Hole $holes)
    {
        $this->holes->removeElement($holes);
    }

    /**
     * Get holes
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getHoles()
    {
        return $this->holes;
    }
    
    public function getJson() {
    	return array(
    		'id' 				=> $this->id,
    		'name'				=> $this->courseName,
    		'alias' 			=> $this->courseAlias,
    		'crRedMen' 			=> $this->crRedMen,
    		'crBlueMen' 		=> $this->crBlueMen,
    		'crYellowMen' 		=> $this->crYellowMen,
    		'crWhiteMen' 		=> $this->crWhiteMen,
    		'crRedLadies' 		=> $this->crRedLadies,
    		'crBlueLadies' 		=> $this->crBlueLadies,
    		'crYellowLadies'	=> $this->crYellowLadies,
    		'slRedMen' 			=> $this->slRedMen,
    		'slBlueMen' 		=> $this->slBlueMen,
    		'slYellowMen' 		=> $this->slYellowMen,
    		'slWhiteMen' 		=> $this->slWhiteMen,
    		'slRedLadies' 		=> $this->slRedLadies,
    		'slBlueLadies' 		=> $this->slBlueLadies,
    		'slYellowLadies' 	=> $this->slYellowLadies,
    		'addedBy'			=> $this->addedBy,
    		'hole_count'		=> count($this->getHoles()),
    	);
    }

    /**
     * Add rounds
     *
     * @param \Apex\ApexScoreCardBundle\Entity\Round $rounds
     * @return Course
     */
    public function addRound(\Apex\ApexScoreCardBundle\Entity\Round $rounds)
    {
        $this->rounds[] = $rounds;
    
        return $this;
    }

    /**
     * Remove rounds
     *
     * @param \Apex\ApexScoreCardBundle\Entity\Round $rounds
     */
    public function removeRound(\Apex\ApexScoreCardBundle\Entity\Round $rounds)
    {
        $this->rounds->removeElement($rounds);
    }

    /**
     * Get rounds
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getRounds()
    {
        return $this->rounds;
    }
    
    public function getCoursePar()
    {
    	$holes = $this->getHoles();
    	$par = 0;
    	foreach ($holes as $h) {
    		$par += $h->getPar();
    	}
    	
    	return $par;
    }
    
}