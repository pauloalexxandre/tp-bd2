select * from sensores;
select * from sala;
select * from localidade;
select * from cidade;
select * from historicosensor;


-- 1. Verificar o Usuário Conectado Veja com qual usuário você está conectado:
SELECT CURRENT_USER();

-- 2. Elevar Privilégios (Se Possível) Se estiver logado como root e mesmo assim houver problemas, pode ser necessário revisar os privilégios:
GRANT ALL PRIVILEGES ON mysql.* TO 'root'@'localhost';
FLUSH PRIVILEGES;

-- 3. Usar o Comando SHOW GRANTS Se você não puder modificar os privilégios, veja o que seu usuário atual pode fazer:
SHOW GRANTS;

-- 4. Usando uma Alternativa: Informação Sobre Conexões
-- Se a tabela mysql.user não for acessível por você, tente buscar informações de usuários ativos no momento (aplicável se usuários já estiverem conectados):
SELECT user, host FROM information_schema.processlist;


-- Confirmar o Local do Arquivo de Configuração
-- Se ainda não encontrar o arquivo, você pode descobrir o local exato através do MySQL:
-- Abra o MySQL CLI (ou Workbench).
-- Execute o seguinte comando:
SHOW VARIABLES LIKE 'pid_file';
-- O caminho do arquivo pid_file geralmente está no mesmo diretório do arquivo de configuração.

-- Alternativamente:
SHOW VARIABLES LIKE 'basedir';
-- O valor de basedir mostra o diretório principal do MySQL, onde o arquivo de configuração pode estar.




