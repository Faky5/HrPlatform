alter table [dbo].[Candidates]
add [CandidateId] int identity(1,1);

insert into [dbo].[Skill] values ('English language');
insert into [dbo].[Skill] values ('C# Programming');
insert into [dbo].[Skill] values ('Database design');
insert into [dbo].[Skill] values ('Java Programming');
insert into [dbo].[Skill] values ('Russian language');
insert into [dbo].[Skill] values ('German language');

alter table [dbo].[Candidates]
alter column [CandidateBirthday] date;

alter table [dbo].[Skill]
add [SkillId] int identity(1,1);

delete from [dbo].[Skill]
where [SkillName] = ('C# Programming');

select * from [dbo].[Skill]