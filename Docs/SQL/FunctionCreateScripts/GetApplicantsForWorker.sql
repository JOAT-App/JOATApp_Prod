-- Gets all the applicants for a job
create or replace function f_get_applicants_for_worker (
	 worker_no int
	)
	returns table
	(
		title varchar(128),
		description varchar (1024),
		geohash varchar(16),
		pay numeric (5,2),
		category varchar(16),
		note varchar(2048),
		first_name  varchar(64),
		last_name varchar(64),
		photo_url varchar(256)
	)
	language plpgsql
	as
$$
	begin
	return query select
	job_header.title,
	job_header.description,
	address.geohash,
	job_detail.pay,
	job_category.category,
	job_applicants.note,
	users.first_name,
	users.last_name,
	users.photo_url
	from job_applicants
	inner join users on worker_id=users.id
	inner join job_header on job_id=job_header.id
	inner join job_detail on job_header.id=jd_job_header_id
	inner join job_category on job_category_id=job_category.id
	inner join address on addr_id=address.id
	where job_id=job_no;
	end;
$$
