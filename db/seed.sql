-- create database workoutBud_db;

-- use  workoutBud_db;

create table sub_body (
 id int NOT NULL AUTO_INCREMENT,
 sub_body_id int,
 sub_body_name varchar(100),
 createdAt datetime,
updatedAt datetime,
 primary key (id)
);
-- drop table sub_body; 
create table symptoms (
id int NOT NULL AUTO_INCREMENT,
symptom_id int,
symptom_name varchar(100),
gender varchar(8),
sub_body_id int,
createdAt datetime,
updatedAt datetime,
primary key (id)
);
-- drop table symptoms ; 

insert into sub_body ( sub_body_id, sub_body_name) values (41,"Knee"), (43, "Ankle");

insert into symptoms (symptom_id,symptom_name,sub_body_id, gender ) 
	values (256, "Knee Pain",  41, "M"), 
	(145, "Knee Tension",  41, "M"), 
	(146, "Upper Knee pain",  41, "M"),
	 (984, "No Knee Pulse",  41, "M"),
      (142, "Pain in the calves", 43, "M"),
      (143, "Ulcer", 43, "M"),
      (147, "Ankle swelling", 43, "M"),
      (992, "Cant move anklee", 43, "M"),
      (996, "Ankle looks deformed", 43, "M"),
      (1002, "Swollen Ankles", 43, "M")
;

insert into symptoms (symptom_id,symptom_name,sub_body_id, gender ) 
	values (256, "Knee Pain",  41, "F"), 
	(145, "Knee Tension",  41, "F"), 
	(146, "Upper Knee pain",  41, "F"),
	 (984, "No Knee Pulse",  41, "F"),
      (142, "Pain in the calves", 43, "F"),
      (143, "Ulcer", 43, "F"),
      (147, "Ankle swelling", 43, "F"),
      (992, "Cant move anklee", 43, "F"),
      (996, "Ankle looks deformed", 43, "F"),
      (1002, "Swollen Ankles",43, "F")
;

select * from sub_body;
select * from symptoms;

select symptom_id, symptom_name from symptoms as sy  
inner join sub_body as sb on sb.id = sy.sub_body_id
where sb.sub_body_id = 41 and sy.gender = "M";

SELECT 'id', `symptom_id`, `symptom_name`, `gender`, `sub_body_id`, `createdAt`, `updatedAt` FROM `symptoms` AS `symptoms`;