SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

DROP SCHEMA IF EXISTS `mydb` ;
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`tb_professor`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`tb_professor` ;

CREATE TABLE IF NOT EXISTS `mydb`.`tb_professor` (
  `idtb_professor` INT NOT NULL,
  `nome_professor` VARCHAR(45) NOT NULL,
  `deparamento_professor` VARCHAR(45) NOT NULL,
  `url_curriculo` VARCHAR(45) NOT NULL DEFAULT 'none',
  PRIMARY KEY (`idtb_professor`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`tb_perfil`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`tb_perfil` ;

CREATE TABLE IF NOT EXISTS `mydb`.`tb_perfil` (
  `idtb_perfil` INT NOT NULL AUTO_INCREMENT,
  `nome_perfil` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idtb_perfil`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`tb_usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`tb_usuario` ;

CREATE TABLE IF NOT EXISTS `mydb`.`tb_usuario` (
  `idtb_usuario` INT NOT NULL,
  `fk_perfil` INT NOT NULL,
  `login` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`idtb_usuario`),
  INDEX `fk_tb_usuario_tb_perfil1_idx` (`fk_perfil` ASC),
  CONSTRAINT `fk_tb_usuario_tb_perfil1`
    FOREIGN KEY (`fk_perfil`)
    REFERENCES `mydb`.`tb_perfil` (`idtb_perfil`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`tb_graduacao`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`tb_graduacao` ;

CREATE TABLE IF NOT EXISTS `mydb`.`tb_graduacao` (
  `idtb_graduacao` INT NOT NULL,
  `tb_usuario_idtb_usuario` INT NOT NULL,
  PRIMARY KEY (`idtb_graduacao`),
  INDEX `fk_tb_graduacao_tb_usuario1_idx` (`tb_usuario_idtb_usuario` ASC),
  CONSTRAINT `fk_tb_graduacao_tb_usuario1`
    FOREIGN KEY (`tb_usuario_idtb_usuario`)
    REFERENCES `mydb`.`tb_usuario` (`idtb_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`ta_graduacao_x_materia`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`ta_graduacao_x_materia` ;

CREATE TABLE IF NOT EXISTS `mydb`.`ta_graduacao_x_materia` (
  `idta_graduacao_x_materia` INT NOT NULL,
  PRIMARY KEY (`idta_graduacao_x_materia`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`tb_materia`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`tb_materia` ;

CREATE TABLE IF NOT EXISTS `mydb`.`tb_materia` (
  `idtb_materia` INT NOT NULL,
  PRIMARY KEY (`idtb_materia`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`tb_area_conhecimento`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`tb_area_conhecimento` ;

CREATE TABLE IF NOT EXISTS `mydb`.`tb_area_conhecimento` (
  `idtb_area_conhecimento` INT NOT NULL,
  `nome_area` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idtb_area_conhecimento`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`tb_topicos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`tb_topicos` ;

CREATE TABLE IF NOT EXISTS `mydb`.`tb_topicos` (
  `idtb_topicos` INT NOT NULL,
  `tb_area_conhecimento_idtb_area_conhecimento` INT NOT NULL,
  `nome_topico` VARCHAR(45) NOT NULL,
  `foto_topico` VARCHAR(45) NOT NULL DEFAULT 'none',
  PRIMARY KEY (`idtb_topicos`),
  INDEX `fk_tb_topicos_tb_area_conhecimento1_idx` (`tb_area_conhecimento_idtb_area_conhecimento` ASC),
  CONSTRAINT `fk_tb_topicos_tb_area_conhecimento1`
    FOREIGN KEY (`tb_area_conhecimento_idtb_area_conhecimento`)
    REFERENCES `mydb`.`tb_area_conhecimento` (`idtb_area_conhecimento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`ta_materia`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`ta_materia` ;

CREATE TABLE IF NOT EXISTS `mydb`.`ta_materia` (
  `fk_professor` INT NOT NULL,
  `nome_matéria` VARCHAR(45) NOT NULL,
  `avaliacao_trabalho` INT NOT NULL DEFAULT 0,
  `avaliacao_prova` INT NOT NULL DEFAULT 0,
  `avaliacao_chamada` INT NOT NULL DEFAULT 0,
  `avalicao_didatica` INT NOT NULL DEFAULT 0,
  `foto_materia` VARCHAR(300) NOT NULL,
  PRIMARY KEY (`fk_professor`),
  INDEX `fk_tb_professor_has_tb_topicos_tb_professor_idx` (`fk_professor` ASC),
  CONSTRAINT `fk_tb_professor_has_tb_topicos_tb_professor`
    FOREIGN KEY (`fk_professor`)
    REFERENCES `mydb`.`tb_professor` (`idtb_professor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`tb_graduacao_has_ta_materia`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`tb_graduacao_has_ta_materia` ;

CREATE TABLE IF NOT EXISTS `mydb`.`tb_graduacao_has_ta_materia` (
  `tb_graduacao_idtb_graduacao` INT NOT NULL,
  `ta_materia_tb_professor_idtb_professor` INT NOT NULL,
  `ta_materia_tb_topicos_idtb_topicos` INT NOT NULL,
  PRIMARY KEY (`tb_graduacao_idtb_graduacao`, `ta_materia_tb_professor_idtb_professor`, `ta_materia_tb_topicos_idtb_topicos`),
  INDEX `fk_tb_graduacao_has_ta_materia_ta_materia1_idx` (`ta_materia_tb_professor_idtb_professor` ASC, `ta_materia_tb_topicos_idtb_topicos` ASC),
  INDEX `fk_tb_graduacao_has_ta_materia_tb_graduacao1_idx` (`tb_graduacao_idtb_graduacao` ASC),
  CONSTRAINT `fk_tb_graduacao_has_ta_materia_tb_graduacao1`
    FOREIGN KEY (`tb_graduacao_idtb_graduacao`)
    REFERENCES `mydb`.`tb_graduacao` (`idtb_graduacao`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_graduacao_has_ta_materia_ta_materia1`
    FOREIGN KEY (`ta_materia_tb_professor_idtb_professor`)
    REFERENCES `mydb`.`ta_materia` (`fk_professor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`tb_acesso`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`tb_acesso` ;

CREATE TABLE IF NOT EXISTS `mydb`.`tb_acesso` (
  `idtb_acesso` INT NOT NULL,
  `nome_controle` VARCHAR(45) NOT NULL,
  `nome_metodo` VARCHAR(45) NOT NULL,
  `numero_argumentos` INT NOT NULL,
  PRIMARY KEY (`idtb_acesso`),
  UNIQUE INDEX `idtb_acesso_UNIQUE` (`idtb_acesso` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`ta_materia_has_tb_topicos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`ta_materia_has_tb_topicos` ;

CREATE TABLE IF NOT EXISTS `mydb`.`ta_materia_has_tb_topicos` (
  `ta_materia_tb_professor_idtb_professor` INT NOT NULL,
  `tb_topicos_idtb_topicos` INT NOT NULL,
  `coeficiente_aprendizado` INT NOT NULL,
  PRIMARY KEY (`ta_materia_tb_professor_idtb_professor`, `tb_topicos_idtb_topicos`),
  INDEX `fk_ta_materia_has_tb_topicos_tb_topicos1_idx` (`tb_topicos_idtb_topicos` ASC),
  INDEX `fk_ta_materia_has_tb_topicos_ta_materia1_idx` (`ta_materia_tb_professor_idtb_professor` ASC),
  CONSTRAINT `fk_ta_materia_has_tb_topicos_ta_materia1`
    FOREIGN KEY (`ta_materia_tb_professor_idtb_professor`)
    REFERENCES `mydb`.`ta_materia` (`fk_professor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ta_materia_has_tb_topicos_tb_topicos1`
    FOREIGN KEY (`tb_topicos_idtb_topicos`)
    REFERENCES `mydb`.`tb_topicos` (`idtb_topicos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
