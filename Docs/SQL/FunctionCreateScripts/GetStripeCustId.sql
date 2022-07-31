create or replace function f_get_stripe_custid( jobID int)returns
table (
       custID varchar(32),
       userID int
      )
as
$$
begin
    return query select stripe_id, users.id from
    users inner join job_header jh on users.id = jh.homeowner_id
    where jh.id=jobID;
end;
$$
language plpgsql;
