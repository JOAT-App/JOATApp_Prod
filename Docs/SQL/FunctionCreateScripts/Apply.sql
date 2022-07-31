create or replace function f_apply (
	job_no int,
  applicant_id int
	)
	returns void
	language plpgsql
	as
$$
  begin
    insert into job_applicants(job_id, worker_id)
    values(job_no, applicant_id);
  end;
$$
