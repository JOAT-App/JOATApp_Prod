create or replace function f_add_job (
	title varchar(128),
	description varchar(1024),
	job_category_id int,
	homeowner_id int,
	pay numeric(5,2),
	city varchar(32),
	state char(2),
	street varchar(64),
	addr_number int,
	zip int,
	geohash_in varchar(10),
	apt_no varchar(32)
	)
	returns int
	language plpgsql
	as
$$
	declare addr_id int;
	declare job_header_id int;
	begin
    --check if address exists
		select 1 into addr_id from address as a where a.geohash=geohash_in;
		if addr_id is NULL then
			insert into address(state, city, street, addr_number, zip, apt_no, geohash)
			values (state, city, street, addr_number, zip, apt_no, geohash_in)
			returning id into addr_id;
		end if;

		insert into job_header(title, description, addr_id, job_status_id, homeowner_id, job_category_id)
		values (title, description, addr_id, 1, homeowner_id, job_category_id) returning id into job_header_id;

		insert into job_detail(jd_job_header_id, time_posted, pay)
		values (job_header_id, now()::timestamp, pay);
		return 1;
	end;
$$
