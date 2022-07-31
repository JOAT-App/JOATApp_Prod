create function f_add_confirmation_hash(emailaddr character varying, hash character varying) returns void
    language plpgsql
as
$$
begin
			update users set confirmed = false, confirmation_hash=$2 where users.email=$1;
		end;
$$;
