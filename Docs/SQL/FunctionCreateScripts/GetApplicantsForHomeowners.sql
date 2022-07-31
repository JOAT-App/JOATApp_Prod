-- Gets all the applicants for a job
create or replace function f_get_applicants_for_homeowners (
	 job_no int
	)
	returns table
	(
		first_name varchar (64),
		last_name varchar (64),
		bio varchar(2048),
		photo_url varchar(1024),
		note varchar(2048),
		id int
	)
	language plpgsql
	as
$$
	begin
	return query select
	users.first_name,
	users.last_name,
	users.bio,
	users.photo_url,
	job_applicants.note,
	users.id
	from job_applicants inner join users on worker_id=users.id where job_id=job_no;
	end;
$$