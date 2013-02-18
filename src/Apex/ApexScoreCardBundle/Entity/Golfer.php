<?php

namespace Apex\ApexScoreCardBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * Golfer
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Apex\ApexScoreCardBundle\Entity\GolferRepository")
 */
class Golfer implements UserInterface
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
     * @ORM\Column(type="string", length=25, unique=true)
     */
    private $username;
        
    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="tee", type="string", length=255)
     */
    private $tee;

    /**
     * @var string
     *
     * @ORM\Column(name="gender", type="string", length=255)
     */
    private $gender;


	/**
	 * @var float
	 *
	 * @ORM\Column(name="handicap", type="float")
	 */
	private $handicap;

    /**
     * @var string $password
     *
     * @ORM\Column(name="password", type="string", length=200, nullable=true)
     */
    private $password;

    /**
     * @var string $salt
     *
     * @ORM\Column(name="salt", type="string", length=40, nullable=true)
     */
    private $salt;

    /**
     * @ORM\Column(type="string", length=60, unique=true)
     */
    private $email;
    
    

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
     * Set name
     *
     * @param string $name
     * @return Golfer
     */
    public function setName($name)
    {
        $this->name = $name;
    
        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set tee
     *
     * @param string $tee
     * @return Golfer
     */
    public function setTee($tee)
    {
        $this->tee = $tee;
    
        return $this;
    }

    /**
     * Get tee
     *
     * @return string 
     */
    public function getTee()
    {
        return $this->tee;
    }

    /**
     * Set gender
     *
     * @param string $gender
     * @return Golfer
     */
    public function setGender($gender)
    {
        $this->gender = $gender;
    
        return $this;
    }

    /**
     * Get gender
     *
     * @return string 
     */
    public function getGender()
    {
        return $this->gender;
    }
    
    /**
     * Set handicap
     *
     * @param float $handicap
     * @return Golfer
     */
    public function setHandicap($handicap)
    {
        $this->handicap = $handicap;
    
        return $this;
    }
    
    /**
     * Set username
     *
     * @param string $username
	 */

	public function setUsername($username)
	{
		$this->username = $username;
		
		return $this;
	}

   /**
     * Set email
     *
     * @param string $email
	 */

	public function setEmail($email)
	{
		$this->email = $email;
		
		return $this;
	}



    /**
     * Get handicap
     *
     * @return float 
     */
    public function getHandicap()
    {
        return $this->handicap;
    }
    
    public function __construct()
    {
        $this->isActive = true;
        $this->salt = md5(uniqid(null, true));
    }

    /**
     * Get isActive
     *
     * @return boolean 
     */
    public function getIsActive()
    {
        return $this->isActive;
    }

    /**
     * @inheritDoc
     */
    public function getUsername()
    {
        return $this->username;
    }

   /**
     * @inheritDoc
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @inheritDoc
     */
    public function getSalt()
    {
        return $this->salt;
    }

    /**
     * @inheritDoc
     */
    public function getPassword()
    {
        return $this->password;
    }

    public function setPassword($password)
    {
        $this->password = $password;
    }

    /**
     * @inheritDoc
     */
    public function getRoles()
    {
        return array('ROLE_USER');
    }

    /**
     * @inheritDoc
     */
    public function eraseCredentials()
    {
    }

    /**
     * @see \Serializable::serialize()
     */
    public function serialize()
    {
        return serialize(array(
            $this->id,
        ));
    }

    /**
     * @see \Serializable::unserialize()
     */
    public function unserialize($serialized)
    {
        list (
            $this->id,
        ) = unserialize($serialized);
    }
    
}
