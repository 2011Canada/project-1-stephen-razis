drop schema if exists reimbursomatic cascade;
create schema reimbursomatic;
set schema 'reimbursomatic';



/*TABLE CREATION*/
create table reimbursement_status (
	reimbursement_status_id serial primary key,
	reimbursement_status text not null
);

create table reimbursement_type (
	reimbursement_type_id serial primary key,
	reimbursement_type text not null
);

create table user_roles (
	user_role_id serial primary key,
	user_role text not null
);

create table users (
	users_id serial primary key,
	username text unique not null,
	users_password text not null,
	first_name text not null,
	last_name text not null,
	email text unique not null,
	role_id int not null references user_roles(user_role_id)
);

create table reimbursements (
	reimbursements_id serial primary key,
	amount numeric(10,2) not null,
	submitted timestamp not null,
	resolved timestamp,
	description text,
	receipt bytea,
	author int not null references users(users_id),
	resolver int references users(users_id),
	status_id int not null references reimbursement_status(reimbursement_status_id),
	type_id int not null references reimbursement_type(reimbursement_type_id)
);



/*INSERT DEFAULT DATA*/
begin;

insert into user_roles (user_role) values ('admin');
insert into user_roles (user_role) values ('finance manager');
insert into user_roles (user_role) values ('employee');

insert into reimbursement_status (reimbursement_status) values ('denied');
insert into reimbursement_status (reimbursement_status) values ('pending');
insert into reimbursement_status (reimbursement_status) values ('approved');

insert into reimbursement_type (reimbursement_type) values ('lodging');
insert into reimbursement_type (reimbursement_type) values ('travel');
insert into reimbursement_type (reimbursement_type) values ('food');
insert into reimbursement_type (reimbursement_type) values ('other');

/*admins*/
insert into users (username, users_password, first_name, last_name, email, role_id)
	values ('stephenrazis', 'Password123!', 'Stephen', 'Razis', 'stephen@stephenrazis.com', 1);

/*finance managers*/
insert into users (username, users_password, first_name, last_name, email, role_id)
	values ('aangatar', 'Appa123!', 'Avatar', 'Aang', 'aang@avatar.com', 2);
insert into users (username, users_password, first_name, last_name, email, role_id)
	values ('katara', 'Waterwhip123!', 'Katara', 'South', 'katara@southpole.com', 2);
insert into users (username, users_password, first_name, last_name, email, role_id)
	values ('lee', 'Honor123!!', 'Zuko', 'Prince', 'zuko@aangst.com', 2);

/*employees*/
insert into users (username, users_password, first_name, last_name, email, role_id)
	values ('blindbandit', 'EarthRumble123!', 'Toph', 'Bei Fong', 'toph@rock.com', 3);
insert into users (username, users_password, first_name, last_name, email, role_id)
	values ('wangfire', 'SpaceSword123!', 'Sokka', 'South', 'sokka@sarcasm.com', 3);
insert into users (username, users_password, first_name, last_name, email, role_id)
	values ('jasminetea', 'LuTen123!', 'Uncle', 'Iroh', 'iroh@whitelotus.com', 3);

/*reimbursements*/
insert into reimbursements (amount, submitted, resolved, description, author, resolver, status_id, type_id)
	values (10.00, '2002-07-01 09:00:00', '2002-07-02 10:00:00', 'I found this young man that could use some tea. So, we got some and had a chat.', 7, 4, 3, 3);
insert into reimbursements (amount, submitted, resolved, description, author, resolver, status_id, type_id)
	values (10.00, '2002-07-01 09:15:00', '2002-07-07 10:00:00', 'I ate too much and needed to sleep it off.', 6, 2, 1, 1);
insert into reimbursements (amount, submitted, description, author, status_id, type_id)
	values (10.00, '2002-07-03 15:00:00', 'Needed to borrow Appa.', 5, 2, 2);
insert into reimbursements (amount, submitted, description, author, status_id, type_id)
	values (10.00, '2002-07-03 15:00:00', 'Needed to borrow Appa again.', 5, 2, 4);

commit;



/*COMMON DISPLAYS*/
select * from users;
select * from reimbursements;
select * from user_roles;
select * from reimbursement_type;
select * from reimbursement_status;