create database bdsistemamedico;
use bdsistemamedico;

/*tabela Cargo*/
create table tb_cargo(
tb_cargo_id int auto_increment primary key,
tb_cargo_nome varchar(50)
);

/*tabela Administrador*/
create table tb_administrador(
tb_administrador_id int auto_increment primary key,
tb_administrador_nome varchar(75),
tb_administrador_email varchar(45),
tb_administrador_senha varchar(255),
tb_administrador_cargoFK int,
foreign key (tb_administrador_cargoFK) references tb_cargo(tb_cargo_id)
);

/*tabela Profissional da Saúde*/
create table tb_profissionalSaude(
tb_profissionalSaude_id int auto_increment primary key,
tb_profissionalSaude_nome varchar(75),
tb_profissionalSaude_registro varchar(25),
tb_profissionalSaude_email varchar(45),
tb_profissionalSaude_senha varchar(255),
tb_profissionalSaude_expedienteInicio time,
tb_profissionalSaude_expedienteFim time,
tb_profissionalSaude_admFK int, 
tb_profissionalSaude_cargoFK int,
foreign key (tb_profissionalSaude_admFK) references tb_administrador(tb_administrador_id) ,
foreign key (tb_profissionalSaude_cargoFK) references tb_cargo(tb_cargo_id)
);


/*tabela Diagnóstico*/
create table tb_diagnostico(
tb_diagnostico_id int auto_increment primary key,
tb_diagnostico_nomePaciente varchar(75),
tb_diagnostico_dataHora timestamp,
tb_diagnostico_img varchar(255),
tb_diagnostico_desc varchar(2000),
tb_diagnostico_accurancy varchar(5),
tb_diagnostico_profissionalSaudeFK int,
foreign key (tb_diagnostico_profissionalSaudeFK) references tb_profissionalSaude(tb_profissionalSaude_id)
);
drop database bdsistemamedico;
select * from tb_cargo;
select * from tb_administrador;
select * from tb_profissionalSaude;



