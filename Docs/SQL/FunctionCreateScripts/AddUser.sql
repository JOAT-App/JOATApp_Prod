create or replace function f_add_user (
	first_name varchar(64),
	last_name varchar(64),
	email varchar(128),
	pass_hash varchar(256),
	phone varchar(10),
	stripe_id varchar(32),
	dob date default null
	)
	returns int
	language plpgsql
	as
$$
	declare user_id int;
		begin
			insert into users (first_name, last_name, phone, email, dob, stripe_id, confirmed)
			values ( first_name, last_name, phone, email, dob, stripe_id,'n')

			returning id into user_id;
			insert into user_auth(pass_hash, ua_user_id)
			values(pass_hash, user_id);
			return 1;
		end;
$$
