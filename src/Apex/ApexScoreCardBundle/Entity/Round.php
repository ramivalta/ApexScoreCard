<?php

namespace Apex\ApexScoreCardBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Round
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Apex\ApexScoreCardBundle\Entity\RoundRepository")

 */
class Round
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
     * @ORM\Column(name="course_id", type="integer")
     */
    private $courseId;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="startTime", type="datetimetz")
     */
    private $startTime;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="endTime", type="datetimetz", nullable=true)
     */
    private $endTime;
    
    
    /**
     * @var Apex\ApexScoreCardBundle\Entity\Course
     *
     * @ORM\ManyToOne(targetEntity="Apex\ApexScoreCardBundle\Entity\Course", inversedBy="rounds")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="course_id", referencedColumnName="id")
     * })
     */
    private $course;
    
    
    /**
     * @ORM\OneToMany(targetEntity="Apex\ApexScoreCardBundle\Entity\roundGolfer", mappedBy="rounds")
     */
    private $golfer;
    
    /**
     * @ORM\OneToMany(targetEntity="Apex\ApexScoreCardBundle\Entity\roundScore", mappedBy="rounds")
     */    
    private $score;
    
    
	/**
	 * Get course
	 * @return course
	 */
	public function getCourse()
	{
		return $this->course;
	}


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
     * Set courseId
     *
     * @param integer $courseId
     * @return Round
     */
    public function setCourseId($courseId)
    {
        $this->courseId = $courseId;
    
        return $this;
    }

    /**
     * Get courseId
     *
     * @return integer 
     */
    public function getCourseId()
    {
        return $this->courseId;
    }

    /**
     * Set startTime
     *
     * @param \DateTime $startTime
     * @return Round
     */
    public function setStartTime($startTime)
    {
        $this->startTime = $startTime;
    
        return $this;
    }

    /**
     * Get startTime
     *
     * @return \DateTime 
     */
    public function getStartTime()
    {
        return $this->startTime;
    }

    /**
     * Set endTime
     *
     * @param \DateTime $endTime
     * @return Round
     */
    public function setEndTime($endTime)
    {
        $this->endTime = $endTime;
    
        return $this;
    }

    /**
     * Get endTime
     *
     * @return \DateTime 
     */
    public function getEndTime()
    {
        return $this->endTime;
    }

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->round = new \Doctrine\Common\Collections\ArrayCollection();
    }
    
    /**
     * Set course
     *
     * @param \Apex\ApexScoreCardBundle\Entity\Course $course
     * @return Round
     */
//    public function setCourse(\Apex\ApexScoreCardBundle\Entity\Course $course = null)
    public function setCourse($course)
    {
        $this->course = $course;
    
        return $this;
    }

       public function getJson()
    {
    	return array(
    		'id' => $this->id,
    		'course_id' => $this->courseId,
    		'start_time' => $this->startTime,
    		'end_time' => $this->endTime,
    	);
    }
    		

    /**
     * Add golfer
     *
     * @param \Apex\ApexScoreCardBundle\Entity\roundGolfer $golfer
     * @return Round
     */
    public function addGolfer(\Apex\ApexScoreCardBundle\Entity\roundGolfer $golfer)
    {
        $this->golfer[] = $golfer;
    
        return $this;
    }

    /**
     * Remove golfer
     *
     * @param \Apex\ApexScoreCardBundle\Entity\roundGolfer $golfer
     */
    public function removeGolfer(\Apex\ApexScoreCardBundle\Entity\roundGolfer $golfer)
    {
        $this->golfer->removeElement($golfer);
    }

    /**
     * Get golfer
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getGolfer()
    {
        return $this->golfer;
    }

    /**
     * Add score
     *
     * @param \Apex\ApexScoreCardBundle\Entity\roundScore $score
     * @return Round
     */
    public function addScore(\Apex\ApexScoreCardBundle\Entity\roundScore $score)
    {
        $this->score[] = $score;
    
        return $this;
    }

    /**
     * Remove score
     *
     * @param \Apex\ApexScoreCardBundle\Entity\roundScore $score
     */
    public function removeScore(\Apex\ApexScoreCardBundle\Entity\roundScore $score)
    {
        $this->score->removeElement($score);
    }

    /**
     * Get score
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getScore()
    {
        return $this->score;
    }
}