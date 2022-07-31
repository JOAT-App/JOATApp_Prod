create or replace function f_accept_applicant (
	job_no int,
	applicant_id int
	)
	returns void
	language plpgsql
	as
$$
	begin
    --check if address exists
		update job_header
		set job_status_id=3
		where job_header.id=job_no;
		update job_detail
		set worker_id=applicant_id
		where jd_job_header_id=job_no;
		delete from job_applicants where job_id=job_no;
	end;
$$
