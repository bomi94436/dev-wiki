/**
 * user table 삭제 sql
 */
export const DropUserTable = `DROP TABLE IF EXISTS user;`

/**
 * user table 생성 sql
 */
export const CreateUserTable = `
CREATE TABLE IF NOT EXISTS user (
  id INT NOT NULL AUTO_INCREMENT UNIQUE,
  email VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(200) NOT NULL,
  nickname NVARCHAR(20) NOT NULL,
  is_verificated TINYINT(1) NOT NULL COMMENT "인증된 유저인지 체크",
  created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
  updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp ON UPDATE current_timestamp,
  PRIMARY KEY (id)
);
`
