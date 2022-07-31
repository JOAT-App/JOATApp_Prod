create function f_confirm_account(hash character varying)
    returns TABLE(confirmed boolean)
    language plpgsql
as
$$
begin
			update users set confirmed = true, confirmation_hash=0, user_type_id=2 where users.confirmation_hash=hash;
			select confirmed from users where users.email=email;
		end;
$$;
