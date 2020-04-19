mysql -u root -p
123456

drop database steg;
create database steg;
use steg;

CREATE TABLE `users` (
            `id` INT  NOT NULL AUTO_INCREMENT,            
            `email` VARCHAR(255) NOT NULL,
            `password` varchar(32) NOT NULL,                     
            `firstname` VARCHAR(100)  NOT NULL,            
            `sweetname` VARCHAR(100)  NOT NULL,                
            `dateofjoin` datetime NOT NULL,                  
            `usertype` tinyint(3) unsigned NOT NULL default 1,
            `canuse` tinyint(3) unsigned NOT NULL default 1,  
            `siteType` VARCHAR(100)  NOT NULL,                
            PRIMARY KEY (`id`),
            UNIQUE (email)                        
)ENGINE=InnoDB AUTO_INCREMENT=501;

drop table fileuploads;
CREATE TABLE `fileuploads` (
   tid int unsigned NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,  
  `album` TEXT NULL,
  `filename` TEXT NULL,
  `filesize` TEXT NULL,
  `filepath` TEXT NULL,
  `filetype` TEXT NULL,     
  `tags` TEXT NULL,   
  `fkey` TEXT NULL,    
  `uploaddate` datetime NULL,
  `visible` VARCHAR(10) NOT NULL default 'Y',  
  PRIMARY KEY (`tid` ASC)
)ENGINE = MYISAM;

-- existing access control policy
drop table acp;
CREATE TABLE `acp` (
   fid int unsigned NOT NULL,
  `ownerid` VARCHAR(255) NOT NULL,    
  `recieverid` VARCHAR(255) NOT NULL,
   isshared int unsigned default 0,   
  `shareddate` datetime NULL,
  `fkey` TEXT NULL,
   PRIMARY KEY (fid,ownerid,recieverid)
) DEFAULT CHARSET=utf8 ENGINE=InnoDB;

commit;
