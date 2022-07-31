create or replace function f_job_get_by_id (
	input_id int
	)
	returns table
	(
		title varchar(128),
		description varchar(1024),
		job_category_id int,
		pay numeric (5,2),
		time_elapsed interval,
		id int,
		state char(2),
		city varchar(32),
		street varchar(64),
		addr_number int,
		zip int,
		apt_no varchar(32),
		geohash varchar(16)
	)
	language plpgsql
	as
$$
  begin
  	return query select
  	jh.title,
  	jh.description,
  	jh.job_category_id,
  	jd.pay,
  	date_trunc('hour',Now()-jd.time_posted) as time_elapsed,
  	jh.id,
	a.state,
	a.city,
	a.street,
	a.addr_number,
	a.zip,
	a.apt_no,
	a.geohash
  	from job_header as jh
  	inner join
  	job_detail as jd on jh.id = jd.jd_job_header_id
	inner join
	address as a on a.id=jh.addr_id
  	where jh.id=input_id;
  END;
$$
