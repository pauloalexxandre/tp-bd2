select * from localidade;

INSERT INTO localidade (nome_localidade, cidade_id, logradouro, numero, complemento, bairro, cep)
VALUES
    ('Campus Araraquara', (SELECT cidade_id FROM cidade WHERE nome = 'Araraquara' AND estado = 'SP'), 'Avenida Dona Madalena', '1500', 'Bloco A', 'Centro', '14801-000'),
    ('Campus Araçatuba', (SELECT cidade_id FROM cidade WHERE nome = 'Araçatuba' AND estado = 'SP'), 'Rua José Bonifácio', '1000', 'Bloco B', 'Vila Mariana', '16010-000'),
    ('Campus Assis', (SELECT cidade_id FROM cidade WHERE nome = 'Assis' AND estado = 'SP'), 'Rua José Alves do Nascimento', '200', '', 'Centro', '19800-000'),
    ('Campus Bauru', (SELECT cidade_id FROM cidade WHERE nome = 'Bauru' AND estado = 'SP'), 'Avenida Engenheiro Luiz Edmundo Cavanellas', '200', 'Bloco C', 'Centro', '17033-360'),
    ('Campus Botucatu', (SELECT cidade_id FROM cidade WHERE nome = 'Botucatu' AND estado = 'SP'), 'Avenida Camargo Pimentel', '1500', 'Bloco D', 'Vila dos Lavradores', '18603-000'),
    ('Campus Franca', (SELECT cidade_id FROM cidade WHERE nome = 'Franca' AND estado = 'SP'), 'Avenida Santa Maria', '2500', 'Bloco E', 'Vila Nova', '14400-000'),
    ('Campus Guaratinguetá', (SELECT cidade_id FROM cidade WHERE nome = 'Guaratinguetá' AND estado = 'SP'), 'Rua Cel. João Cláudio', '1200', 'Bloco F', 'Centro', '12500-000'),
    ('Campus Ilha Solteira', (SELECT cidade_id FROM cidade WHERE nome = 'Ilha Solteira' AND estado = 'SP'), 'Avenida Brasil', '3500', '', 'Centro', '15385-000'),
    ('Campus Jaboticabal', (SELECT cidade_id FROM cidade WHERE nome = 'Jaboticabal' AND estado = 'SP'), 'Rua Doutor Orlando Ravacci', '500', '', 'Centro', '14870-000'),
    ('Campus Marília', (SELECT cidade_id FROM cidade WHERE nome = 'Marília' AND estado = 'SP'), 'Avenida Hygino Muzzi Filho', '1500', 'Bloco G', 'Vila Barbosa', '17500-000'),
    ('Campus Presidente Prudente', (SELECT cidade_id FROM cidade WHERE nome = 'Presidente Prudente' AND estado = 'SP'), 'Avenida dos Três Poderes', '1000', 'Bloco H', 'Centro', '19013-000'),
    ('Campus Rio Claro', (SELECT cidade_id FROM cidade WHERE nome = 'Rio Claro' AND estado = 'SP'), 'Rua 16', '500', 'Bloco I', 'Vila Nova', '13500-000'),
    ('Campus São José do Rio Preto', (SELECT cidade_id FROM cidade WHERE nome = 'São José do Rio Preto' AND estado = 'SP'), 'Avenida Juscelino Kubitschek', '2000', 'Bloco J', 'Vila Paulista', '15015-000'),
    ('Campus São José dos Campos', (SELECT cidade_id FROM cidade WHERE nome = 'São José dos Campos' AND estado = 'SP'), 'Avenida Dr. João Batista Pinto Ribeiro', '1500', 'Bloco K', 'Jardim Aquarius', '12230-000'),
    ('Campus Sorocaba', (SELECT cidade_id FROM cidade WHERE nome = 'Sorocaba' AND estado = 'SP'), 'Avenida Dom Aguirre', '800', 'Bloco L', 'Centro', '18013-000');